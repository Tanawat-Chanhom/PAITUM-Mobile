import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BackPage from "../components/BackPage";
import Button from "../components/Button";

const resetPassword = (props) => {
  return (
    <View style={styles.Container}>
      <View style={styles.backContainer}>
        <BackPage navigation={props} path={"SettingAccount"}></BackPage>
      </View>
      <View style={styles.screen}>
        <View style={styles.settingContainer}>
          <Text style={{ color: "#c98f22" }}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={styles.settingContainer}>
          <Text style={{ color: "#c98f22" }}>Confirm Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View style={styles.login_button_container}>
          <Button
            color="#FFFFFF"
            title={"SAVE"}
            style={styles.loginButton}
            fontSize={14}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  screen: {
    flex: 2,
    alignItems: "center",
  },
  backContainer: {
    padding: 10,
  },
  settingContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
    height: "8%",
    marginVertical: 10,
    padding: 5,
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
  login_button_container: {
    backgroundColor: "#E29821",
    borderRadius: 50,
    width: "50%",
    marginVertical: 10,
    padding: 5,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  loginButton: {
    padding: 10,
  },
});

// settingProfile.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default resetPassword;
