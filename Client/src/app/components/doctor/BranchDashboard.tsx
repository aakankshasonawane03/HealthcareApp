
import React, { useMemo, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import BranchSelector, { ClinicBranch } from "./BranchSelector";

type Appointment = {
    id: string;
    patientName: string;
    date?: string;
    time?: string;
    status?: string;
    branchId?: string;
};

type Patient = {
    id: string;
    name: string;
    branchId?: string;
};

type Props = {
    branches: ClinicBranch[];
    appointments?: Appointment[];
    patients?: Patient[];
    loading?: boolean;
    onOpenAppointments?: (branchId: string) => void;
    onOpenPatients?: (branchId: string) => void;
};

export default function BranchDashboard({
    branches,
    appointments = [],
    patients = [],
    loading = false,
    onOpenAppointments,
    onOpenPatients,
}: Props) {
    const [selectedBranchId, setSelectedBranchId] = useState<string | null>(
        branches[0]?.id ?? null
    );

    const selectedBranch = branches.find(
        (branch) => branch.id === selectedBranchId
    );

    const branchAppointments = useMemo(
        () =>
            selectedBranchId
                ? appointments.filter(
                    (appointment) => appointment.branchId === selectedBranchId
                )
                : [],
        [appointments, selectedBranchId]
    );

    const branchPatients = useMemo(
        () =>
            selectedBranchId
                ? patients.filter((patient) => patient.branchId === selectedBranchId)
                : [],
        [patients, selectedBranchId]
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.heading}>My Branches</Text>
            <Text style={styles.subtitle}>
                Select a clinic branch to view its dashboard.
            </Text>

            <BranchSelector
                branches={branches}
                selectedBranchId={selectedBranchId}
                onSelect={(branch) => setSelectedBranchId(branch.id)}
                loading={loading}
            />

            {selectedBranch && (
                <View style={styles.dashboard}>
                    <Text style={styles.branchTitle}>{selectedBranch.name}</Text>
                    <Text style={styles.address}>
                        {[selectedBranch.address, selectedBranch.city]
                            .filter(Boolean)
                            .join(", ")}
                    </Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>
                                {branchAppointments.length}
                            </Text>
                            <Text style={styles.statLabel}>Appointments</Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>{branchPatients.length}</Text>
                            <Text style={styles.statLabel}>Patients</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => onOpenAppointments?.(selectedBranch.id)}
                    >
                        <Text style={styles.actionText}>View Appointments</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => onOpenPatients?.(selectedBranch.id)}
                    >
                        <Text style={styles.secondaryText}>View Patients</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F7FB" },
    content: { padding: 20, gap: 12 },
    heading: { fontSize: 25, fontWeight: "700", color: "#172554" },
    subtitle: { color: "#64748B", marginBottom: 8 },
    dashboard: {
        padding: 18,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 8,
    },
    branchTitle: { fontSize: 20, fontWeight: "700", color: "#172554" },
    address: { color: "#64748B", marginTop: 5 },
    statsRow: { flexDirection: "row", gap: 12, marginVertical: 18 },
    statCard: {
        flex: 1,
        padding: 16,
        backgroundColor: "#EFF6FF",
        borderRadius: 12,
    },
    statNumber: { fontSize: 26, fontWeight: "700", color: "#1D4ED8" },
    statLabel: { marginTop: 5, color: "#475569", fontSize: 13 },
    actionButton: {
        backgroundColor: "#2563EB",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    actionText: { color: "#FFFFFF", fontWeight: "700" },
    secondaryButton: {
        backgroundColor: "#DBEAFE",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    secondaryText: { color: "#1D4ED8", fontWeight: "700" },
});

