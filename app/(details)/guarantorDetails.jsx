import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import WitnessDetails from "./WitnessDetails";

export default function GuarantorDetails() {
  const [viewLess, setViewLess] = useState(true);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Guarantor 1</Text>
        {viewLess ? (
          <TouchableOpacity onPress={() => setViewLess(false)}>
            <Text style={styles.link}>ViewDetails</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setViewLess(true)}>
            <Text style={styles.link}>View Less</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ gap: 10, marginTop: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.group}>
            <Text style={styles.key}>Name</Text>
            <Text style={styles.value}>Taju make</Text>
          </View>
          <View style={styles.group}>
            <Text style={styles.key}>Guarantor Passport</Text>
            <TouchableOpacity>
              <Text style={styles.link}>View Uploaded</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.group}>
            <Text style={styles.key}>Verification Status</Text>
            <TouchableOpacity>
              <Text style={styles.link}>View Uploaded</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.group}>
            <Text style={styles.key}>Uploaded Document</Text>
            <Text style={styles.value}>
              <TouchableOpacity>
                <Text style={styles.link}>View Uploaded</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>

        {!viewLess && (
          <View style={{ gap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.group}>
                <Text style={styles.key}>Occupation</Text>
                <Text style={styles.value}>Painter</Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.key}>Date Signed</Text>
                <Text style={styles.value}>22,May,2024</Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.key}>Level Grade</Text>
                <Text>6</Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.key}>Business/Office Name</Text>
                <Text style={styles.value}></Text>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.group}>
                <Text style={styles.key}>CAC Number</Text>
                <Text style={styles.value}></Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.key}>Mobile Tel-phone</Text>
                <Text style={styles.value}>Female</Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.key}>Email Address</Text>
                <Text>Mike@gmail.com</Text>
              </View>
              <View style={styles.group}>
                <Text style={styles.key}>Office Tel</Text>
                <Text style={styles.value}>00000000000</Text>
              </View>
            </View>
            <WitnessDetails/>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#02052F",
  },
  link: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1892",
    textDecorationLine: "underline",
  },
});
