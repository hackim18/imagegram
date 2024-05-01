import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View, StyleSheet, Dimensions, ScrollView, Text } from "react-native";

import Bio from "../components/Bio";
import ProfileHeader from "../components/ProfileHeader";
import Container from "../components/container";
import { gql, useQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

const GET_ACCOUNT = gql`
  query FindUserById($findUserByIdId: ID!, $id: ID!, $findFollowersDetailId2: ID!, $userId: ID!) {
    findUserById(id: $findUserByIdId) {
      _id
      name
      username
      email
      password
    }
    findFollowingDetail(_id: $id) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
      following {
        _id
        name
        email
      }
    }
    findFollowersDetail(_id: $findFollowersDetailId2) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
      followers {
        _id
        name
        email
      }
    }
    findPostsByUserId(userId: $userId) {
      _id
      content
      tags
      imgUrl
      authorId
      # comments {
      #   userId
      #   comment
      # }
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

const Account = ({ route, navigation }) => {
  const [id, setId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const data = await SecureStore.getItemAsync("_id");
      setId(data);
    };
    fetchData();
  }, []);

  const { loading, error, data } = useQuery(GET_ACCOUNT, {
    variables: {
      findUserByIdId: id,
      id: id,
      findFollowersDetailId2: id,
      userId: id,
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error)
    return (
      <Text>
        Error: {error.message} {console.log(error.message)}
      </Text>
    );

  return (
    <Container insets={{ top: true, right: true, bottom: true }}>
      <ProfileHeader route={data} />
      <Bio route={data} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {data.findPostsByUserId.map((post) => (
          <TouchableOpacity
            key={post._id}
            onPress={() =>
              navigation.navigate("SinglePost", { post: post, author: data.findUserById.name, authorId: data.findUserById._id })
            }
          >
            <Image source={{ uri: post.imgUrl }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Container>
  );
};

const numColumns = 3;
const screenWidth = Dimensions.get("window").width;
const gutterWidth = 10;
const imageWidth = (screenWidth - (numColumns - 1) * gutterWidth) / numColumns;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    marginBottom: 5,
  },
});

export default Account;
