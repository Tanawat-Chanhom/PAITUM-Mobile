import React, { useState, Component } from "react";
import { Alert, Modal, StyleSheet, Text, View, Button } from "react-native";

export default class Model extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.show === true ? (
          <View style={styles.backgroundColor} />
        ) : (
          <></>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.show}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.elementContainer}>
            <View style={styles.modalView}>{this.props.component}</View>
            <View style={styles.cancelButton}>
              <Button
                title={"Cancel"}
                color="white"
                onPress={() => {
                  this.props.cencel(false);
                }}
              ></Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  elementContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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
  },
  title: {
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    fontSize: 18,
  },
  cancelButton: {
    padding: 10,
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
  backgroundColor: {
    position: "absolute",
    backgroundColor: "#989898",
    width: "120%",
    height: "100%",
    opacity: 0.25,
  },
});
