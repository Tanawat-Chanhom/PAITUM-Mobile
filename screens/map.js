import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import Header from "../components/Header";
import Button from "../components/Button";
import RestaurantCord from "../components/RestaurantCord";
import axios from "axios";
import { SERVER } from "../util/server.json";
import Alert from "../components/MyAlert";

const map = (props) => {
  const [distance, setDistance] = useState(5);
  const [findType, setFindType] = useState("Near Me");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let body = {
      latitude: 0,
      longitude: 0,
      radius: distance,
    };
    navigator.geolocation.getCurrentPosition((position) => {
      body.latitude = position.coords.latitude;
      body.longitude = position.coords.longitude;
      console.log(body);
      if (findType === "Recommend") {
        setDistance(0);
        axios
          .get(SERVER + "/restaurant/all")
          .then((res) => {
            if (res.data.restaurants.length !== 0) {
              setRestaurants(res.data.restaurants);
            } else {
              setRestaurants([]);
              setAlert(true);
              setErrorMessage("Not Found");
            }
          })
          .catch((err) => {
            setAlert(true);
            setErrorMessage("Server error.");
          });
      } else {
        axios
          .post(SERVER + "/restaurant/near", body)
          .then((res) => {
            if (res.data.restaurants.length !== 0) {
              setRestaurants(res.data.restaurants);
            } else {
              setRestaurants([]);
              setAlert(true);
              setErrorMessage("Not Found");
            }
          })
          .catch((err) => {
            setAlert(true);
            setErrorMessage("Server error.");
          });
      }
    });
  }, [distance, findType, search]);

  const [restaurants, setRestaurants] = useState([]);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <Alert
        open={alert}
        value={errorMessage}
        close={() => {
          setAlert(false);
        }}
        isFlow={true}
        margin={10}
      ></Alert>
      <Header></Header>
      <View style={styles.screen}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            <View style={styles.searchContainer}>
              {/* <View style={styles.searchBar}>
                <Image
                  style={styles.searchIcon}
                  source={require("../assets/search.png")}
                ></Image>
                <TextInput
                  placeholder="Search"
                  style={{ flex: 1 }}
                  onChangeText={(text) => {
                    setSearch(text);
                  }}
                  value={search}
                ></TextInput>
              </View> */}
              <View style={styles.optionBar}>
                <Button
                  title={"Near Me"}
                  fontSize={20}
                  color={findType === "Near Me" ? "#E29821" : "#111"}
                  style={[styles.optionButton, { marginLeft: 0 }]}
                  onPress={() => {
                    setFindType("Near Me");
                  }}
                ></Button>
                <Button
                  title={"Recommend"}
                  fontSize={20}
                  color={findType === "Recommend" ? "#E29821" : "#111"}
                  style={[styles.optionButton, { marginRight: 0 }]}
                  onPress={() => {
                    setFindType("Recommend");
                  }}
                ></Button>
              </View>
              <View style={styles.optionBar}>
                <Button
                  title={"5 Km."}
                  fontSize={20}
                  color={distance === 5 ? "#E29821" : "#111"}
                  style={[styles.optionButton, { marginLeft: 0 }]}
                  onPress={() => {
                    setDistance(5);
                  }}
                ></Button>
                <Button
                  title={"10 Km."}
                  fontSize={20}
                  color={distance === 10 ? "#E29821" : "#111"}
                  style={styles.optionButton}
                  onPress={() => {
                    setDistance(10);
                  }}
                ></Button>
                <Button
                  title={"20 Km."}
                  fontSize={20}
                  color={distance === 20 ? "#E29821" : "#111"}
                  style={[styles.optionButton, { marginRight: 0 }]}
                  onPress={() => {
                    setDistance(20);
                  }}
                ></Button>
              </View>
            </View>
            <View style={styles.contentContainer}>
              {restaurants.map((data) => {
                return (
                  <RestaurantCord
                    data={data}
                    key={data.id}
                    navigation={props.navigation}
                  ></RestaurantCord>
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
    backgroundColor: "#fff",
  },
  scrollView: {
    paddingTop: 20,
    height: "100%",
  },
  searchContainer: {
    // borderWidth: 1,
  },
  searchBar: {
    backgroundColor: "#F1F1F1",
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 10,
  },
  optionBar: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 10,
  },
  optionButton: {
    backgroundColor: "#F1F1F1",
    flex: 1,
    padding: 12,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 35,
  },
});

export default map;
