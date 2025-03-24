// import { View, Text } from "react-native";
// import React from "react";

// export default function candidateDetails() {
//   return (
//     <View>
//       <Text>candidateDetails</Text>
//     </View>
//   );
// }

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function candidateDetails() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#1C18921A",
          paddingVertical: 30,
          padding: 20,
        }}
      ></View>
      <ScrollView style={styles.container}>
        {/* Back Button */}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Candidates Details</Text>
          {/* <Text style={styles.backButtonText}>← Candidates Details</Text> */}
          {/* <Text style={styles.backButtonText}>← Candidates Details</Text> */}
          {/* <Text style={styles.backButtonText}>← Candidates Details</Text> */}
          {/* <Text style={styles.backButtonText}>← Candidates Details</Text> */}
        </TouchableOpacity>

        {/* Candidate Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Mike John</Text>
        </View>

        {/* Candidate Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Candidate Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Mike John</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>Male</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Passport</Text>
            <TouchableOpacity>
              <Text style={styles.link}>View Uploaded</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>0816404588</Text>
          </View>
        </View>

        {/* Guarantor Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guarantor 1</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Taju Make</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Passport</Text>
            <TouchableOpacity>
              <Text style={styles.link}>View Uploaded</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Verification Status</Text>
            <Text style={styles.unverified}>Not Verified</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Occupation</Text>
            <Text style={styles.value}>Painter</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date Signed</Text>
            <Text style={styles.value}>23, May 2022</Text>
          </View>
          {/* Add other fields as per design... */}
        </View>

        {/* Witness Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Witness</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Taju Make</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Signature</Text>
            <TouchableOpacity>
              <Text style={styles.link}>View Uploaded</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Occupation</Text>
            <Text style={styles.value}>Trader</Text>
          </View>
          {/* Add other fields as per design... */}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Proceed to Verify </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  link: {
    fontSize: 14,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  unverified: {
    fontSize: 14,
    color: "#FF3B30",
  },
  button: {
    backgroundColor: "#1710E1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
