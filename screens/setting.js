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
import { logout } from "../store/action/userAction";
import { AntDesign } from "@expo/vector-icons";
import Backpage from "../components/BackPage";

const setting = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.Container}>
      <Backpage
        navigation={props}
        path={"Home"}
        isFlow={true}
        magin={10}
      ></Backpage>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => props.navigation.navigate("SettingProfile")}
          >
            <Text style={styles.settingText}>Profile</Text>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => props.navigation.navigate("SettingAccount")}
          >
            <Text style={styles.settingText}>Account</Text>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => {
              handleLogout();
              props.navigation.navigate("Login");
            }}
          >
            <Text style={[styles.settingText, { color: "#c98f22" }]}>
              Logout
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

export default setting;
