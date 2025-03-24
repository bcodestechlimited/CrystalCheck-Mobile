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
import { Get_All_Candidate_Fun } from "../redux/CandiddateSlice";
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

  const { Candidate_data } = useSelector((state) => state?.CandiddateSlice);
  const totalPages = Candidate_data?.pagination?.totalPages || 1;

  useEffect(() => {
    loadCandidates();
  }, [page, searchQuery]); // Load candidates when page or searchQuery changes

  const loadCandidates = () => {
    setLoading(true);
    dispatch(Get_User_profile());
    dispatch(Get_All_Candidate_Fun({ page, perPage, searchQuery })).finally(
      () => setLoading(false)
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1); // Reset to the first page
    dispatch(Get_User_profile());
    dispatch(Get_All_Candidate_Fun({ page: 1, perPage, searchQuery })).finally(
      () => setRefreshing(false)
    );
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
      <Text style={[styles.tableCell, styles.headerCell, styles.actionColumn]}>
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

  return (
    <>
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
              width: "60%",
              alignItems: "center",
              // borderWidth: 1,
            }}
          >
            <View style={{ width: "80%" }}>
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
                  paddingVertical: 15,
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

      <View style={{ flex: 1 }}>
        {/* Table Section */}
        <View style={{ flex: 5, zIndex: 20 }}>
          <FlatList
            data={Candidate_data?.candidates}
            renderItem={renderItem}
            keyExtractor={(item) => item?.data?.id?.toString()}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text>No candidates</Text>
              </View>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.container}
          />
        </View>
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

        {/* Pagination Section */}
        <View style={{ flex: 1 }}>{renderFooter()}</View>
      </View>
    </>
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
    width: "22%", // Adjust column width
  },
  idColumn: {
    width: "22%", // Adjust column width
  },
  emailColumn: {
    width: "26%", // Adjust column width
  },
  statusColumn: {
    width: "20%", // Adjust column width
  },
  actionColumn: {
    width: "10%", // Adjust column width
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
    padding: 20,
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
