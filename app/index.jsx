import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import Button from "../components/Button";
import Candidates from "./candidates";
import { logout, reset_login } from "../redux/AuthSlice"; // Assuming you have a logout action in your slice
import { reset_CandidateSlice } from "../redux/CandiddateSlice";
import AssignCandidiate from "../components/AssignCandidiate";

// Get screen dimensions
const { width, height } = Dimensions.get("window");
const isTablet = width > 600; // Rough check for tablet devices

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useRouter();
  const dispatch = useDispatch();

  const { user_data, userprofile } = useSelector((state) => state.AuthSlice);

  const [Verifycandidate, setVerifycandidate] = useState(true);

  const handleLogout = () => {
    dispatch(reset_CandidateSlice());
    dispatch(reset_login());
  };

  const handleUpdateProfile = () => {
    setModalVisible(false);
    navigation.push("/updateProfile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View>
          <View style={styles.headerRow}>
            <TouchableOpacity>
              <Image
                source={{
                  uri: user_data?.data?.user?.image,
                }}
                style={styles.profileImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Image
                source={require("../assets/export.png")}
                style={styles.logoutIcon}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.welcomeRow}>
            <Image
              source={require("../assets/waving-hand.png")}
              style={styles.wavingHand}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>
              Welcome {userprofile?.user?.fullName}
            </Text>
          </View>
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.infoText}>No of Candidates Verified</Text>
          <Text style={styles.candidatesCount}>
            {userprofile?.user?.guarantorsSubmitted}
          </Text>
        </View>

        <View>
          {Verifycandidate ? (
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => setVerifycandidate(false)}
            >
              <Text style={styles.verifyButtonText}>Guarantor</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => setVerifycandidate(true)}
            >
              <Text style={styles.verifyButtonText}>Candidate</Text>
            </TouchableOpacity>
          )}
        </View>

        {Verifycandidate ? <AssignCandidiate /> : <Candidates />}
      </View>

      {/* Modal Section */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Profile Actions</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleUpdateProfile}
                >
                  <Text style={styles.modalButtonText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    {
                      backgroundColor: "red",
                    },
                  ]}
                  onPress={handleLogout}
                >
                  <Text style={[styles.modalButtonText, { color: "white" }]}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: isTablet ? 20 : 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: isTablet ? 20 : 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: isTablet ? 70 : 50,
    height: isTablet ? 70 : 50,
    borderRadius: isTablet ? 35 : 25,
    marginLeft: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3FAFF",
    paddingHorizontal: isTablet ? 30 : 20,
    borderRadius: 12,
    gap: 10,
  },
  logoutIcon: {
    width: isTablet ? 30 : 24,
    height: isTablet ? 30 : 24,
  },
  logoutText: {
    color: "#1710E1",
    fontSize: isTablet ? 18 : 14,
  },
  welcomeRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  wavingHand: {
    width: isTablet ? "8%" : "10%",
  },
  welcomeText: {
    fontSize: isTablet ? 20 : 16,
    fontWeight: "600",
  },
  subcontainer: {
    backgroundColor: "#F3FAFF",
    borderRadius: 20,
    padding: isTablet ? 30 : 20,
    alignItems: "center",
  },
  infoText: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: "500",
    color: "#02052F",
  },
  candidatesCount: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: "700",
    color: "#02052F",
  },
  verifyButton: {
    backgroundColor: "blue",
    padding: isTablet ? 15 : 10,
    alignSelf: "flex-start",
    borderRadius: 10,
    marginTop: 10,
  },
  verifyButtonText: {
    color: "white",
    fontSize: isTablet ? 22 : 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: isTablet ? "40%" : "70%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  modalButton: {
    padding: isTablet ? 15 : 12,
    marginVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  modalButtonText: {
    fontWeight: "600",
    fontSize: isTablet ? 22 : 18,
  },
});
