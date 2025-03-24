import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { WebView } from "react-native-webview";
import axios from "axios";
import { useMutation } from "react-query";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Get_All_Candidate_Fun } from "../redux/CandiddateSlice";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export default function LiveCamera() {
  const [snap, setsnap] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [usermaindata, setusermaindata] = useState(null);
  const { user_data } = useSelector((state) => state.AuthSlice);
  // console.log({
  //   kkk: user_data,
  // });
  const data = useLocalSearchParams();
  // console.log({
  //   oooo: data,
  // });
  // let g_id = "6760254bfbc0e16cc2f783df";

  let datamain = {
    guarantorId: data?.guarantorId,
    signature: data?.signature,
  };

  // console.log({
  //   oooo: datamain,
  // });

  const fetchData = useCallback(async () => {
    // console.log("Fetching data...");
    try {
      const response = await axios.get(
        `https://databacebackend.onrender.com/Guarantor_webhook/${data?.guarantorId}`
      );
      setusermaindata(response?.data);
      setCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.log("Fetch error:", error?.response?.data);
    }
  }, [data?.guarantorId]);

  useEffect(() => {
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const Verfymutaion = useMutation(
    (data_info) => {
      let url = `https://databacebackend.onrender.com/guarantor`;
      return axios.post(url, data_info, {
        headers: { "Content-Type": "application/json" },
      });
    },
    {
      onSuccess: (data) => {
        // Toast.show({ type: "success", text1: "Verification successful!" });
        setsnap(true);
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: error?.response?.data?.message || "Verification failed",
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

  const toggleSnap = async () => {
    setUploading(true); // Start loading indicator

    const SignantureToCloudinary = await uploadToCloudinary(data?.signature);

    let savesignature = {
      guarantorId: data?.guarantorId,
      signature: SignantureToCloudinary?.secure_url,
    };

    console.log({
      nnnn: savesignature,
    });

    Verfymutaion.mutate(savesignature);
    setUploading(false); // Start loading indicator
  };

  const SubmitVerfymutaion = useMutation(
    (data_sub) => {
      let url = `${API_BASEURL}v1/candidates/guarantor/submit`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_data?.data?.token}`,
        },
      };

      return axios.post(url, data_sub, config);
    },
    {
      onSuccess: () => {
        // dispatch(Get_All_Assigned_guarantor__Fun());
        Toast.show({ type: "success", text1: "Verification successful!" });
        // setShowModal(false);
        // setComplete(true);

        dispatch(Get_All_Candidate_Fun());

        setsnap(false);
        setCount(0);
        setusermaindata(null);
        router.push({
          pathname: "/",
          params: {},
        });
      },
      onError: (error) => {
        console.log({
          jaja: error?.response?.data?.message,
        });

        // dispatch(Get_All_Candidate_Fun());

        // setsnap(false);
        // setCount(0);
        // setusermaindata(null);
        // router.push({
        //   pathname: "/",
        //   params: {},
        // });

        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  // Function to reset all states
  const resetState = () => {
    let maindata_sub = {
      guarantorId: data?.guarantorId,
      signature: usermaindata?.data[0]?.signature, //SignantureToCloudinary?.secure_url,
      photo: usermaindata?.data[0]?.photo, //SignantureToCloudinary?.secure_url,
    };
    console.log({
      ccxxx: maindata_sub,
    });
    SubmitVerfymutaion.mutate(maindata_sub);
    // setsnap(false);
    // setCount(0);
    // setusermaindata(null);
  };

  return (
    <>
      {snap ? (
        <>
          <DOJAH
            guarantorId={data?.guarantorId}
            usermaindata={usermaindata}
            onDataReceived={(event) => {
              // console.log("Current userdata state:", usermaindata);
              const data = JSON.parse(event.nativeEvent.data);
              // console.log("WebView data received:", data);
            }}
          />

          {usermaindata?.data[0]?.verification_status === "Completed" && (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "blue",
                  padding: 10,
                  borderRadius: 10,
                  marginHorizontal: 30,
                  marginBottom: 10,
                }}
                onPress={resetState} // Call resetState on press
              >
                {SubmitVerfymutaion.isLoading ? (
                  <ActivityIndicator size="large" color="white" />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 20,
                    }}
                  >
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* <View style={{ padding: 10, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "black" }}>
              Fetch Count: {count}
            </Text>
          </View> */}
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
              // onPress={() => {
              //   setStart(true);
              // }}

              onPress={toggleSnap}
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

          {/* {uploading  || Verfymutaion.isLoading && (
            <ActivityIndicator
              size="large"
              color="blue"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [{ translateX: -25 }, { translateY: -25 }],
              }}
            />
          )} */}

          {(uploading || Verfymutaion.isLoading) && (
            <ActivityIndicator
              size="large"
              color="blue"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [{ translateX: -25 }, { translateY: -25 }],
              }}
            />
          )}
        </>
        // <View style={{ flex: 1, justifyContent: "center" }}>
        //   <Button title="Start Snap" onPress={toggleSnap} color="red" />
        // </View>
      )}
    </>
  );
}

const DOJAH = ({ guarantorId, usermaindata, onDataReceived }) => {
  const deviceHeight = Dimensions.get("window").height;

  // useEffect(() => {
  //   console.log("DOJAH component usermaindata updated:", usermaindata);
  // }, [usermaindata]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flex: 1,
          padding: 3,
          marginVertical: "20%",
        }}
      >
        <View
          style={{
            height: deviceHeight * 0.79,
            backgroundColor: "yellow",
          }}
        >
          <WebView
            originWhitelist={["*"]}
            source={{
              uri: `https://identity.dojah.io?widget_id=678e30aed6a17fd17ac3ef7d&metadata[user_id]=${guarantorId}`,

              // `https://identity.dojah.io?widget_id=678e30aed6a17fd17ac3ef7d
              // &metadata[user_id]=${guarantorId}`,
            }}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            startInLoadingState={true}
            javaScriptEnabled
            onError={(e) => console.log("WebView error:", e)}
            onMessage={onDataReceived}
          />
        </View>
      </View>
    </View>
  );
};
