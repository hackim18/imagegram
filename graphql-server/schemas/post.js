const typeDefs = `#graphql
type Post {
    _id: ID
    content: String
    tags: [String] 
    imgUrl: String
    authorId: String
    comments: [Comment]
    likes: [Like]
    author: Author
}

type Author {
    _id: ID
    name: String
    username: String
    email: String
}

input NewPost {
    content: String!
    tags: [String] 
    imgUrl: String
}

type Comment {
    userId: ID
    comment: String
}
input CommentInput {
  comment: String!
}
type Like {
    username: String
}
type Query{
    findAllPosts: [Post]
    getPostById(postId: ID!): Post
    findPostsByUserId(userId: ID!): [Post]
}
type Mutation {
    createPost(newPost: NewPost): Post
    commentPost(postId: ID!, commentData: CommentInput!): Comment
    updatePost(id: ID!, updatedPost: NewPost!): Post
    deletePost(id: ID!): Post
    likePost(postId: ID!): Boolean
}
`;
module.exports = typeDefs;
