import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { logout as Logout } from "../store/action/authenAction";
import { AntDesign } from "@expo/vector-icons";
import BackPage from "../components/BackPage";

const settingAccount = (props) => {
  return (
    <View style={styles.Container}>
      <BackPage
        navigation={props}
        path={"Setting"}
        isFlow={true}
        magin={10}
      ></BackPage>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => props.navigation.navigate("ResetPassword")}
          >
            <Text style={styles.settingText}>Reset Password</Text>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          >
            <Text style={[styles.settingText, { color: "#c98f22" }]}>
              Delete Account
            </Text>
            <AntDesign name="arrowright" size={24} color="#c98f22" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  safeAreaView: {
    backgroundColor: "#fff",
    marginTop: 100,
  },
  scrollView: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: "#ebe9e6",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  settingText: {
    fontWeight: "bold",
  },
});

// settingAccount.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default settingAccount;
