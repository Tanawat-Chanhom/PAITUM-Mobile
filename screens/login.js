import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const login = (props) => {
  return (
    <View style={styles.screen}>
      <Text> Login </Text>
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

export default login;
