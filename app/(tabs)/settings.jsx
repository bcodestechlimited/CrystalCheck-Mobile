import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { Link } from "expo-router";
import SignatureScreen from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system"

export default function Settings({onOK, text}) {
  const ref = useRef();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = async (signature) => {
    try {
      const fileUri = FileSystem.documentDirectory + "signature.png"; // You can change the file extension to what you need
      await FileSystem.writeAsStringAsync(fileUri, signature, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log("Signature saved to:", fileUri);
      // onOK(fileUri); // Pass the file URI to the parent component or backend
    } catch (error) {
      console.error("Error saving the signature:", error);
      Alert.alert("Error", "Failed to save signature");
    }
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
    console.log(ref.current.readSignature)
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    console.log(data);
  };

  return (
    <SignatureScreen
      ref={ref}
      onEnd={handleEnd}
      
      // onOK={handleOK}
      onOK={handleOK}
      onEmpty={handleEmpty}
      onClear={handleClear}
      onGetData={handleData}
      autoClear={false}
      descriptionText={text}
    />
  );
}

const styles = StyleSheet.create({});
