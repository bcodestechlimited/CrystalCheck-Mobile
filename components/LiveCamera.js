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
import { axiosInstance, getAxiosConfig } from "../redux/ApiConfig";
const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

export default function LiveCamera() {
  const [snap, setsnap] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const [count, setCount] = useState(0);
  const [usermaindata, setusermaindata] = useState(null);
  const { user_data } = useSelector((state) => state.AuthSlice);

  const data = useLocalSearchParams();

  let datamain = {
    guarantorId: data?.guarantorId,
    signature: data?.signature,
  };

  // console.log({
  //   oooo: datamain,
  // });

  const fetchData = useCallback(async () => {
    let getGrantorurl = `${API_BASEURL}v1/guarantors/${data?.guarantorId}`;
    // const token = user_data?.data?.token;
    const token = user_data?.data?.token;
    const response = await axiosInstance.get(
      getGrantorurl,
      getAxiosConfig(token)
    );

    // console.log("Fetching data...");
    try {
      // const response = await axios.get(
      //   `https://databacebackend.onrender.com/Guarantor_webhook/${data?.guarantorId}`
      // );
      setusermaindata(response?.data?.data?.guarantor);
      setCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.log("Fetch error:", error?.response?.data);
    }
  }, [data?.guarantorId]);

  useEffect(() => {
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  // const Verfymutaion = useMutation(
  //   (data_info) => {
  //     let url = `https://databacebackend.onrender.com/guarantor`;
  //     return axios.post(url, data_info, {
  //       headers: { "Content-Type": "application/json" },
  //     });
  //   },
  //   {
  //     onSuccess: (data) => {
  //       // Toast.show({ type: "success", text1: "Verification successful!" });
  //       setsnap(true);
  //     },
  //     onError: (error) => {
  //       Toast.show({
  //         type: "error",
  //         text1: error?.response?.data?.message || "Verification failed",
  //       });
  //     },
  //   }
  // );

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
        // Toast.show({ type: "success", text1: "Verification successful!" });

        // dispatch(Get_All_Assigned_guarantor__Fun());
        Toast.show({ type: "success", text1: "Successful Verification" });
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

        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  // Function to reset all states
  const resetState = async () => {
    const SignantureToCloudinary = await uploadToCloudinary(data?.signature);

    let maindata_sub = {
      guarantorId: data?.guarantorId,
      signature: SignantureToCloudinary?.secure_url,
    };
    console.log({
      ccxxx: maindata_sub,
    });
    SubmitVerfymutaion.mutate(maindata_sub);
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

          {usermaindata?.isVerified && (
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

              onPress={() => setsnap(true)}
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

          {uploading && (
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
      )}
    </>
  );
}

const DOJAH = ({ guarantorId, usermaindata, onDataReceived }) => {
  const deviceHeight = Dimensions.get("window").height;

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
              // uri: `https://identity.dojah.io?widget_id=67f5b1926161feca85094e87&metadata[user_id]=${guarantorId}`, // this is the test link

              uri: `https://identity.dojah.io?widget_id=67f498436161feca859bc8e3&metadata[user_id]=${guarantorId}`, // this is the live link
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
