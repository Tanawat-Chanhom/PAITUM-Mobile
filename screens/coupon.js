import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "../components/Header";
import Coupon from "../components/Coupon";

const coupon = (props) => {
  const [coupon, setCoupon] = useState([
    {
      image:
        "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
      description:
        "Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds.",
      exp: "10 - 12 - 2021",
      qr:
        "https://m.thaiware.com/upload_misc/software/2014_12/thumbnails/10811_161026120301Vm.png",
    },
    {
      image:
        "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
      description:
        "Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds.",
      exp: "10 - 12 - 2021",
      qr:
        "https://m.thaiware.com/upload_misc/software/2014_12/thumbnails/10811_161026120301Vm.png",
    },
    {
      image:
        "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
      description:
        "Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds.",
      exp: "10 - 12 - 2021",
      qr:
        "https://m.thaiware.com/upload_misc/software/2014_12/thumbnails/10811_161026120301Vm.png",
    },
  ]);
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
            <View style={styles.haeder}>
              <View
                style={[styles.circle, { width: 206, height: 206 }]}
                opacity={0.07}
              ></View>
              <View
                style={[styles.circle, { width: 175, height: 175 }]}
                opacity={0.15}
              ></View>
              <View
                style={[styles.circle, { width: 138, height: 138 }]}
                opacity={0.24}
              ></View>
              <Text
                style={{ fontSize: 35, fontWeight: "600", color: "#403D56" }}
              >
                215
              </Text>
              <Text style={{ color: "#403D56" }}>Total coin</Text>
            </View>
            <View style={styles.content}>
              {coupon.map((data, index) => {
                return <Coupon data={data} key={index}></Coupon>;
              })}
            </View>
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
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
  },
  haeder: {
    width: "100%",
    height: 240,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    backgroundColor: "#F3CA1B",
    opacity: 7,
    borderRadius: 100,
    position: "absolute",
  },
  content: {
    marginBottom: 10,
  },
});

export default coupon;
