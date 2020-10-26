import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const settingAccount = (props) => {
  return (
    <View style={styles.screen}>
      <Text> Setting Account </Text>
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

// settingAccount.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default settingAccount;
