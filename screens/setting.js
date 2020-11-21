import React, { Component, useState } from "react";
import { Text, View, StyleSheet, Button, Switch } from "react-native";
import settingAccount from "./settingAccount";
import { useSelector, useDispatch } from "react-redux";
import { logout as Logout } from "../store/action/authenAction";
import { AntDesign } from '@expo/vector-icons';

const setting = (props) => {
  const dispatch = useDispatch();
  const [isNotifications, setNotifications] = useState(true);

  const toggleSwitch = () => setNotifications(previousState => !previousState);

  const logout = () => {
    dispatch(Logout());
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.screen}>
      <View style={styles.settingContainer}>
        <Button
          onPress={() => props.navigation.navigate("SettingProfile")}
          title={"Profile"}
        ></Button>
        <AntDesign name="arrowright" size={24} color="black" />
      </View>
      <View style={styles.settingContainer}>
        <Button
          onPress={() => props.navigation.navigate("SettingAccount")}
          title={"Account"}
        ></Button>
        <AntDesign name="arrowright" size={24} color="black" />
      </View>
      <View style={styles.settingContainer}>
        <Text>Notifications</Text>
        <Switch trackColor={{ false: "#767577", true: "#16de1a" }} thumbColor={isNotifications ? "#ffffff" : "#f4f3f4"} value={isNotifications} onValueChange={toggleSwitch}/>
      </View>
      <View style={styles.settingContainer}>
        <Button
          onPress={() => {
            logout();
          }}
          title={"Logout"}
        ></Button>
        <AntDesign name="arrowright" size={24} color="#c98f22" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    padding: 5
  }
});

// setting.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default setting;
