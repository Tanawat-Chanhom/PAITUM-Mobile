import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const settingProfile = (props) => {
  return (
    <View style={styles.screen}>
      <Text> Setting Profile </Text>
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

export default settingProfile;
