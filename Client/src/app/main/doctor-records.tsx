
import React from "react";
import { View, StyleSheet } from "react-native";

import MedicalRecordList from "../components/doctor/MedicalRecordList";
import DoctorBottomNavbar from "../components/doctor/DoctorBottomNavbar";

export default function DoctorRecordsRoute() {
    // Prevent undefined.length errors when records are not loaded.
    const records: any[] = [];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <MedicalRecordList records={records} />
            </View>

            <DoctorBottomNavbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },
    content: {
        flex: 1,
    },
});
