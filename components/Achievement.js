import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default class Achievement extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{this.props.data.title}</Text>
          <Text style={styles.coin}>{this.props.data.coin}</Text>
        </View>

        <Image
          resizeMode="cover"
          source={{ uri: this.props.data.icon }}
          style={styles.icon}
        ></Image>
        <Text style={styles.description}>{this.props.data.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "47%",
    maxWidth: 170,
    // height: 190,
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
    backgroundColor: "#F1F1F1",
    padding: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#403D56",
    fontSize: 20,
    fontWeight: "600",
  },
  coin: {
    color: "#F3CA1B",
    fontSize: 20,
    fontWeight: "800",
  },
  icon: {
    marginTop: 30,
    marginBottom: 30,
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  description: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "700",
    color: "#E29821",
  },
});

// {
//   title: "NewBie",
//   coid: 50,
//   icon: "",
//   description: "Follow 5 restaurant and reviewer",
// },
