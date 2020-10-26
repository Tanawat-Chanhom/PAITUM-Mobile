import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Header from "../components/Header";

const map = (props) => {
  return (
    <>
      <Header></Header>
      <View style={styles.screen}>
        <Text> Map </Text>
        <Button
          onPress={() => props.navigation.navigate("RestaurantStack")}
          title={"Restaurant"}
        ></Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default map;
