import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Register() {
  return (
    <View style={styles.screen}>
      <Text> Register </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
