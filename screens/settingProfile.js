import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  DatePickerIOS,
} from "react-native";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../services/user.service";
import BackPage from "../components/BackPage";
import * as ImagePicker from "expo-image-picker";
import Alert from "../components/MyAlert";
import Button from "../components/Button";
import Model from "../components/Model";
import { Image as Loader } from "react-native-elements";
import { uploadImageToS3 } from "../util/aws";

const settingProfile = (props) => {
  const { userReducer } = useSelector((state) => state);
  const userId = userReducer.userId;
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Sending Data
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [stateGenderModel, setStateGenderModel] = useState(false);
  const [stateDateModel, setStateDateModel] = useState(false);
  const [userProfile, setUserProfile] = useState({
    caption: "",
    firstname: "",
    lastname: "",
    gender: "male",
    birthday: new Date(),
  });

  const isShowGender = (state) => {
    state === true ? setStateGenderModel(true) : setStateGenderModel(false);
  };
  const isShowDate = (state) => {
    state === true ? setStateDateModel(true) : setStateDateModel(false);
  };

  const dateSelecterComponent = (
    <View>
      <DatePickerIOS
        mode={"date"}
        date={userProfile.birthday}
        onDateChange={(result) => {
          setUserProfile({ ...userProfile, birthday: result });
        }}
      />
    </View>
  );

  const genderOptionComponent = (
    <View style={styles.genderContainer}>
      <View style={styles.genderButton}>
        <Button
          title={"Male"}
          color="black"
          onPress={() => {
            setUserProfile({ ...userProfile, gender: "male" });
            isShowGender(false);
          }}
        ></Button>
      </View>
      <View style={styles.genderButton}>
        <Button
          title={"Female"}
          color="black"
          onPress={() => {
            setUserProfile({ ...userProfile, gender: "female" });
            isShowGender(false);
          }}
        ></Button>
      </View>
    </View>
  );

  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };
    handleFatchData();
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

  const handleRefresh = async () => {
    handleFatchData();
  };

  const handleFatchData = () => {
    setRefreshing(true);
    getUserProfile(userId)
      .then((result) => {
        const {
          avatar,
          caption,
          firstname,
          lastname,
          gender,
          birthday,
          cover_image,
        } = result.data.user;
        setUserProfile({
          ...userProfile,
          caption: caption,
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          birthday: new Date(birthday),
        });
        setProfileImage(avatar);
        setCoverImage(cover_image);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        setAlert(true);
        setRefreshing(false);
        setErrorMessage("Server error.");
      });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let body = {
      ...userProfile,
      avartar:
        profileImage.split(":")[0] === "file"
          ? await uploadImageToS3("profile-image/", profileImage)
          : profileImage,
      cover_image:
        coverImage.split(":")[0] === "file"
          ? await uploadImageToS3("profile-image/", coverImage)
          : coverImage,
      birthday: userProfile.birthday.toISOString(),
    };
    console.log(body);
    await updateUserProfile(userId, body)
      .then(() => {
        props.navigation.navigate("Profile");
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <View>
      <BackPage
        navigation={props}
        path={"Setting"}
        isFlow={true}
        magin={10}
      ></BackPage>
      <Alert
        open={alert}
        value={errorMessage}
        close={() => {
          setAlert(false);
        }}
      ></Alert>
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
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={styles.profileImg}>
            <View style={[styles.ImgContainer]}>
              <TouchableOpacity
                onPress={() => {
                  pickImage(setProfileImage);
                }}
              >
                {profileImage === null ? (
                  <Image source={require("../assets/camera.png")} />
                ) : (
                  <Loader
                    source={{ uri: profileImage }}
                    style={styles.profileImage}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profileImg}>
            <View style={[styles.coverImgContainer]}>
              <TouchableOpacity
                onPress={() => {
                  pickImage(setCoverImage);
                }}
              >
                {coverImage === null ? (
                  <Image source={require("../assets/camera.png")} />
                ) : (
                  <Loader
                    source={{ uri: coverImage }}
                    style={styles.coverImage}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Caption</Text>
            <TextInput
              style={styles.textInput}
              value={userProfile.caption}
              placeholder="Web-Designner"
              onChangeText={(x) => {
                setUserProfile({ ...userProfile, caption: x });
              }}
            ></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Firstname</Text>
            <TextInput
              style={styles.textInput_nobd}
              value={userProfile.firstname}
              placeholder="Your Firstname"
              onChangeText={(x) => {
                setUserProfile({ ...userProfile, firstname: x });
              }}
            ></TextInput>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Lastname</Text>
            <TextInput
              style={styles.textInput_nobd}
              value={userProfile.lastname}
              placeholder="Your Lastname"
              onChangeText={(x) => {
                setUserProfile({ ...userProfile, lastname: x });
              }}
            ></TextInput>
          </View>
          {/* <View style={styles.textInputContainer}>
            <Text style={styles.text}>E-mail</Text>
            <TextInput
              style={styles.textInput_nobd}
              value={userProfile.email}
              placeholder="Your Email"
              keyboardType="email-address"
              onChangeText={(x) => {
                setUserProfile({ ...userProfile, email: x });
              }}
            ></TextInput>
          </View> */}
          <View style={styles.textInputContainer}>
            <Text style={styles.text}>Gender</Text>
            <View style={styles.selecterContainer}>
              <Text
                style={styles.genderText}
                onPress={() => {
                  isShowGender(true);
                }}
              >
                {userProfile.gender === "male" ? "Male" : "Female"}
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
                {userProfile.birthday.toLocaleDateString()}
              </Text>
            </View>
          </View>

          <View style={{ alignItems: "center", paddingBottom: 20 }}>
            <View style={styles.login_button_container}>
              {isLoading === true ? (
                <View style={{ margin: 10 }}>
                  <ActivityIndicator color="#fff" />
                </View>
              ) : (
                <Button
                  color="#FFFFFF"
                  title={"SAVE"}
                  style={styles.loginButton}
                  onPress={() => handleSubmit()}
                  fontSize={14}
                ></Button>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: -Constants.statusBarHeight,
  },
  scrollView: {
    height: "100%",
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
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
  coverImgContainer: {
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
    borderColor: "#707070",
    height: 175,
    width: 175,
    borderWidth: 2,
    borderRadius: 100,
  },
  coverImage: {
    borderColor: "#707070",
    height: 145,
    width: 300,
    borderWidth: 2,
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
  genderText: {
    color: "#A9C3BC",
    fontWeight: "bold",
    fontSize: 14,
  },
  selecterContainer: {
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 5,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  genderButton: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
    height: 100,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default settingProfile;
