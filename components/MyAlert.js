import React, { useState, Component } from "react";
import { StyleSheet, Text, View, PanResponder, Animated } from "react-native";
import Constants from "expo-constants";

export default class MyAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      fadeAnim: new Animated.Value(-200),
      opacity: new Animated.Value(0),
      timeOut: props.timeOut || 4000,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.open === true) {
      this.in();
    } else {
      this.out();
    }
  }

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy < -20) {
        this.out();
        this.props.close();
      } else {
        this.state.fadeAnim.setValue((gestureState.dy + 100) / 4);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        this.in();
      }
    },
  });

  in = () => {
    Animated.spring(this.state.fadeAnim, {
      toValue: 20,
      duration: 1000,
      stiffness: 150,
      damping: 12,
      useNativeDriver: false,
    }).start();
    Animated.spring(this.state.opacity, {
      toValue: 1,
      stiffness: 150,
      damping: 12,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      this.out();
    }, this.state.timeOut);
  };

  out = () => {
    Animated.spring(this.state.fadeAnim, {
      toValue: -100,
      useNativeDriver: false,
    }).start();
    Animated.spring(this.state.opacity, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.modalView,
          {
            transform: [{ translateY: this.state.fadeAnim }],
            opacity: this.state.opacity,
            backgroundColor:
              this.props.backgroundColor || styles.modalView.backgroundColor,
            marginLeft: this.props.margin,
            marginRight: this.props.margin,
          },
        ]}
        {...this.panResponder.panHandlers}
      >
        <View style={styles.elementContainer}>
          <Text
            style={[
              styles.alertText,
              { color: this.props.color || styles.alertText.color },
            ]}
          >
            {this.props.value || "Sample Text"}
          </Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    position: "absolute",
    padding: 15,
    marginTop: Constants.statusBarHeight,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#F1F1F1",
    zIndex: 9999,
    alignSelf: "center",
  },
  alertText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E16A6A",
    alignSelf: "center",
    textAlign: "center",
  },
});
