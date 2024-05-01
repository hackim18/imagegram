const typeDefs = `#graphql
type Following {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    following: FollowDetail
}

type Followers {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
    followers: FollowDetail
}

type FollowDetail {
    _id: ID
    name: String
    email: String
}

type Query {
    findFollowingDetail(_id: ID!): [Following]
    findFollowersDetail(_id: ID!): [Followers]
}

type Mutation {
    followUser(followingId: ID!) : Following
}
`;
module.exports = typeDefs;
