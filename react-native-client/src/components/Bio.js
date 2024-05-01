import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../style/AccountComponents.style";

export default function Bio({ route }) {
  // console.log(route, "<<bio");
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.bioContainer}>
        <Text style={styles.userName}> {route ? route.findUserById.username : "User1"}</Text>
        <Text style={styles.bio}>{route.bio ? route.bio : "Bio example....."}</Text>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate("EditProfile")}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.editText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.icon}>
          <Image source={require("../../src/images/invite.png")} style={{ width: 16, height: 16 }} />
        </View>
      </View>
    </SafeAreaView>
  );
}
