import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const userInfo = useSelector(
    (state: any) => state.auth.userInfo
  );
  console.log(userInfo);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LinearGradient
        colors={["#245B50", "#163D38", "#0D201F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.logoBox}>
          <Text style={styles.logo}>+</Text>
        </View>

        <Text style={styles.title}>Healthcare</Text>

        <Text style={styles.subtitle}>
          Your Health, Our Priority
        </Text>

        <ActivityIndicator
          size="large"
          color="#FFFFFF"
          style={{ marginTop: 35 }}
        />
      </LinearGradient>
    );
  }

  if (userInfo) {
    return <Redirect href="/main/dashboard" />;
  }

  return <Redirect href="/auth/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoBox: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
});