import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

import styles from "../style/HomeComponents.style";

const data = [
  {
    id: 1,
    name: "User1",
    postName: "User1",
    image: require("../images/profil.jpg"),
    postImage: require("../images/cats.jpg"),
    like: 25,
    comment: "4 comments...",
    explanation: "Text content....",
    time: "1 saat önce",
    timeStory: "1s",
    islike: false,
  },
  {
    id: 2,
    name: "User2",
    postName: "User2",
    image: require("../images/noname2.jpg"),
    postImage: require("../images/fintech.jpeg"),
    like: 360,
    comment: "4 comments...",
    explanation: "Text content....",
    time: "2 saat önce",
    timeStory: "53d",
    islike: false,
  },
  {
    id: 3,
    name: "User3",
    postName: "User3",
    image: require("../images/profil.jpg"),
    postImage: require("../images/oje.jpg"),
    like: 120,
    comment: "4 comments...",
    explanation: "Text content....)",
    time: "3 saat önce",
    timeStory: "2s",
    islike: false,
  },
  {
    id: 4,
    name: "User4",
    postName: "User4",
    image: require("../images/cat.jpg"),
    postImage: require("../images/catPost.jpg"),
    like: 160,
    comment: "8 comments...",
    explanation: "Text content....",
    time: "5 saat önce",
    timeStory: "3s",
    islike: false,
  },
  {
    id: 5,
    name: "User5",
    postName: "User5",
    image: require("../images/alternatif.png"),
    postImage: require("../images/oje.jpg"),
    like: 220,
    comment: "110 comments...",
    explanation: "Text content....",
    time: "8 saat önce",
    timeStory: "6s",
    islike: false,
  },
];

const Stories = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.topContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((data, index) => {
          return (
            <TouchableOpacity activeOpacity={0.5} key={index}>
              <View style={styles.top2}>
                {data.id === 1 ? (
                  <View style={styles.myStory}>
                    <View style={styles.plusIcon}>
                      <AntDesign name="pluscircle" size={16} color="#0195f7" />
                    </View>
                    <Image source={data.image} style={styles.image2} />
                  </View>
                ) : (
                  <View style={styles.circle}>
                    <Image source={data.image} style={styles.image2} />
                  </View>
                )}

                <Text style={styles.textLabel}>{data.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Stories;
