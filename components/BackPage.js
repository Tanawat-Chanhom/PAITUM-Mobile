import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

export default class backPage extends Component {
  render() {
    return (
      <View
        style={{
          position: this.props.isFlow === true ? "absolute" : "relative",
          zIndex: 99,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigation.navigate(
              this.props.path || "Login"
            )
          }
        >
          <View style={[styles.container, { margin: this.props.magin }]}>
            <Image
              style={styles.image}
              source={require("../assets/arrow-pointing-to-left.png")}
            ></Image>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 41,
    height: 41,
    backgroundColor: "#ebe9e6",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
