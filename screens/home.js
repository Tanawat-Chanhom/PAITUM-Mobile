import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Header from "../components/Header";

const home = (props) => {
  return (
    <>
      <Header></Header>
      <View style={styles.screen}>
        <Text> Home </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default home;
