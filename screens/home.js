import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Header from "../components/Header";
import TOP10 from "../components/TOP10";
import Post from "../components/Post";
import { useSelector } from "react-redux";

const home = (props) => {
  const token = useSelector((state) => {
    return state.authenReducer.token;
  });
  const posts = [
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
        restaurantId: 2,
        image: [
          "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
          "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
          "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
        ],
        discription:
          "Ratiorg got statues of different sizes as a present from CodeMaster for his birthday, each statue having an non-negative integer size. Since he likes to make things",
        view: 1000,
        like: 10000,
        comments: [
          {
            uid: "1234",
            avatar:
              "https://images.unsplash.com/photo-1500239524810-5a6e76344a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            message: "TEST",
          },
          {
            uid: "1234",
            avatar:
              "https://images.unsplash.com/photo-1500239524810-5a6e76344a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            message: "TEST",
          },
        ],
        liked: true,
      },
    },
    {
      postId: "2",
      user: {
        name: "Tanwat Chanhom2",
        createAt: "3 mins ago",
        uid: 2,
        avatar:
          "https://images.unsplash.com/photo-1500239524810-5a6e76344a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      },
      detail: {
        restaurantId: 1,
        image: [
          "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
          "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
          "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
        ],
        discription:
          "Ratiorg got statues of different sizes as a present from CodeMaster for his birthday, each statue having an non-negative integer size. Since he likes to make things",
        view: 1000,
        like: 10000,
        comments: [
          {
            uid: "1234",
            avatar:
              "https://images.unsplash.com/photo-1500239524810-5a6e76344a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            message: "TEST",
          },
          {
            uid: "1234",
            avatar:
              "https://images.unsplash.com/photo-1500239524810-5a6e76344a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            message: "TEST",
          },
        ],
        liked: false,
      },
    },
  ];
  return (
    <>
      <Header></Header>
      <View style={styles.screen}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            <TOP10 navigation={props.navigation}></TOP10>
            {posts.map((data, index) => {
              return (
                <Post
                  data={data}
                  key={index}
                  userId={token}
                  navigation={props.navigation}
                ></Post>
              );
            })}
            <View style={{ height: 20 }}></View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  safeAreaView: {
    flex: 1,
    // borderWidth: 1,
  },
  scrollView: {
    paddingTop: 10,
  },
});

export default home;
