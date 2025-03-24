import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";

import { useMutation } from "react-query";

import Toast from "react-native-toast-message";
import { getToken } from "../redux/ApiConfig";
import { useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;
// import PDFView from "react-native-pdf";
const VerifySignature = ({ maindata, signature }) => {
  const data = useLocalSearchParams();

  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { user_data } = useSelector((state) => state.AuthSlice);
  const [loading, setLoading] = useState(true); // Add loading state
  const pdfUrl = `https://docs.google.com/gview?embedded=true&url=${data?.credential}`;

  const openWebLink = () => {
    const url = pdfUrl; //"https://example.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  const handleLoadStart = () => {
    setLoading(true); // Set loading to true when the WebView starts loading
  };

  const handleLoadEnd = () => {
    setLoading(false); // Set loading to false when the WebView finishes loading
  };

  const [reloadKey, setReloadKey] = useState(0); // Key to reload WebView

  const reloadWebView = () => {
    setReloadKey((prevKey) => prevKey + 1); // Change the key to force reload
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5, borderWidth: 1 }}>
        {signature && (
          <Image
            source={{ uri: signature }}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </View>

      <View
        style={{
          flex: 1,

          borderWidth: 1,
        }}
      >
        <View
          style={{
            // flexDirection: "row",
            flex: 1,
          }}
        >
          {loading && (
            <ActivityIndicator
              size="large"
              color="blue"
              // style={styles.loadingIndicator}
            />
          )}

          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "white",
              padding: 10,
              borderRadius: 5,
              alignSelf: "flex-end",
              position: "relative",
            }}
            onPress={reloadWebView}
          >
            <Text style={{ color: "blue", fontWeight: "bold" }}>Reload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // marginTop: 20,
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 5,
              alignSelf: "flex-end",
              position: "relative",
            }}
            // onPress={reloadWebView}
            onPress={openWebLink}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              View Document
            </Text>
          </TouchableOpacity>

          <WebView
            key={reloadKey} // Reload WebView when this key changes
            source={{ uri: pdfUrl }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onError={(error) => {
              Alert.alert("Error", "Failed to load the PDF.");
              console.log("PDF loading error:", error);
            }}
            onLoadStart={handleLoadStart} // Start loading
            onLoadEnd={handleLoadEnd} // End loading
          />
          {/* <WebView
            source={{ uri: pdfUrl }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onError={(error) => {
              Alert.alert("Error", "Failed to load the PDF.");
              console.log("PDF loading error:", error);
            }}
          /> */}
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            position: "relative",
            top: "12%",
          }}
        >
          <TouchableOpacity
            style={{
              position: "relative",
              top: -120,
              left: 10,
              zIndex: 10,
              backgroundColor: "blue",
              alignSelf: "flex-start",
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() =>
              router.push({
                pathname: "/TakePicture",
                params: {
                  signature: data?.signature,
                  guarantorId: data?.guarantorId,
                  guarantor_name: data?.guarantor_name,
                  credential: data?.credential,
                },
              })
            }
            // onPress={() => uploadToCloudinary(signature)}
            // onPress={() => Verfymutaion.mutate()}
            disabled={uploading} // Disable button while uploading
          >
            <Text style={{ color: "white", fontSize: 14 }}>
              {uploading ? "Uploading..." : "Verify"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              position: "relative",
              top: -120,
              left: 10,
              zIndex: 10,
              backgroundColor: "red",
              alignSelf: "flex-start",
              padding: 10,
              borderRadius: 10,
            }}
            // onPress={() => uploadToCloudinary(signature)}
            onPress={() => router.back()}
            disabled={uploading} // Disable button while uploading
          >
            <Text style={{ color: "white", fontSize: 14 }}>
              {uploading ? "Uploading..." : "No Match"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  signatureImage: {
    width: 300,
    height: 150,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default VerifySignature;
