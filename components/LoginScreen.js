// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Image,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   Button,
//   Modal,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useDispatch, useSelector } from "react-redux";
// import { Login_Fun, reset_login, reset_other_login } from "../redux/AuthSlice";
// import { Forminputpassword } from "./share/InputForm";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import { useMutation } from "react-query";
// import axios from "axios";
// import Toast from "react-native-toast-message";

// const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

// export default function LoginScreen() {
//   const dispatch = useDispatch();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [forgetpassword, setforgetpassword] = useState(false);

//   const { user_data, user_data_isLoading } = useSelector(
//     (state) => state?.AuthSlice
//   );
//   console.log({ isLoading: user_data_isLoading });
//   // let isLoading;

//   // State variables to store username and password
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // dispatch(reset_login());

//   useEffect(() => {
//     return () => {};
//   }, []);

//   const handleLogin = () => {
//     if (!email || !password) {
//       // Display an error message or handle the empty fields
//       console.log("Email and password are required");
//       return;
//     }

//     // Dispatch the login function with the email and password
//     dispatch(Login_Fun({ email, password }));
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         // backgroundColor: "#F3F4F6",
//         // alignItems: "center",
//         paddingHorizontal: 20,
//         borderWidth: 3,
//       }}
//     >
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         {/* Header with Image and Welcome Text */}
//         <View style={styles.header}>
//           <Image
//             source={require("../assets/SignBackground.png")}
//             // source={{ uri: "https://via.placeholder.com/600x300" }} // Replace with actual image URL or local image
//             style={styles.headerImage}
//             resizeMode="cover"
//           />
//           <View style={styles.headerOverlay}>
//             <Text style={styles.welcomeText}>Crystal Checks</Text>
//             <Text style={styles.descriptionText}>
//               As a tech-driven data repository and identity verification
//               company, we provide credible investigations and advisory services
//               for businesses locally and globally.
//             </Text>
//           </View>
//         </View>

//         {/* Login Form */}
//         <View style={styles.formContainer}>
//           <Text style={styles.formTitle}>Welcome Back</Text>

//           {/* Username Input */}
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your Email"
//             value={email}
//             onChangeText={setEmail}
//           />

//           {/* Password Input */}
//           <Text style={styles.label}>Password</Text>

//           <Forminputpassword
//             placeholder="Enter your password"
//             onChangeText={setPassword}
//             value={password}
//             style={{
//               height: 50,
//               borderColor: "#DDD",
//               borderWidth: 1,
//               borderRadius: 8,
//               paddingHorizontal: 10,
//               fontSize: 16,
//               marginBottom: 15,
//             }}
//           />

//           <TouchableOpacity
//             style={{
//               alignSelf: "flex-end",
//               marginVertical: 15,
//             }}
//             onPress={() => setModalVisible(true)}
//             // onPress={() => setforgetpassword(true)}
//           >
//             <Text>Forget Password?</Text>
//           </TouchableOpacity>

//           {/* Login Button */}

//           {user_data_isLoading ? (
//             <ActivityIndicator color="blue" size="large" />
//           ) : (
//             <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//               <Text style={styles.loginButtonText}>Log In</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </KeyboardAvoidingView>

//       <View>
//         <ForgotPasswordModal
//           visible={modalVisible}
//           onClose={() => setModalVisible(false)}
//           resetpassowrd={() => setforgetpassword(true)}
//           Noresetpassowrd={() => setforgetpassword(false)}
//         />

//         {console.log({
//           fff: forgetpassword,
//         })}

