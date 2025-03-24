import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import VerifyImage from "./VerifyImage";
import { useLocalSearchParams } from "expo-router";
import CandidateVerifyImage from "./CandidateVerifyImage";

export default function CandidateCameraScreen() {
  const [facing, setFacing] = useState("back"); // Camera facing direction
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState(null);
  //   "https://upload.wikimedia.org/wikipedia/commons/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg"
  // );
  // const [photo, setPhoto] = useState(null);
  // State to hold the captured photo
  const cameraRef = useRef(null); // Reference for the CameraView
  const [start, setStart] = useState(false);
  const data = useLocalSearchParams();
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

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      setPhoto(photo.uri); // Save the photo URI to state
    }
  }

  function cancelPicture() {
    setPhoto(null); // Clear the photo state to go back to camera
  }

  return (
    <View style={styles.container}>
      <>
        {start ? (
          <>
            {photo ? (
              <>
                <CandidateVerifyImage
                  image_Date={photo}
                  cancelPicture={cancelPicture}
                />
              </>
            ) : (
              <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setStart(false)}
                  >
                    <Text style={styles.text}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.text}>Take Picture</Text>
                  </TouchableOpacity>
                </View>
              </CameraView>
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
