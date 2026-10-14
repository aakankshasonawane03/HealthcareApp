import { Stack } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomNavbar from "../components/ui/BottomNavbar";
import Sidebar from "../components/ui/Sidebar";

export default function MainLayout() {
  const isWeb = Platform.OS === "web";

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={styles.safeArea}
    >
      <View style={styles.container}>

        {/* =================================
                    WEB SIDEBAR
                    ================================= */}

        {isWeb && (
          <Sidebar />
        )}

        {/* =================================
                    MAIN CONTENT
                    ================================= */}

        <View style={styles.content}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </View>

        {/* =================================
                    MOBILE BOTTOM NAVBAR
                    ================================= */}

        {!isWeb && (
          <BottomNavbar />
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    flexDirection: "row",
  },

  content: {
    flex: 1,
  },
});