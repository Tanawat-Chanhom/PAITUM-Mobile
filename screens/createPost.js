import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BackPage from "../components/BackPage";

const createPost = (props) => {
  return (
    <View style={styles.screen}>
      <BackPage navigation={props} path={"Home"} />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Text> Create Post </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scrollView: {
    height: "100%",
  },
});

createPost.navigationOptions = (navigationData) => {
  return {
    tabBarVisible: false,
  };
};

export default createPost;
