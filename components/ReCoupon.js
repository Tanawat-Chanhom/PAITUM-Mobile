import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Button from "../components/Button";
const CoinIcon = require("../assets/coin.png");

export default class Coupon extends Component {
  constructor() {
    super();
    this.state = {
      numberOfLines: 3,
      isShow: false,
      isDelete: false,
    };
  }

  coinIcon = () => (
    <Image
      source={require("../assets/coin.png")}
      style={{ width: 25.54, height: 20.13 }}
    ></Image>
  );

  render() {
    if (this.state.isDelete === true) {
      return <></>;
    }
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
            <Text
              style={styles.description}
              numberOfLines={this.state.numberOfLines}
            >
              {this.props.data.description}
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.isShow === true ? (
          <View style={styles.qrContainer}>
            <Image
              source={{ uri: this.props.data.qr }}
              style={styles.qrImage}
            ></Image>
          </View>
        ) : (
          <></>
        )}
        <View style={styles.footer}>
          <View>
            <Text style={{ color: "#9C9797", fontSize: 13 }}>Expires</Text>
            <Text style={{ color: "#403D56", fontWeight: "600" }}>
              {this.props.data.exp}
            </Text>
          </View>
          <View style={[styles.titleContainer, { alignItems: "center" }]}>
            <Button
              iconSize={{ width: 25.54, height: 20.13 }}
              style={styles.coinIcon}
              color="#f5ce42"
              fontSize={20}
              title={"399"}
            ></Button>
            <Button
              title={"USE"}
              style={styles.useButton}
              color="#E29821"
              fontSize={20}
              onPress={() => {
                this.setState({
                  isDelete: true,
                });
              }}
            ></Button>
          </View>
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
  useButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#FFF",
    borderRadius: 300,
  },
  coinIcon: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 13,
    backgroundColor: "#FFF",
    borderRadius: 300,
  },
  qrContainer: {
    width: "100%",
    aspectRatio: 1,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    overflow: "hidden",
    padding: 10,
  },
  qrImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
  },
});
