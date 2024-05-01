import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import styles from "../style/login.styles";
import Container from "../components/container";
import Content from "../components/content";
import { gql, useMutation } from "@apollo/client";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($newPost: NewPost) {
    createPost(newPost: $newPost) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        userId
        comment
      }
      likes {
        username
      }
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  // const [content, setContent] = useState("content2");
  // const [tags, setTags] = useState("tag2");
  // const [imgUrl, setImgUrl] = useState("https://res.cloudinary.com/dkuq6sef1/image/upload/v1710689506/mfvvw8mn0rludiom7scs.png");

  const [createPost, { loading, error }] = useMutation(CREATE_POST_MUTATION);

  const handleSubmit = async () => {
    try {
      const { data } = await createPost({
        variables: {
          newPost: {
            content: content,
            tags: tags,
            imgUrl: imgUrl,
          },
        },
      });
      console.log("New post created:", data.createPost);

      setContent("");
      setTags("");
      setImgUrl("");

      navigation.goBack();
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", "Failed to create post. Please try again later.");
    }
  };

  return (
    <Container insets={{ top: true, bottom: true }}>
      <Content>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <View style={styles.keyboardView}>
            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="Content"
              onChangeText={(text) => setContent(text)}
              value={content}
              placeholderTextColor="grey"
              multiline={true}
              numberOfLines={4}
              style={[
                styles.textInput,
                {
                  height: 120,
                },
              ]}
              selectionColor="grey"
              activeUnderlineColor="#3a3a3a"
              activeOutlineColor="#3a3a3a"
            />

            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="Tags"
              onChangeText={(text) => setTags(text)}
              value={tags}
              placeholderTextColor="grey"
              selectionColor="grey"
              style={styles.textInput}
              activeOutlineColor="grey"
              activeUnderlineColor="#3a3a3a"
            />

            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="Image URL"
              onChangeText={(text) => setImgUrl(text)}
              value={imgUrl}
              placeholderTextColor="grey"
              selectionColor="grey"
              style={styles.textInput}
              activeOutlineColor="grey"
              activeUnderlineColor="#3a3a3a"
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.login}>
              <Text style={styles.loginText}>Create Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  );
}
