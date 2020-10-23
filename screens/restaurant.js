import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class restaurant extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text> Restaurant </Text>
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
