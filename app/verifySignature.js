import React, { useRef, useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import axios from "axios";
import { colors } from "../utills/Themes";
import { useLocalSearchParams, useRouter } from "expo-router";
import VerifySignature from "../components/VerifySignature";

const verifySignature = () => {
  const data = useLocalSearchParams();
  const navigate = useRouter();

  const ref = useRef();
  const [signature, setSignature] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSignature = (signature) => {
    setSignature(signature);
  };

  // Upload to Cloudinary function
  const uploadToCloudinary = async (base64Data) => {
    const cloudName = "dkzds0azx"; // Replace with your Cloudinary cloud name
    const uploadPreset = "ydnmnjxq"; // Replace with your Cloudinary upload preset

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    setUploading(true);

    // Prepare data for Cloudinary upload
    const formData = new FormData();
    formData.append("file", base64Data); // base64Data is already a base64 image string
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploading(false);
      Alert.alert("Upload Success", "Signature uploaded successfully!");
      console.log("Cloudinary Response:", response.data);

      navigate.push({
        pathname: "/verifySignature",
        params: { data },
      });
    } catch (error) {
      setUploading(false);
      Alert.alert("Upload Failed", "An error occurred while uploading.");
      console.error("Upload Error:", error);
    }
  };

  const handleClear = () => {
    ref.current.clear();
    setSignature(null);
  };

  const ProceedScreen = () => {
    if (signature) {
      navigate.push({
        pathname: "/verifySignature",
        params: { data, signature },
      });
    } else {
      console.log("you have to alret  to move ");
    }
  };

  const webStyle = `
    body {
      background-color: white;
      height:300px;
    }
    .m-signature-pad {
      background-color: transparent;
      margin-left: -5px;
      margin-top: -25px;
    }
    .m-signature-pad--footer {
      display: flex;
      justify-content: space-around;
      padding: 10px;
    }
    .m-signature-pad--footer .button {
      background-color: #1710E1;
      color: white;
      font-size: 16px;
      border-radius: 8px;
    }
  `;

  return (
    <VerifySignature
      maindata={data}
      signature={data?.signature}
      garantoritem={data}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  signatureContainer: {
    width: "100%",
    height: 500,
    marginBottom: 20,
  },
  signatureImage: {
    width: 300,
    height: 150,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default verifySignature;
