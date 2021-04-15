import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import BackPage from "../components/BackPage";
import ReCoupon from "../components/ReCoupon";
import Alert from "../components/MyAlert";
import Constants from "expo-constants";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../services/user.service";

const restaurantCoupon = (props) => {
  let coupon = props.navigation.getParam("coupon"); //Passing data from restaurant main page

  const { userReducer } = useSelector((state) => state);
  const userCoin = userReducer.coin;
  const userId = userReducer.userId;
  const dispatch = useDispatch();
  const [Coin, setCoin] = useState(userCoin);
  const [Coupons, setCoupons] = useState([]);
  const [rerender, setRerender] = useState(0);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function fatchData() {
      await getUserProfile(userId).then((result) => {
        let userData = result.data.user;

        if (coupon.length === 0) {
          setAlert(true);
          setErrorMessage("Not have coupon at this time!");
        }
        setCoupons(coupon);
        setCoin(userData.coin);
      });
    }

    fatchData();
  }, [coupon, rerender]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRerender(rerender + 1);
      setRefreshing(false);
    }, 1500);
  };

  return (
    <View style={styles.screen}>
      <Alert
        open={alert}
        value={errorMessage}
        close={() => {
          setAlert(false);
        }}
      ></Alert>
      <BackPage
        navigation={props}
        path={"Restaurant"}
        isFlow={true}
        magin={10}
      ></BackPage>
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
            <Text style={{ fontSize: 35, fontWeight: "600", color: "#403D56" }}>
              {Coin}
            </Text>
            <Text style={{ color: "#403D56" }}>Total coin</Text>
          </View>
          <View style={styles.content}>
            {Coupons.map((data, index) => {
              return (
                <ReCoupon data={data} key={index} userCoin={Coin}></ReCoupon>
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
  safeAreaView: {
    marginTop: -Constants.statusBarHeight,
    backgroundColor: "#fff",
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

export default restaurantCoupon;
