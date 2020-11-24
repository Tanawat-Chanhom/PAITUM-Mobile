import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import Header from "../components/Header";
import TOP10 from "../components/TOP10";
import Post from "../components/Post";
import axios from "axios";
import { SERVER } from "../util/server.json";
import { useSelector } from "react-redux";

const home = (props) => {
  const token = useSelector((state) => {
    return state.authenReducer.token;
  });

  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios
      .get(SERVER + "/restaurant/all")
      .then((res) => {
        if (res.data.restaurants.length !== 0) {
          let UpdatePosts = [];
          res.data.restaurants.map((data) => {
            let reviews = data.review;
            let newUpdate = UpdatePosts.concat(reviews);
            UpdatePosts = newUpdate;
          });
          setPosts(UpdatePosts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    axios
      .get(SERVER + "/restaurant/all")
      .then((res) => {
        if (res.data.restaurants.length !== 0) {
          let UpdatePosts = [];
          res.data.restaurants.map((data) => {
            let reviews = data.review;
            let newUpdate = UpdatePosts.concat(reviews);
            UpdatePosts = newUpdate;
          });
          setPosts(UpdatePosts);
          setRefreshing(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header></Header>
      <View style={styles.screen}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <TOP10 navigation={props.navigation}></TOP10>
            {posts.map((data, index) => {
              return (
                <Post
                  data={data}
                  key={index}
                  userId={token}
                  navigation={props.navigation}
                  profileNavigate={true}
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
  },
  scrollView: {
    paddingTop: 10,
  },
});

export default home;
