const User = require("../model/user");
const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    findAllUsers: async () => {
      const result = await User.findAll();
      return result;
    },

    findUserById: async (parent, args) => {
      const result = await User.findById(args.id);
      return result;
    },

    findUserByEmail: async (parent, args) => {
      const result = await User.findByEmail(args.email);
      return result;
    },
    getUser: async (parent, args, contextValue) => {
      const decodedToken = await contextValue.authentication();
      const result = await User.getUser(args.username);
      return result;
    },

    searchUsers: async (parent, { search }) => {
      const result = await User.searchByUsernameOrName(search);
      return result;
    },
  },
  Mutation: {
    register: async (parent, args) => {
      const newUser = args.newUser;
      const result = await User.createUser(newUser);
      return result;
    },
    login: async (parent, { username, password }) => {
      try {
        const tokenInfo = await User.login(username, password);
        return tokenInfo;
      } catch (error) {
        // throw new Error(`Failed to login: ${error.message}`);
        throw new Error(error.message);
      }
    },
    followUser: async (parent, { userId, userToFollowId }) => {
      try {
        const result = await User.followUser(userId, userToFollowId);
        return result;
      } catch (error) {
        throw new Error(`Failed to follow user: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
