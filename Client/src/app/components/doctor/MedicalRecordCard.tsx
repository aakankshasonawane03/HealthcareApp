
import {
    CalendarDays,
    ChevronRight,
    ClipboardList,
    FileText,
    Stethoscope,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface DoctorMedicalRecord {
    id: string | number;
    patientName: string;
    recordType?:
    | "Consultation"
    | "Lab Report"
    | "Diagnosis"
    | "Medical History"
    | "Other";
    title?: string;
    description?: string;
    date?: string;
    doctorName?: string;
    status?: "Reviewed" | "Pending";
}

interface MedicalRecordCardProps {
    record: DoctorMedicalRecord;
    onPress?: () => void;
}

export default function MedicalRecordCard({
    record,
    onPress,
}: MedicalRecordCardProps) {
    const isReviewed = record.status === "Reviewed";

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={styles.card}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <FileText size={20} color="#2563EB" />
                </View>

                <View style={styles.headerContent}>
                    <Text style={styles.patientName} numberOfLines={1}>
                        {record.patientName}
                    </Text>

                    <Text style={styles.recordType} numberOfLines={1}>
                        {record.recordType || "Medical Record"}
                    </Text>
                </View>

                {record.status && (
                    <View
                        style={[
                            styles.statusBadge,
                            isReviewed
                                ? styles.reviewedBadge
                                : styles.pendingBadge,
                        ]}
                    >
                        <Text
                            style={[
                                styles.statusText,
                                isReviewed
                                    ? styles.reviewedText
                                    : styles.pendingText,
                            ]}
                        >
                            {record.status}
                        </Text>
                    </View>
                )}
            </View>

            {/* Record title */}
            {record.title && (
                <View style={styles.titleRow}>
                    <ClipboardList size={16} color="#2563EB" />

                    <Text style={styles.title} numberOfLines={2}>
                        {record.title}
                    </Text>
                </View>
            )}

            {/* Description */}
            {record.description && (
                <Text style={styles.description} numberOfLines={2}>
                    {record.description}
                </Text>
            )}

            {/* Doctor */}
            {record.doctorName && (
                <View style={styles.infoRow}>
                    <Stethoscope size={15} color="#64748B" />

                    <Text style={styles.infoText} numberOfLines={1}>
                        {record.doctorName}
                    </Text>
                </View>
            )}

            {/* Footer */}
            <View style={styles.footer}>
                {record.date ? (
                    <View style={styles.dateContainer}>
                        <CalendarDays size={15} color="#64748B" />

                        <Text style={styles.dateText}>
                            {record.date}
                        </Text>
                    </View>
                ) : (
                    <View />
                )}

                <View style={styles.viewRecord}>
                    <Text style={styles.viewText}>
                        View Record
                    </Text>

                    <ChevronRight size={17} color="#2563EB" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 13,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    headerContent: {
        flex: 1,
        marginRight: 8,
    },

    patientName: {
        color: "#0F172A",
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 4,
    },

    recordType: {
        color: "#64748B",
        fontSize: 12,
    },

    statusBadge: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
    },

    reviewedBadge: {
        backgroundColor: "#F0FDF4",
        borderColor: "#BBF7D0",
    },

    pendingBadge: {
        backgroundColor: "#FFF7ED",
        borderColor: "#FED7AA",
    },

    statusText: {
        fontSize: 10,
        fontWeight: "700",
    },

    reviewedText: {
        color: "#16A34A",
    },

    pendingText: {
        color: "#EA580C",
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 16,
    },

    title: {
        flex: 1,
        color: "#0F172A",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 8,
        lineHeight: 20,
    },

    description: {
        color: "#64748B",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 8,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },

    infoText: {
        flex: 1,
        color: "#475569",
        fontSize: 12,
        marginLeft: 7,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        marginTop: 15,
        paddingTop: 13,
    },

    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    dateText: {
        color: "#64748B",
        fontSize: 11,
        marginLeft: 6,
    },

    viewRecord: {
        flexDirection: "row",
        alignItems: "center",
    },

    viewText: {
        color: "#2563EB",
        fontSize: 12,
        fontWeight: "600",
    },
});
