import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Link } from "expo-router";
import SignatureScreen from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";

export default function SignatureTab({ onSave, text, onCleardata }) {
  const ref = useRef();

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = async (signature) => {
    try {
      const fileUri = FileSystem.documentDirectory + "signature.png"; // You can change the file extension to what you need
      await FileSystem.writeAsStringAsync(fileUri, signature, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Alert.alert("Signature saved to:", fileUri);
      onSave(fileUri); // Pass the file URI to the parent component or backend
    } catch (error) {
      console.error("Error saving the signature:", error);
      Alert.alert("Error", "Failed to save signature");
    }
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
    onCleardata(ref);
    // .current.clearSignature();
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
    onSave(null); // Pass the file URI to the parent component or backend
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
    onSave(null); // Pass the file URI to the parent component or backend

    console.log(ref.current.readSignature);
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    console.log(data);
  };

  const webStyle = `
  body {
    background-color: white; /* Set your desired background color here */
      height:300px
    }
  .m-signature-pad {
    background-color: transparent; /* Keeps the drawing area transparent */
margin-left:-5px;
margin-top:-25px;

  }
  .m-signature-pad--footer {
    display: flex;
    justify-content: space-around;
    padding: 10px;
border:2px soild red;

  }
  .m-signature-pad--footer .button {
    background-color: #1710E1;
    color: white;
    font-size: 16px;
    border-radius: 8px;
    border:2px soild red;

  }

`;

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignSelf: "center",
        height: "100%",

        // borderWidth: 1,
      }}
    >
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
        webStyle={webStyle}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
