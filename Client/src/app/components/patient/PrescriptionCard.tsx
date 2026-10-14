
import {
    CalendarDays,
    ChevronRight,
    FileText,
    Pill,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface PatientPrescription {
    id: string | number;
    doctorName?: string;
    diagnosis?: string;
    medicineCount?: number;
    date?: string;
    status?: "Active" | "Completed" | "Expired";
    onPress?: () => void;
}

interface PrescriptionCardProps extends PatientPrescription { }

export default function PrescriptionCard({
    doctorName = "Doctor",
    diagnosis = "General Prescription",
    medicineCount = 0,
    date = "Today",
    status = "Active",
    onPress,
}: PrescriptionCardProps) {
    const statusStyle = getStatusStyle(status);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.card}
        >
            <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                    <Pill
                        size={21}
                        color="#2563EB"
                        strokeWidth={1.8}
                    />
                </View>

                <View style={styles.mainInfo}>
                    <Text
                        style={styles.diagnosis}
                        numberOfLines={1}
                    >
                        {diagnosis}
                    </Text>

                    <Text
                        style={styles.doctorName}
                        numberOfLines={1}
                    >
                        Prescribed by {doctorName}
                    </Text>
                </View>

                <ChevronRight
                    size={19}
                    color="#94A3B8"
                    strokeWidth={1.8}
                />
            </View>

            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <FileText
                        size={14}
                        color="#64748B"
                        strokeWidth={1.8}
                    />

                    <Text style={styles.detailText}>
                        {medicineCount}{" "}
                        {medicineCount === 1 ? "Medicine" : "Medicines"}
                    </Text>
                </View>

                <View style={styles.detailItem}>
                    <CalendarDays
                        size={14}
                        color="#64748B"
                        strokeWidth={1.8}
                    />

                    <Text style={styles.detailText}>
                        {date}
                    </Text>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        {
                            backgroundColor: statusStyle.backgroundColor,
                            borderColor: statusStyle.borderColor,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            { color: statusStyle.color },
                        ]}
                    >
                        {status}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

function getStatusStyle(
    status: PatientPrescription["status"]
) {
    switch (status) {
        case "Active":
            return {
                color: "#16A34A",
                backgroundColor: "#F0FDF4",
                borderColor: "#BBF7D0",
            };

        case "Completed":
            return {
                color: "#2563EB",
                backgroundColor: "#EFF6FF",
                borderColor: "#BFDBFE",
            };

        case "Expired":
            return {
                color: "#EF4444",
                backgroundColor: "#FEF2F2",
                borderColor: "#FECACA",
            };

        default:
            return {
                color: "#64748B",
                backgroundColor: "#F1F5F9",
                borderColor: "#E2E8F0",
            };
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        padding: 15,
        marginBottom: 13,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: 47,
        height: 47,
        borderRadius: 14,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    mainInfo: {
        flex: 1,
        marginRight: 8,
    },

    diagnosis: {
        color: "#0F172A",
        fontSize: 14,
        fontWeight: "700",
    },

    doctorName: {
        color: "#64748B",
        fontSize: 10,
        marginTop: 5,
    },

    detailsRow: {
        marginTop: 14,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 10,
    },

    detailItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    detailText: {
        color: "#64748B",
        fontSize: 10,
        marginLeft: 5,
    },

    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 7,
        borderWidth: 1,
    },

    statusText: {
        fontSize: 9,
        fontWeight: "700",
    },
});
