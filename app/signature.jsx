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
import { useSelector } from "react-redux";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const Signature = () => {
  const data = useLocalSearchParams();
  const navigate = useRouter();

  const { user_data, user_data_isLoading } = useSelector(
    (state) => state?.AuthSlice
  );

  console.log({
    gff: user_data?.data?.token,
  });

  console.log({
    jkj: data,
    // guarantorId: data?.guarantorId,
    // guarantor_name: data?.guarantor_name,
    // credential: data?.credential,
  });

  const ref = useRef();
  const [signature, setSignature] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSignature = (signature) => {
    setSignature(signature);
  };

  const handleClear = () => {
    ref.current.clear();
    setSignature(null);
  };

  const ProceedScreen = async () => {
    if (!signature) {
      Alert.alert("Error", "You must provide a signature to proceed.");
      return;
    }

    setUploading(true); // Set a loading state if needed
    // navigate.push({
    //   pathname: "/verifySignature",
    //   params: {
    //     signature,
    //     guarantorId: data?.guarantorId,
    //     guarantor_name: data?.guarantor_name,
    //     credential: data?.credential,
    //   },
    // });
    try {
      const response = await axios.put(
        `${API_BASEURL}v1/guarantors/${data?.guarantorId}`, // Replace `{{base_URL}}` with the actual base URL
        {
          // signature,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user_data?.data?.token}`,

            // Include any authorization headers if required
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Signature saved successfully!");

        navigate.push({
          pathname: "/verifySignature",
          params: {
            signature,
            guarantorId: data?.guarantorId,
            guarantor_name: data?.guarantor_name,
            credential: data?.credential,
          },
        });
      } else {
        Alert.alert("Error", "Failed to save the signature. Please try again.");
      }
    } catch (error) {
      // console.error("Error saving signature:", error?.response?.data?.message);
      // Alert.alert(
      //   "Error",
      //   `${error?.response?.data?.message} Forged Signature reach out to supervisor for issues.`
      // );

      console.log({
        uuu: error?.response?.data,
      });

      Alert.alert(
        "Error",
        `${error?.response?.data?.message}: Forged Signature\nreach out to supervisor for issues.`
      );
    } finally {
      setUploading(false); // Reset loading state
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
    <View style={styles.container}>
      <View style={styles.signatureContainer}>
        <SignatureScreen
          ref={ref}
          onOK={handleSignature}
          onEmpty={() => console.log("Empty")}
          descriptionText="Sign"
          clearText="Clear"
          confirmText="Save"
          webStyle={webStyle}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end", // Push content to the bottom
          paddingBottom: 20,
        }}
      >
        {signature && (
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 12,
              paddingHorizontal: 20,
              alignSelf: "flex-start", // Center horizontally if needed
              borderRadius: 10,
            }}
            onPress={ProceedScreen}

            // onPress={() => {
            //   navigate.push({
            //     pathname: "/verifySignature",
            //     params: {
            //       signature,
            //       guarantorId: data?.guarantorId,
            //       guarantor_name: data?.guarantor_name,
            //       credential: data?.credential,
            //     },
            //   });
            // }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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

export default Signature;
