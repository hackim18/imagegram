const { ObjectId } = require("mongodb");
const database = require("../config/db");
const redis = require("../config/redis");

class Post {
  static collection() {
    return database.collection("posts");
  }

  static async findAll() {
    const postCollection = this.collection();
    const aggregations = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
        },
      },
      {
        $project: {
          "author.password": 0,
        },
      },
    ];

    const cache = await redis.get("posts");
    if (cache) {
      // console.log(cache, "lewat cache");
      return JSON.parse(cache);
    }

    const posts = await postCollection.aggregate(aggregations).toArray();
    // console.log(posts, "lewat mongodb");
    await redis.set("posts", JSON.stringify(posts));
    return posts;
  }

  static async getPostById(postId) {
    const postCollection = this.collection();
    const post = await postCollection.findOne({ _id: new ObjectId(postId) });
    return post;
  }

  static async createPost(newPost) {
    const postCollection = this.collection();

    const data = await postCollection.insertOne({
      ...newPost,
      likes: [],
      comments: [],
      authorId: new ObjectId(newPost.authorId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const output = this.getPostById(data.insertedId);

    await redis.del("posts");
    return output;
  }

  static async addComment(postId, userId, comment) {
    const postCollection = this.collection();
    const result = await postCollection.updateOne({ _id: new ObjectId(postId) }, { $push: { comments: { userId, comment } } });
    if (result.modifiedCount === 1) {
      return { userId, comment };
    } else {
      throw new Error("Failed to add comment to post");
    }
  }

  static async updatePost(id, updatedPost) {
    const postCollection = this.collection();
    const result = await postCollection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedPost }, { returnOriginal: false });
    return result;
  }

  static async deletePost(id) {
    const postCollection = this.collection();
    const result = await postCollection.findOneAndDelete({ _id: new ObjectId(id) });
    return {
      _id: result._id,
      content: result.content,
      tags: result.tags,
      imgUrl: result.imgUrl,
      authorId: result.authorId,
      comments: result.comments,
      likes: result.likes,
      author: result.author,
    };
  }
  static async likePost(postId, userId) {
    const postCollection = this.collection();
    const result = await postCollection.updateOne({ _id: new ObjectId(postId) }, { $addToSet: { likes: new ObjectId(userId) } });
    console.log(result);
    return result.modifiedCount > 0;
  }

  static async findPostsByUserId(userId) {
    const postCollection = database.collection("posts");
    const posts = await postCollection.find({ authorId: new ObjectId(userId) }).toArray();
    return posts;
  }
}

module.exports = Post;
