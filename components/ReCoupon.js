import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Button from "../components/Button";
import Alert from "../components/MyAlert";
import { redeemRestaurantCoupon } from "../services/restaurant.service";

export default class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponData: props.data,
      numberOfLines: 3,
      isShow: false,
      alert: false,
      errorMessage: "",
      isLoading: false,
    };
  }

  hendleRedeemCoupon = (userCoin) => {
    let body = {
      userId: this.props.userId,
      couponId: this.state.couponData.id,
    };
    if (userCoin < this.state.couponData.coin) {
      this.setState({
        alert: true,
        errorMessage: "Out Of Coin!",
      });
    } else {
      this.setState({ isLoading: true });
      redeemRestaurantCoupon(body)
        .then((result) => {
          if (result.data.status === 200) {
            this.props.onPress(this.props.data.coin);
            this.setState({
              alert: true,
              errorMessage: result.data.message,
              isLoading: false,
            });
          } else {
            this.setState({
              alert: true,
              errorMessage: result.data.message,
              isLoading: false,
            });
          }
        })
        .catch(() => {
          this.setState({
            alert: true,
            errorMessage: "Error from server",
            isLoading: false,
          });
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Alert
          open={this.state.alert}
          value={this.state.errorMessage}
          timeOut={1500}
          close={() => {
            this.setState.alert(false);
          }}
        ></Alert>
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
            style={{ flex: 2 }}
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
          <View style={[styles.titleContainer, { alignItems: "center" }]}>
            <Button
              iconSize={{ width: 25.54, height: 20.13 }}
              style={styles.coinIcon}
              color="#f5ce42"
              fontSize={20}
              title={this.props.data.coin}
            ></Button>
            {this.state.isLoading ? (
              <ActivityIndicator color="#E29821" style={styles.coinIcon} />
            ) : (
              <Button
                title={"USE"}
                style={styles.coinIcon}
                color="#E29821"
                fontSize={20}
                onPress={() => {
                  this.hendleRedeemCoupon(this.props.userCoin);
                }}
              ></Button>
            )}
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
    overflow: "hidden",
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
});
