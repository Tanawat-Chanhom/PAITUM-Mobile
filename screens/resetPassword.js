import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const resetPassword = (props) => {
  return (
    <View style={styles.screen}>
      <Text> Reset Password </Text>
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

// settingProfile.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default resetPassword;
