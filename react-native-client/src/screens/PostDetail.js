import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";

const fetchPostDetail = async (postId) => {
  return {
    id: postId,
    title: "Post Title",
    content: "Post Content",
    author: {
      username: "user123",
      name: "John Doe",
    },
    comments: [
      { id: 1, author: "user1", content: "Comment 1" },
      { id: 2, author: "user2", content: "Comment 2" },
      { id: 3, author: "user3", content: "Comment 3" },
    ],
    likes: 10,
  };
};

export default function PostDetailScreen({ route }) {
  const { postId } = route.params;
  const [postDetail, setPostDetail] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchPostDetail(postId)
      .then((data) => setPostDetail(data))
      .catch((error) => console.error("Failed to fetch post detail:", error));
  }, []);

  const handleAddComment = () => {
    console.log("Adding comment:", comment);
    setComment("");
  };

  if (!postDetail) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{postDetail.title}</Text>
      <Text style={styles.content}>{postDetail.content}</Text>
      <Text style={styles.author}>
        Author: {postDetail.author.name} (@{postDetail.author.username})
      </Text>
      <Text style={styles.likes}>{postDetail.likes} Likes</Text>
      <Text style={styles.sectionTitle}>Comments:</Text>
      <FlatList
        data={postDetail.comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text>{item.content}</Text>
            <Text style={styles.commentAuthor}>Comment by: {item.author}</Text>
          </View>
        )}
      />
      <TextInput style={styles.input} placeholder="Add a comment..." value={comment} onChangeText={setComment} />
      <Button title="Add Comment" onPress={handleAddComment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    marginBottom: 10,
  },
  likes: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  comment: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  commentAuthor: {
    marginTop: 5,
    fontStyle: "italic",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
