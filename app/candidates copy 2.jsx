import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
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

export default function Candidates() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1); // Current page
  const [perPage] = useState(15); // Items per page
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // For search query
  // Assigned_guarantor_data: null,
  // Assigned_guarantor_isError: false,
  // Assigned_guarantor_isSuccess: false,
  // Assigned_guarantor_isLoading: false,
  // Assigned_guarantor_message: null,
  const { Candidate_data, Assigned_guarantor_data } = useSelector(
    (state) => state?.CandiddateSlice
  );
  const totalPages = Assigned_guarantor_data?.pagination?.totalPages || 1;

  useEffect(() => {
    loadCandidates();
  }, [page, searchQuery]); // Load candidates when page or searchQuery changes

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

  const renderHeader = () => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.headerCell, styles.nameColumn]}>
        Name
      </Text>
      <Text style={[styles.tableCell, styles.headerCell, styles.idColumn]}>
        Staff Id
      </Text>
      <Text style={[styles.tableCell, styles.headerCell, styles.emailColumn]}>
        Email
      </Text>
      <Text style={[styles.tableCell, styles.headerCell, styles.statusColumn]}>
        Status
      </Text>
      <Text
        style={[
          styles.tableCell,
          styles.headerCell,
          {
            width: "13%",
          },
        ]}
      >
        Actions
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <View style={[styles.tableCell, styles.nameColumn]}>
        <Text>{`${item?.data?.surname} ${item?.data?.firstname}`}</Text>
      </View>
      <Text style={[styles.tableCell, styles.idColumn]}>{item?.staff_id}</Text>
      <Text style={[styles.tableCell, styles.emailColumn]}>
        {item?.data?.email_address}
      </Text>
      <View style={[styles.tableCell, styles.statusColumn]}>
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor:
              // item?.submittedStatus == 2
              item?.submittedStatus == 2 || item?.submittedStatus > 2
                ? "#1892261A"
                : item?.submittedStatus == 1
                ? "#8700851A"
                : "#DB00001A",
            padding: 8,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color:
                item?.submittedStatus == 2 || item?.submittedStatus > 2
                  ? "#189226"
                  : item?.submittedStatus == 1
                  ? "#870085"
                  : "#DB0000",
            }}
          >
            {item?.submittedStatus}/2 Submited
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.tableCell,
          styles.actionColumn,
          // styles.viewButton,
          {
            borderRadius: 20,

            backgroundColor: "#1710E1",
            paddingVertical: 6,
            paddingHorizontal: 10,
          },
        ]}
        onPress={() =>
          navigate.push({
            pathname: "/candidatesDetails",
            params: {
              staff_id: item?.staff_id,
              surname: item?.surname,
              firstname: item?.firstname,
              email: item?.email_address,
              status: item?.status,
            },
          })
        }
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          View
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <View
      style={{
        alignSelf: "flex-end",
      }}
    >
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
        <View>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 14,
            }}
          >
            of {totalPages}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderRow = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
      }}
    >
      <Text style={{ flex: 1, fontSize: 16 }}>{item?.name}</Text>
      <Text style={{ flex: 1, fontSize: 16 }}>{item?.phone}</Text>
      <Text
        style={{ flex: 1, fontSize: 16 }}
      >{`${item?.address1} ${item?.town}`}</Text>

      <TouchableOpacity
        style={{
          // alignItems: "center",
          backgroundColor:
            item?.submittedStatus == 2 || item?.submittedStatus > 2
              ? "#E8F5E9" // Light green background for Verified
              : item?.submittedStatus == 1
              ? "#E3F2FD" // Light blue background for Submitted
              : item?.isSubmitted
              ? "#FFEBEE" // Light red background for Not a Match
              : "#F5F5F5", // Light grey background for Verify Guarantor
          padding: 8,
          borderRadius: 12,
        }}
        onPress={() =>
          navigate.push({
            pathname: "/candidatesDetails",
            params: {
              id: item?._id, // "6751448cfa02237dbdaae08e",
              address1: item?.address1, //"No. 6 Femi Adesanya Crescent New Bodija Ibadan",
              address2: item?.address2, //"No. 6 Femi Adesanya Crescent New Bodija Ibadan",
              agent: item?.agent, // "674ed0c4e47cfa8fbc1f6169",
              assigned: item?.assigned,
              assignedTo: item?.assignedTo, // "674ed0c4e47cfa8fbc1f6167",
              candidateId: item?.candidateId, //  "6751448bfa02237dbdaae08a",
              company: item?.company, // "National Lottery Regulatory Commission",
              email: item?.email, // "Awujoolasam@gmail.com",
              grade: item?.grade, // "Friend",
              isSubmitted: item?.isSubmitted, // false,
              isVerified: item?.isVerified,
              name: item?.name, // "Awujoola Samuel Toluwase",
              noOfYears: item?.noOfYears, // "6 - 10",
              notMatch: item?.notMatch,
              pdfDocument: item?.pdfDocument,
              phone: item?.phone, // "08137349177",
              photo: item?.photo,
              signature: item?.signature,
              stateCode: item?.stateCode,
              submittedBy: item?.submittedBy,
              submittedByUserId: item?.submittedByUserId,
              town: item?.town,
              updatedBy: item?.updatedBy,
              verifiedBy: item?.verifiedBy, // "",
            },
          })
        }
      >
        <Text
          style={{
            color: !item?.isSubmitted
              ? "#9E9E9E" // Grey for Verify Guarantor
              : item?.isSubmitted && !item?.isVerified && !item?.notMatch
              ? "#1E88E5" // Blue for Submitted
              : item?.isSubmitted && item?.isVerified
              ? "#388E3C" // Green for Verified
              : item?.isSubmitted && item?.notMatch
              ? "#D32F2F" // Red for Not a Match
              : "#000", // Default black color for text
          }}
        >
          {!item?.isSubmitted && "Verify Guarantor"}

          {item?.isSubmitted &&
            !item?.isVerified &&
            !item?.notMatch &&
            "Submitted"}

          {item?.isSubmitted && item?.isVerified && "Verified"}

          {item?.isSubmitted && item?.notMatch && "Not a Match"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{}}>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // borderWidth: 1,
          }}
        >
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              color: "#02052F",
            }}
          >
            Candidates
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              // justifyContent: "center",
              width: "80%",
              alignItems: "center",

              // borderWidth: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                width: "70%",
              }}
            >
              <TextInput
                style={styles.searchInput}
                placeholder="Search by Name, Staff ID, or Email"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#1710E1",
                  // padding: 20,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                  }}
                >
                  Filter
                </Text>
              </TouchableOpacity>
              {/* <Button color="B" text="Filter" /> */}
            </View>
          </View>
        </View>

        {/* Search Input Section */}
      </View>

      <View style={{ padding: 10, backgroundColor: "#fff", height: "75%" }}>
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
          <View
            style={{
              position: "absolute",
              top: "40%",
              right: "50%",
            }}
          >
            <ActivityIndicator size="large" color="#1710E1" />
          </View>
        )}
      </View>
      <View
        style={{
          flex: 1,

          // borderWidth: 1,
        }}
      >
        {renderFooter()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    padding: 8,
    fontSize: 14,
    textAlign: "left",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#02052F",
    backgroundColor: "#f2f2f2",
  },
  nameColumn: {
    width: "25%", // Adjust column width
  },
  idColumn: {
    width: "25%", // Adjust column width
  },
  emailColumn: {
    width: "25%", // Adjust column width
  },
  statusColumn: {
    width: "25%", // Adjust column width
  },
  actionColumn: {
    // width: "12%", // Adjust column width
  },
  viewButton: {
    backgroundColor: "#1710E1",
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  viewButtonText: {
    color: "white",
    textAlign: "center",
    //"#1710E1",
  },
  searchInput: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 20,
    fontSize: 14,
    borderWidth: 1,
    width: "100%",
    borderColor: "#00000033",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
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
    fontSize: 14,
    fontWeight: "bold",
  },
});
