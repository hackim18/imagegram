import React from "react";
import { FlatList, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { useScrollToTop } from "@react-navigation/native";

import SearchBar from "../components/SearchBar";
import { gql, useQuery } from "@apollo/client";
import { Text } from "react-native-paper";

const posts = gql`
  query FindAllPosts {
    findAllPosts {
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

export default function Search({ route, navigation }) {
  const { loading, error, data: postData } = useQuery(posts);

  const flatListRef = React.useRef(null);
  useScrollToTop(flatListRef);

  const handleImagePress = (image) => {
    // console.log(postData, ">> pstdata");
    console.log(image, "img data");
    const post = {
      _id: image.id,
      imgUrl: image.image,
      likes: image.likes,
      content: image.content,
      authorId: image.authorId,
    };
    navigation.navigate("SinglePost", { author: image.author, post: post });
    // navigation.navigate("AccountDetail");
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity key={index} style={{ width: "33%", margin: 0.8 }} onPress={() => handleImagePress(item)}>
      <Image source={{ uri: item.image }} style={{ width: "100%", height: 130, borderWidth: 1 }} />
    </TouchableOpacity>
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const data = postData.findAllPosts.map((element, index) => {
    return {
      id: element._id,
      image: element.imgUrl,
      author: element.author.username,
      content: element.content,
      likes: element.likes,
      authorId: element.author._id,
    };
  });

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <SearchBar ıconColor={true} />
      <FlatList
        ref={flatListRef}
        horizontal={false}
        data={data}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
