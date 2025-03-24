import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
} from "react-native";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
  useSearchParams,
} from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { CandidateDetails_Fun } from "../redux/CandiddateSlice";
import Button from "./Button";

export default function CandidateAddress({}) {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const item = useLocalSearchParams();

  //
  const { CandidateDetails_data } = useSelector(
    (state) => state?.CandiddateSlice
  );

  // console.log({
  //   jjj: CandidateDetails_data,
  // });

  // Function to get document by document_name
  const getDocumentByName = (name) => {
    const document = CandidateDetails_data?.documents.find(
      (doc) => doc.document_name === name
    );
    if (document) {
      return document;
    } else {
      return { message: "Document not found" };
    }
  };

  // Example usage:
  const Guarantor1_data = getDocumentByName("Guarantor 1");
  const Guarantor2_data = getDocumentByName("Guarantor 2");
  const Guarantor3_data = getDocumentByName("Guarantor 3");

  useEffect(() => {
    dispatch(CandidateDetails_Fun(item));

    return () => {};
  }, []);

  const openPdf = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error("Unable to open URL:", url);
    }
  };

  const navigation = () => {
    navigate.push({ pathname: "/signature" });
  };

  const getDocumentView = (docArray, docType) => {
    const doc = docArray?.find((d) =>
      d.document_name.toLowerCase().includes(docType.toLowerCase())
    );

    if (!doc) {
      return <Text style={styles.notFound}>Document not found</Text>;
    }

    return (
      <View style={styles.documentContainer}>
        <Text style={styles.label}>{doc.document_name}</Text>
        <TouchableOpacity onPress={() => openPdf(doc.credential)}>
          <Text style={styles.documentLink}>View PDF</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderInfo = (title, value) => (
    <View style={styles.row} key={title}>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.value}>{value || "N/A"}</Text>
    </View>
  );

  const openWebLink = () => {
    const url = "https://example.com"; // Replace with your desired URL
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}

      {/* Candidate Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {CandidateDetails_data?.candidate
            ? `${CandidateDetails_data?.candidate?.firstname || ""} ${
                CandidateDetails_data?.candidate?.surname || ""
              } ${CandidateDetails_data?.candidate?.lastname || ""}`
            : "No data available"}
        </Text>
      </View>

      {/* Candidate Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Candidate Information</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{}}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.headerText}>
              {CandidateDetails_data?.candidate
                ? `${CandidateDetails_data?.candidate.firstname || ""} ${
                    CandidateDetails_data?.candidate.surname || ""
                  } ${CandidateDetails_data?.candidate.lastname || ""}`
                : "No data available"}
            </Text>
          </View>
          <View style={{}}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>
              {CandidateDetails_data?.candidate?.sex}
            </Text>
          </View>
          <View style={{}}>
            <Text style={styles.label}>Guarantor Passport</Text>
            <TouchableOpacity onPress={openWebLink}>
              <Text style={styles.link}>View Uploaded</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>
              {CandidateDetails_data?.candidate?.mobile_phone_number}
            </Text>
          </View>
        </View>
      </View>

      {console.log({
        candidateId: CandidateDetails_data?.candidate?._id,
        firstname: CandidateDetails_data?.candidate?.firstname, //`${CandidateDetails_data?.candidate?.data?.firstname}  ${CandidateDetails_data?.candidate?.data?.surname}`,
        surname: CandidateDetails_data?.candidate?.surname, //`${CandidateDetails_data?.candidate?.data?.firstname}  ${CandidateDetails_data?.candidate?.data?.surname}`,
        addressPhoto: "",
      })}

      {console.log({
        nn: CandidateDetails_data,
      })}

      <TouchableOpacity
        style={{
          backgroundColor: "#1710E1",
          alignSelf: "flex-end",
          padding: 10,
        }}
        // onPress={() => navigation}

        onPress={() =>
          navigate.push({
            pathname: "/CaptureCandidate",
            params: {
              candidateId: CandidateDetails_data?.candidate?._id,
              firstname: CandidateDetails_data?.candidate?.firstname, //`${CandidateDetails_data?.candidate?.data?.firstname}  ${CandidateDetails_data?.candidate?.data?.surname}`,
              surname: CandidateDetails_data?.candidate?.surname,
            },
          })
        }
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Proceed to Verify
        </Text>
      </TouchableOpacity>

      <ScrollView style={{ flex: 1, padding: 10, backgroundColor: "#f9f9f9" }}>
        <View style={[styles.section, { marginBottom: 20 }]}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Candidate Details
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>ID:</Text>{" "}
            {CandidateDetails_data?.candidate?.id}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Employee ID:</Text>{" "}
            {CandidateDetails_data?.candidate?.EmployeeID}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
            {`${CandidateDetails_data?.candidate.surname} ${CandidateDetails_data?.candidate.firstname} ${CandidateDetails_data?.candidate.middlename}`}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Sex:</Text>{" "}
            {CandidateDetails_data?.candidate?.sex}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Marital Status:</Text>{" "}
            {CandidateDetails_data?.candidate?.marital_status}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Date of Birth:</Text>{" "}
            {CandidateDetails_data?.candidate?.date_of_birth}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Email:</Text>{" "}
            {CandidateDetails_data?.candidate?.email_address}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Phone:</Text>{" "}
            {CandidateDetails_data?.candidate?.mobile_phone_number}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Address:</Text>{" "}
            {CandidateDetails_data?.candidate?.current_address_1}
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Additional Info
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Total Guarantors:</Text>{" "}
            {CandidateDetails_data?.candidate?.totalGuarantors}
          </Text>

          <Text style={{ fontSize: 16, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold" }}>Address Submitted:</Text>{" "}
            {CandidateDetails_data?.candidate?.addressSubmitted ? "Yes" : "No"}
          </Text>

          {/* <TouchableOpacity
            style={{
              backgroundColor: "#007bff",
              padding: 12,
              borderRadius: 8,
              marginTop: 16,
            }}
            onPress={openWebLink}
          >
            <Text style={styles.buttonText}>View Document</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </ScrollView>
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

// import React from "react";
// import { View, Text, ScrollView } from "react-native";

const CandidateMain = () => {
  const { CandidateDetails_data } = useSelector(
    (state) => state?.CandiddateSlice
  );

  // Convert the candidate object into an array of key-value pairs for rendering
  // const details = Object?.entries(CandidateDetails_data?.candidate);
  return <Text>Working on it</Text>;
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f9fafb", // Light gray background
        padding: 16,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 16,
          textAlign: "center",
          color: "#111827", // Dark gray text
        }}
      >
        Candidate Details
      </Text>
      {details?.map(([key, value]) => (
        <View
          key={key}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb", // Light gray border
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#374151", // Darker gray text
              flex: 1,
            }}
          >
            {formatKey(key)}:
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#1f2937", // Dark text
              flex: 2,
              textAlign: "right",
            }}
          >
            {value || "N/A"}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

// Helper function to format keys for better readability
const formatKey = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words

// export default CandidateDetailsScreen;
