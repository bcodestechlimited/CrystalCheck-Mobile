import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import GuarantorDetailsSingle from "../components/GuarantorDetailsSingle";

const GuarantorDetails = () => {
  const { item_data } = useLocalSearchParams();

  return <GuarantorDetailsSingle item={item_data} />;
};

export default GuarantorDetails;
