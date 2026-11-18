
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function BranchDetailsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{
        branchId?: string;
        branchName?: string;
        address?: string;
        city?: string;
    }>();

    const branchName = params.branchName || "Selected Branch";
    const branchId = params.branchId || "";
    const address = params.address || "";
    const city = params.city || "";

    const openDoctorDashboard = (tab: "appointments" | "patients") => {
        router.push({
            pathname: "/main/doctor",
            params: {
                branchId,
                branchName,
                tab,
            },
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.back}>← Back</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.eyebrow}>BRANCH DETAILS</Text>
                <Text style={styles.title}>{branchName}</Text>
                {!!address && <Text style={styles.detail}>{address}</Text>}
                {!!city && <Text style={styles.detail}>{city}</Text>}
                {!!branchId && (
                    <Text style={styles.idText}>Branch ID: {branchId}</Text>
                )}
            </View>

            <Text style={styles.sectionTitle}>Branch Workspace</Text>

            <TouchableOpacity
                style={styles.card}
                onPress={() => openDoctorDashboard("appointments")}
            >
                <Text style={styles.cardTitle}>Appointments</Text>
                <Text style={styles.cardDescription}>
                    Open the doctor dashboard with the appointments tab requested.
                </Text>
                <Text style={styles.action}>Open Appointments →</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.card}
                onPress={() => openDoctorDashboard("patients")}
            >
                <Text style={styles.cardTitle}>Patients</Text>
                <Text style={styles.cardDescription}>
                    Open the doctor dashboard with the patients tab requested.
                </Text>
                <Text style={styles.action}>Open Patients →</Text>
            </TouchableOpacity>

            <Text style={styles.note}>
                Note: Your doctor dashboard must read the tab and branchId parameters
                for these actions to select and filter the actual data.
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F7FB" },
    content: { padding: 20, gap: 16 },
    back: { color: "#2563EB", fontSize: 16, fontWeight: "600" },
    header: {
        backgroundColor: "#FFFFFF",
        padding: 22,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    eyebrow: {
        color: "#2563EB",
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 1,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#172554",
        marginTop: 8,
    },
    detail: { color: "#64748B", marginTop: 6, fontSize: 14 },
    idText: { color: "#94A3B8", marginTop: 12, fontSize: 12 },
    sectionTitle: { fontSize: 19, fontWeight: "700", color: "#172554" },
    card: {
        padding: 20,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    cardTitle: { fontSize: 18, fontWeight: "700", color: "#172554" },
    cardDescription: { color: "#64748B", marginTop: 8, lineHeight: 21 },
    action: { color: "#2563EB", fontWeight: "700", marginTop: 14 },
    note: { fontSize: 12, lineHeight: 18, color: "#64748B" },
});
