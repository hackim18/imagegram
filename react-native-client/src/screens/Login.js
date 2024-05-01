import React, { useContext, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

import styles from "../style/login.styles";
import Container from "../components/container";
import Content from "../components/content";
import { AuthContext } from "../context/authContext";
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [username, setUsername] = useState("user1");
  // const [password, setPassword] = useState("123");

  const { setIsSignedIn } = useContext(AuthContext);
  setIsSignedIn(false);

  const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        access_token
        email
        _id
      }
    }
  `;

  const [login, { loading, error, data }] = useMutation(LOGIN_MUTATION);

  return (
    <Container insets={{ top: true, bottom: true }}>
      <Content>
        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}></View>
            <Image style={styles.logo} source={require("../../assets/images/imagegram.png")} />
          </View>

          <View style={styles.keyboardView}>
            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="Username"
              onChangeText={(item) => setUsername(item)}
              placeholderTextColor="grey"
              selectionColor="grey"
              style={styles.textInput}
              activeOutlineColor="grey"
              activeUnderlineColor="#3a3a3a"
            />

            <TextInput
              theme={{ colors: { text: "white" } }}
              placeholder="Password"
              placeholderTextColor="grey"
              onChangeText={(itemP) => setPassword(itemP)}
              style={styles.textInput}
              selectionColor="grey"
              secureTextEntry={passwordVisible}
              activeUnderlineColor="#3a3a3a"
              activeOutlineColor="#3a3a3a"
              right={
                <TextInput.Icon
                  color={"grey"}
                  name={passwordVisible ? "eye-off" : "eye"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
            <TouchableOpacity
              onPress={async () => {
                try {
                  const response = await login({
                    variables: {
                      username: username,
                      password: password,
                    },
                  });
                  await SecureStore.setItem("access_token", response.data.login.access_token);
                  const secureStore = await SecureStore.getItemAsync("access_token");
                  console.log(secureStore);
                  setIsSignedIn(true);
                  await SecureStore.setItem("_id", response.data.login._id);
                  // navigation.navigate("Home", { _id: response.data.login._id });
                  console.log(response, ">> response");
                } catch (error) {
                  console.log(error);
                  Alert.alert(error.message);
                }
              }}
              style={styles.login}
            >
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center" }}>
              <View style={styles.seperatorStyle}>
                <View style={styles.seperator} />
                <Text style={{ color: "grey" }}> OR </Text>
                <View style={styles.seperator} />
              </View>

              <View style={styles.text}>
                <Text style={{ fontSize: 12, color: "grey" }}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                  <Text style={styles.help}> Register here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
}
