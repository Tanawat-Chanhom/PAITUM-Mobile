import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-elements";
import BackPage from "../components/BackPage";
import Alert from "../components/MyAlert";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { createPost as createPostService } from "../services/post.service";
import { getUserProfile } from "../services/user.service";

const createPost = (props) => {
  let { data } = props.navigation.state.params; // Passing restaurant data from restaurant page
  const { userReducer } = useSelector((state) => state);
  const userId = userReducer.userId;

  const [userProfile, setUserProfile] = useState({});
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(3);
  const [reander, setreander] = useState(0);
  const [alert, setAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createPostInProgress, setCreatePostInProgress] = useState(false);

  useEffect(() => {
    async function fatchData() {
      await getUserProfile(userId)
        .then((result) => {
          let userData = result.data.user;
          setUserProfile(userData);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fatchData();
  }, [images, description]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let updateArray = images;
      updateArray.push(result.uri);
      setImages(updateArray);
    }
    setreander(reander + 1);
  };

  function AddZero(num) {
    return num >= 0 && num < 10 ? "0" + num : num + "";
  }

  const createPost = () => {
    let now = new Date();
    let strDateTime = [
      [
        AddZero(now.getDate()),
        AddZero(now.getMonth() + 1),
        now.getFullYear(),
      ].join("/"),
      [AddZero(now.getHours()), AddZero(now.getMinutes())].join(":"),
      now.getHours() >= 12 ? "PM" : "AM",
    ].join(" ");

    let body = {
      userId: userProfile.id,
      user: {
        name: userProfile.name,
        createAt: strDateTime,
        id: userProfile.id,
        avatar: userProfile.avatar,
      },
      detail: {
        restaurantId: data.id,
        image: [
          "https://img.taste.com.au/s7LrmKGe/w733-h489-cfill-q80/taste/2018/02/healthy-beef-mince-thai-noodle-salad-135046-1.jpg",
          "https://i.pinimg.com/736x/3c/19/8d/3c198d1e76cd489f179353f95771ce88.jpg",
          "https://www.irvingyummythai.com/wp-content/uploads/2019/07/Common_Thai_Food_Misconceptions.jpg",
        ],
        discription: description,
        view: 0,
        like: 0,
        comments: [],
        liked: false,
      },
      star: rating,
    };
    setCreatePostInProgress(true);
    createPostService(body, data.id)
      .then((res) => {
        setAlert(true);
        setErrorMessage(res.status.message || "Create success.");
        setCreatePostInProgress(false);
      })
      .catch((err) => {
        setAlert(true);
        setErrorMessage(err.message || "Server error.");
        setCreatePostInProgress(false);
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
        isFlow={true}
      ></Alert>
      <BackPage
        navigation={props}
        path={"Restaurant"}
        isFlow={true}
        magin={10}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.detailContainer}>
            <View style={{ height: 50 }}>
              <Image
                source={{ uri: data.avatar }}
                style={styles.avatar}
              ></Image>
            </View>
            <TextInput
              multiline
              placeholder="Type something"
              style={styles.textInput}
              value={description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            ></TextInput>
          </View>
          <View style={styles.ratingContainer}>
            <Rating
              type="custom"
              ratingBackgroundColor="#c8c7c8"
              ratingCount={5}
              imageSize={50}
              showRating
              onFinishRating={(e) => {
                setRating(e);
              }}
              style={{ paddingVertical: 10 }}
            />
          </View>
          <Text style={styles.imagesText}>Images</Text>
          <View style={styles.imagesContainer}>
            {images.map((path, index) => {
              return (
                <View style={[styles.imageBox]} key={index}>
                  <Image
                    source={{ uri: path }}
                    style={{ width: "100%", aspectRatio: 1 }}
                  />
                </View>
              );
            })}
            <View style={[styles.imageBox]}>
              <Image
                source={{
                  uri:
                    "https://img.taste.com.au/s7LrmKGe/w733-h489-cfill-q80/taste/2018/02/healthy-beef-mince-thai-noodle-salad-135046-1.jpg",
                }}
                style={{ width: "100%", aspectRatio: 1 }}
              />
            </View>
            <View style={[styles.imageBox]}>
              <Image
                source={{
                  uri:
                    "https://i.pinimg.com/736x/3c/19/8d/3c198d1e76cd489f179353f95771ce88.jpg",
                }}
                style={{ width: "100%", aspectRatio: 1 }}
              />
            </View>
            <View style={[styles.imageBox]}>
              <Image
                source={{
                  uri:
                    "https://www.irvingyummythai.com/wp-content/uploads/2019/07/Common_Thai_Food_Misconceptions.jpg",
                }}
                style={{ width: "100%", aspectRatio: 1 }}
              />
            </View>
            <TouchableOpacity onPress={pickImage}>
              <View style={[styles.imageBox, styles.contentCenter]}>
                <Image source={require("../assets/plus.png")}></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            {createPostInProgress ? (
              <ActivityIndicator color="#fff" style={styles.createButton} />
            ) : (
              <Button
                title={"POST"}
                style={styles.createButton}
                color={"#ffffff"}
                onPress={() => {
                  createPost();
                }}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  safeAreaView: {
    marginTop: -Constants.statusBarHeight,
    // height: "100%",
  },
  scrollView: {
    height: "100%",
  },
  detailContainer: {
    borderWidth: 1,
    marginTop: 90,
    borderRadius: 10,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 100,
    borderWidth: 1,
    transform: [{ translateY: -48 }],
    alignSelf: "center",
    position: "absolute",
  },
  textInput: {
    alignSelf: "stretch",
    padding: 10,
    margin: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  ratingContainer: {
    alignSelf: "stretch",
    marginTop: 10,
    marginBottom: 10,
  },
  imagesText: {
    fontSize: 30,
    color: "#E29821",
    fontWeight: "600",
  },
  imagesContainer: {
    alignSelf: "stretch",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 3,
  },
  imageBox: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 15,
    margin: 5,
    overflow: "hidden",
    backgroundColor: "#f1f1f1",
  },
  contentCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginTop: 20,
    marginBottom: 30,
    width: "100%",
  },
  createButton: {
    backgroundColor: "#E29821",
    padding: 10,
    alignSelf: "center",
    width: "80%",
    borderRadius: 100,
  },
});

// createPost.navigationOptions = (navigationData) => {
//   return {
//     tabBarVisible: false,
//   };
// };

export default createPost;
