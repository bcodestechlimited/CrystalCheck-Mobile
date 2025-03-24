import { View, Text, TextInput, Image, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AgenDetails from "../components/AgenDetails";

export default function UpdateProfile() {
  // State for managing the user's profile data
  const { user_data } = useSelector((state) => state.AuthSlice);

  const [profileData, setProfileData] = useState({
    fullName: "Obodo David",
    email: "davidtumuch@gmail.com",
    image:
      "https://res.cloudinary.com/demmgc49v/image/upload/v1695969739/default-avatar_scnpps.jpg",
    roles: ["user", "admin", "agent"],
  });

  // Handle input changes
  const handleInputChange = (name, value) => {
    setProfileData({ ...profileData, [name]: value });
  };

  // Handle profile update logic (example)
  const handleUpdateProfile = () => {
    console.log("Updated profile:", profileData);
    // Implement your profile update API call or logic here
  };

  return <AgenDetails />;

  return (
    <View style={styles.container}>
      <Image source={{ uri: profileData.image }} style={styles.profileImage} />
      <Text style={styles.title}>Update Profile</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.input}>{user_data?.data?.user?.image}</Text>
        {/* <TextInput
          style={styles.input}
          value={profileData.fullName}
          onChangeText={(value) => handleInputChange("fullName", value)}
        /> */}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={profileData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Roles</Text>
        <TextInput
          style={styles.input}
          value={profileData.roles.join(", ")}
          onChangeText={(value) =>
            handleInputChange(
              "roles",
              value.split(",").map((role) => role.trim())
            )
          }
        />
      </View>

      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  formGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
