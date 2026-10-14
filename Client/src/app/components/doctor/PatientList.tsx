
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import PatientCard, {
    DoctorPatient,
} from "./PatientCard";

interface PatientListProps {
    patients: DoctorPatient[];
    title?: string;
    subtitle?: string;
    showViewAll?: boolean;
    onViewAll?: () => void;
    onPatientPress?: (patient: DoctorPatient) => void;
    emptyMessage?: string;
}

export default function PatientList({
    patients,
    title = "My Patients",
    subtitle = "Recently registered patients",
    showViewAll = true,
    onViewAll,
    onPatientPress,
    emptyMessage = "No patients found.",
}: PatientListProps) {
    return (
        <View style={styles.container}>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>

                {showViewAll && (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onViewAll}
                    >
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Patient List */}
            {patients.length > 0 ? (
                <View>
                    {patients.map((patient) => (
                        <PatientCard
                            key={patient.id}
                            patient={patient}
                            onPress={onPatientPress}
                        />
                    ))}
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIcon}>
                        <Text style={styles.emptyIconText}>P</Text>
                    </View>

                    <Text style={styles.emptyTitle}>
                        No Patients
                    </Text>

                    <Text style={styles.emptyMessage}>
                        {emptyMessage}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 13,
    },

    titleContainer: {
        flex: 1,
    },

    title: {
        color: "#0F172A",
        fontSize: 18,
        fontWeight: "700",
    },

    subtitle: {
        color: "#64748B",
        fontSize: 11,
        marginTop: 4,
    },

    viewAll: {
        color: "#2563EB",
        fontSize: 12,
        fontWeight: "600",
    },

    emptyContainer: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 16,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: "center",
    },

    emptyIcon: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    emptyIconText: {
        color: "#2563EB",
        fontSize: 17,
        fontWeight: "700",
    },

    emptyTitle: {
        color: "#0F172A",
        fontSize: 14,
        fontWeight: "600",
    },

    emptyMessage: {
        color: "#64748B",
        fontSize: 11,
        textAlign: "center",
        marginTop: 6,
    },
});
