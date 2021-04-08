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
import { SERVER } from "../util/server.json";
import axios from "axios";
import Alert from "../components/MyAlert";

export default function Register(props) {
  const [stateGenderModel, setStateGenderModel] = useState(false);
  const [stateDateModel, setStateDateModel] = useState(false);
  const [gender, setGender] = useState("men");
  const [chosenDate, setChosenDate] = useState(new Date());
  const [data, setData] = useState({
    username: "",
    password: "",
    eMail: "",
    name: "",
    confirm: "",
  });
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      <Alert
        open={alert}
        value={errorMessage}
        close={() => {
          setAlert(false);
        }}
      ></Alert>
      <BackPage navigation={props} path={"Login"}></BackPage>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Username</Text>
            <TextInput
              style={styles.textInput}
              value={data.username}
              placeholder="uesrname"
              onChangeText={(x) => {
                setData({ ...data, username: x });
              }}
            ></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              placeholder="password"
              value={data.password}
              onChangeText={(x) => {
                setData({ ...data, password: x });
              }}
            ></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Confirm Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              placeholder="password"
              value={data.confirm}
              onChangeText={(x) => {
                setData({ ...data, confirm: x });
              }}
            ></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>E-Mail</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e-mail"
              value={data.eMail}
              keyboardType="email-address"
              onChangeText={(x) => {
                setData({ ...data, eMail: x });
              }}
            ></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={data.name}
              placeholder="name"
              onChangeText={(x) => {
                setData({ ...data, name: x });
              }}
            ></TextInput>
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
        </ScrollView>
      </SafeAreaView>
      <View style={styles.nextButton}>
        <Button
          title={"NEXT"}
          color="white"
          onPress={() => {
            let body = {
              username: data.username,
              password: data.password,
              confirm: data.confirm,
              eMail: data.eMail,
              name: data.name,
              gender: gender,
              birthday: chosenDate,
            };
            let pass = 0;
            Object.keys(body).map((key) => {
              if (body[key] === "") {
                pass++;
              }
            });
            if (pass > 0) {
              setAlert(true);
              setErrorMessage("Please enter your information.");
            } else if (body.password !== body.confirm) {
              setAlert(true);
              setErrorMessage("Password and Confirm Password is incorrect.");
            } else {
              props.navigation.navigate("stateTwo", { data: body });
            }
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
    flex: 1,
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
    position: "absolute",
    alignSelf: "stretch",
    width: "100%",
    borderRadius: 50,
    alignSelf: "center",
    margin: 34,
    bottom: 0,
  },
});
