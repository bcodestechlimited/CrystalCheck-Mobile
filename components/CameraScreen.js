import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import VerifyImage from "./VerifyImage";

import { useLocalSearchParams } from "expo-router";
import CandidateVerifyImage from "./CandidateVerifyImage";
import axios from "axios";

import AWS from "aws-sdk";
import { Buffer } from "buffer";
import LiveCamera from "./LiveCamera";

const CameraScreen = () => {
  // const data = useLocalSearchParams();
  // console.log({
  //   lll: data,
  // });
  return (
    <View style={styles.container}>
      <LiveCamera />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
    justifyContent: "space-around", // Align buttons in a row
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain", // Make sure the image fits the screen
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: "red", // Background color for the cancel button
    padding: 10,
    borderRadius: 5,
  },
  cancelText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default CameraScreen;
