import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../components/MyAlert";
import Button from "../components/Button";

import { setToken } from "../store/action/authenAction";

const login = (props) => {
  const token = useSelector((state) => {
    return state.authenReducer.token;
  });
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (token !== null) {
    props.navigation.navigate("Profile");
  }

  function Login() {
    if (username === "1" && password === "1") {
      dispatch(setToken("1234567890"));
    } else {
      setAlert(true);
      setErrorMessage("Uesrname or Password is incorrect.");
    }
  }

  return (
    <View style={styles.screen}>
      <Alert
        open={alert}
        value={errorMessage}
        close={() => {
          setAlert(false);
        }}
      ></Alert>
      <View style={styles.container}>
        <Image source={require("../assets/login_logo.png")}></Image>
        <View style={styles.textInputContainer}>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>USERNAME</Text>
            <TextInput
              style={styles.textInput}
              value={username}
              placeholder="username"
              onChangeText={(x) => setUsername(x)}
            ></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>PASSWORD</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              value={password}
              placeholder="password"
              onChangeText={(x) => setPassword(x)}
            ></TextInput>
          </View>
          <Text style={styles.forgotText}>Forgot Password ?</Text>
        </View>
        <View style={styles.login_button_container}>
          <Button
            color="#FFFFFF"
            onPress={() => Login()}
            title={"LOGIN"}
            style={styles.loginButton}
            fontSize={14}
          ></Button>
        </View>
      </View>
      <Text
        style={styles.registerText}
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    height: "90%",
    width: "100%",
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
  textInput: {
    height: 30,
    width: "100%",
    color: "#A9C3BC",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#707070",
    marginTop: 5,
  },
  textInputContainer: {
    width: "100%",
    padding: 10,
  },
  registerText: {
    bottom: 0,
    position: "absolute",
    margin: 10,
    color: "#E29821",
  },
  forgotText: {
    width: "100%",
    textAlign: "right",
    fontSize: 12,
    color: "#8CE5CD",
  },
  loginButton: {
    padding: 10,
  },
});

export default login;
