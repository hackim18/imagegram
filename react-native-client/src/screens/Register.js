import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { gql, useMutation } from "@apollo/client";
import { Alert } from "react-native";

import styles from "../style/login.styles";
import Container from "../components/container";
import Content from "../components/content";

const Register = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [name, setName] = useState("xuser1");
  // const [email, setEmail] = useState("xuser1@mail.com");
  // const [username, setUsername] = useState("user1");
  // const [password, setPassword] = useState("123");

  const REGISTER_MUTATION = gql`
    mutation Register($newUser: NewUser!) {
      register(newUser: $newUser) {
        _id
        name
        username
        email
        password
      }
    }
  `;

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    try {
      const response = await register({
        variables: {
          newUser: {
            name: name,
            email: email,
            username: username,
            password: password,
          },
        },
      });
      console.log("Registration successful for:", response.data.register.username);
      Alert.alert("Registration successful!");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Registration error:", error.message);
      Alert.alert("Registration failed!", error.message);
    }
  };

  return (
    <Container insets={{ top: true, bottom: true }}>
      <Content>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            height: "20%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}></View>
          <Image style={styles.logo} source={require("../../assets/images/imagegram.png")} />
        </View>

        <View style={styles.keyboardView}>
          <TextInput
            theme={{ colors: { text: "white" } }}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            placeholderTextColor="grey"
            selectionColor="grey"
            style={styles.textInput}
            activeOutlineColor="grey"
            activeUnderlineColor="#3a3a3a"
          />
          <TextInput
            theme={{ colors: { text: "white" } }}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="grey"
            selectionColor="grey"
            style={styles.textInput}
            activeOutlineColor="grey"
            activeUnderlineColor="#3a3a3a"
          />
          <TextInput
            theme={{ colors: { text: "white" } }}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
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
            onChangeText={(text) => setPassword(text)}
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
          <TouchableOpacity style={styles.login} onPress={handleRegister}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>

          <View style={{ alignItems: "center" }}>
            <View style={styles.seperatorStyle}>
              <View style={styles.seperator} />
              <Text style={{ color: "grey" }}> OR </Text>
              <View style={styles.seperator} />
            </View>

            <View style={styles.text}>
              <Text style={{ fontSize: 12, color: "grey" }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.help}> Log in here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default Register;
