import React, { useContext } from "react";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import styles from "../style/HomeComponents.style";
import { AuthContext } from "../context/authContext";

const TopBar = () => {
  const navigation = useNavigation();
  const { setIsSignedIn } = useContext(AuthContext);

  return (
    <View style={styles.body}>
      <StatusBar backgroundColor="black" />

      <View style={styles.logoContainer}>
        <Image source={require("../../assets/images/imagegram.png")} style={styles.icon} />
      </View>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={async () => {
            await SecureStore.deleteItemAsync("access_token");
            setIsSignedIn(false);
          }}
        >
          <FontAwesome name="logout" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
