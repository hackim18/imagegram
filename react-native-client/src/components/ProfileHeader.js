import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const defaultImage = require("../../src/images/profil.jpg");

const ProfileHeader = ({ route }) => {
  console.log(route.findFollowingDetail, "<<following");
  console.log(route.findFollowersDetail, "<<followers");
  console.log(route, "routesss");
  return (
    <View style={styles.container3}>
      <View>
        {/* <Image source={route ? { uri: route.image } : defaultImage} style={styles.image3} /> */}
        <Image source={defaultImage} style={styles.image3} />
      </View>

      <View style={styles.numbers}>
        <View style={styles.left}>
          <Text style={styles.numberContainer}>{route.findPostsByUserId.length}</Text>
          <Text style={styles.text}>Posts</Text>
        </View>

        <View style={styles.mid}>
          <Text style={styles.numberContainer}>{route.findFollowersDetail.length}</Text>
          <Text style={styles.text}>Followers</Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.numberContainer}>{route.findFollowingDetail.length}</Text>
          <Text style={styles.text}>Following</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 10,
  },
  image3: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 10,
    marginBottom: 10,
  },
  numbers: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "73%",
    alignItems: "center",
    marginHorizontal: 5,
  },
  numberContainer: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 18,
    marginBottom: 5,
  },

  text: {
    color: "white",
    fontSize: 16,
    alignSelf: "center",
  },
});
export default ProfileHeader;
