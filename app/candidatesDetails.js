import { View, Text } from "react-native";
import React from "react";
import CandidateSingleDetail from "../components/CandidateSingleDetail";
import { useLocalSearchParams, useRouter } from "expo-router";
const candidatesDetails = () => {
  return <CandidateSingleDetail />;
};

export default candidatesDetails;
