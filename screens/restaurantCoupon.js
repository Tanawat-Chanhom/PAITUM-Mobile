import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import BackPage from "../components/BackPage";
import ReCoupon from "../components/ReCoupon";
import { SERVER } from "../util/server.json";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCoin as setUserCoin } from "../store/action/authenAction";
import { setCoupon as setUserCoupon } from "../store/action/authenAction";

const restaurantCoupon = (props) => {
  const token = useSelector((state) => {
    return state.authenReducer.token;
  });
  const dispatch = useDispatch();
  const [Coin, setCoin] = useState(token.coin);
  const [Coupons, setCoupons] = useState([]);
  const [rerender, setRerender] = useState(0);
  let coupon = props.navigation.getParam("coupon");

  useEffect(() => {
    setCoupons(coupon);
    setCoin(token.coin);
  }, [coupon, token, rerender]);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={{ height: 20 }}>
            <BackPage navigation={props} path={"Restaurant"}></BackPage>
          </View>
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
            <Text style={{ fontSize: 35, fontWeight: "600", color: "#403D56" }}>
              {Coin}
            </Text>
            <Text style={{ color: "#403D56" }}>Total coin</Text>
          </View>
          <View style={styles.content}>
            {Coupons.map((data, index) => {
              return (
                <ReCoupon
                  data={data}
                  key={index}
                  delete={(couponCoin) => {
                    if (Coin >= couponCoin) {
                      let newCoin = Number(Coin) - Number(couponCoin);
                      dispatch(setUserCoin(newCoin));
                      setRerender(rerender + 1);
                    } else {
                      console.log("Out of coin!");
                    }
                  }}
                ></ReCoupon>
              );
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

export default restaurantCoupon;
