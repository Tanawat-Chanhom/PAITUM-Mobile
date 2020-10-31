import React, { useState } from "react";
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
import Model from "../components/Model";
import BackPage from "../components/BackPage";

export default function Register(props) {
  const [stateGenderModel, setStateGenderModel] = useState(false);
  const [stateDateModel, setStateDateModel] = useState(false);
  const [gender, setGender] = useState("Select gender");
  const [chosenDate, setChosenDate] = useState(new Date());

  const isShowGender = (state) => {
    state === true ? setStateGenderModel(true) : setStateGenderModel(false);
  };
  const isShowDate = (state) => {
    state === true ? setStateDateModel(true) : setStateDateModel(false);
  };

  const genderOptionComponent = (
    <View style={styles.genderContainer}>
      <View style={styles.genderButton}>
        <Button
          title={"Men"}
          color="black"
          onPress={() => {
            setGender("men");
            isShowGender(false);
          }}
        ></Button>
      </View>
      <View style={styles.genderButton}>
        <Button
          title={"Women"}
          color="black"
          onPress={() => {
            setGender("women");
            isShowGender(false);
          }}
        ></Button>
      </View>
    </View>
  );

  const dateSelecterComponent = (
    <View>
      <DatePickerIOS
        mode={"date"}
        date={chosenDate}
        onDateChange={setChosenDate}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <Model
        show={stateGenderModel}
        component={genderOptionComponent}
        cencel={isShowGender}
      ></Model>
      <Model
        show={stateDateModel}
        component={dateSelecterComponent}
        cencel={isShowDate}
      ></Model>
      <BackPage navigation={props}></BackPage>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {/* <Image source={require("../assets/test.png")}></Image> */}
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Username</Text>
            <TextInput style={styles.textInput} value={"test"}></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              value={"test"}
            ></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Confirm Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              value={"test"}
            ></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>E-Mail</Text>
            <TextInput style={styles.textInput} value={"test"}></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Name</Text>
            <TextInput style={styles.textInput} value={"test"}></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Gender</Text>
            <View style={styles.selecterContainer}>
              <Text
                style={styles.genderText}
                onPress={() => {
                  isShowGender(true);
                }}
              >
                {gender === "men" ? "Men" : "Women"}
              </Text>
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Birthday</Text>
            <View style={styles.selecterContainer}>
              <Text
                style={styles.dateText}
                onPress={() => {
                  isShowDate(true);
                }}
              >
                {chosenDate.toLocaleDateString()}
              </Text>
            </View>
          </View>
          <View style={styles.nextButton}>
            <Button title={"NEXT"} color="white"></Button>
          </View>
        </ScrollView>
      </SafeAreaView>
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
  text: {
    color: "#E29821",
    fontSize: 14,
    fontWeight: "bold",
  },
  textInput: {
    height: 30,
    width: "100%",
    color: "#A9C3BC",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#707070",
  },
  textInputContainer: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  safeAreaView: {
    width: "100%",
    height: "100%",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  genderButton: {
    justifyContent: "center",
    alignContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  selecterContainer: {
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 5,
  },
  genderText: {
    color: "#A9C3BC",
    fontWeight: "bold",
    fontSize: 14,
  },
  dateText: {
    color: "#A9C3BC",
    fontWeight: "bold",
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: "#E29821",
    alignSelf: "stretch",
    borderRadius: 50,
    marginTop: 50,
  },
});
