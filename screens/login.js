import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const login = (props) => {
  return (
    <View style={styles.screen}>
      <Text> Login </Text>
      <Button
        onPress={() => props.navigation.navigate("MainApp")}
        title={"Login"}
      ></Button>
      <Button
        onPress={() => props.navigation.navigate("Register")}
        title={"Register"}
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

export default login;
