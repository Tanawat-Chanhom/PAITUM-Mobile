import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const profile = (props) => {
  return (
    <View style={styles.screen}>
      <Text> My Profile </Text>
      <Button
        onPress={() => props.navigation.navigate("Setting")}
        title="Go to Setting"
      />
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

profile.navigationOptions = (navigationData) => {
  return {
    tabBarVisible: false,
    headerShown: false,
  };
};

export default profile;
