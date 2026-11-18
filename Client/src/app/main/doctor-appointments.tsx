
import React from "react";
import { StyleSheet, View } from "react-native";

import AppointmentList from "../components/doctor/AppointmentList";
import DoctorBottomNavbar from "../components/doctor/DoctorBottomNavbar";

export default function DoctorAppointmentsRoute() {
    // AppointmentList expects an appointments array.
    // An empty array prevents the undefined.length crash.
    const appointments: any[] = [];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <AppointmentList appointments={appointments} />
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
