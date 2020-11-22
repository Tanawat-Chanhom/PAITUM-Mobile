import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import restaurantCoupon from "./restaurantCoupon";

const restaurant = ({ route, navigation }) => {
  let id = navigation.getParam("id");
  console.log(id);
  return (
    <View style={styles.screen}>
      <Text> Restaurant </Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default restaurant;
