import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Backpage from "../components/BackPage";
import Constants from "expo-constants";
import Button from "../components/Button";
import Post from "../components/Post";
import { SERVER } from "../util/server.json";
import axios from "axios";
import Alert from "../components/MyAlert";
import { useSelector } from "react-redux";

const restaurant = (props) => {
  const token = useSelector((state) => {
    return state.authenReducer.token;
  });
  const [data, setData] = useState({
    follower: [],
    review: [],
  });
  const [Star, setStar] = useState([]);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  genStar = () => {
    let newArray = [];
    for (let index = 0; index < data.star; index++) {
      newArray.push(
        <Image
          source={require("../assets/star.png")}
          style={styles.starIcon}
        ></Image>
      );
    }
    setStar(newArray);
  };

  let id = props.navigation.getParam("id");

  useEffect(() => {
    axios
      .get(SERVER + "/restaurant/all")
      .then((res) => {
        if (res.data.restaurants.length !== 0) {
          let restaurants = res.data.restaurants;
          let index = restaurants.findIndex((x) => x.id === id);
          setData(restaurants[index]);
          genStar();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <>
      <Backpage
        navigation={props}
        path={"Home"}
        isFlow={true}
        magin={10}
      ></Backpage>
      <Alert
        open={alert}
        value={errorMessage}
        close={() => {
          setAlert(false);
        }}
        margin={10}
      ></Alert>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Image
            source={{ uri: data.coverImg }}
            style={styles.imageCover}
          ></Image>
          <View style={styles.screen}>
            <View style={styles.imageCoverContainer} />
            <View style={[styles.coverImage, styles.profileContainer]}>
              <Image
                source={{ uri: data.avatar }}
                style={styles.avatar}
              ></Image>
              <Text style={styles.restaurantTitle}>{data.restaurantName}</Text>
              <View style={styles.starContainer}>
                {Star.map((data) => {
                  return data;
                })}
              </View>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity>
                <Image
                  source={require("../assets/followButton.png")}
                  style={styles.actionButton}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigator.geolocation.getCurrentPosition((position) => {
                    let lat1 = position.coords.latitude;
                    let long1 = position.coords.longitude;
                    let d = getDistanceFromLatLonInKm(
                      lat1,
                      long1,
                      data.latitude,
                      data.longitude
                    );
                    if (d < 1) {
                      props.navigation.navigate("CreatePost", {
                        data: data,
                      });
                    } else {
                      setAlert(true);
                      setErrorMessage("Too far away restaurant.");
                    }
                  });
                }}
              >
                <Image
                  source={require("../assets/createPost.png")}
                  style={styles.actionButton}
                ></Image>
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <View style={styles.flexRow}>
                <View>
                  <Text style={styles.statusText}>Coin</Text>
                  <Text style={styles.statusText}>{data.coin}</Text>
                </View>
                <View>
                  <Text style={styles.statusText}>Follower</Text>
                  <Text style={styles.statusText}>{data.follower.length}</Text>
                </View>
              </View>
              <View style={styles.flexRow}>
                <Button
                  title={"Promotion"}
                  fontSize={20}
                  style={styles.navigateButton}
                  onPress={() => {
                    console.log(data.promotion);
                    if(data.promotion) return props.navigation.navigate("Promation", {promotion:data.promotion})
                  }}
                ></Button>
                <Button
                  title={"Coupon"}
                  fontSize={20}
                  style={styles.navigateButton}
                  onPress={() => props.navigation.navigate("RestaurantCoupon")}
                ></Button>
              </View>
              <View>
                <Text style={styles.aboutText}>About</Text>
                <Text style={styles.descriptionText}>{data.about}</Text>
              </View>
              <View style={styles.postsContainer}>
                {data.review.map((data) => {
                  return (
                    <Post
                      data={data}
                      userId={token}
                      navigation={props.navigation}
                      profileNavigate={true}
                    ></Post>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    // backgroundColor: "#fff",
  },
  safeAreaView: {
    marginTop: -Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  scrollView: {
    height: "100%",
    backgroundColor: "#fff",
  },
  scrollView: {
    height: "100%",
  },
  imageCoverContainer: {
    width: "100%",
    height: 50,
  },
  imageCover: {
    position: "absolute",
    width: "100%",
    height: 250,
  },
  profileContainer: {
    height: 200,
    display: "flex",
    alignItems: "center",
  },
  restaurantTitle: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  starContainer: {
    display: "flex",
    flexDirection: "row",
  },
  starIcon: {
    width: 20,
    height: 20,
    marginLeft: 2,
    marginRight: 2,
  },
  actionContainer: {
    height: 23,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  actionButton: {
    transform: [{ translateY: -23 }],
    marginLeft: 10,
    marginRight: 10,
    width: 45,
    height: 45,
  },
  content: {},
  flexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "space-around",
  },
  statusText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: "#E29821",
  },
  navigateButton: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  aboutText: {
    fontSize: 25,
    color: "#E29821",
    fontWeight: "700",
  },
  descriptionText: {
    fontSize: 15,
    color: "#403D56",
    fontWeight: "700",
  },
  postsContainer: {
    marginTop: 20,
  },
});

export default restaurant;
