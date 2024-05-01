const typeDefs = `#graphql
type User {
    _id: ID
    name: String
    username: String 
    email: String
    password: String
}

input NewUser {
    name: String
    username: String!
    email: String!
    password: String!
}
type AuthPayload {
  access_token: String
  _id: ID
  email: String
}

type Query {
    findAllUsers: [User]
    findUserById(id: ID!): User
    findUserByEmail(email: String): User
    getUser(username: String): User
    searchUsers(search: String!): [User]
    
}


type Mutation {
  register(newUser: NewUser!): User
  login(username: String!, password: String!): AuthPayload
}
`;
module.exports = typeDefs;
