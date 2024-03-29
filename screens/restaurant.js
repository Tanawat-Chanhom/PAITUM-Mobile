import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Backpage from "../components/BackPage";
import Constants from "expo-constants";
import Button from "../components/Button";
import Post from "../components/Post";
import Alert from "../components/MyAlert";
import { useSelector } from "react-redux";
import { Image as Loader } from "react-native-elements";
import {
  getRestaurants,
  putRestaurantFollow,
  getRestaurantWithId,
  putRestaurantUnfollow,
} from "../services/restaurant.service";

const restaurant = (props) => {
  let restaurantId = props.navigation.getParam("id");

  const { userReducer } = useSelector((state) => state);
  const userId = userReducer.userId;
  const [data, setData] = useState({
    followers: [],
    userReviews: [],
    coin: 0,
  });
  const [Star, setStar] = useState([]);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [followInProgress, setFollowInProgress] = useState(false);

  useEffect(() => {
    getRestaurantWithId(restaurantId)
      .then((res) => {
        setData(res.data.restautants);
        res.data.restautants.followers.map((userObj) => {
          userObj.id === userId ? setIsFollow(true) : setIsFollow(false);
        });
        genStar(res.data.restautants.star);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [restaurantId]);

  const genStar = (star) => {
    let newArray = [];
    const length = star === 0 ? 1 : star;
    for (let index = 0; index < length; index++) {
      newArray.push(
        <Image
          key={index}
          source={require("../assets/star.png")}
          style={styles.starIcon}
        ></Image>
      );
    }
    setStar(newArray);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getRestaurantWithId(restaurantId)
      .then((res) => {
        setData(res.data.restautants);
        res.data.restautants.followers.map((id) => {
          id === userId ? setIsFollow(true) : setIsFollow(false);
        });
        genStar(res.data.restautants.star);
        setRefreshing(false);
      })
      .catch((err) => {
        console.error(err);
        setRefreshing(false);
      });
  };

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

  const follow = () => {
    let body = {
      userId: userId,
      restaurantId: data.id,
    };
    setFollowInProgress(true);
    putRestaurantFollow(body)
      .then((res) => {
        setAlert(true);
        setErrorMessage("Following " + data.name);
        setIsFollow(true);
        setFollowInProgress(false);
      })
      .catch((err) => {
        setAlert(true);
        setFollowInProgress(false);
        setErrorMessage(err.message || "Server error.");
      });
  };

  const unfollow = () => {
    let body = {
      userId: userId,
      restaurantId: data.id,
    };
    setFollowInProgress(true);
    putRestaurantUnfollow(body)
      .then((res) => {
        setAlert(true);
        setErrorMessage("Unfollowing " + data.name);
        setIsFollow(false);
        setFollowInProgress(false);
      })
      .catch((err) => {
        setAlert(true);
        setFollowInProgress(false);
        setErrorMessage(err.message || "Server error.");
      });
  };

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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Image
            source={{ uri: "https://i.ibb.co/8YpfjMz/BG.jpg" }}
            style={styles.imageCover}
          ></Image>
          <Image
            source={{ uri: data.cover_image }}
            style={styles.imageCover}
          ></Image>
          <View style={styles.screen}>
            <View style={styles.imageCoverContainer} />
            <View style={[styles.coverImage, styles.profileContainer]}>
              <Loader
                source={{ uri: data.avatar }}
                style={styles.avatar}
                PlaceholderContent={<ActivityIndicator color="#FFF" />}
              ></Loader>
              <Text style={styles.restaurantTitle}>{data.restaurantName}</Text>
              <View style={styles.starContainer}>
                {Star.map((data) => {
                  return data;
                })}
              </View>
            </View>
            <View style={styles.actionContainer}>
              {followInProgress === true ? (
                <ActivityIndicator
                  color="#E29821"
                  style={[
                    styles.actionButton,
                    { backgroundColor: "#ffffffc2", borderRadius: 100 },
                  ]}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => (isFollow === true ? unfollow() : follow())}
                >
                  <Image
                    source={require("../assets/followButton.png")}
                    style={[
                      styles.actionButton,
                      { opacity: isFollow === true ? 0.5 : 1 },
                    ]}
                  />
                </TouchableOpacity>
              )}
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
                  <Text style={styles.statusText}>{data.followers.length}</Text>
                </View>
              </View>
              <View style={styles.flexRow}>
                <Button
                  title={"Promotion"}
                  fontSize={20}
                  style={styles.navigateButton}
                  onPress={() => {
                    return props.navigation.navigate("Promation", {
                      restaurantId: restaurantId,
                    });
                  }}
                ></Button>
                <Button
                  title={"Coupon"}
                  fontSize={20}
                  style={styles.navigateButton}
                  onPress={() => {
                    return props.navigation.navigate("RestaurantCoupon", {
                      restaurantId: restaurantId,
                    });
                  }}
                ></Button>
              </View>
              <View>
                <Text style={styles.aboutText}>About</Text>
                <Text style={styles.descriptionText}>{data.about}</Text>
              </View>
              <View style={styles.postsContainer}>
                {data.userReviews.map((data, index) => {
                  return (
                    <Post
                      key={index}
                      data={data}
                      userId={userId}
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
