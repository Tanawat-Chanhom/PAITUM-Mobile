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
import { setUserCoin } from "../store/action/userAction";
import { getUserProfile } from "../services/user.service";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const coupon = (props) => {
  const dispatch = useDispatch();
  const { userReducer } = useSelector((state) => state);
  const userId = userReducer.userId;
  const userCoin = userReducer.coin;
  const [coin, setCoin] = useState(0);
  const [coupon, setCoupon] = useState([
    // {
    //   avatar:
    //     "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
    //   coin: "70",
    //   description:
    //     "Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds.",
    //   exp: "14 - 12 - 2020",
    //   name: "1",
    //   qr:
    //     "https://m.thaiware.com/upload_misc/software/2014_12/thumbnails/10811_161026120301Vm.png",
    // },
    // {
    //   avatar:
    //     "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
    //   coin: "70",
    //   description:
    //     "Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds. Gift card valued at 150 or 10% off at McDonalds.",
    //   exp: "14 - 12 - 2020",
    //   name: "1",
    //   qr:
    //     "https://m.thaiware.com/upload_misc/software/2014_12/thumbnails/10811_161026120301Vm.png",
    // },
  ]);
  const [rerender, setRerender] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    handleFatchData();
  }, [userReducer]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRerender(rerender + 1);
      setRefreshing(false);
      handleFatchData();
    }, 1500);
  };

  const handleFatchData = () => {
    setRefreshing(true);
    getUserProfile(userId).then((result) => {
      const userData = result.data.user;

      setCoin(userData.coin);
      setCoupon(userData.coupon);
      setRefreshing(false);
    });
  };

  const hendleRemoveCoupon = (index) => {
    let newCouponArray = coupon;
    newCouponArray.splice(index, 1);
    setCoupon(newCouponArray);
    forceUpdate();
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
              {coupon.map((data, index) => {
                return (
                  <Coupon
                    data={data}
                    key={index}
                    delete={(couponCoin) => {
                      hendleRemoveCoupon(index);
                      dispatch(setUserCoin(Number(coin) + Number(couponCoin)));
                    }}
                  />
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
