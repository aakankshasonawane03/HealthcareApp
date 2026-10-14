// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";

// export default function RootLayout() {
//   return (
//     <>
//       <StatusBar style="dark" />
//       <Stack
//         screenOptions={{
//           headerShown: false,
//         }}
//       />
//     </>
//   );
// }




import "react-native-gesture-handler";


import { Stack } from "expo-router";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { PaperProvider } from "react-native-paper";

import { persistor, store } from "@/redux/store";

import { SafeAreaProvider } from "react-native-safe-area-context";

import Toast from "react-native-toast-message";

// import {
//   Michroma_400Regular,
//   useFonts,
// } from "@expo-google-fonts/michroma";

import { StatusBar } from "react-native";

// import {
//   setupNotificationListeners,
// } from "@/services/notificationServices";

export default function RootLayout() {
  // ==========================================
  // FONTS
  // ==========================================
  // const [saveFCMToken] = useSaveFCMTokenMutation();
  // const [fontsLoaded] = useFonts({
  //   Michroma_400Regular,
  // });

  // ==========================================
  // NOTIFICATION LISTENERS
  // ==========================================

  // useEffect(() => {
  //   const cleanup = setupNotificationListeners();

  //   return cleanup;
  // }, []);

  // ==========================================
  // FONT LOADING
  // ==========================================
  // useEffect(() => {
  //   const initializeNotifications = async () => {
  //     try {
  //       const token = await getFCMToken();

  //       if (!token) {
  //         console.log("❌ FCM token not found");
  //         return;
  //       }

  //       console.log("🔥 FCM Token:", token);

  //       await saveFCMToken({
  //         token: token,
  //       });

  //       console.log("✅ FCM token saved");
  //     } catch (error) {
  //       console.log("❌ Save FCM token error:", error);
  //     }
  //   };

  //   initializeNotifications();

  //   const cleanup = setupNotificationListeners();

  //   return cleanup;
  // }, []);
  //   // useEffect(() => {
  //   //   const getToken = async () => {
  //   //     const token = await getFCMToken();

  //   //     console.log("🔥 FINAL FCM TOKEN:", token);
  //   //   };

  //   //   getToken();
  //   // }, []);
  // if (!fontsLoaded) {
  //   return null;
  // }
  // ==========================================
  // ROOT UI
  // ==========================================

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
    >
      <SafeAreaProvider>

        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <Provider store={store}>

          <PersistGate
            loading={null}
            persistor={persistor}
          >

            <PaperProvider>
              {/* <NotificationInitializer /> */}

              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />

              <Toast />

            </PaperProvider>

          </PersistGate>

        </Provider>

      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}