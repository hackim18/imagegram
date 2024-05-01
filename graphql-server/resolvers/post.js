const Post = require("../model/post");

const resolvers = {
  Query: {
    findAllPosts: async (parent, args, contextValue) => {
      const decodedToken = await contextValue.authentication();
      const result = await Post.findAll();
      return result;
    },
    getPostById: async (parent, { postId }) => {
      try {
        const post = await Post.getPostById(postId);
        return post;
      } catch (error) {
        throw new Error(`Failed to get post by id: ${error.message}`);
      }
    },
    findPostsByUserId: async (parent, { userId }) => {
      try {
        const posts = await Post.findPostsByUserId(userId);
        // console.log(posts);
        return posts;
      } catch (error) {
        throw new Error(`Failed to find posts by user id: ${error.message}`);
      }
    },
  },
  Mutation: {
    createPost: async (parent, args, contextValue) => {
      const decodedToken = await contextValue.authentication();
      console.log(decodedToken);
      const newPost = args.newPost;
      // const result = await Post.createPost(newPost);
      const result = await Post.createPost({
        ...newPost,
        authorId: decodedToken._id,
      });
      return result;
    },

    commentPost: async (parent, { postId, commentData }, contextValue) => {
      try {
        const decodedToken = await contextValue.authentication();
        const userId = decodedToken._id;
        const result = await Post.addComment(postId, userId, commentData);
        // console.log(result);
        return { userId: result.userId, comment: result.comment.comment };
      } catch (error) {
        throw new Error(`Failed to add comment: ${error.message}`);
      }
    },

    updatePost: async (parent, { id, updatedPost }) => {
      try {
        const result = await Post.updatePost(id, updatedPost);
        if (!result) {
          throw new Error("Post not found");
        }
        return result;
      } catch (error) {
        throw new Error(`Failed to update post: ${error.message}`);
      }
    },
    deletePost: async (parent, { id }, contextValue) => {
      try {
        const currentUser = await contextValue.authentication();
        const result = await Post.deletePost(id);
        if (!result) {
          throw new Error("Post not found");
        }
        return result;
      } catch (error) {
        throw new Error(`Failed to delete post: ${error.message}`);
      }
    },
    likePost: async (parent, { postId }, contextValue) => {
      try {
        const { _id: userId } = await contextValue.authentication();
        const result = await Post.likePost(postId, userId);
        if (result) {
          return true;
        } else {
          throw new Error("Failed to like post");
        }
      } catch (error) {
        throw new Error(`Failed to like post: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
