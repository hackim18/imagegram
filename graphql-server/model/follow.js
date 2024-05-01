const { ObjectId } = require("mongodb");
const database = require("../config/db");
const { GraphQLError } = require("graphql");

class Follow {
  static collection() {
    return database.collection("follows");
  }

  static async create(followData) {
    const insertResult = await this.collection().insertOne({
      //   ...followData,
      followerId: new ObjectId(followData.followerId),
      followingId: new ObjectId(followData.followingId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.collection().findOne({
      _id: new ObjectId(insertResult.insertedId),
    });
  }

  static async findFollowing(_id) {
    const aggregations = [
      {
        $match: {
          followerId: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followingId",
          foreignField: "_id",
          as: "following",
        },
      },
      {
        $unwind: {
          path: "$following",
        },
      },
      {
        $project: {
          "following.password": 0,
        },
      },
    ];

    return this.collection().aggregate(aggregations).toArray();
  }

  static async findFollowers(_id) {
    const aggregations = [
      {
        $match: {
          followingId: new ObjectId(_id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followerId",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $unwind: {
          path: "$followers",
        },
      },
      {
        $project: {
          "followers.password": 0,
        },
      },
    ];

    return this.collection().aggregate(aggregations).toArray();
  }
}

module.exports = Follow;
