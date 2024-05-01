const { GraphQLError } = require("graphql");
const Follow = require("../model/follow");

const resolvers = {
  Query: {
    findFollowingDetail: async (parent, args) => {
      const { _id } = args;
      const data = await Follow.findFollowing(_id);
      console.log(data);
      return data;
    },
    findFollowersDetail: async (parent, args) => {
      const { _id } = args;
      const data = await Follow.findFollowers(_id);
      console.log(data);
      return data;
    },
  },
  Mutation: {
    followUser: async (parent, args, contextValue) => {
      const currentUser = await contextValue.authentication();
      const followerId = currentUser._id;
      const { followingId } = args;
      console.log(followingId);

      return await Follow.create({
        followerId,
        followingId,
      });
    },
  },
};

module.exports = resolvers;
