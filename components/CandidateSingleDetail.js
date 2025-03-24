import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
  useSearchParams,
} from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  CandidateDetails_Fun,
  Get_All_Assigned_guarantor__Details_Fun,
} from "../redux/CandiddateSlice";
import Button from "./Button";
const { width, height } = Dimensions.get("window");

export default function CandidateSingleDetail() {
  const dispatch = useDispatch();
  const navigate = useRouter();

  const item = useLocalSearchParams();

  //
  const {
    CandidateDetails_data,
    Assigned_guarantor_details_isLoading,
    Assigned_guarantor_details_data,
  } = useSelector((state) => state?.CandiddateSlice);

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
    // dispatch(CandidateDetails_Fun(item));
    dispatch(Get_All_Assigned_guarantor__Details_Fun(item?.id));

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
          <Text style={styles.documentLink}>View Uploaded </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}

      {/* Candidate Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {Assigned_guarantor_details_data?.candidate
            ? `${Assigned_guarantor_details_data?.candidate?.firstname || ""} ${
                Assigned_guarantor_details_data?.candidate?.surname || ""
              } ${Assigned_guarantor_details_data?.candidate?.lastname || ""}`
            : "No data available"}
        </Text>
      </View>

      <View>
        <Image
          source={{
            uri: Assigned_guarantor_details_data?.candidate?.passport, // "https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-reacts-as-he-looks-on-during-news-photo-1725633476.jpg",
          }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 50,
            marginLeft: 20,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: "black",
          }}
        />
      </View>

      {/* Candidate Info Section */}
      <View
        style={{
          backgroundColor: "#FFF",
          borderRadius: 8,
          padding: width * 0.04,
          marginBottom: height * 0.02,
        }}
      >
        <Text
          style={{
            fontSize: width * 0.045,
            fontWeight: "bold",
            color: "#333",
            marginBottom: height * 0.01,
          }}
        >
          Candidate Information
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            // gap: 10,
            // gap: width * 10,
          }}
        >
          <View style={{}}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.headerText}>
              {Assigned_guarantor_details_data?.candidate
                ? `${
                    Assigned_guarantor_details_data?.candidate.firstname || ""
                  } ${
                    Assigned_guarantor_details_data?.candidate.surname || ""
                  } ${
                    Assigned_guarantor_details_data?.candidate.lastname || ""
                  }`
                : "No data available"}
            </Text>
          </View>
          <View style={{}}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>
              {Assigned_guarantor_details_data?.candidate?.sex}
            </Text>
          </View>
          <View style={{}}>
            <Text style={styles.label}>Guarantor Passport</Text>
            <TouchableOpacity>
              <Text style={styles.link}>View Uploaded</Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>
              {Assigned_guarantor_details_data?.candidate?.mobile_phone_number}
            </Text>
          </View>
        </View>
      </View>

      {Assigned_guarantor_details_isLoading && (
        <View>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      <View>
        {/* Guarantor Info Section */}
        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.sectionTitle}>Guarantor </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Name</Text>
            <Text style={styles.value}>{item?.name || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Address 1</Text>
            <Text style={styles.value}>{item?.address1 || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Address 2</Text>
            <Text style={styles.value}>{item?.address2 || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Town</Text>
            <Text style={styles.value}>{item?.town || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Guarantor State</Text>

            <Text style={styles.value}>{item?.stateCode || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Phone</Text>
            <Text style={styles.value}>{item?.phone || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Email</Text>
            <Text style={styles.value}>{item?.email || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Company</Text>
            <Text style={styles.value}>{item?.company || "N/A"}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Grade</Text>
            <Text style={styles.value}>
              <Text style={styles.value}>{item?.grade || "N/A"}</Text>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Guarantor Years Known</Text>
            <Text style={styles.value}>
              <Text style={styles.value}>{item?.noOfYears || "N/A"}</Text>
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>View Document</Text>
            <TouchableOpacity onPress={() => openPdf(item?.pdfDocument)}>
              <Text style={styles.documentLink}>View Uploaded </Text>
            </TouchableOpacity>
          </View>

          {CandidateDetails_data?.verification_info?.guarantor1
            ?.is_submitted ? (
            <Text
              style={{
                alignSelf: "flex-end",
                color: "#1710E1",
              }}
            >
              Guarantor Info Has been Submited
            </Text>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#1710E1",
                alignSelf: "flex-end",
                padding: 15,
                borderRadius: 10,
              }}
              onPress={() =>
                navigate.push({
                  pathname: "/signature",
                  params: {
                    guarantorId: item?.id,
                    guarantor_name: item?.name,
                    credential: item?.pdfDocument,
                  },
                })
              }
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                }}
              >
                Proceed to Verify
              </Text>

              {console.log({
                yayaya: item,
              })}
            </TouchableOpacity>
          )}
        </View>
      </View>
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
