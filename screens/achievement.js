import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "../components/Header";
import Achievement from "../components/Achievement";

export default function achievement() {
  const [achievements, setAchievements] = useState([
    {
      title: "NewBie",
      coin: 50,
      icon: "https://i.ibb.co/k3yPBXv/newbie-3x.png",
      description: "Follow 5 restaurant and reviewer",
    },
    {
      title: "Pop Star",
      coin: 500,
      icon: "https://i.ibb.co/f0sLxnJ/popstar-3x.png",
      description: "300,000 Follower",
    },
  ]);
  return (
    <>
      <Header />
      <View style={styles.screen}>
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            <View style={styles.achieveContainer}>
              <Text style={styles.achieveTitle}>Achievement</Text>
              <View style={styles.contentContainer}>
                {achievements.map((data, index) => {
                  return <Achievement data={data} key={index}></Achievement>;
                })}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  safeAreaView: {
    height: "100%",
    marginBottom: 20,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  achieveContainer: {
    marginBottom: 40,
  },
  achieveTitle: {
    color: "#E29821",
    textAlign: "center",
    fontSize: 30,
    paddingTop: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
});
