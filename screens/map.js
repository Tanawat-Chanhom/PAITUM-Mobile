import React, { useState } from "react";
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
import Achievement from "../components/Achievement";

const map = (props) => {
  const [distance, setDistance] = useState(5);
  const [findType, setFindType] = useState("Near Me");
  const [search, setSearch] = useState("");

  const [restaurants, setRestaurants] = useState([
    {
      coverImg:
        "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
      restaurantName: "AL MUSTAFA1",
      avatar:
        "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
      star: 3,
      id: 1,
    },
    {
      coverImg:
        "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
      restaurantName: "AL MUSTAFA2",
      avatar:
        "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
      star: 5,
      id: 2,
    },
    {
      coverImg:
        "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
      restaurantName: "AL MUSTAFA3",
      avatar:
        "https://i.pinimg.com/originals/f8/8e/89/f88e898955530880794913f0efb38755.jpg",
      star: 1,
      id: 3,
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
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
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
              </View>
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
