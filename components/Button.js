import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button({
  fontSize,
  onPress,
  title,
  color,
  style,
  iconSize,
  icon,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={style || styles.container}>
      <Text
        style={{
          color: color,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: fontSize,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 13,
    paddingRight: 13,
    backgroundColor: "#F1F1F1",
    borderRadius: 5,
  },
});
