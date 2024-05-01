import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import HomeScreen from "../screens/Home";
import { AuthContext } from "../context/authContext";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./MyTabs";
import SinglePost from "../screens/SinglePost";
import Account from "../screens/Account";

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Home" component={MyTabs} />
          <Stack.Screen name="SinglePost" component={SinglePost} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
