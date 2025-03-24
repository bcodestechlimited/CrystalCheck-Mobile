import React, { useCallback, useEffect } from "react";
import { persistor, store } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { Slot } from "expo-router";
import StackNavigation from "../navigation/StackNavigation";
import CameraScreen from "../components/CameraScreen";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-SemiBold": require("../assets/font/RobotoSlab-SemiBold.ttf"),
    "RobotoSlab-Medium": require("../assets/font/RobotoSlab-Medium.ttf"),
    "RobotoSlab-Light": require("../assets/font/RobotoSlab-Light.ttf"),
    "RobotoSlab-Regular": require("../assets/font/RobotoSlab-Regular.ttf"),
    "Inter-Regular": require("../assets/font/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/font/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <StackNavigation />
              <Toast />
            </View>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
