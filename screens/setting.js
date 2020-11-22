import React, { Component, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  Button,
  TouchableOpacity,
} from "react-native";
import settingAccount from "./settingAccount";
import { useSelector, useDispatch } from "react-redux";
import { logout as Logout } from "../store/action/authenAction";
import { AntDesign } from "@expo/vector-icons";
import BackPage from "../components/BackPage";

const setting = (props) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(Logout());
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.Container}>
      <View style={styles.backContainer}>
        <BackPage navigation={props} path={"Profile"}></BackPage>
      </View>
      <View style={styles.screen}>
        <TouchableOpacity
          style={styles.settingContainer}
          onPress={() => props.navigation.navigate("SettingProfile")}
        >
          <Text>Profile</Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingContainer}
          onPress={() => props.navigation.navigate("SettingAccount")}
        >
          <Text>Account</Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingContainer}
          onPress={() => {
            logout();
          }}
        >
          <Text style={{ color: "#c98f22" }}>Logout</Text>
          <AntDesign name="arrowright" size={24} color="#c98f22" />
        </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
  },
  backContainer: {
    padding: 10,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: "8%",
    marginVertical: 15,
    backgroundColor: "#ebe9e6",
    borderRadius: 10,
    padding: 5,
  },
});

// setting.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default setting;
