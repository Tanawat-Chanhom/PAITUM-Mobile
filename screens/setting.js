import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import settingAccount from "./settingAccount";

const setting = (props) => {
  return (
    <View style={styles.screen}>
      <Text> Setting </Text>
      <Button
        onPress={() => props.navigation.navigate("SettingProfile")}
        title={"Setting Profile"}
      ></Button>
      <Button
        onPress={() => props.navigation.navigate("SettingAccount")}
        title={"Setting Account"}
      ></Button>
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

// setting.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default setting;
