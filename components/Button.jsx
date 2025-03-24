import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function Button({ text, color, action }) {
  return (
    <TouchableOpacity onPress={action} style={[styles.button, { backgroundColor: color }]}>
      <Text
        style={{
          color: color === "white" ? "#02052F" : "white",
          fontSize: 16,
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    padding: 12,
  },
});
