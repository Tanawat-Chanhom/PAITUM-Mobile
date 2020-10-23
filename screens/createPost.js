import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const createPost = (props) => {
  return (
    <View style={styles.screen}>
      <Text> Create Post </Text>
      <Button
        onPress={() =>
          props.navigation.navigate("Profile", {
            names: ["Brent", "Satya", "Michaś"],
          })
        }
        title="Go to Brent's profile"
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

createPost.navigationOptions = (navigationData) => {
  return {
    tabBarVisible: false,
  };
};

export default createPost;
