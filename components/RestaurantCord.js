import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default class RestaurantCord extends Component {
  constructor() {
    super();
    this.state = {
      stars: [],
    };
  }

  componentDidMount() {
    this.stars();
  }

  stars = () => {
    let stars = [];
    let starLength = this.props.data.star === 0 ? 1 : this.props.data.star;
    for (let index = 0; index < starLength; index++) {
      stars.push(
        <Image
          source={require("../assets/star.png")}
          style={styles.starIcon}
          key={index}
        ></Image>
      );
    }
    this.setState({
      stars: stars,
    });
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate("RestaurantStack", {
            id: this.props.data.id,
          });
        }}
      >
        <View style={styles.imageCover}>
          <Image
            source={{ uri: this.props.data.cover_image }}
            style={styles.image}
          ></Image>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.detail}>
            <Text numberOfLines={1}>
              {this.props.data.name.length > 8
                ? this.props.data.name.slice(0, 10) + "..."
                : this.props.data.name}
            </Text>
            <View style={styles.starContainer}>
              {this.state.stars.map((star) => {
                return star;
              })}
            </View>
          </View>
          <Image
            source={{ uri: this.props.data.avatar }}
            style={styles.avatar}
          ></Image>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "47%",
    maxWidth: 170,
    height: 190,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  imageCover: {
    width: "100%",
    height: "65%",
  },
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  detailContainer: {
    width: "100%",
    backgroundColor: "#F1F1F1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  detail: {
    textAlign: "center",
  },
  starContainer: {
    display: "flex",
    flexDirection: "row",
  },
  starIcon: {
    width: 12,
    height: 12,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
});

// {
//   coverImg:
//     "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
//   name: "AL MUSTAFA3",
//   avatar:
//     "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
//   star: 1,
//   id: 3,
// },
