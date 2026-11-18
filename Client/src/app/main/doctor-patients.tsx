import React from "react";
import { View, StyleSheet } from "react-native";
import PatientList from "../components/doctor/PatientList";

export default function DoctorPatientsRoute() {
    return (
        <View style={styles.container}>
            <PatientList patients={[]} />
        </View>
    );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: "#F5F7FB" } });