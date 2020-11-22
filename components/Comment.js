import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default class Comment extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.data.avatar }}
          style={styles.avatar}
        ></Image>
        <Text style={styles.message}>{this.props.data.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
  },
  avatar: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: 10,
    alignSelf: "flex-start",
  },
  message: {
    fontSize: 14,
    flex: 1,
  },
});
