import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const createPost = (props) => {
  return (
    <View style={styles.screen}>
      <Text> Create Post </Text>
      <Button
        onPress={() => props.navigation.navigate("Home")}
        title="Go to Home"
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
