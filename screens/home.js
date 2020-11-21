import React, { Component } from "react";
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

const home = (props) => {
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
            <TOP10></TOP10>
            
            <Text> Home </Text>
            <Button
              onPress={() => props.navigation.navigate("RestaurantStack")}
              title={"Restaurant"}
            ></Button>
            <Button
              onPress={() => props.navigation.navigate("LoginStack")}
              title={"login"}
            ></Button>
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
