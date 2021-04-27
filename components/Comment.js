import React, { Component } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Button from "./Button";
import { Image as Loader } from "react-native-elements";
import { getPostById, sendCommentPost } from "../services/post.service";
import { getUserProfile } from "../services/user.service";
import { useNavigation } from "@react-navigation/native";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowComments: props.isShow,
      onClose: props.onClose,
      comments: [],
      refreshing: false,
      navigation: props.navigation,
      postId: props.postId,
      userId: props.userId,
      message: "",
      isPendding: false,
      userData: {},
    };
  }

  componentDidMount() {
    getUserProfile(this.state.userId).then((result) => {
      this.setState({ userData: result.data.user });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      isShowComments: nextProps.isShow,
    });
    this.fatchData();
  }

  onRefresh = () => {
    this.setState({ comments: [] });
    this.fatchData();
  };

  fatchData = () => {
    this.setState({ refreshing: true });
    getPostById(this.state.postId).then((result) => {
      this.setState({
        comments: result.data.review.commenBy,
        refreshing: false,
      });
    });
  };

  handleComment = () => {
    let body = {
      userId: this.state.userId,
      reviewId: this.state.postId,
      message: this.state.message,
    };
    this.setState({ isPendding: true });

    sendCommentPost(body)
      .then((result) => {
        if (result.data.status === 201) {
          let newArray = this.state.comments;
          newArray.unshift({
            id: this.state.userId,
            avartar: this.state.userData.avartar,
            comments: {
              message: body.message,
            },
          });
          this.setState({
            comments: newArray,
          });
          this.setState({ isPendding: false });
        } else {
          this.setState({ isPendding: false });
        }
      })
      .catch((error) => {
        this.setState({ isPendding: false });
        console.error(error);
      });

    // {
    //   "id": 2,
    //   "username": "nobiaccess",
    //   "firstname": "Tanawat",
    //   "lastname": "Chanhom",
    //   "avartar": null,
    //   "comments": {
    //     "id": 1,
    //     "message": "I like this!!",
    //     "deleteAt": null,
    //     "createdAt": "2021-04-26T10:23:44.124Z",
    //     "updatedAt": "2021-04-26T10:23:44.124Z",
    //     "userId": 2,
    //     "reviewId": 1
    //   }
    // }
  };

  render() {
    return (
      <View styl={styles.madelContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isShowComments}
        >
          <View style={styles.elementContainer}>
            <View
              style={[
                styles.modalView,
                {
                  height: "80%",
                  paddingLeft: 10,
                  paddingRight: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                },
              ]}
            >
              <View style={styles.commentBar}>
                <TextInput
                  placeholder="Say Something"
                  style={styles.commentInput}
                  value={this.state.message}
                  onChangeText={(text) => {
                    this.setState({
                      message: text,
                    });
                  }}
                ></TextInput>
                <View style={styles.commentIcon}>
                  {this.state.isPendding === true ? (
                    <ActivityIndicator />
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        if (this.state.message === "") {
                          return null;
                        }
                        this.handleComment();
                      }}
                    >
                      <Image
                        source={require("../assets/send.png")}
                        style={{ width: 26, height: 26 }}
                      ></Image>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <SafeAreaView>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.onRefresh}
                    />
                  }
                  style={styles.scrollView}
                >
                  {this.state.comments.map((data, index) => {
                    return (
                      <View style={styles.container} key={index}>
                        <TouchableOpacity
                          onPress={() => {
                            this.state.navigation.navigate("OtherProfile", {
                              id: data.id,
                            });
                            this.state.onClose();
                          }}
                        >
                          <Loader
                            source={{
                              uri:
                                data.avatar ||
                                "https://www.pinclipart.com/picdir/big/133-1331433_free-user-avatar-icons-happy-flat-design-png.png",
                            }}
                            PlaceholderContent={<ActivityIndicator />}
                            style={styles.avatar}
                          ></Loader>
                        </TouchableOpacity>
                        <Text style={styles.message}>
                          {data.comments.message}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </SafeAreaView>
            </View>
            <Button
              title="Close"
              style={styles.cancelButton}
              color="#fff"
              fontSize={16}
              onPress={() => {
                this.state.onClose();
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
  },
  scrollView: {
    height: "90%",
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "#111",
  },
  avatar: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 100,
    marginRight: 10,
    alignSelf: "flex-start",
  },
  message: {
    fontSize: 14,
    flex: 1,
  },
  madelContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  cancelButton: {
    padding: 20,
    backgroundColor: "#E16A6A",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: "stretch",
    margin: 20,
    marginTop: 5,
  },
  modalView: {
    alignSelf: "stretch",
    margin: 20,
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // flex: 1,
  },
  elementContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  commentInput: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 35,
    backgroundColor: "#F1F1F1",
    borderRadius: 100,
    flex: 1,
    marginRight: 5,
  },
  commentBar: {
    height: "10%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  commentIcon: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
