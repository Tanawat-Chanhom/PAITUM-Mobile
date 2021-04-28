import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import BackPage from "../components/BackPage";
import * as ImagePicker from "expo-image-picker";
import Alert from "../components/MyAlert";
import axios from "axios";
import { uploadImageToS3 } from "../util/aws";
import { register as registerService } from "../services/user.service";

export default function register2(props) {
  const data = props.navigation.getParam("data");
  const [image, setImage] = useState(null);
  const [cover, setCoverImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerInProgress, setRegisterInProgress] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async (setState) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setState(result.uri);
    }
  };

  const submit = async () => {
    setRegisterInProgress(true);
    let body = {
      username: data.username,
      password: data.password,
      confirmPassword: data.password,
      firstname: data.name,
      lastname: data.lastName,
      birthday: data.birthday,
      gender: data.gender,
      caption: caption,
      avatar: await uploadImageToS3("profile-image/", image),
      cover_image: await uploadImageToS3("profile-image/", cover),
    };

    console.log(body);

    await registerService(body)
      .then((result) => {
        console.log(result);
        props.navigation.navigate("Login");
        setRegisterInProgress(false);
      })
      .catch((error) => {
        console.error(error);
        setRegisterInProgress(false);
      });
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
      <BackPage navigation={props} path={"stateOne"}></BackPage>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Caption</Text>
            <TextInput
              style={styles.textInput}
              value={caption}
              placeholder="Web-Designner"
              onChangeText={(x) => {
                setCaption(x);
              }}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.text}>Profile Image</Text>
            <View style={[styles.ImgContainerProfile]}>
              <TouchableOpacity
                onPress={() => {
                  pickImage(setImage);
                }}
              >
                {image === null ? (
                  <Image source={require("../assets/camera.png")} />
                ) : (
                  <Image source={{ uri: image }} style={styles.profileImage} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.text}>Cover Image</Text>
            <View style={[styles.ImgContainerCover]}>
              <TouchableOpacity
                onPress={() => {
                  pickImage(setCoverImage);
                }}
              >
                {cover === null ? (
                  <Image source={require("../assets/camera.png")} />
                ) : (
                  <Image source={{ uri: cover }} style={styles.coverImage} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.nextButton}>
        {registerInProgress === true ? (
          <ActivityIndicator color="#fff" style={styles.activityIndicator} />
        ) : (
          <Button
            title={"FINISH"}
            color="white"
            onPress={() => {
              if (caption !== "" && image !== null && cover !== null) {
                submit();
              } else {
                setAlert(true);
                setErrorMessage("Please enter your information.");
              }
            }}
          ></Button>
        )}
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
  safeAreaView: {
    flex: 1,
    height: "100%",
  },
  scrollView: {
    paddingTop: 10,
    height: "100%",
  },
  nextButton: {
    backgroundColor: "#E29821",
    position: "relative",
    alignSelf: "stretch",
    width: "100%",
    borderRadius: 50,
    alignSelf: "center",
    margin: 34,
    bottom: 0,
  },
  ImgContainerProfile: {
    height: 145,
    width: 145,
    borderWidth: 2,
    borderRadius: 100,
    alignSelf: "center",
    borderColor: "#707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    overflow: "hidden",
  },
  ImgContainerCover: {
    height: 145,
    width: 300,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: "center",
    borderColor: "#707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    overflow: "hidden",
  },
  profileImage: {
    position: "relative",
    height: 145,
    width: 145,
    borderRadius: 100,
  },
  coverImage: {
    position: "relative",
    height: 145,
    width: 300,
  },
  text: {
    color: "#E29821",
    fontSize: 14,
    fontWeight: "bold",
  },
  textInput: {
    width: "100%",
    color: "#A9C3BC",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#707070",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  textInputContainer: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  activityIndicator: {
    paddingVertical: 10,
  },
});
