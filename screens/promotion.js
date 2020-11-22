import React, { Component, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import BackPage from "../components/BackPage";
import Promotion from "../components/Promotion";

const promotion = (props) => {
  const [promotions, setPromotions] = useState([
    {
      image:
        "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
      description:
        "Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds.",
      exp: "10 - 12 - 2021",
    },
    {
      image:
        "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
      description:
        "Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds.",
      exp: "10 - 12 - 2021",
    },
    {
      image:
        "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
      description:
        "Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds.",
      exp: "10 - 12 - 2021",
    },
  ]);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.haeder}>
            <BackPage navigation={props} path={"Restaurant"}></BackPage>
          </View>
          <View style={styles.content}>
            {promotions.map((data, index) => {
              return <Promotion data={data} key={index}></Promotion>;
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
  },
  haeder: {
    width: "100%",
    height: 100,
    display: "flex",
    padding: 5,
  },
  circle: {
    backgroundColor: "#F3CA1B",
    opacity: 7,
    borderRadius: 80,
    position: "absolute",
  },
  content: {
    marginBottom: 10,
  },
});

export default promotion;
