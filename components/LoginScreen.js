import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Login_Fun } from "../redux/AuthSlice";
import { Forminputpassword } from "./share/InputForm";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [forgetpassword, setForgetpassword] = useState(false);
  const { user_data_isLoading } = useSelector((state) => state?.AuthSlice);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      console.log("Email and password are required");
      return;
    }
    dispatch(Login_Fun({ email, password }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header with Image and Welcome Text */}
        <View style={styles.header}>
          <Image
            source={require("../assets/SignBackground.png")}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <View style={styles.headerOverlay}>
            <Text style={styles.welcomeText}>Crystal Checks</Text>
            <Text style={styles.descriptionText}>
              As a tech-driven data repository and identity verification
              company, we provide credible investigations and advisory services
              for businesses locally and globally.
            </Text>
          </View>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Welcome Back</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <Forminputpassword
            placeholder="Enter your password"
            onChangeText={setPassword}
            value={password}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={() => setModalVisible(true)}
          >
            <Text>Forget Password?</Text>
          </TouchableOpacity>

          {user_data_isLoading ? (
            <ActivityIndicator color="blue" size="large" />
          ) : (
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
  },
  header: {
    width: "100%",
    height: height * 0.4,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 30,
    backgroundColor: "#ccc",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 50, 0.2)",
    padding: width * 0.05,
    justifyContent: "flex-end",
  },
  welcomeText: {
    fontSize: width * 0.08,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: width * 0.04,
    color: "#FFFFFF",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: width * 0.05,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  formTitle: {
    fontSize: width * 0.06,
    fontWeight: "700",
    color: "#02052F",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: width * 0.04,
    color: "#02052F",
    marginBottom: 8,
  },
  input: {
    height: height * 0.06,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.04,
    marginBottom: 15,
  },
  forgotPasswordLink: {
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "#1710E1",
    paddingVertical: height * 0.02,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: width * 0.045,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
