
import {
    CalendarDays,
    ChevronRight,
    ClipboardList,
    FileText,
    UserRound,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface DoctorPrescription {
    id: string | number;
    patientName: string;
    diagnosis?: string;
    medicines?: string[];
    date?: string;
    status?: "Active" | "Completed" | "Draft";
}

interface PrescriptionCardProps {
    prescription: DoctorPrescription;
    onPress?: (prescription: DoctorPrescription) => void;
}

export default function PrescriptionCard({
    prescription,
    onPress,
}: PrescriptionCardProps) {
    const status = prescription.status || "Active";

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => onPress?.(prescription)}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <FileText size={21} color="#2563EB" />
                </View>

                <View style={styles.headerContent}>
                    <Text style={styles.title}>Prescription</Text>

                    {prescription.date && (
                        <View style={styles.dateRow}>
                            <CalendarDays size={12} color="#64748B" />

                            <Text style={styles.date}>
                                {prescription.date}
                            </Text>
                        </View>
                    )}
                </View>

                <StatusBadge status={status} />
            </View>

            {/* Patient */}
            <View style={styles.patientRow}>
                <View style={styles.smallIcon}>
                    <UserRound size={14} color="#2563EB" />
                </View>

                <Text style={styles.patientName}>
                    {prescription.patientName}
                </Text>
            </View>

            {/* Diagnosis */}
            {prescription.diagnosis && (
                <View style={styles.diagnosisContainer}>
                    <Text style={styles.label}>Diagnosis</Text>

                    <Text style={styles.diagnosis}>
                        {prescription.diagnosis}
                    </Text>
                </View>
            )}

            {/* Medicines */}
            {prescription.medicines &&
                prescription.medicines.length > 0 && (
                    <View style={styles.medicineContainer}>
                        <View style={styles.medicineHeader}>
                            <View style={styles.medicineTitleRow}>
                                <ClipboardList
                                    size={14}
                                    color="#2563EB"
                                />

                                <Text style={styles.label}>
                                    Medicines
                                </Text>
                            </View>

                            <Text style={styles.medicineCount}>
                                {prescription.medicines.length}{" "}
                                {prescription.medicines.length === 1
                                    ? "Medicine"
                                    : "Medicines"}
                            </Text>
                        </View>

                        {prescription.medicines
                            .slice(0, 3)
                            .map((medicine, index) => (
                                <View
                                    key={`${medicine}-${index}`}
                                    style={styles.medicineRow}
                                >
                                    <View style={styles.medicineDot} />

                                    <Text
                                        style={styles.medicineText}
                                        numberOfLines={1}
                                    >
                                        {medicine}
                                    </Text>
                                </View>
                            ))}

                        {prescription.medicines.length > 3 && (
                            <Text style={styles.moreText}>
                                +{prescription.medicines.length - 3} more
                            </Text>
                        )}
                    </View>
                )}

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.viewText}>
                    View Prescription
                </Text>

                <ChevronRight size={17} color="#2563EB" />
            </View>
        </TouchableOpacity>
    );
}

/* =========================
   STATUS BADGE
========================= */

interface StatusBadgeProps {
    status: DoctorPrescription["status"];
}

function StatusBadge({ status }: StatusBadgeProps) {
    const isCompleted = status === "Completed";
    const isDraft = status === "Draft";

    return (
        <View
            style={[
                styles.statusBadge,
                isCompleted && styles.completedBadge,
                isDraft && styles.draftBadge,
                !isCompleted && !isDraft && styles.activeBadge,
            ]}
        >
            <Text
                style={[
                    styles.statusText,
                    isCompleted && styles.completedText,
                    isDraft && styles.draftText,
                    !isCompleted && !isDraft && styles.activeText,
                ]}
            >
                {status}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: 43,
        height: 43,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    headerContent: {
        flex: 1,
    },

    title: {
        color: "#0F172A",
        fontSize: 14,
        fontWeight: "600",
    },

    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    date: {
        color: "#64748B",
        fontSize: 10,
        marginLeft: 5,
    },

    statusBadge: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
    },

    activeBadge: {
        backgroundColor: "#EFF6FF",
        borderColor: "#BFDBFE",
    },

    completedBadge: {
        backgroundColor: "#F0FDF4",
        borderColor: "#BBF7D0",
    },

    draftBadge: {
        backgroundColor: "#F1F5F9",
        borderColor: "#E2E8F0",
    },

    statusText: {
        fontSize: 9,
        fontWeight: "600",
    },

    activeText: {
        color: "#2563EB",
    },

    completedText: {
        color: "#16A34A",
    },

    draftText: {
        color: "#64748B",
    },

    patientRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },

    smallIcon: {
        width: 29,
        height: 29,
        borderRadius: 8,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },

    patientName: {
        color: "#475569",
        fontSize: 12,
        fontWeight: "500",
    },

    diagnosisContainer: {
        marginTop: 13,
    },

    label: {
        color: "#94A3B8",
        fontSize: 10,
    },

    diagnosis: {
        color: "#475569",
        fontSize: 11,
        marginTop: 4,
    },

    medicineContainer: {
        marginTop: 13,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },

    medicineHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    medicineTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    medicineCount: {
        color: "#94A3B8",
        fontSize: 9,
    },

    medicineRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    medicineDot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: "#2563EB",
        marginRight: 8,
    },

    medicineText: {
        color: "#64748B",
        fontSize: 10,
        flex: 1,
    },

    moreText: {
        color: "#2563EB",
        fontSize: 9,
        marginTop: 7,
        marginLeft: 13,
    },

    footer: {
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        marginTop: 14,
        paddingTop: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    viewText: {
        color: "#2563EB",
        fontSize: 10,
        fontWeight: "600",
    },
});
