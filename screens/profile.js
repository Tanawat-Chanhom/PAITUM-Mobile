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
    console.log(otherUserId);
    if (otherUserId !== undefined) {
      axios.get(SERVER + "/user/profile/" + otherUserId).then((res) => {
        console.log(res);
        setUserData(res.data.user);
      });
    }
  }, [props.navigation.getParam("id")]);
  const [userData, setUserData] = useState(token);
  //   "caption": "Web-Designner",
  //   "coin": 0,
  //   "coupon": Array [],
  //   "coverImage": "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
  //   "follower": Array [],
  //   "following": Array [],
  //   "followingRestaurant": Array [],
  //   "id": "4Ul28D3In8RUstW5wPr8",
  //   "password": "1",
  //   "posts": Array [],
  //   "username": "1",
  // }
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
                    NOBIACCESS
                  </Text>
                  <Text
                    style={{
                      width: "80%",
                      color: "#A9C3BC",
                      fontSize: 13,
                      textAlign: "center",
                    }}
                  >
                    Web-Designner
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
              {userData.posts.map((data, index) => {
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
