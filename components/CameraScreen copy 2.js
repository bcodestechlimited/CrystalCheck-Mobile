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
import * as ImageManipulator from "expo-image-manipulator";
import Toast from "react-native-toast-message";

import { useLocalSearchParams } from "expo-router";
import CandidateVerifyImage from "./CandidateVerifyImage";
import axios from "axios";

import AWS from "aws-sdk";
import { Buffer } from "buffer";
import LiveCamera from "./LiveCamera";

// import { useLocalSearchParams } from "expo-router";

export default function CameraScreen() {
  const [facing, setFacing] = useState("back"); // Camera facing direction
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [croppedPhoto, setCroppedPhoto] = useState(null);

  //   "https://upload.wikimedia.org/wikipedia/commons/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
  // );
  // const [photo, setPhoto] = useState(null);
  // State to hold the captured photo
  const cameraRef = useRef(null); // Reference for the CameraView
  const [start, setStart] = useState(false);
  // const data = useLocalSearchParams();
  // console.log({
  //   lll: data,
  // });

  useEffect(() => {
    // Request camera permission automatically when the component mounts
    (async () => {
      if (!permission || !permission.granted) {
        await requestPermission();
      }
    })();
  }, [permission, requestPermission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // async function takePicture() {
  //   // if (cameraRef.current) {
  //   //   const photo = await cameraRef.current.takePictureAsync();

  //   //   // setPhoto(photo.uri); // Save the photo URI to state
  //   // }

  //   if (cameraRef.current) {
  //     const photo = await cameraRef.current.takePictureAsync({
  //       quality: 0.7, // Adjust quality for size optimization
  //       skipProcessing: true,
  //     });

  //     let imageUri = photo.uri;

  //     console.log({
  //       jdjd: imageUri,
  //     });

  //     handlesub(imageUri);

  //     // setPhoto(photo.uri);

  //     // checkLivenessFromUrl(
  //     //   "https://res.cloudinary.com/dkzds0azx/image/upload/v1735295393/checks/b44gc7j7mlyovy5rvjog.jpg"
  //     // );
  //     // setPhoto(photo.uri); // Save the photo URI to state
  //   }
  // }

  const takePicture = async () => {
    if (cameraRef.current) {
      setisLoading(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1, // High quality for better cropping
        });

        // console.log({
        //   nvnv: photo,
        // });
        // Crop the image to fit the frame
        const cropped = await cropToFrame(photo);

        console.log({
          jaja: cropped,
        });
        setCroppedPhoto(cropped);
        console.log({
          kaka: croppedPhoto,
        });

        // Upload the cropped image to Cloudinary and then perform liveness check
        // await handlesub(cropped.uri);
      } catch (error) {
        console.error("Error capturing image:", error);
        ToastAndroid.show("Failed to capture image", ToastAndroid.SHORT);
      } finally {
        setisLoading(false);
      }
    }
  };

  function cancelPicture() {
    setPhoto(null); // Clear the photo state to go back to camera
  }

  const handlesub = async (imageUri) => {
    console.log({
      mcn: imageUri,
    });

    setisLoading(true);

    // const cloudinaryUrl = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload";
    // const uploadPreset = "YOUR_UPLOAD_PRESET"; // Create an unsigned preset in your Cloudinary dashboard

    const cloudName = "dkzds0azx"; // Replace with your Cloudinary cloud name
    const uploadPreset = "ydnmnjxq"; // Replace with your Cloudinary upload preset
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    // Prepare the form data for Cloudinary
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg", // Adjust based on the image type
      name: "upload.jpg",
    });
    formData.append("upload_preset", uploadPreset);

    try {
      // Upload the image to Cloudinary
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const uploadedImageUrl = response.data;
      // const uploadedImageUrl = response.data.secure_url;
      console.log("Cloudinary URL:", uploadedImageUrl?.secure_url);
      // Pass the uploaded image URL to your API
      checkLivenessFromUrl(uploadedImageUrl?.secure_url);
      // const imageSize = uploadedImageUrl.bytes;
    } catch (error) {
      setisLoading(false);
      console.error("Cloudinary upload failed:", error);

      console.log({
        nxxx: error?.response?.data?.error,
      });
      Toast.show({
        type: "error",
        text1: "Image upload failed",
        text2: error.message,
      });
    }

    // setisLoading(false);
  };

  async function checkLivenessFromUrl(imageUrl) {
    try {
      setisLoading(true);

      // Initialize AWS Rekognition client
      const rekognitionClient = new AWS.Rekognition();

      // Fetch image data
      const imageData = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      const imageBytes = Buffer.from(imageData.data);

      // Rekognition parameters
      const rekognitionParams = {
        Image: {
          Bytes: imageBytes,
        },
        Attributes: ["ALL"],
      };

      // Detect faces
      const rekognitionResponse = await rekognitionClient
        .detectFaces(rekognitionParams)
        .promise();

      const faces = rekognitionResponse.FaceDetails;
      const faceCount = faces.length;

      // Check if exactly one face is detected
      if (faceCount !== 1) {
        Alert.alert(
          "Liveness Check Failed",
          "Invalid image: Ensure only one face is visible.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: true }
        );
        setisLoading(false);
        return {
          success: false,
          message: "Invalid image: Ensure only one face is visible.",
        };
      }

      // Check if eyes are closed using confidence scores
      const face = faces[0];

      const {
        AgeRange: { High, Low },
        EyesOpen: { Value: eyesOpen },
        Eyeglasses: { Value: wearsGlasses },
        Gender: { Value: gender },
      } = face;

      // Display success alert with details
      Alert.alert(
        "Liveness Check Passed",
        `Age Range: ${Low}-${High} yrs
         Eyes Open: ${eyesOpen}
         Eyeglasses: ${wearsGlasses}
         Gender: ${gender}`,
        [
          {
            text: "OK",
            onPress: () => {
              setPhoto(imageUrl);
              console.log("Liveness success confirmed");
            },
          },
        ],
        { cancelable: true }
      );

      setisLoading(false);
      console.log("Liveness check passed:", rekognitionResponse.FaceDetails);

      return { success: true, imageUrl };
    } catch (error) {
      setisLoading(false);

      Alert.alert(
        "Error",
        error.message || "Liveness check failed. Please try again.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );

      console.error("Rekognition or image processing failed:", error);
      return { success: false, message: error.message };
    }
  }

  const cropToFrame = async (photo) => {
    const { width, height } = photo;

    // Define cropping dimensions (adjust based on your frame size)
    const cropWidth = width * 0.6; // Match the passport frame's width (60%)
    const cropHeight = height * 0.4; // Match the passport frame's height (40%)

    const left = (width - cropWidth) / 2; // Center horizontally
    const top = (height - cropHeight) / 2; // Center vertically

    // Crop the photo using ImageManipulator
    return await ImageManipulator.manipulateAsync(
      photo.uri,
      [
        {
          crop: {
            originX: left,
            originY: top,
            width: cropWidth,
            height: cropHeight,
          },
        },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
  };

  const reset = () => {
    setPhoto(null);
    setCroppedPhoto(null);
  };

  return (
    <View style={styles.container}>
      <>
        {start ? (
          <>
            {photo ? (
              <>
                <VerifyImage image_Date={photo} cancelPicture={cancelPicture} />
              </>
            ) : (
              // <LiveCamera mainsetphoto={setPhoto} mainsetStart={setStart} />
              <>
                {croppedPhoto ? (
                  // <Text>sam</Text>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <Image
                      source={{ uri: croppedPhoto }}
                      style={styles.previewImage}
                    /> */}

                    {isLoading ? (
                      <ActivityIndicator size="large" color="red" />
                    ) : (
                      <Button title="Retake" onPress={reset} />
                    )}
                  </View>
                ) : (
                  <CameraView
                    style={styles.camera}
                    facing={facing}
                    ref={cameraRef}
                    ratio="4:3" // Maintain a standard aspect ratio
                  >
                    {/* Overlay for Passport Size Guide */}
                    <View
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: "80%",
                          height: "50%",
                          borderWidth: 3,
                          borderColor: "white",
                          borderRadius: 10,
                        }}
                      ></View>
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => setStart(false)}
                      >
                        <Text style={styles.text}>Back</Text>
                      </TouchableOpacity>

                      {isLoading && (
                        <ActivityIndicator color="white" size="large" />
                      )}

                      <TouchableOpacity
                        style={styles.button}
                        onPress={takePicture}
                      >
                        <Text style={styles.text}>Take Picture</Text>
                      </TouchableOpacity>
                    </View>
                  </CameraView>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <View
              style={{
                // flex: 1,
                padding: 20,
                backgroundColor: "#F5F5F5",
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
                Guarantor’s Image
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  color: "#666",
                  // marginBottom: 20,
                }}
              >
                Please provide your image brelow to complete the guarantor
                verification process. The officer is to verify guarantor's image
                by clicking the link below.
              </Text>
            </View>

            <View
              style={{
                borderWidth: 0.5,
                borderColor: "purple",
                borderRadius: 8,
                width: "90%",
                height: 300,
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                margin: 5,
                // marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setStart(true);
                }}
              >
                <Image
                  source={require("../assets/Vector (2).png")}
                  style={{
                    alignSelf: "center",
                  }}
                />

                <Text
                  style={{
                    fontSize: 16,
                    color: "#AAA",
                  }}
                >
                  Click here to Open Camera and Snap the Guarantor
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </>
    </View>
  );
}

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
