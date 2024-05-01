// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
const userTypeDefs = require("./schemas/user");
const userResolvers = require("./resolvers/user");

const postTypeDefs = require("./schemas/post");
const postResolvers = require("./resolvers/post");

const followTypeDefs = require("./schemas/follow");
const followResolvers = require("./resolvers/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 3000 },
  context: async ({ req, res }) => {
    return {
      authentication: () => {
        // console.log(req.headers.authorization);
        if (!req.headers.authorization) {
          throw new GraphQLError("access token must be provided", {
            extensions: {
              code: "UNAUTHORIZED",
            },
          });
        }
        const [type, accessToken] = req.headers.authorization.split(" ");
        if (!type || !accessToken) {
          throw new GraphQLError("access token must be provided", {
            extensions: {
              code: "UNAUTHORIZED",
            },
          });
        }
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        if (!decodedToken) {
          throw new GraphQLError("access token must be provided", {
            extensions: {
              code: "UNAUTHORIZED",
            },
          });
        }

        return decodedToken;
      },
    };
  },
})
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
