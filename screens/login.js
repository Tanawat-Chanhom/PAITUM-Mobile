import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../components/MyAlert";
import Button from "../components/Button";
import { login as loginService } from "../services/auth.service";
import { setToken } from "../store/action/userAction";

const login = (props) => {
  const [username, setUsername] = useState("1");
  const [password, setPassword] = useState("1");
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Login loading
  const { userReduducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userReduducer.token !== null) {
      props.navigation.navigate("Home");
    }
  }, [userReduducer]);

  const Login = () => {
    setIsLoading(true);
    let body = {
      username: username,
      password: password,
    };

    if (username === "" || password === "") {
      setAlert(true);
      setErrorMessage("Please input your username and password.");
      setIsLoading(false);
    }

    loginService(body)
      .then((result) => {
        if (result.data.status === 200) {
          dispatch(setToken(result.data.user.id));
          props.navigation.navigate("Home");
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setAlert(true);
          setErrorMessage(result.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setAlert(true);
        setErrorMessage(error.message || "Server error.");
        setIsLoading(false);
      });
  };

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
        </View>
        <View style={styles.loginButtonContainer}>
          {isLoading ? (
            <View style={{ margin: 10 }}>
              <ActivityIndicator color="#fff" />
            </View>
          ) : (
            <Button
              color="#FFFFFF"
              onPress={() => Login()}
              title={"LOGIN"}
              style={styles.loginButton}
              fontSize={14}
            ></Button>
          )}
        </View>
      </View>
      <Text
        style={styles.signupText}
        onPress={() => props.navigation.navigate("Register")}
      >
        Sing Up
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
  loginButtonContainer: {
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
  signupText: {
    bottom: 0,
    position: "absolute",
    margin: 15,
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
