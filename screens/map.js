import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Header from "../components/Header";

export default class map extends Component {
  render() {
    return (
      <>
        <Header></Header>
        <View style={styles.screen}>
          <Text> Map </Text>
        </View>
      </>
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
