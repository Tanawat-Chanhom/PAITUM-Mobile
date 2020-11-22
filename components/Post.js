import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import Button from "./Button";
import Carousel from "react-native-snap-carousel";
import Comment from "./Comment";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentLayout: {},
      numberOfLines: 3,
      modelIsShow: false,
      isShowComments: false,
      liked: props.data.detail.liked,
      userId: props.userId,
      comments: props.data.detail.comments,
      message: "",
    };
  }

  renderImage = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.postImages} source={{ uri: item }}></Image>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View styl={styles.madelContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modelIsShow}
          >
            <View style={styles.elementContainer}>
              <View style={styles.modalView}>
                <Button
                  title={"View Restaurant"}
                  style={styles.viewRestaurant}
                  color="#111"
                  fontSize={16}
                  onPress={() => {
                    this.props.navigation.navigate("RestaurantStack", {
                      id: this.props.data.detail.restaurantId,
                    });
                    this.setState({
                      modelIsShow: false,
                    });
                  }}
                ></Button>
                {this.state.userId === this.props.data.user.uid ? (
                  <Button
                    title={"Delet Post"}
                    style={styles.deleteButton}
                    color="#FFF"
                    fontSize={16}
                  ></Button>
                ) : (
                  <></>
                )}
              </View>
              <Button
                title="Cancel"
                style={styles.cancelButton}
                color="#fff"
                fontSize={16}
                onPress={() => {
                  this.setState({
                    modelIsShow: false,
                  });
                }}
              ></Button>
            </View>
          </Modal>
        </View>
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
                <SafeAreaView style={{ height: "100%" }}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                  >
                    <View style={styles.commentBar}>
                      <TextInput
                        placeholder="Type Something"
                        style={styles.commentInput}
                        value={this.state.message}
                        onChangeText={(text) => {
                          this.setState({
                            message: text,
                          });
                        }}
                      ></TextInput>
                      <View style={styles.commentIcon}>
                        <TouchableOpacity
                          onPress={() => {
                            if (this.state.message === "") {
                              return null;
                            }
                            let updataArray = this.state.comments;
                            updataArray.unshift({
                              uid: "1234",
                              avatar:
                                "https://images.unsplash.com/photo-1500239524810-5a6e76344a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                              message: this.state.message,
                            });
                            this.setState({
                              message: "",
                              comments: updataArray,
                            });
                          }}
                        >
                          <Image
                            source={require("../assets/send.png")}
                            style={{ width: 26, height: 26 }}
                          ></Image>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {this.state.comments.map((data) => {
                      return <Comment data={data}></Comment>;
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
                  this.setState({
                    isShowComments: false,
                  });
                }}
              ></Button>
            </View>
          </Modal>
        </View>
        <View style={styles.header}>
          <View style={styles.profile}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Profile");
              }}
            >
              <Image
                style={styles.avatar}
                source={{ uri: this.props.data.user.avatar }}
              ></Image>
            </TouchableOpacity>
            <View style={styles.profileDetail}>
              <Text
                style={{ color: "#413C58", fontSize: 14, fontWeight: "700" }}
              >
                {this.props.data.user.name}
              </Text>
              <Text
                style={{ color: "#BFD7B5", fontSize: 13, fontWeight: "700" }}
              >
                {this.props.data.user.createAt}
              </Text>
            </View>
          </View>
          <Button
            title={"more"}
            color="#6E6E6E"
            fontSize={13}
            onPress={() => {
              this.setState({
                modelIsShow: true,
              });
            }}
          ></Button>
        </View>
        <View
          style={styles.content}
          onLayout={(e) => {
            this.setState({
              contentLayout: e.nativeEvent.layout,
            });
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (this.state.numberOfLines > 0) {
                this.setState({
                  numberOfLines: null,
                });
              } else {
                this.setState({
                  numberOfLines: 3,
                });
              }
            }}
          >
            <Text numberOfLines={this.state.numberOfLines}>
              {this.props.data.detail.discription}
            </Text>
          </TouchableOpacity>
          <View style={styles.carousel}>
            <Carousel
              data={this.props.data.detail.image}
              renderItem={this.renderImage}
              layout={"default"}
              sliderWidth={this.state.contentLayout.width || 300}
              itemWidth={300}
              itemHeight={300}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            title={
              this.props.data.detail.view >= 1000
                ? (this.props.data.detail.view / 1000).toFixed(1) + "K View"
                : this.props.data.detail.view + " View"
            }
            style={styles.footerButton}
          ></Button>
          <Button
            title={
              this.props.data.detail.like >= 1000
                ? (this.props.data.detail.like / 1000).toFixed(1) + "K Like"
                : this.props.data.detail.like + " Like"
            }
            style={[
              styles.footerButton,
              {
                backgroundColor: this.state.liked === true ? "#E29821" : "#fff",
              },
            ]}
            onPress={() => {
              if (this.state.liked === true) {
                this.setState({ liked: false });
              } else {
                this.setState({ liked: true });
              }
            }}
          ></Button>
          <Button
            title={
              this.state.comments.length >= 1000
                ? (this.state.comments.length / 1000).toFixed(1) + "K Com."
                : this.state.comments.length + " Com."
            }
            style={styles.footerButton}
            onPress={() => {
              if (this.state.isShowComments === true) {
                this.setState({ isShowComments: false });
              } else {
                this.setState({ isShowComments: true });
              }
            }}
          ></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#E29821",
    borderRadius: 100,
    marginRight: 5,
  },
  profileDetail: {
    display: "flex",
    justifyContent: "center",
  },
  content: {},
  postImages: {
    width: 300,
    height: 300,
  },
  carousel: {
    marginTop: 10,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-evenly",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
  },
  footerButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    margin: 10,
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
  viewRestaurant: {
    backgroundColor: "#F1F1F1",
    padding: 20,
    borderRadius: 15,
    margin: 10,
  },
  deleteButton: {
    backgroundColor: "#E16A6A",
    padding: 20,
    borderRadius: 15,
    margin: 10,
  },
  commentInput: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    backgroundColor: "#F1F1F1",
    borderRadius: 100,
    flex: 1,
    marginRight: 5,
  },
  commentBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
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

// Object {
//   "detail": Object {
//     "comments": 3000,
//     "discription": "Ratiorg got statues of different sizes as a present from CodeMaster for his birthday, each statue having an non-negative integer size. Since he likes to make things",
//     "image": Array [
//       "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
//       "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
//       "https://blog.opentable.com/wp-content/uploads/sites/108/2017/10/blog-Urbana_Washington-DC-copy.jpeg",
//     ],
//     "like": 10000,
//     "view": 1000,
//   },
//   "user": Object {
//     "avatar": "https://images.unsplash.com/photo-1500239524810-5a6e76344a17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     "createAt": "3 mins ago",
//     "name": "Tanwat Chanhom",
//     "uid": 2,
//   },
// }
