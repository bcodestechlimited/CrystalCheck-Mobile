import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { CandidateDetails_Fun } from "../redux/CandiddateSlice";
import Button from "./Button";

const GuarantorInfo = ({ guarantor, index }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Guarantor {index}</Text>
    {guarantor.map(({ label, value }) => (
      <View style={styles.row} key={label}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value || "N/A"}</Text>
      </View>
    ))}
  </View>
);

const DocumentView = ({ docArray, docType }) => {
  const doc = docArray?.find((d) =>
    d.document_name.toLowerCase().includes(docType.toLowerCase())
  );

  return (
    <View style={styles.row}>
      {doc ? (
        <View style={styles.documentContainer}>
          <Text style={styles.label}>{doc.document_name}</Text>
          <Text style={styles.documentLink}>Link: {doc.credential}</Text>
        </View>
      ) : (
        <Text style={styles.notFound}>Document not found</Text>
      )}
    </View>
  );
};

export default function CandidateSingleDetail({ item }) {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const { CandidateDetails_data } = useSelector(
    (state) => state?.CandiddateSlice
  );

  useEffect(() => {
    dispatch(CandidateDetails_Fun(item));
  }, [dispatch, item]);

  const candidate = CandidateDetails_data?.candidate;

  const guarantorDetails = [
    {
      label: "Guarantor Name",
      value: candidate?.["1st_guarantor_name"],
    },
    {
      label: "Guarantor Address 1",
      value: candidate?.["1st_guarantor_address_1"],
    },
    // Add other fields similarly
  ];

  const navigateToSignature = () => navigate.push("/signature");

  return (
    <ScrollView style={styles.container}>
      {/* Candidate Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {candidate
            ? `${candidate.firstname || ""} ${candidate.surname || ""} ${
                candidate.lastname || ""
              }`
            : "No data available"}
        </Text>
      </View>

      {/* Candidate Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Candidate Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>
            {candidate
              ? `${candidate.firstname || ""} ${candidate.surname || ""} ${
                  candidate.lastname || ""
                }`
              : "No data available"}
          </Text>
        </View>
        {/* More Candidate Info Fields */}
      </View>

      {/* Guarantor Information */}
      <GuarantorInfo guarantor={guarantorDetails} index={1} />

      {/* Document Viewers */}
      <DocumentView
        docArray={CandidateDetails_data?.documents}
        docType="Oath of Confidentiality"
      />
      <DocumentView
        docArray={CandidateDetails_data?.documents}
        docType="Guarantor 1"
      />
      <DocumentView
        docArray={CandidateDetails_data?.documents}
        docType="Medical Test"
      />

      <Button title="Go to Signature" onPress={navigateToSignature} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  headerText: { fontSize: 20, fontWeight: "bold" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: { fontSize: 14, color: "#333" },
  value: { fontSize: 14 },
  documentContainer: { paddingVertical: 10 },
  documentLink: { color: "blue", textDecorationLine: "underline" },
  notFound: { color: "red" },
});
