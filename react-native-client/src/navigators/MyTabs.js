import React, { useContext } from "react";
import { Image } from "react-native";
import { Avatar } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontPlus from "react-native-vector-icons/FontAwesome";
import FontLogout from "react-native-vector-icons/MaterialCommunityIcons";

import Search from "../screens/Search";

import AccountScreen from "../navigators/AccountScreen";
import HomeScreen from "../screens/Home";
import SinglePost from "../screens/SinglePost";
import Login from "../screens/Login";
import CreatePostScreen from "../screens/CreatePost";

const Tab = createBottomTabNavigator();

export default function MyTabs({ route }) {
  // console.log(route, "rts");
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "HomeScreen") {
            return focused ? (
              <Foundation name="home" size={32} color="white" />
            ) : (
              <Image source={require("../../assets/images/home.png")} style={{ width: 25, height: 25 }} />
            );
          }
          if (route.name === "Search") {
            return <Feather name="search" size={28} color="white" />;
          }
          if (route.name === "AddPost") {
            return <FontPlus name="plus-square-o" size={28} color="white" />;
          }
          if (route.name === "Login") {
            return <FontLogout name="logout" size={28} color="white" />;
          }
          if (route.name === "AccountScreen") {
            return <Avatar.Image size={28} source={require("../../src/images/profil.jpg")} />;
          }
        },
        tabBarStyle: { backgroundColor: "black" },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="AddPost" component={CreatePostScreen} />
      <Tab.Screen name="Login" component={Login} />
      {/* <Tab.Screen name="AccountScreen" component={AccountScreen} initialParams={{ _id: rt.params._id }} /> */}
      <Tab.Screen name="AccountScreen" component={AccountScreen} />
    </Tab.Navigator>
  );
}