//         <ResetPasswordModal
//           forgetvisible={forgetpassword}
//           onClose={() => setModalVisible(false)}
//           resetpassowrd={() => setforgetpassword(true)}
//           Noresetpassowrd={() => setforgetpassword(false)}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#F3F4F6",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     borderWidth: 1,
//   },
//   header: {
//     width: "100%",
//     height: "55%",
//     borderRadius: 10,
//     overflow: "hidden",
//     marginBottom: 30,
//     backgroundColor: "#ccc",
//   },
//   headerImage: {
//     width: "100%",
//     height: "100%",
//   },
//   headerOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 50, 0.2)",
//     padding: 20,
//     justifyContent: "flex-end",
//     alignItems: "flex-start",
//   },
//   welcomeText: {
//     fontSize: 36,
//     fontWeight: "700",
//     color: "#FFFFFF",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   descriptionText: {
//     fontSize: 14,
//     color: "#FFFFFF",
//     marginVertical: 10,
//     // textAlign: "center",
//     // paddingHorizontal: 10,
//   },
//   formContainer: {
//     width: "100%",
//     backgroundColor: "#FFFFFF",
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   formTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: "#02052F",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   label: {
//     fontSize: 16,
//     color: "#02052F",
//     marginBottom: 8,
//   },
//   input: {
//     height: 50,
//     borderColor: "#DDD",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     fontSize: 16,
//     marginBottom: 15,
//   },
//   noteText: {
//     fontSize: 12,
//     color: "#555",
//     marginBottom: 20,
//     fontStyle: "italic",
//   },
//   loginButton: {
//     backgroundColor: "#1710E1",
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   loginButtonText: {
//     fontSize: 18,
//     color: "#FFFFFF",
//     fontWeight: "600",
//   },
// });

// const ForgotPasswordModal = ({
//   visible,
//   onClose,
//   resetpassowrd,
//   Noresetpassowrd,
// }) => {
//   const [email, setEmail] = useState("");

//   const ForgetPassword = useMutation(
//     (data_info) => {
//       let url = `${API_BASEURL}v1/auth/forgot-password`;

//       console.log({});
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           // Authorization: `Bearer ${user_data?.data?.token}`,
//         },
//       };
//       console.log({
//         jfjf: data_info,
//       });

//       return axios.post(url, { email: data_info }, config);
//     },
//     {
//       onSuccess: (success) => {
//         console.log({
//           sis: success?.data?.message,
//         });

//         resetpassowrd();
//         Toast.show({
//           type: "success",
//           text1: `${success?.data?.message}`,
//         });
//         onClose();

//         // dispatch(Get_My_Clan_Forum_Fun());
//         // setTurnmodal(false);
//       },

//       onError: (error) => {
//         console.log({
//           jsjs: error?.response?.data,
//         });
//         Toast.show({
//           type: "error",
//           text1: `${error?.response?.data?.message} `,
//           //   text2: ` ${error?.response?.data?.errorMsg} `,
//         });

//         // dispatch(Get_User_Clans_Fun());
//         // dispatch(Get_User_Profle_Fun());
//         // dispatch(Get_all_clan_User_Is_adminIN_Fun());
//       },
//     }
//   );
//   const handlePasswordReset = () => {
//     if (!email) {
//       alert("Please enter your email address.");
//       return;
//     }

//     // console.log({
//     //   lll: email,
//     // });

//     ForgetPassword.mutate(email);
//     // mutate(email);
//   };

//   return (
//     <Modal
//       transparent
//       visible={visible}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <View
//           style={{
//             width: "80%",
//             backgroundColor: "white",
//             borderRadius: 10,
//             padding: 20,
//             // alignItems: "center",
//             shadowColor: "#000",
//             shadowOpacity: 0.25,
//             shadowRadius: 4,
//             elevation: 5,
//             height: "30%",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 20,
//               fontWeight: "bold",
//               marginBottom: 20,
//               alignSelf: "center",
//             }}
//           >
//             Forget Password
//           </Text>
//           <Text
//             style={{
//               textAlign: "left",
//             }}
//           >
//             Email Address
//           </Text>
//           <TextInput
//             style={{
//               width: "100%",
//               height: 40,
//               borderColor: "#ccc",
//               borderWidth: 1,
//               borderRadius: 5,
//               paddingHorizontal: 10,
//               marginVertical: 20,
//             }}
//             placeholder="Enter your email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />

//           {ForgetPassword.isLoading ? (
//             <ActivityIndicator size="large" color="blue" />
//           ) : (
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#007bff",
//                 padding: 10,
//                 borderRadius: 5,
//                 width: "80%",
//                 alignItems: "center",
//                 marginBottom: 10,
//                 alignSelf: "center",
//                 marginTop: 30,
//                 // opacity: isLoading ? 0.6 : 1,
//               }}
//               onPress={handlePasswordReset}
//               // disabled={isLoading}
//             >
//               <Text style={{ color: "white", fontWeight: "bold" }}>
//                 {/* {isLoading ? "Sending..." : "Send Reset Link"} */}
//                 Proceed
//               </Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             style={{
//               position: "absolute",
//               alignSelf: "flex-end",
//               right: 20,
//               top: 20,
//             }}
//             // onPress={() => console.log("dkfjdkf")}
//             onPress={onClose}
//             // onPress={handlePasswordReset}
//             // disabled={isLoading}
//           >
//             <AntDesign name="closecircle" size={24} color="black" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const ResetPasswordModal = ({
//   forgetvisible,
//   onClose,
//   resetpassowrd,
//   Noresetpassowrd,
// }) => {
//   const [email, setEmail] = useState("");
//   const [otp, setotp] = useState("");
//   const [password, setpassword] = useState("");

//   const ForgetPassword = useMutation(
//     (data_info) => {
//       let url = `${API_BASEURL}v1/auth/reset-password`;

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           // Authorization: `Bearer ${user_data?.data?.token}`,
//         },
//       };

//       return axios.post(url, data_info);
//     },
//     {
//       onSuccess: (success) => {
//         console.log({
//           sis: success?.data?.message,
//         });
//         Toast.show({
//           type: "success",
//           text1: `${success?.data?.message}`, //" successfully ",
//         });

//         onClose();
//         Noresetpassowrd();
//         // dispatch(Get_My_Clan_Forum_Fun());
//         // setTurnmodal(false);
//       },

//       onError: (error) => {
//         console.log({
//           jsjs: error?.response?.data,
//         });
//         Toast.show({
//           type: "error",
//           text1: `${error?.response?.data?.message} `,
//           //   text2: ` ${error?.response?.data?.errorMsg} `,
//         });

//         // dispatch(Get_User_Clans_Fun());
//         // dispatch(Get_User_Profle_Fun());
//         // dispatch(Get_all_clan_User_Is_adminIN_Fun());
//       },
//     }
//   );
//   const handlePasswordReset = () => {
//     if (!email) {
//       alert("Please enter your email address.");
//       return;
//     }

//     let data = {
//       email: email,
//       otp,
//       password,
//     };

//     console.log({
//       data,
//     });

//     ForgetPassword.mutate(data);
//     // mutate(email);
//   };

//   return (
//     <Modal
//       transparent
//       visible={forgetvisible}
//       animationType="slide"
//       onRequestClose={Noresetpassowrd}
//     >
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <View
//           style={{
//             width: "80%",
//             backgroundColor: "white",
//             borderRadius: 10,
//             padding: 20,
//             // alignItems: "center",
//             shadowColor: "#000",
//             shadowOpacity: 0.25,
//             shadowRadius: 4,
//             elevation: 5,
//             height: "40%",
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 20,
//               fontWeight: "bold",
//               marginBottom: 20,
//               alignSelf: "center",
//             }}
//           >
//             Reset Password
//           </Text>
//           <View>
//             <View>
//               <Text
//                 style={{
//                   textAlign: "left",
//                 }}
//               >
//                 Email Address
//               </Text>
//               <TextInput
//                 style={{
//                   width: "100%",
//                   height: 40,
//                   borderColor: "#ccc",
//                   borderWidth: 1,
//                   borderRadius: 5,
//                   paddingHorizontal: 10,
//                   marginVertical: 20,
//                 }}
//                 placeholder="Enter your email"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//               />
//             </View>

//             <View>
//               <Text
//                 style={{
//                   textAlign: "left",
//                 }}
//               >
//                 OTP
//               </Text>
//               <TextInput
//                 style={{
//                   width: "100%",
//                   height: 40,
//                   borderColor: "#ccc",
//                   borderWidth: 1,
//                   borderRadius: 5,
//                   paddingHorizontal: 10,
//                   marginVertical: 20,
//                 }}
//                 placeholder="Enter your email"
//                 value={otp}
//                 onChangeText={setotp}
//                 keyboardType="number-pad"
//               />
//             </View>

//             <View>
//               <Text
//                 style={{
//                   textAlign: "left",
//                 }}
//               >
//                 Password
//               </Text>
//               <TextInput
//                 style={{
//                   width: "100%",
//                   height: 40,
//                   borderColor: "#ccc",
//                   borderWidth: 1,
//                   borderRadius: 5,
//                   paddingHorizontal: 10,
//                   marginVertical: 20,
//                 }}
//                 placeholder="Enter your email"
//                 value={password}
//                 onChangeText={setpassword}
//                 // keyboardType=""
//               />
//             </View>
//           </View>

//           {ForgetPassword.isLoading ? (
//             <ActivityIndicator size="large" color="blue" />
//           ) : (
//             <TouchableOpacity
//               style={{
//                 backgroundColor: "#007bff",
//                 padding: 10,
//                 borderRadius: 5,
//                 width: "80%",
//                 alignItems: "center",
//                 marginBottom: 10,
//                 alignSelf: "center",
//                 marginTop: 30,
//                 // opacity: isLoading ? 0.6 : 1,
//               }}
//               onPress={handlePasswordReset}
//               // disabled={isLoading}
//             >
//               <Text style={{ color: "white", fontWeight: "bold" }}>
//                 {/* {isLoading ? "Sending..." : "Send Reset Link"} */}
//                 Proceed
//               </Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             style={{
//               position: "absolute",
//               alignSelf: "flex-end",
//               right: 20,
//               top: 20,
//             }}
//             // onPress={() => console.log("dkfjdkf")}
//             onPress={Noresetpassowrd}
//             // onPress={handlePasswordReset}
//             // disabled={isLoading}
//           >
//             <AntDesign name="closecircle" size={24} color="black" />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

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
