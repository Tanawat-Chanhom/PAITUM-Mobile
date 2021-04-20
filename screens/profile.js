import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import { getUserProfile } from "../services/user.service";
import { getRestaurants } from "../services/restaurant.service";

const profile = (props) => {
  const { userReducer } = useSelector((state) => state);
  const userId = userReducer.userId;
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    follower: 0,
    following: 0,
  });

  useEffect(() => {
    async function fatchData() {
      await getUserProfile(userId).then((result) => {
        setUserProfile(result.data.user);
      });
      await getRestaurants()
        .then((res) => {
          if (res.data.restaurants.length !== 0) {
            let restaurants = res.data.restaurants;
            let myPosts = [];
            restaurants.map((data) => {
              data.review.map((reviewData, index) => {
                if (reviewData.user.id === userId) {
                  myPosts.push(reviewData);
                }
              });
            });
            setPosts(myPosts);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    fatchData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getUserProfile(userId).then((result) => {
      setUserProfile(result.data.user);
    });
    await getRestaurants()
      .then((res) => {
        if (res.data.restaurants.length !== 0) {
          let restaurants = res.data.restaurants;
          let myPosts = [];
          restaurants.map((data) => {
            data.review.map((reviewData, index) => {
              if (reviewData.user.id === userId) {
                myPosts.push(reviewData);
              }
            });
          });
          setPosts(myPosts);
          setRefreshing(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <View style={[styles.settingContainer, styles.dropShadow]}>
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
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <Image
            source={{ uri: userProfile.coverImage }}
            style={styles.imageCover}
            PlaceholderContent={<ActivityIndicator />}
          ></Image>

          <View style={styles.screen}>
            <View style={styles.header}>
              <View style={styles.imageCoverContainer} />
              <View style={styles.profileDetail}>
                <View style={styles.profileHeader}>
                  <View style={styles.followContainer}>
                    <Text style={{ color: "#E29821" }}>
                      {userProfile.follower.length >= 1000
                        ? (userProfile.follower.length / 1000).toFixed(1) + "K"
                        : userProfile.follower.length}
                    </Text>
                    <Text style={{ color: "#E29821" }}>Followers</Text>
                  </View>
                  <View style={styles.avatarContainer}>
                    <Image
                      style={styles.avatar}
                      source={{ uri: userProfile.avatar }}
                      PlaceholderContent={<ActivityIndicator />}
                    ></Image>
                  </View>
                  <View style={styles.followContainer}>
                    <Text style={{ color: "#E29821" }}>
                      {userProfile.following.length >= 1000
                        ? (userProfile.following.length / 1000).toFixed(1) + "K"
                        : userProfile.following.length}
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
                    {userProfile.name}
                  </Text>
                  <Text
                    style={{
                      width: "80%",
                      color: "#A9C3BC",
                      fontSize: 13,
                      textAlign: "center",
                    }}
                  >
                    {userProfile.caption}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              {posts.map((data, index) => {
                return (
                  <Post
                    data={data}
                    userId={userId}
                    navigation={props.navigation}
                    key={index}
                    profileNavigate={false}
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
  dropShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});

profile.navigationOptions = (navigationData) => {
  return {
    tabBarVisible: false,
    headerShown: false,
  };
};

export default profile;
