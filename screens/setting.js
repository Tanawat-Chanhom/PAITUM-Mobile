import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import settingAccount from "./settingAccount";
import { useSelector, useDispatch } from "react-redux";
import { logout as Logout } from "../store/action/authenAction";

const setting = (props) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(Logout());
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.screen}>
      <Text> Setting </Text>
      <Button
        onPress={() => props.navigation.navigate("SettingProfile")}
        title={"Setting Profile"}
      ></Button>
      <Button
        onPress={() => props.navigation.navigate("SettingAccount")}
        title={"Setting Account"}
      ></Button>
      <Button
        onPress={() => {
          logout();
        }}
        title={"login out"}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// setting.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default setting;
