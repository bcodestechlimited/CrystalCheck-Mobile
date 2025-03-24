import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Get_All_Assigned_guarantor__Fun,
  Get_All_Candidate_Fun,
  Get_All_Guarantor_Fun,
} from "../redux/CandiddateSlice";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import { Get_User_profile } from "../redux/AuthSlice";

const { width, height } = Dimensions.get("window");

export default function Candidates() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1); // Current page
  const [perPage] = useState(15); // Items per page
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // For search query

  const { Assigned_guarantor_data } = useSelector(
    (state) => state?.CandiddateSlice
  );

  const totalPages = Assigned_guarantor_data?.pagination?.totalPages || 1;

  useEffect(() => {
    loadCandidates();
  }, [page, searchQuery]);

  const loadCandidates = () => {
    setLoading(true);
    dispatch(Get_User_profile());

    dispatch(
      Get_All_Assigned_guarantor__Fun({ page, perPage, searchQuery })
    ).finally(() => setLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1); // Reset to the first page
    dispatch(Get_User_profile());

    dispatch(
      Get_All_Assigned_guarantor__Fun({ page: 1, perPage, searchQuery })
    ).finally(() => setRefreshing(false));
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const renderFooter = () => (
    <View style={styles.paginationContainer}>
      {/* Previous Button */}
      {page > 1 && (
        <TouchableOpacity
          onPress={goToPreviousPage}
          style={styles.paginationButton}
        >
          <SimpleLineIcons name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
      )}

      {/* Page Number */}
      <Text style={[styles.pageIndicator, styles.paginationButton]}>
        {page}
      </Text>

      {/* Next Button */}
      {page < totalPages && (
        <TouchableOpacity
          onPress={goToNextPage}
          style={styles.paginationButton}
        >
          <SimpleLineIcons name="arrow-right" size={20} color="black" />
        </TouchableOpacity>
      )}

      {/* Total Pages Indicator */}
      <Text style={styles.pageIndicator}>of {totalPages}</Text>
    </View>
  );

  const renderRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.nameColumn]}>{item?.name}</Text>
      <Text style={[styles.tableCell, styles.idColumn]}>{item?.phone}</Text>
      <Text
        style={[styles.tableCell, styles.emailColumn]}
      >{`${item?.address1} ${item?.town}`}</Text>

      {item?.attemptsLeft > 0 ? (
        <TouchableOpacity
          style={[
            styles.statusCell,
            item?.submittedStatus === 2 || item?.submittedStatus > 2
              ? styles.verifiedStatus
              : item?.submittedStatus === 1
              ? styles.submittedStatus
              : item?.isSubmitted
              ? styles.notMatchStatus
              : styles.verifyGuarantorStatus,
          ]}
          onPress={() => {
            if (item?.isSubmitted && item?.isVerified) {
              Alert.alert("Status", "This guarantor is Verified ✅");
            } else if (item?.isSubmitted && item?.notMatch) {
              Alert.alert("Status", "This guarantor is Not a Match ❌");
            } else if (item?.isSubmitted) {
              Alert.alert("Status", "Guarantor Submitted Successfully 🚀");
            } else {
              navigate.push({
                pathname: "/candidatesDetails",
                params: {
                  id: item?._id,
                  address1: item?.address1,
                  address2: item?.address2,
                  agent: item?.agent,
                  assigned: item?.assigned,
                  assignedTo: item?.assignedTo,
                  candidateId: item?.candidateId,
                  company: item?.company,
                  email: item?.email,
                  grade: item?.grade,
                  isSubmitted: item?.isSubmitted,
                  isVerified: item?.isVerified,
                  name: item?.name,
                  noOfYears: item?.noOfYears,
                  notMatch: item?.notMatch,
                  pdfDocument: item?.pdfDocument,
                  phone: item?.phone,
                  photo: item?.photo,
                  signature: item?.signature,
                  stateCode: item?.stateCode,
                  submittedBy: item?.submittedBy,
                  submittedByUserId: item?.submittedByUserId,
                  town: item?.town,
                  updatedBy: item?.updatedBy,
                  verifiedBy: item?.verifiedBy,
                },
              });
            }
            // https://identity.dojah.io?widget_id=678e30aed6a17fd17ac3ef7d
            // navigate.push({
            //   pathname: "/candidatesDetails",
            //   params: {
            //     id: item?._id,
            //     address1: item?.address1,
            //     address2: item?.address2,
            //     agent: item?.agent,
            //     assigned: item?.assigned,
            //     assignedTo: item?.assignedTo,
            //     candidateId: item?.candidateId,
            //     company: item?.company,
            //     email: item?.email,
            //     grade: item?.grade,
            //     isSubmitted: item?.isSubmitted,
            //     isVerified: item?.isVerified,
            //     name: item?.name,
            //     noOfYears: item?.noOfYears,
            //     notMatch: item?.notMatch,
            //     pdfDocument: item?.pdfDocument,
            //     phone: item?.phone,
            //     photo: item?.photo,
            //     signature: item?.signature,
            //     stateCode: item?.stateCode,
            //     submittedBy: item?.submittedBy,
            //     submittedByUserId: item?.submittedByUserId,
            //     town: item?.town,
            //     updatedBy: item?.updatedBy,
            //     verifiedBy: item?.verifiedBy,
            //   },
            // });
          }}
        >
          <Text style={styles.statusText}>
            {!item?.isSubmitted
              ? "Verify Guarantor"
              : item?.isSubmitted && !item?.isVerified && !item?.notMatch
              ? "Submitted"
              : item?.isSubmitted && item?.isVerified
              ? "Verified"
              : item?.isSubmitted && item?.notMatch
              ? "Not a Match"
              : ""}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "No Signature Attempts Left",
              "Gaurantor have no more signature attempts remaining. Please reach out to your supervisor for more details.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }]
            );
          }}
        >
          <Text style={styles.statusText}>Forged</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.headerText,
            {
              fontSize: 20,
            },
          ]}
        >
          Guarantor{" "}
        </Text>
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Name, Staff ID, or Email"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listContainer}>
        <View style={styles.tableRow}>
          <Text
            style={[styles.tableCell, styles.headerCell, styles.nameColumn]}
          >
            Name
          </Text>
          <Text style={[styles.tableCell, styles.headerCell, styles.idColumn]}>
            Phone Number
          </Text>
          <Text
            style={[styles.tableCell, styles.headerCell, styles.emailColumn]}
          >
            Address
          </Text>
          <Text
            style={[styles.tableCell, styles.headerCell, styles.statusColumn]}
          >
            Status
          </Text>
        </View>

        <FlatList
          data={Assigned_guarantor_data?.guarantors}
          renderItem={renderRow}
          keyExtractor={(item) => item?.data?.id?.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1710E1" />
          </View>
        )}
      </View>

      {renderFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flex: 1,
  },
  headerContainer: {
    marginTop: 20,
  },
  headerText: {
    // fontSize: width * 0.05, // Responsive font size
    color: "#02052F",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    width: "80%",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 20,
    // fontSize: width * 0.04, // Responsive font size
    borderWidth: 1,
    width: "70%",
    borderColor: "#00000033",
  },
  filterButton: {
    backgroundColor: "#1710E1",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  filterButtonText: {
    color: "white",
    // fontSize: width * 0.04, // Responsive font size
  },
  listContainer: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // backgroundColor: "red",
  },
  tableCell: {
    padding: 8,
    // fontSize: width * 0.04, // Responsive font size
    textAlign: "left",
    // color: "red",
  },
  headerCell: {
    // fontWeight: "bold",
    color: "#02052F",
    // backgroundColor: "#f2f2f2",
  },
  nameColumn: {
    width: "25%",
  },
  idColumn: {
    width: "25%",
  },
  emailColumn: {
    width: "25%",
  },
  statusColumn: {
    width: "25%",
  },
  statusCell: {
    padding: 8,
    borderRadius: 12,
  },
  verifiedStatus: {
    backgroundColor: "#E8F5E9",
  },
  submittedStatus: {
    backgroundColor: "#E3F2FD",
  },
  notMatchStatus: {
    backgroundColor: "#FFEBEE",
  },
  verifyGuarantorStatus: {
    backgroundColor: "#F5F5F5",
  },
  statusText: {
    color: "#000",
    // fontSize: width * 0.04, // Responsive font size
  },
  loadingContainer: {
    position: "absolute",
    top: "40%",
    right: "50%",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 10,
  },
  paginationButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#7B87944D",
    borderRadius: 5,
  },
  pageIndicator: {
    // fontSize: width * 0.04, // Responsive font size
    fontWeight: "bold",
  },
});
