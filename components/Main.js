import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const data = new Array(130).fill(null).map((_, index) => ({
    id: index + 1,
    name: "Mike John",
    email: "Mike@gmail.com",
    phone: "08164045892",
    status: ["0/2 Verified", "1/2 Verified", "2/2 Verified", "Pending"][
      index % 4
    ],
  }));

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>👋 Welcome John</Text>
        <View style={styles.verificationBox}>
          <Text style={styles.verificationText}>No. Candidate Verified</Text>
          <Text style={styles.verificationCount}>34,000</Text>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchFilter}>
        <TextInput style={styles.searchInput} placeholder="Search" />
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.columnName]}>Name</Text>
          <Text style={[styles.headerText, styles.columnEmail]}>
            Email Address
          </Text>
          <Text style={[styles.headerText, styles.columnPhone]}>Phone No.</Text>
          <Text style={[styles.headerText, styles.columnStatus]}>Status</Text>
          <Text style={[styles.headerText, styles.columnAction]}>Action</Text>
        </View>
        {currentData.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={[styles.rowText, styles.columnName]}>{item.name}</Text>
            <Text style={[styles.rowText, styles.columnEmail]}>
              {item.email}
            </Text>
            <Text style={[styles.rowText, styles.columnPhone]}>
              {item.phone}
            </Text>
            <Text
              style={[
                styles.rowText,
                styles.columnStatus,
                item.status.includes("2/2")
                  ? styles.statusVerified
                  : item.status.includes("Pending")
                  ? styles.statusPending
                  : styles.statusPartial,
              ]}
            >
              {item.status}
            </Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage((prev) => prev - 1)}
          style={[
            styles.paginationButton,
            currentPage === 1 && styles.paginationDisabled,
          ]}
        >
          <Text style={styles.paginationText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.paginationInfo}>
          {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage((prev) => prev + 1)}
          style={[
            styles.paginationButton,
            currentPage === totalPages && styles.paginationDisabled,
          ]}
        >
          <Text style={styles.paginationText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 12,
  },
  verificationBox: {
    backgroundColor: "#e5f0ff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  verificationText: {
    fontSize: 16,
    color: "#444",
  },
  verificationCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  searchFilter: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: "#3B82F6",
    padding: 10,
    borderRadius: 8,
  },
  filterText: {
    color: "#fff",
  },
  table: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  columnName: { flex: 1 },
  columnEmail: { flex: 2 },
  columnPhone: { flex: 1 },
  columnStatus: { flex: 1 },
  columnAction: { flex: 1 },
  tableRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  rowText: {
    fontSize: 14,
  },
  statusVerified: {
    color: "green",
  },
  statusPending: {
    color: "orange",
  },
  statusPartial: {
    color: "red",
  },
  viewButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  viewText: {
    color: "#fff",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paginationButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  paginationDisabled: {
    backgroundColor: "#ccc",
  },
  paginationText: {
    color: "#fff",
  },
  paginationInfo: {
    fontSize: 14,
  },
});
