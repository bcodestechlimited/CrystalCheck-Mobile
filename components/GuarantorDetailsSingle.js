// import { View, Text } from "react-native";
// import React from "react";

// const GuarantorDetailsSingle = ({ item }) => {
//   console.log({
//     item,
//   });
//   return (
//     <View>
//       <Text>GuarantorDetailsSingle</Text>
//       <Text>GuarantorDetailsSingle</Text>
//       <Text>GuarantorDetailsSingle</Text>
//       <Text>GuarantorDetailsSingle</Text>
//     </View>
//   );
// };

// export default GuarantorDetailsSingle;

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import SignatureTab from "./SignatureTab";
import CameraScreen from "./CameraScreen";

const GuarantorDetailsSingle = () => {
  // return <CameraScreen />;

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.4,
        }}
      >
        <SignatureTab />
      </View>
      <View
        style={{
          flex: 0.7,
        }}
      >
        <WebView
          source={{
            uri: "https://icsjobportal.com/uploads/verified_document/5511_timilehin%20guarantor%203.pdf",
          }}
          style={{ flex: 1 }}
        />
        <TouchableOpacity
          style={{
            position: "relative",
            top: -120,
            left: 10,
            zIndex: 10,
            backgroundColor: "blue",
            alignSelf: "flex-start",
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 14,
            }}
          >
            Aproved Signature
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
  },
});

export default GuarantorDetailsSingle;
