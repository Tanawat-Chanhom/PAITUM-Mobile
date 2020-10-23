import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class restaurantCoupon extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text> Restaurant Coupon </Text>
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
