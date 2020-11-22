import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logout as Logout } from "../store/action/authenAction";
import { AntDesign } from "@expo/vector-icons";
import BackPage from "../components/BackPage";

const settingAccount = (props) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(Logout());
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles.Container}>
      <View style={styles.backContainer}>
        <BackPage navigation={props} path={"Setting"}></BackPage>
      </View>
      <View style={styles.screen}>
        <TouchableOpacity
          style={styles.settingContainer}
          onPress={() => props.navigation.navigate("ResetPassword")}
        >
          <Text>Reset Password</Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingContainer}
          onPress={() => {
            logout();
          }}
        >
          <Text style={{ color: "#c98f22" }}>Delete Account</Text>
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
    marginVertical: 5,
    backgroundColor: "#ebe9e6",
    borderRadius: 10,
    padding: 5,
  },
});

// settingAccount.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default settingAccount;
