import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default class Promotion extends Component {
  constructor() {
    super();
    this.state = {
      numberOfLines: 3,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image
            source={{ uri: this.props.data.image }}
            style={styles.icon}
          ></Image>
          <TouchableOpacity
            onPress={() => {
              if (this.state.numberOfLines === 3) {
                this.setState({
                  numberOfLines: 10,
                });
              } else if (this.state.numberOfLines !== 3) {
                this.setState({
                  numberOfLines: 3,
                });
              }
            }}
            style={{ flex: 1 }}
          >
            <Text style={{ marginLeft: 10, fontSize: 25 }}>
              {this.props.data.name}
            </Text>
            <Text
              style={styles.description}
              numberOfLines={this.state.numberOfLines}
            >
              {this.props.data.description}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={{ color: "#9C9797", fontSize: 13 }}>Expires</Text>
            <Text style={{ color: "#403D56", fontWeight: "600" }}>
              {this.props.data.exp.split("T")[0]}
            </Text>
          </View>
          <View
            style={[styles.titleContainer, { alignItems: "center" }]}
          ></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 100,
  },
  description: {
    flex: 1,
    marginLeft: 10,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
