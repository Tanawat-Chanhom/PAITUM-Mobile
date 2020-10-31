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
      <View>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigation.navigate("Login")}
        >
          <View style={styles.container}>
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
    backgroundColor: "#F1F1F1",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
