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
} from "react-native";
import Button from "./Button";
import { getPostComments } from "../services/post.service";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowComments: props.isShow,
      onClose: props.onClose,
      comments: [],
      refreshing: false,
    };
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
    getPostComments().then((result) => {
      this.setState({
        comments: result.data,
        refreshing: false,
      });
    });
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
              <SafeAreaView style={{ height: "100%" }}>
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
                        <Image
                          source={{ uri: data.avatar }}
                          style={styles.avatar}
                        ></Image>
                        <Text style={styles.message}>{data.message}</Text>
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
    borderRadius: 10,
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
    marginBottom: 10,
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
