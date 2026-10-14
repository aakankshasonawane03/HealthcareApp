
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

export interface PatientMedicalRecord {
    id: string | number;
    title?: string;
    recordType?:
    | "Consultation"
    | "Diagnosis"
    | "Lab Report"
    | "Medical History"
    | "Prescription"
    | "Other";
    doctorName?: string;
    date?: string;
    description?: string;
    status?: "Available" | "Pending" | "Reviewed";
    onPress?: () => void;
}

interface MedicalRecordCardProps
    extends PatientMedicalRecord { }

export default function MedicalRecordCard({
    title = "Medical Record",
    recordType = "Consultation",
    doctorName,
    date = "Today",
    description,
    status = "Available",
    onPress,
}: MedicalRecordCardProps) {
    const Icon = getRecordIcon(recordType);
    const statusStyle = getStatusStyle(status);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.card}
        >
            <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                    <Icon
                        size={21}
                        color="#2563EB"
                        strokeWidth={1.8}
                    />
                </View>

                <View style={styles.content}>
                    <View style={styles.titleRow}>
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>

                        <ChevronRight
                            size={18}
                            color="#94A3B8"
                            strokeWidth={1.8}
                        />
                    </View>

                    <Text style={styles.recordType}>
                        {recordType}
                    </Text>

                    {doctorName ? (
                        <View style={styles.doctorRow}>
                            <Stethoscope
                                size={12}
                                color="#64748B"
                                strokeWidth={1.8}
                            />

                            <Text
                                style={styles.doctorName}
                                numberOfLines={1}
                            >
                                {doctorName}
                            </Text>
                        </View>
                    ) : null}
                </View>
            </View>

            {description ? (
                <Text
                    style={styles.description}
                    numberOfLines={2}
                >
                    {description}
                </Text>
            ) : null}

            <View style={styles.bottomRow}>
                <View style={styles.dateRow}>
                    <CalendarDays
                        size={13}
                        color="#64748B"
                        strokeWidth={1.8}
                    />

                    <Text style={styles.dateText}>
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

function getRecordIcon(
    type: PatientMedicalRecord["recordType"]
) {
    switch (type) {
        case "Diagnosis":
            return ClipboardList;

        case "Lab Report":
            return FileText;

        case "Medical History":
            return ClipboardList;

        case "Prescription":
            return FileText;

        case "Consultation":
        default:
            return Stethoscope;
    }
}

function getStatusStyle(
    status: PatientMedicalRecord["status"]
) {
    switch (status) {
        case "Available":
            return {
                color: "#16A34A",
                backgroundColor: "#F0FDF4",
                borderColor: "#BBF7D0",
            };

        case "Reviewed":
            return {
                color: "#2563EB",
                backgroundColor: "#EFF6FF",
                borderColor: "#BFDBFE",
            };

        case "Pending":
            return {
                color: "#EA580C",
                backgroundColor: "#FFF7ED",
                borderColor: "#FED7AA",
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
        alignItems: "flex-start",
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

    content: {
        flex: 1,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    title: {
        flex: 1,
        color: "#0F172A",
        fontSize: 14,
        fontWeight: "700",
        marginRight: 5,
    },

    recordType: {
        color: "#2563EB",
        fontSize: 10,
        fontWeight: "500",
        marginTop: 4,
    },

    doctorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    doctorName: {
        flex: 1,
        color: "#64748B",
        fontSize: 10,
        marginLeft: 5,
    },

    description: {
        color: "#64748B",
        fontSize: 11,
        lineHeight: 17,
        marginTop: 13,
    },

    bottomRow: {
        marginTop: 13,
        paddingTop: 11,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    dateRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    dateText: {
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
