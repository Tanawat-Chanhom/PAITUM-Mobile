import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Backpage from "../components/BackPage";
import restaurantCoupon from "./restaurantCoupon";

const restaurant = (props) => {
  const [data, setData] = useState({
    restaurantName: "AL MUSTAFA",
    avatar:
      "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
    coverImage:
      "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
    star: 5,
    coin: 10000,
    following: 100000,
    promotions: [],
    coupon: [],
    About:
      "Ratiorg got statues of different sizes as a present from CodeMaster for his birthday, each statue having an non-negative integer size. Since he likes to make things",
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
    ],
  });

  let id = props.navigation.getParam("id");
  console.log(id);
  return (
    <View style={styles.screen}>
      <Backpage
        navigation={props}
        path={"Home"}
        isFlow={true}
        magin={20}
      ></Backpage>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.screen}>
            <Image
              source={{ uri: data.coverImage }}
              style={styles.imageCover}
            ></Image>
            <View style={styles.imageCoverContainer} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Button
        onPress={() => props.navigation.navigate("CreatePost")}
        title={"Create Post"}
      ></Button>
      <Button
        onPress={() => props.navigation.navigate("Promation")}
        title={"Promation"}
      ></Button>
      <Button
        onPress={() => props.navigation.navigate("RestaurantCoupon")}
        title={"Restaurant Coupon"}
      ></Button>
      <Button
        onPress={() => props.navigation.navigate("Profile")}
        title={"Profile"}
      ></Button>
      <Button
        onPress={() => props.navigation.navigate("Restaurant")}
        title={"Restaurant"}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scrollView: {
    height: "100%",
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
});

export default restaurant;
