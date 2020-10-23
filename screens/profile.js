import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const profile = (props) => {
  return (
    <View style={styles.screen}>
      <Text> My Profile </Text>
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

export default profile;
