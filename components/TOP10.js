import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Button from "./Button";
import { Image } from "react-native-elements";
import { getRestaurants } from "../services/restaurant.service";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.ratingNumber,
    };
  }

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
            PlaceholderContent={<ActivityIndicator color="#fff" />}
          />
          <View style={stylesCard.ratingContainer}>
            <Text style={stylesCard.ratingText}>{this.state.index}</Text>
          </View>
          <View style={stylesCard.footer}>
            <Text style={stylesCard.text} numberOfLines={2}>
              {this.props.data.restaurantName.slice(0, 7) + "..."}
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
  ratingContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: "#E29821",
    fontWeight: "bold",
    fontSize: 100,
    opacity: 0.4,
  },
});

export default class TOP10 extends Component {
  constructor() {
    super();
    this.state = {
      top10: [
        { restaurantName: "Loading" },
        { restaurantName: "Loading" },
        { restaurantName: "Loading" },
      ],
    };
  }

  componentDidMount() {
    getRestaurants()
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
                    ratingNumber={index + 1}
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
