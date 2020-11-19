import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  Button,
  DatePickerIOS,
} from "react-native";
import BackPage from "../components/BackPage";

export default function register2(props) {
  const data = props.navigation.getParam("data");
  return (
    <View style={styles.screen}>
      <BackPage navigation={props} path={"stateOne"}></BackPage>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text>{data.username}</Text>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.nextButton}>
        <Button
          title={"FINISH"}
          color="white"
          onPress={() => {
            console.log(gender);
            props.navigation.navigate("stateTwo", { gender: gender });
          }}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#FFF",
  },
  nextButton: {
    backgroundColor: "#E29821",
    position: "absolute",
    alignSelf: "stretch",
    width: "100%",
    borderRadius: 50,
    alignSelf: "center",
    margin: 34,
    bottom: 0,
  },
});
