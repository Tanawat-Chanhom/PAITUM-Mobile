import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Button from "./Button";
import Carousel from "react-native-snap-carousel";
import Comment from "./Comment";
import { Image as Loader } from "react-native-elements";
import { likedPost, deletePost } from "../services/post.service";

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
      like: props.data.detail.like,
      isDeleted: {
        status: false,
        isInProgress: false,
      },
    };
  }

  renderImage = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Loader
          style={styles.postImages}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
          source={{ uri: item }}
        />
      </View>
    );
  };

  handleLike = () => {
    likedPost().then((result) => {});
    if (this.state.liked === true) {
      this.setState({ liked: false, like: this.state.like - 1 });
    } else {
      this.setState({ liked: true, like: this.state.like + 1 });
    }
  };

  handleRemovePost = (postId) => {
    this.setState({ isDeleted: { status: false, isInProgress: true } });
    deletePost()
      .then((result) => {
        setTimeout(() => {
          this.setState({ isDeleted: { status: true, isInProgress: false } });
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    if (this.state.isDeleted.status) {
      return <></>;
    }

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
                />
                {this.state.userId === this.props.data.user.id ? (
                  <>
                    {this.state.isDeleted.isInProgress === true ? (
                      <ActivityIndicator
                        color="#fff"
                        style={styles.deleteButton}
                      />
                    ) : (
                      <Button
                        title={"Delet Post"}
                        style={styles.deleteButton}
                        color="#FFF"
                        fontSize={16}
                        onPress={() => {
                          this.handleRemovePost();
                        }}
                      />
                    )}
                  </>
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
        <Comment
          isShow={this.state.isShowComments}
          onClose={() => {
            this.setState({ isShowComments: false });
          }}
          navigation={this.props.navigation}
        />
        <View style={styles.header}>
          <View style={styles.profile}>
            <TouchableOpacity
              onPress={() => {
                if (this.props.profileNavigate === true) {
                  if (this.state.userId === this.props.data.user.id) {
                    this.props.navigation.navigate("Profile");
                  } else {
                    this.props.navigation.navigate("OtherProfile", {
                      id: this.props.data.user.id,
                    });
                  }
                }
              }}
            >
              <Loader
                style={styles.avatar}
                source={{ uri: this.props.data.user.avatar }}
                PlaceholderContent={<ActivityIndicator />}
              ></Loader>
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
              this.state.like >= 1000
                ? (this.state.like / 1000).toFixed(1) + "K Like"
                : this.state.like + " Like"
            }
            style={[
              styles.footerButton,
              {
                backgroundColor: this.state.liked === true ? "#E29821" : "#fff",
              },
            ]}
            onPress={this.handleLike}
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
    flexDirection: "row",
    marginTop: 5,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
  },
  footerButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    margin: 7,
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
