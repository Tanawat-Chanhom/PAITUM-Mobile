import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Naviagator from "./navigation/root";
import { createStore } from "redux";
import { Provider } from "react-redux";
import indexReducer from "./store/reducer/index";

export default function App() {
  const store = createStore(indexReducer);

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Naviagator></Naviagator>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
