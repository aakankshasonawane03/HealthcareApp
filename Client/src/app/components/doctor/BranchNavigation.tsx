
import React from "react";
import { useRouter } from "expo-router";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
    branchId: string;
    branchName: string;
};

export default function BranchNavigation({
    branchId,
    branchName,
}: Props) {
    const router = useRouter();

    const openAppointments = () => {
        router.push({
            pathname: "/main/doctor",
            params: {
                branchId,
                branchName,
                tab: "appointments",
            },
        });
    };

    const openPatients = () => {
        router.push({
            pathname: "/main/doctor",
            params: {
                branchId,
                branchName,
                tab: "patients",
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{branchName}</Text>
            <Text style={styles.subtitle}>
                Choose what you want to manage for this branch.
            </Text>

            <TouchableOpacity
                style={styles.primaryButton}
                onPress={openAppointments}
            >
                <Text style={styles.primaryText}>View Appointments</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={openPatients}
            >
                <Text style={styles.secondaryText}>View Patients</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 18,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        gap: 12,
    },
    heading: {
        fontSize: 20,
        fontWeight: "700",
        color: "#172554",
    },
    subtitle: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 4,
    },
    primaryButton: {
        padding: 14,
        borderRadius: 10,
        backgroundColor: "#2563EB",
        alignItems: "center",
    },
    primaryText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    secondaryButton: {
        padding: 14,
        borderRadius: 10,
        backgroundColor: "#DBEAFE",
        alignItems: "center",
    },
    secondaryText: {
        color: "#1D4ED8",
        fontWeight: "700",
    },
});
