import {
  FlatList,
  ScrollView,
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

export default function AssignCandidiate() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(15);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { Candidate_data } = useSelector((state) => state?.CandiddateSlice);
  const totalPages = Candidate_data?.pagination?.totalPages || 1;

  useEffect(() => {
    loadCandidates();
  }, [page, searchQuery]);

  const loadCandidates = () => {
    setLoading(true);
    dispatch(Get_User_profile());
    dispatch(Get_All_Candidate_Fun({ page, perPage, searchQuery })).finally(
      () => setLoading(false)
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
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
        Address
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
    <TouchableOpacity style={styles.tableRow}>
      <View style={[styles.tableCell, styles.nameColumn]}>
        <Text>{`${item?.data?.surname} ${item?.data?.firstname}`}</Text>
      </View>
      <Text style={[styles.tableCell, styles.idColumn]}>{item?.staff_id}</Text>
      <Text style={[styles.tableCell, styles.emailColumn]}>
        {item?.data?.email_address}
      </Text>
      <Text style={[styles.tableCell, styles.emailColumn]}>
        {item?.addressSubmitted ? "Verified" : "Not Verified"}
      </Text>

      {!item?.addressSubmitted && (
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
            navigate.push({
              pathname: "/candidatesAddressVerification",
              params: {
                candidateId: item?._id,
                staff_id: item?.staff_id,
                surname: item?.surname,
                firstname: item?.firstname,
                email: item?.email_address,
                status: item?.status,
              },
            })
          }
        >
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderFooter = () => (
    <View style={styles.paginationContainer}>
      {page > 1 && (
        <TouchableOpacity
          onPress={goToPreviousPage}
          style={styles.paginationButton}
        >
          <SimpleLineIcons name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
      )}
      <Text style={[styles.pageIndicator, styles.paginationButton]}>
        {page}
      </Text>
      {page < totalPages && (
        <TouchableOpacity
          onPress={goToNextPage}
          style={styles.paginationButton}
        >
          <SimpleLineIcons name="arrow-right" size={20} color="black" />
        </TouchableOpacity>
      )}
      <Text style={{ fontWeight: "500", fontSize: 14 }}>of {totalPages}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Candidates</Text>
          <View style={styles.searchContainer}>
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

        <FlatList
          data={Candidate_data?.candidates}
          renderItem={renderItem}
          keyExtractor={(item) => item?._id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>No candidates</Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.tableContainer}
        />
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#1710E1" />
          </View>
        )}
        {renderFooter()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  filterButton: {
    backgroundColor: "#1710E1",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 8,
  },
  filterButtonText: {
    color: "white",
  },
  tableContainer: {
    flexGrow: 1,
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
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f2f2f2",
  },
  nameColumn: {
    flex: 1,
  },
  idColumn: {
    flex: 1,
  },
  emailColumn: {
    flex: 1.5,
  },
  statusColumn: {
    flex: 1,
  },
  actionColumn: {
    flex: 1,
  },
  viewButton: {
    backgroundColor: "#1710E1",
    padding: 5,
    borderRadius: 5,
  },
  viewButtonText: {
    color: "white",
    textAlign: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loading: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  paginationButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  pageIndicator: {
    fontSize: 16,
  },
});
