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
import Button from "../components/Button";
import RestaurantCord from "../components/RestaurantCord";
import {
  getRestaurants,
  getNearRestaurants,
} from "../services/restaurant.service";
import Alert from "../components/MyAlert";

const map = (props) => {
  const [distance, setDistance] = useState(5);
  const [findType, setFindType] = useState("Near Me");
  const [refreshing, setRefreshing] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let body = {
      latitude: 0,
      longitude: 0,
      radius: distance,
    };
    navigator.geolocation.getCurrentPosition((position) => {
      body.latitude = position.coords.latitude;
      body.longitude = position.coords.longitude;
      setRefreshing(true);

      if (findType === "Recommend") {
        setDistance(5);
        getRestaurants()
          .then((res) => {
            if (res.data.restautants.length !== 0) {
              setRestaurants(res.data.restautants);
              setRefreshing(false);
            } else {
              setRefreshing(false);
              setRestaurants([]);
              setAlert(true);
              setErrorMessage("Not Found");
            }
          })
          .catch((err) => {
            setAlert(true);
            setRefreshing(false);
            setErrorMessage("Server error.");
          });
      } else {
        getNearRestaurants(body)
          .then((res) => {
            if (res.data.restautants.length !== 0) {
              setRestaurants(res.data.restautants);
              setRefreshing(false);
            } else {
              setRestaurants([]);
              setAlert(true);
              setRefreshing(false);
              setErrorMessage("Not Found");
            }
          })
          .catch((err) => {
            setAlert(true);
            setRefreshing(false);
            setErrorMessage("Server error.");
          });
      }
    });
  }, [distance, findType]);

  const onRefresh = () => {
    setRefreshing(true);
    let body = {
      latitude: 0,
      longitude: 0,
      radius: distance,
    };
    navigator.geolocation.getCurrentPosition((position) => {
      body.latitude = position.coords.latitude;
      body.longitude = position.coords.longitude;
      if (findType === "Recommend") {
        setDistance(5);
        getRestaurants()
          .then((res) => {
            if (res.data.restautants.length !== 0) {
              setRestaurants(res.data.restautants);
              setRefreshing(false);
            } else {
              setRefreshing(false);
              setRestaurants([]);
              setAlert(true);
              setErrorMessage("Not Found");
            }
          })
          .catch((err) => {
            setAlert(true);
            setRefreshing(false);
            setErrorMessage("Server error.");
          });
      } else {
        getNearRestaurants(body)
          .then((res) => {
            if (res.data.restautants.length !== 0) {
              setRestaurants(res.data.restautants);
              setRefreshing(false);
            } else {
              setRestaurants([]);
              setAlert(true);
              setRefreshing(false);
              setErrorMessage("Not Found");
            }
          })
          .catch((err) => {
            setAlert(true);
            setRefreshing(false);
            setErrorMessage("Server error.");
          });
      }
    });
  };

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
        <View style={styles.searchContainer}>
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
          {findType !== "Recommend" ? (
            <View style={styles.optionBar}>
              <Button
                title={"5 Km."}
                fontSize={20}
                color={distance === 5000 ? "#E29821" : "#111"}
                style={[styles.optionButton, { marginLeft: 0 }]}
                onPress={() => {
                  setDistance(5000);
                }}
              ></Button>
              <Button
                title={"10 Km."}
                fontSize={20}
                color={distance === 10000 ? "#E29821" : "#111"}
                style={styles.optionButton}
                onPress={() => {
                  setDistance(10000);
                }}
              ></Button>
              <Button
                title={"20 Km."}
                fontSize={20}
                color={distance === 20000 ? "#E29821" : "#111"}
                style={[styles.optionButton, { marginRight: 0 }]}
                onPress={() => {
                  setDistance(20000);
                }}
              ></Button>
            </View>
          ) : (
            <></>
          )}
        </View>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
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
    height: "100%",
    borderRadius: 10,
  },
  searchContainer: {
    marginTop: 20,
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
  },
});

export default map;
