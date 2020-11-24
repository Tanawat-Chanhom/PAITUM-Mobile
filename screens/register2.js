import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import BackPage from "../components/BackPage";
import * as ImagePicker from "expo-image-picker";
import Alert from "../components/MyAlert";
import axios from "axios";
import { SERVER } from "../util/server.json";

export default function register2(props) {
  const data = props.navigation.getParam("data");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const submit = () => {
    let body = {
      avatar:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/boy-512.png",
      caption: caption,
      coin: 0,
      coupon: [],
      coverImage:
        "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/blue-and-turquoise-minimalist-mountain-landscape-matthias-hauser.jpg",
      follower: [],
      following: [],
      followingRestaurant: [],
      name: data.name,
      password: data.password,
      post: [],
      username: data.username,
    };

    axios
      .post(SERVER + "/user/register", body)
      .then((res) => {
        if (res.data.status === 200) {
          props.navigation.navigate("Login");
        } else {
          setAlert(true);
          setErrorMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert(true);
        setErrorMessage(err.message);
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
      <View style={styles.profileImg}>
        <View style={[styles.ImgContainer]}>
          <TouchableOpacity onPress={pickImage}>
            {image === null ? (
              <Image source={require("../assets/camera.png")} />
            ) : (
              <Image source={{ uri: image }} style={styles.image} />
            )}
          </TouchableOpacity>
        </View>
      </View>
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
      <View style={styles.nextButton}>
        <Button
          title={"FINISH"}
          color="white"
          onPress={() => {
            if (caption !== "" && image !== null) {
              submit();
            } else {
              setAlert(true);
              setErrorMessage("Please enter your information.");
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
  profileImg: {
    width: "100%",
    padding: 20,
  },
  ImgContainer: {
    height: 175,
    width: 175,
    borderWidth: 2,
    borderRadius: 100,
    alignSelf: "center",
    borderColor: "#707070",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderColor: "#707070",
    height: 175,
    width: 175,
    borderWidth: 2,
    borderRadius: 100,
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
});
