import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import client from "./src/config/apolloClient";

import MainStack from "./src/navigators/mainStack";
import MyTabs from "./src/navigators/MyTabs";
import { ApolloProvider } from "@apollo/client";
import { AuthContext } from "./src/context/authContext";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const secureStore = await SecureStore.getItemAsync("access_token");
      if (secureStore) {
        setIsSignedIn(true);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn: isSignedIn,
        setIsSignedIn: setIsSignedIn,
      }}
    >
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <StatusBar backgroundColor="black" />
          <NavigationContainer>
            <MainStack />
            {/* <MyTabs /> */}
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
