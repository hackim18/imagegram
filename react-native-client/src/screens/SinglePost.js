import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView, TextInput } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { gql, useMutation } from "@apollo/client";

import Container from "../components/container";

import styles from "../style/Post.styles";

const SinglePost = ({ route, navigation }) => {
  const [comment, setComment] = useState("");
  const [allCommentsVisible, setAllCommentsVisible] = useState(false);

  const LIKE_POST_MUTATION = gql`
    mutation LikePost($postId: ID!) {
      likePost(postId: $postId)
    }
  `;

  const COMMENT_POST_MUTATION = gql`
    mutation CommentPost($postId: ID!, $commentData: CommentInput!) {
      commentPost(postId: $postId, commentData: $commentData) {
        userId
        comment
      }
    }
  `;

  const DELETE_POSTS_MUTATION = gql`
    mutation DeletePost($deletePostId: ID!) {
      deletePost(id: $deletePostId) {
        _id
        content
      }
    }
  `;

  const FOLLOW_USER_MUTATION = gql`
    mutation FollowUser($followingId: ID!) {
      followUser(followingId: $followingId) {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
    }
  `;

  const [likePostMutation] = useMutation(LIKE_POST_MUTATION);
  const [commentPostMutation] = useMutation(COMMENT_POST_MUTATION);
  const [deletePostMutation] = useMutation(DELETE_POSTS_MUTATION);
  const [followUserMutation] = useMutation(FOLLOW_USER_MUTATION);

  const handleLike = () => {
    console.log(route.params.post._id);
    likePostMutation({
      variables: {
        postId: route.params.post._id,
      },
    })
      .then(() => {
        console.log("Post liked!");
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };

  const handleComment = () => {
    commentPostMutation({
      variables: {
        postId: route.params.post._id,
        commentData: {
          comment: comment,
        },
      },
    })
      .then(() => {
        console.log("Comment posted!");
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  const handleFollow = () => {
    console.log(route.params.post._id);
    followUserMutation({
      variables: {
        followingId: "6602a6dcfc13ae14325100fa",
      },
    })
      .then(() => {
        console.log("User followed!");
      })
      .catch((error) => {
        console.error("Error follow user:", error);
      });
  };

  const handleDelete = () => {
    console.log("delete");
    deletePostMutation({
      variables: {
        deletePostId: route.params.post._id,
      },
    })
      .then(() => {
        console.log("Post deleted!");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <Container insets={{ top: true, bottom: true }}>
      <ScrollView>
        <View>
          <View style={styles.left}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.label}> {route.params.author}</Text>
          </View>
          <View style={{ marginBottom: 10, marginTop: 15 }}>
            <View style={styles.top}>
              <View
                style={styles.topleft}
                // onPress={() => {
                //   console.log(route.params.post.authorId);
                //   navigation.navigate("AccountDetail", { authorId: route.params.post.authorId });
                // }}
              >
                <Image source={require("../../src/images/profil.jpg")} style={styles.profilImage} />
                <Text style={styles.title}>{route.params.author + "  "}</Text>
                <TouchableOpacity onPress={handleFollow}>
                  <Text style={{ fontWeight: "bold", fontSize: 14, color: "#0195f7" }}>+Follow</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleDelete} style={{ alignSelf: "center", marginRight: 10 }}>
                <AntDesign name="delete" size={20} color="#F5F5F5" />
              </TouchableOpacity>
            </View>

            <View style={{ height: 400 }}>
              <Image source={{ uri: route.params.post.imgUrl }} style={styles.ımage} />
            </View>

            <View style={styles.ıconContainer}>
              <View style={styles.leftIcon}>
                <TouchableOpacity onPress={handleLike}>
                  <AntDesign name={"hearto"} size={24} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Feather name="message-circle" size={24} color="white" />
                </TouchableOpacity>
                <Feather name="send" size={24} color="white" />
              </View>

              <View style={{ marginRight: 20 }}>
                <FontAwesome name="bookmark-o" size={24} color="white" />
              </View>
            </View>

            <Text style={styles.likeText}>{route.params.post.likes.length} Likes</Text>

            <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 5 }}>
              <Text style={styles.postName}>{route.params.author}</Text>
              <Text style={{ color: "white", marginTop: 2 }}> {route.params.post.content}</Text>
            </View>
            <Text style={styles.time}>10 October</Text>

            <TouchableOpacity onPress={() => setAllCommentsVisible(!allCommentsVisible)}>
              <Text style={styles.viewAllComments}>View all comments</Text>
            </TouchableOpacity>

            {allCommentsVisible && (
              <View>
                <Text style={styles.comment}>Komentar 1</Text>
                <Text style={styles.comment}>Komentar 2</Text>
              </View>
            )}

            <View style={styles.commentInputContainer}>
              <TextInput
                placeholder="Add a comment..."
                placeholderTextColor="grey"
                style={styles.commentInput}
                value={comment}
                onChangeText={setComment}
                onSubmitEditing={handleComment}
              />
              <TouchableOpacity onPress={handleComment}>
                <Text style={styles.commentButton}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SinglePost;
