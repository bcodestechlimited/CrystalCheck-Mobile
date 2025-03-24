import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function Guarantorsignaturereviwe({ route }) {
  //   const { fileUri } = route.params; // Get the file URI from the route params
  const data = useLocalSearchParams();
  console.log({
    llll: data,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guarantor's Signature</Text>
      <Image
        source={{ uri: data?.signatureData }}
        style={styles.signatureImage}
        // resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#02052F",
    marginBottom: 20,
  },
  signatureImage: {
    width: "100%",
    height: 1300,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
