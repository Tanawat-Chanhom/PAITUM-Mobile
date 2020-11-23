import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Button from "./Button";
import axios from "axios";
import { SERVER } from "../util/server.json";

class Card extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("Restaurant", {
            id: this.props.data.id,
          });
        }}
      >
        <View style={stylesCard.container}>
          <Image
            source={{ uri: this.props.data.avatar }}
            style={stylesCard.image}
          />
          <View style={stylesCard.footer}>
            <Text style={stylesCard.text} numberOfLines={2}>
              {this.props.data.restaurantName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const stylesCard = StyleSheet.create({
  container: {
    width: 107,
    height: 144,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#111111",
  },
  text: {
    margin: 5,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default class TOP10 extends Component {
  constructor() {
    super();
    this.state = {
      top10: [],
    };
  }

  componentDidMount() {
    axios
      .get(SERVER + "/restaurant/all")
      .then((res) => {
        if (res.data.restaurants.length !== 0) {
          this.setState({
            top10: res.data.restaurants,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>TOP’10</Text>
          <Button
            title={"See All"}
            color="#6E6E6E"
            fontSize={14}
            onPress={() => {
              console.log("test");
            }}
            style={{ display: "none" }}
          ></Button>
        </View>
        <View style={styles.content}>
          <SafeAreaView style={styles.safeAreaView}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.scrollView}
            >
              {this.state.top10.map((data, index) => {
                return (
                  <Card
                    data={data}
                    key={index}
                    navigation={this.props.navigation}
                  ></Card>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
  safeAreaView: {
    display: "flex",
    flexDirection: "row",
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 13,
    backgroundColor: "#F1F1F1",
    padding: 5,
  },
});
