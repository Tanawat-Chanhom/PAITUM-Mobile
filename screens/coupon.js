import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import Header from "../components/Header";
import Coupon from "../components/Coupon";
import { useSelector, useDispatch } from "react-redux";
import { setCoin as setUserCoin } from "../store/action/authenAction";

const coupon = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authenReducer.token);
  const [userData, setUserData] = useState({
    coupon: [],
  });
  const [coin, setCoin] = useState(0);
  const [rerender, setRerender] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setUserData(token);
    setCoin(token.coin);
  }, [token, rerender]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRerender(rerender + 1);
      setRefreshing(false);
    }, 1500);
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
                {coin}
              </Text>
              <Text style={{ color: "#403D56" }}>Total coin</Text>
            </View>
            <View style={styles.content}>
              {userData.coupon.map((data, index) => {
                return (
                  <Coupon
                    data={data}
                    key={index}
                    delete={(couponCoin) => {
                      let newCoin = Number(coin) + Number(couponCoin);
                      dispatch(setUserCoin(newCoin));
                      setRerender(rerender + 1);
                    }}
                  ></Coupon>
                );
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
  scrollView: {
    height: "100%",
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
