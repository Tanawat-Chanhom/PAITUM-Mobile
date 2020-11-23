import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Button from "../components/Button";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER } from "../util/server.json";

const profile = (props) => {
  const token = useSelector((state) => {
    return state.authenReducer.token;
  });
  useEffect(() => {
    let otherUserId = props.navigation.getParam("id");
    if (otherUserId !== undefined) {
      axios.get(SERVER + "/user/profile/" + otherUserId).then((res) => {
        setUserData(res.data.user);
      });
      axios
        .get(SERVER + "/restaurant/all")
        .then((res) => {
          if (res.data.restaurants.length !== 0) {
            let restaurants = res.data.restaurants;
            let myPosts = [];
            restaurants.map((data) => {
              data.review.map((reviewData, index) => {
                if (reviewData.user.id === otherUserId) {
                  myPosts.push(reviewData);
                }
              });
            });
            setPosts(myPosts);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props]);
  const [userData, setUserData] = useState({
    coverImage:
      "https://img3.goodfon.com/wallpaper/nbig/8/f9/android-l-material-design-3707.jpg",
    follower: 0,
    following: 0,
    avatar:
      "https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png",
    posts: [],
  });
  const [posts, setPosts] = useState([]);
  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <Image
            source={{ uri: userData.coverImage }}
            style={styles.imageCover}
          ></Image>

          {userData.id === token.id ? (
            <View style={styles.settingContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Setting");
                }}
              >
                <Image
                  style={styles.settingIcon}
                  source={require("../assets/setting.png")}
                ></Image>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.screen}>
            <View style={styles.header}>
              <View style={styles.imageCoverContainer} />
              <View style={styles.profileDetail}>
                <View style={styles.profileHeader}>
                  <View style={styles.followContainer}>
                    <Text style={{ color: "#E29821" }}>
                      {userData.follower.length >= 1000
                        ? (userData.follower.length / 1000).toFixed(1) + "K"
                        : userData.follower.length}
                    </Text>
                    <Text style={{ color: "#E29821" }}>Followers</Text>
                  </View>
                  <View style={styles.avatarContainer}>
                    <Image
                      style={styles.avatar}
                      source={{ uri: userData.avatar }}
                    ></Image>
                  </View>
                  <View style={styles.followContainer}>
                    <Text style={{ color: "#E29821" }}>
                      {userData.following.length >= 1000
                        ? (userData.following.length / 1000).toFixed(1) + "K"
                        : userData.following.length}
                    </Text>
                    <Text style={{ color: "#E29821" }}>Following</Text>
                  </View>
                </View>
                <View style={styles.profileFooter}>
                  <Text
                    style={{
                      color: "#403D56",
                      fontWeight: "800",
                      fontSize: 20,
                      marginBottom: 5,
                    }}
                  >
                    {userData.name}
                  </Text>
                  <Text
                    style={{
                      width: "80%",
                      color: "#A9C3BC",
                      fontSize: 13,
                      textAlign: "center",
                    }}
                  >
                    {userData.caption}
                  </Text>
                  {userData.id !== token.id ? (
                    <Button
                      title="FOLLOW"
                      style={styles.followButton}
                      color="#fff"
                    ></Button>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </View>
            <View>
              {posts.map((data, index) => {
                return (
                  <Post
                    data={data}
                    userId={token}
                    navigation={props.navigation}
                    key={index}
                  ></Post>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: -Constants.statusBarHeight,
  },
  scrollView: {
    height: "100%",
    backgroundColor: "#fff",
  },
  screen: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  header: {
    // borderWidth: 1,
  },
  imageCoverContainer: {
    width: "100%",
    height: 250,
  },
  imageCover: {
    position: "absolute",
    width: "100%",
    height: 250,
  },
  profileDetail: {
    width: "100%",
    marginBottom: 30,
  },
  profileHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  followContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatarContainer: {
    width: 130,
    height: 65,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    position: "absolute",
    transform: [{ translateY: -65 }],
  },
  profileFooter: {
    display: "flex",
    alignItems: "center",
    paddingTop: 20,
  },
  followButton: {
    backgroundColor: "#E29821",
    padding: 10,
    width: 170,
    borderRadius: 100,
    marginTop: 20,
  },
  settingContainer: {
    width: 40,
    height: 40,
    margin: 25,
    marginTop: 15 + Constants.statusBarHeight,
    right: "0%",
    borderRadius: 4,
    position: "absolute",
    backgroundColor: "#F1F1F1",
    padding: 5,
    zIndex: 99,
  },
  settingIcon: {
    width: "100%",
    height: "100%",
  },
});

profile.navigationOptions = (navigationData) => {
  return {
    tabBarVisible: false,
    headerShown: false,
  };
};

export default profile;
