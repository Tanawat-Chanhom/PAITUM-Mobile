import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class promotion extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text> Promotion </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
