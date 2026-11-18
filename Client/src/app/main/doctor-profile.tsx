import React from "react";
import { View, StyleSheet } from "react-native";
import DoctorProfile from "../components/doctor/DoctorProfile";

export default function DoctorProfileRoute() {
    return <View style={styles.container}><DoctorProfile /></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: "#F5F7FB" } });