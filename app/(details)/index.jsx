import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AppScreen from "../../components/AppScreen";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import GuarantorDetails from "./guarantorDetails";

export default function index() {
  const { data } = useLocalSearchParams();
  const parasedData = JSON.parse(data);
  console.log(data.name);

  return (
    <AppScreen title={"Candidate's Details"}>
      <ScrollView style={styles.container}>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Candidate Information</Text>
            <Text style={styles.link}>View Details</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.group}>
              <Text style={styles.key}>Name</Text>
              <Text style={styles.value}>{parasedData?.name}</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.key}>Gender</Text>
              <Text style={styles.value}>Female</Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.key}>Guarantor Passport</Text>
              <TouchableOpacity>
                <Text style={styles.link}>View Uploaded</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.group}>
              <Text style={styles.key}>Phone Number</Text>
              <Text style={styles.value}>{parasedData?.phoneNumber}</Text>
            </View>
          </View>
        </View>
        <View>
          <GuarantorDetails/>
        </View>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#02052F",
  },
  group: {
    // gap: 5,
  },
  key: {
    fontSize: 12,
    color: "#02052F",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#02052F",
  },
  link:{
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1892",
    textDecorationLine:"underline"  }
});
