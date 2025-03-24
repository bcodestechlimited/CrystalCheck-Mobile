import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import { getToken } from "../redux/ApiConfig";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import {
  Get_All_Assigned_guarantor__Fun,
  Get_All_Candidate_Fun,
} from "../redux/CandiddateSlice";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const CandidateVerifyImage = ({ image_Date }) => {
  const data = useLocalSearchParams();
  const themainifodata = useLocalSearchParams();
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [complete, setComplete] = useState(false);
  const router = useRouter();
  const { user_data } = useSelector((state) => state.AuthSlice);

  const signature = data?.signature;
  const guarantor_number = data?.guarantor_number;

  const [baseimg, setBaseimg] = useState("");

  const Verfymutaion = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}v1/candidates/address/submit`;

      console.log({
        lll: data_info,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: () => {
        dispatch(Get_All_Assigned_guarantor__Fun());
        dispatch(Get_All_Candidate_Fun());

        Toast.show({ type: "success", text1: "Verification successful!" });
        setShowModal(false);
        setComplete(true);
      },
      onError: (error) => {
        console.log({
          mainerror: error?.response?.data,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const uploadToCloudinary = async (base64Data) => {
    const cloudName = "dkzds0azx"; // Replace with your Cloudinary cloud name
    const uploadPreset = "ydnmnjxq"; // Replace with your Cloudinary upload preset
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    setUploading(true); // Show loading indicator

    // Prepare data for Cloudinary upload
    const formData = new FormData();
    formData.append("file", base64Data);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;

      // Verfymutaion.mutate(maindata?.url);
    } catch (error) {
      setUploading(false); // Hide loading indicator
      Alert.alert("Upload Failed", "An error occurred while uploading.");
      console.error("Upload Error:", error);
      throw new Error("Image upload failed");
    }
  };

  const ImageuploadToCloudinary = async () => {
    const cloudName = "dkzds0azx"; // Replace with your Cloudinary cloud name
    const uploadPreset = "ydnmnjxq"; // Replace with your Cloudinary upload preset
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    setUploading(true); // Show loading indicator

    const base64Image = await FileSystem.readAsStringAsync(image_Date, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Prepare the Base64 data in the format Cloudinary expects
    const base64Data = `data:image/jpeg;base64,${base64Image}`;

    // Prepare data for Cloudinary upload
    const formData = new FormData();
    formData.append("file", base64Data);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;

      // Verfymutaion.mutate(maindata?.url);
    } catch (error) {
      setUploading(false); // Hide loading indicator
      Alert.alert("Upload Failed", "An error occurred while uploading.");
      console.error("Upload Error:", error);
    }
  };

  const handleVerification = async () => {
    try {
      setUploading(true); // Start loading indicator

      // // First, upload the image using ImageuploadToCloudinary
      // const SignantureToCloudinary = await uploadToCloudinary(signature);
      const uploadedImageData = await ImageuploadToCloudinary();

      let data = {
        candidateId: themainifodata?.candidateId,
        addressPhoto: uploadedImageData?.secure_url,
        remark: text,
      };

      Verfymutaion.mutate(data);

      setUploading(false); // Start loading indicator

      // After the image is uploaded, trigger the verification mutation
      // Verfymutaion.mutate({ signature: uploadedImageData?.url });
    } catch (error) {
      // Handle any errors that occur during the process
      setUploading(false); // Hide loading indicator
      Alert.alert("Error", `Something went wrong: ${error.message}`);
      console.error("Error during verification:", error);
    }
  };

  const pdfUrl = `https://docs.google.com/gview?embedded=true&url=${data?.credential}`;
  const [loading, setLoading] = useState(true); // Add loading state

  const [reloadKey, setReloadKey] = useState(0); // Key to reload WebView

  const reloadWebView = () => {
    setReloadKey((prevKey) => prevKey + 1); // Change the key to force reload
  };

  const handleLoadStart = () => {
    setLoading(true); // Set loading to true when the WebView starts loading
  };

  const handleLoadEnd = () => {
    setLoading(false); // Set loading to false when the WebView finishes loading
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <View style={styles.container}>
      {/* <Text>emeka</Text> */}
      <View
        style={{
          // flex: 1,
          padding: 20,
          // backgroundColor: "#F5F5F5",
          // borderWidth: 1,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Candidate Address Image
        </Text>

        <Text>Name: {`${data?.firstname} ${data?.surname}`}</Text>
      </View>
      <View style={{ flex: 0.7, borderWidth: 1, height: 300 }}>
        {image_Date && (
          <Image
            source={{ uri: image_Date }}
            style={{
              width: "60%",
              height: "100%",
              alignSelf: "center",
              // marginVertical: 10,
            }}
          />
        )}
      </View>

      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.webViewContainer}>
          {/* <TextInput
          style={{
            width: "100%",
            height: 100,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            fontSize: 16,
            textAlignVertical: "top",
          }}
          placeholder="Enter your text here..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          value={text}
          onChangeText={(value) => setText(value)}
        /> */}

          <TextInput
            style={{
              width: "100%",
              height: 100,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              fontSize: 16,
              textAlignVertical: "top",
            }}
            placeholder="Enter your Remark here..."
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
            value={text}
            onChangeText={(value) => setText(value)}
            onEndEditing={() => Keyboard.dismiss()} // Dismiss keyboard when done typing
          />

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              position: "relative",
              top: "50%",
            }}
          >
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => setShowModal(true)}
              disabled={uploading}
            >
              <Text style={styles.verifyButtonText}>
                {uploading ? "Uploading..." : "Verify"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.verifyButton, { backgroundColor: "red" }]}
              onPress={() => router.back()}
              disabled={uploading}
            >
              <Text style={styles.verifyButtonText}>
                {uploading ? "Uploading..." : "No Match "}
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Image
                  source={require("../assets/danger.png")}
                  style={{ width: 48, height: 48 }}
                />
                <Text style={{ fontWeight: "700", fontSize: 28 }}>
                  Verifying
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "500",
                    width: "60%",
                    // marginVertical: 10,
                  }}
                >
                  You are about to verify house image
                </Text>

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "500",
                    width: "60%",
                    marginVertical: 10,
                  }}
                >
                  {`${data?.firstname} ${data?.surname}`}
                </Text>

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "500",
                    width: "60%",
                    // marginVertical: 10,
                  }}
                >
                  Do you wish to proceed?
                </Text>
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      // uploadToCloudinary(signature);
                      handleVerification();
                    }}
                  >
                    <Text style={styles.modalButtonText}>Yes Verified</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: "#C80000" }]}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={styles.modalButtonText}>No, Don’t</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {baseimg && (
              <Image
                source={{ uri: baseimg }}
                style={{
                  width: "100%",
                  height: "80%",
                }}
              />
            )}
            {Verfymutaion.isLoading && (
              <ActivityIndicator
                size="large"
                color="blue"
                style={styles.loadingIndicator}
              />
            )}
          </Modal>

          <Modal
            visible={complete}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowModal(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Image
                  source={require("../assets/tick-square.png")}
                  style={{ width: 48, height: 48 }}
                />

                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "600",
                    // marginVertical: 10,
                    // borderWidth: 1,
                  }}
                >
                  Candidate Address Verified
                </Text>

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "500",
                    width: "60%",
                    marginVertical: 10,
                  }}
                >
                  {`${data?.firstname} ${data?.surname}`}
                </Text>

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "500",
                    width: "60%",
                    // marginVertical: 10,
                  }}
                >
                  has been verified. Job well-done
                </Text>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: "#001EC5",
                      paddingHorizontal: 40,
                    },
                  ]}
                  onPress={() => {
                    dispatch(Get_All_Candidate_Fun());

                    // uploadToCloudinary(signature);
                    // handleVerification();
                    // const [uploading, setUploading] = useState(false);
                    // const [showModal, setShowModal] = useState(false);
                    // const [complete, setComplete] = useState(true);
                    setUploading(false);
                    setShowModal(false);
                    setComplete(false);

                    router.push({
                      pathname: "/",
                      params: {},
                    });
                  }}
                >
                  <Text style={styles.modalButtonText}> Okay</Text>
                </TouchableOpacity>
              </View>
            </View>
            {baseimg && (
              <Image
                source={{ uri: baseimg }}
                style={{
                  width: "100%",
                  height: "80%",
                }}
              />
            )}
            {Verfymutaion.isLoading && (
              <ActivityIndicator
                size="large"
                color="blue"
                style={styles.loadingIndicator}
              />
            )}
          </Modal>

          {uploading && (
            <ActivityIndicator
              size="large"
              color="blue"
              style={styles.loadingIndicator}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, borderWidth: 10, backgroundColor: "white" },
  image: { width: "100%", height: "100%" },
  webViewContainer: { flex: 1, borderWidth: 1, marginTop: 10 },
  webView: { flex: 1, borderWidth: 2 },
  verifyButton: {
    position: "relative",
    top: -120,
    left: 10,
    zIndex: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
  },
  verifyButtonText: { color: "white", fontSize: 14 },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 18, marginBottom: 20 },
  modalActions: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-around",
  },
  modalButton: {
    backgroundColor: "blue",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 25,
    marginTop: 20,
  },
  modalButtonText: { color: "white", fontSize: 16 },
});

export default CandidateVerifyImage;
