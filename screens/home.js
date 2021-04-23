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
import { useSelector } from "react-redux";
import { getRestaurants } from "../services/restaurant.service";
import { getPosts } from "../services/post.service";

const home = (props) => {
  const { userReducer } = useSelector((state) => state);
  const userId = userReducer.userId;

  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    async function fatchData() {
      await getPosts(userId).then((result) => {
        console.log(result.data.reviews);
        setPosts(result.data.reviews);
      });
      await setRefreshing(false);
    }

    fatchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setPosts([]);
    getRestaurants()
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
                  userId={userId}
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
