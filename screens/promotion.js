import React, { Component, useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import BackPage from "../components/BackPage";
import Promotion from "../components/Promotion";
import Alert from "../components/MyAlert";

const promotion = (props) => {
  const [promotions, setPromotions] = useState([]);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let promotion = props.navigation.getParam("promotion");

  useEffect(() => {
    if (promotion.length === 0) {
      setAlert(true);
      setErrorMessage("Not have promotion at this time!");
    }
    setPromotions(promotion);
  }, [promotion]);

  return (
    <>
      <Alert
        open={alert}
        value={errorMessage}
        close={() => {
          setAlert(false);
        }}
      ></Alert>
      <View style={styles.screen}>
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
          >
            <View style={styles.content}>
              {promotions.map((data, index) => {
                return <Promotion data={data} key={index}></Promotion>;
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
    paddingTop: 90,
    height: "100%",
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
