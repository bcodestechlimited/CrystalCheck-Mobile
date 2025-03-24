import React, { useState, useRef } from "react";
import { Camera } from "expo-camera";
import { Button, View, Text } from "react-native";
import {
  RekognitionClient,
  DetectFacesCommand,
} from "@aws-sdk/client-rekognition";

const RekognitionService = new RekognitionClient({ region: "your-region" });

async function detectSmile(imageUri) {
  const command = new DetectFacesCommand({
    Image: {
      Bytes: imageUri,
    },
  });

  try {
    const data = await RekognitionService.send(command);
    const smileDetected = data.FaceDetails.some(
      (face) => face.Smile?.Value > 0.5
    );
    return smileDetected;
  } catch (err) {
    console.error("Error detecting smile:", err);
    return false;
  }
}

export default function DetectCam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  async function requestPermission() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);

      // Detect smile
      const smileDetected = await detectSmile(photo.uri);
      if (smileDetected) {
        // Proceed with further actions (e.g., submit image or show it)
      } else {
        // Show feedback to smile
      }
    }
  }

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={cameraRef}>
        <View style={{ flex: 1, justifyContent: "flex-end", padding: 20 }}>
          <Button title="Take Picture" onPress={takePicture} />
        </View>
      </Camera>
    </View>
  );
}
