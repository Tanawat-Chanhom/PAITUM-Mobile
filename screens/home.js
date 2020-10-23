import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Header from "../components/Header";

export default class home extends Component {
  static navigationOptions = {
    title: "Great",
  };

  render() {
    return (
      <>
        <Header></Header>
        <View style={styles.screen}>
          <Text> Home </Text>
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
