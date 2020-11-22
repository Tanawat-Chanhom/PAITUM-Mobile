import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BackPage from "../components/BackPage";
import * as ImagePicker from "expo-image-picker";
import Alert from "../components/MyAlert";
import Button from "../components/Button";

const settingProfile = (props) => {
  const data = props.navigation.getParam("data");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
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
      ...data,
      caption: caption,
      avatar: image,
      name: name,
      gender: gender,
      birthday: birthday,
      email: email,
    };
    props.navigation.navigate("Profile");
  };

  return (
    <ScrollView style={styles.screen}>
      <Alert
        open={alert}
        value={errorMessage}
        close={() => {
          setAlert(false);
        }}
      ></Alert>
      <BackPage navigation={props} path={"Setting"}></BackPage>
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
      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.textInput_nobd}
          value={name}
          placeholder="Your Name"
          onChangeText={(x) => {
            setName(x);
          }}
        ></TextInput>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Gender</Text>
        <TextInput
          style={styles.textInput_nobd}
          value={gender}
          placeholder="Male"
          onChangeText={(x) => {
            setGender(x);
          }}
        ></TextInput>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.text}>Birthday</Text>
        <TextInput
          style={styles.textInput_nobd}
          value={birthday}
          placeholder="Your Birthday"
          onChangeText={(x) => {
            setBirthday(x);
          }}
        ></TextInput>
      </View>
      <View style={styles.textInputContainer}>
        <Text style={styles.text}>E-mail</Text>
        <TextInput
          style={styles.textInput_nobd}
          value={email}
          placeholder="Your Email"
          onChangeText={(x) => {
            setEmail(x);
          }}
        ></TextInput>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={styles.login_button_container}>
          <Button
            color="#FFFFFF"
            title={"SAVE"}
            style={styles.loginButton}
            onPress={() => submit()}
            fontSize={14}
          ></Button>
        </View>
      </View>
    </ScrollView>
  );
};

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
  textInput_nobd: {
    height: 30,
    width: "100%",
    color: "#A9C3BC",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#707070",
    marginTop: 5,
  },
  textInputContainer: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  login_button_container: {
    backgroundColor: "#E29821",
    borderRadius: 50,
    width: "50%",
    marginVertical: 10,
    padding: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  loginButton: {
    padding: 10,
  },
});

// settingProfile.navigationOptions = (navigationData) => {
//   return {
//     headerShown: false,
//   };
// };

export default settingProfile;
