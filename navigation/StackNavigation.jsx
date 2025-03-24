import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "../components/LoginScreen";
import { ActivityIndicator, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { reset_login } from "../redux/AuthSlice";
import { reset_CandiddateSlice } from "../redux/CandiddateSlice";
import LiveCamera from "../components/LiveCamera";

export default function StackNavigation() {
  const dispatch = useDispatch();
  const user_data = useSelector((state) => state?.AuthSlice?.user_data);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      // Logic to ensure user data has loaded from Redux persist
      setIsLoaded(true);
    };

    loadUserData();
  }, []);

  console.log({ kakak: user_data });

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // return <LiveCamera />;

  return (
    <SafeAreaProvider>
      {user_data?.data == null ? <LoginScreen /> : <MainStackNavigation />}
    </SafeAreaProvider>
  );
}

const MainStackNavigation = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="candidatesDetails"
        options={{
          headerShown: true,
          title: "Candidate Details", // This will remove the title from the header

          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#1C18921A", // Set your desired background color here
          },
          headerTintColor: "black", // Change the back button and title text color (optional)
        }}
      />

      <Stack.Screen
        name="candidatesAddressVerification"
        options={{
          headerShown: true,
          title: "Candidate Address Verification", // This will remove the title from the header

          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#1C18921A", // Set your desired background color here
          },
          headerTintColor: "black", // Change the back button and title text color (optional)
        }}
      />

      <Stack.Screen
        name="GuarantorDetails"
        options={{
          headerShown: true,
          title: "Guarantor Details", // This will remove the title from the header

          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#1C18921A", // Set your desired background color here
          },
          headerTintColor: "black", // Change the back button and title text color (optional)
        }}
      />

      <Stack.Screen
        name="updateProfile"
        options={{
          headerShown: true,
          title: "Agent Profile", // This will remove the title from the header

          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#1C18921A", // Set your desired background color here
          },
          headerTintColor: "black", // Change the back button and title text color (optional)
        }}
      />

      <Stack.Screen
        name="CaptureCandidate"
        options={{
          headerShown: true,
          title: "Capture Candidate Address", // This will remove the title from the header

          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#1C18921A", // Set your desired background color here
          },
          headerTintColor: "black", // Change the back button and title text color (optional)
        }}
      />

      <Stack.Screen
        name="signature"
        options={{
          headerShown: true,
          title: "Signature", // This will remove the title from the header

          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#1C18921A", // Set your desired background color here
          },
          headerTintColor: "black", // Change the back button and title text color (optional)
        }}
      />

      <Stack.Screen
        name="verifySignature"
        options={{
          headerShown: true,
          title: "Verification", // This will remove the title from the header

          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#1C18921A", // Set your desired background color here
          },
          headerTintColor: "black", // Change the back button and title text color (optional)
        }}
      />

      <Stack.Screen
        name="guarantorsignaturereviwe"
        options={{
          headerShown: true,
          title: "Verification", // This will remove the title from the header

          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#1C18921A", // Set your desired background color here
          },
          headerTintColor: "black", // Change the back button and title text color (optional)
        }}
      />

      <Stack.Screen
        name="TakePicture"
        options={{
          headerShown: true,
          title: "TakePicture", // This will remove the title from the header

          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#1C18921A", // Set your desired background color here
          },
          headerTintColor: "black", // Change the back button and title text color (optional)
        }}
      />
    </Stack>
  );
};
