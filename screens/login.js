import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Image, TextInput } from "react-native";

const login = (props) => {
  const [username, setUsername] = useState("nobiaccess");
  const [password, setPassword] = useState("12345678");

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Image source={require("../assets/login_logo.png")}></Image>
        <View style={styles.text_input_container}>
          <View style={styles.text_input_container}>
            <Text style={styles.text}>USERNAME</Text>
            <TextInput
              style={styles.text_input}
              value={username}
              onChangeText={(x) => setUsername(x)}
            ></TextInput>
          </View>
          <View style={styles.text_input_container}>
            <Text style={styles.text}>PASSWORD</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.text_input}
              value={password}
              onChangeText={(x) => setPassword(x)}
            ></TextInput>
          </View>
          <Text style={styles.forgot_text}>Forgot Password ?</Text>
        </View>
        <View style={styles.login_button_container}>
          <Button
            color="#FFFFFF"
            onPress={() => props.navigation.navigate("MainApp")}
            title={"Login"}
          ></Button>
        </View>
      </View>
      <Text
        style={styles.register_text}
        onPress={() => props.navigation.navigate("Register")}
      >
        Sing In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    height: "90%",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  login_button_container: {
    backgroundColor: "#E29821",
    borderRadius: 50,
    width: "90%",
  },
  text: {
    color: "#E29821",
    fontSize: 14,
    fontWeight: "bold",
  },
  text_input: {
    height: 30,
    width: "100%",
    color: "#A9C3BC",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderColor: "#707070",
    marginTop: 5,
  },
  text_input_container: {
    width: "100%",
    padding: 10,
  },
  register_text: {
    bottom: 0,
    position: "absolute",
    margin: 10,
    color: "#E29821",
  },
  forgot_text: {
    width: "100%",
    textAlign: "right",
    fontSize: 12,
    color: "#8CE5CD",
  },
});

export default login;
