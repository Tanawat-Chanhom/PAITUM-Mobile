import React, { useState } from "react";
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

const profile = (props) => {
  const token = useSelector((state) => {
    return state.authenReducer.token;
  });
  const [userData, setUserData] = useState({
    userId: "1233",
    name: "NOBIACCESS",
    followers: 1000,
    following: 500,
    caption: "Web-Designner",
    avatar:
      "https://images.unsplash.com/photo-1500239524810-5a6e76344a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    coverImage:
      "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
    posts: [
      {
        postId: "1",
        user: {
          name: "Tanwat Chanhom1",
          createAt: "3 mins ago",
          uid: 2,
          avatar:
            "https://images.unsplash.com/photo-1500239524810-5a6e76344a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        },
        detail: {
          image: [
            "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
            "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
            "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
          ],
          discription:
            "Ratiorg got statues of different sizes as a present from CodeMaster for his birthday, each statue having an non-negative integer size. Since he likes to make things",
          view: 1000,
          like: 10000,
          comments: 3000,
        },
      },
      {
        postId: "1",
        user: {
          name: "Tanwat Chanhom1",
          createAt: "3 mins ago",
          uid: 2,
          avatar:
            "https://images.unsplash.com/photo-1500239524810-5a6e76344a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        },
        detail: {
          image: [
            "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
            "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
            "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
          ],
          discription:
            "Ratiorg got statues of different sizes as a present from CodeMaster for his birthday, each statue having an non-negative integer size. Since he likes to make things",
          view: 1000,
          like: 10000,
          comments: 3000,
        },
      },
    ],
  });

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

          {userData.userId === token ? (
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
              <View style={styles.imageCoverContainer}></View>
              <View style={styles.profileDetail}>
                <View style={styles.profileHeader}>
                  <View style={styles.followContainer}>
                    <Text style={{ color: "#E29821" }}>100K</Text>
                    <Text style={{ color: "#E29821" }}>Followers</Text>
                  </View>
                  <View style={styles.avatarContainer}>
                    <Image
                      style={styles.avatar}
                      source={{ uri: userData.avatar }}
                    ></Image>
                  </View>
                  <View style={styles.followContainer}>
                    <Text style={{ color: "#E29821" }}>100K</Text>
                    <Text style={{ color: "#E29821" }}>Followers</Text>
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
                  {userData.userId !== token ? (
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
