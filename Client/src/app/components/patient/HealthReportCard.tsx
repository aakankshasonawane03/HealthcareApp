
import {
    Activity,
    CalendarDays,
    ChevronRight,
    Download,
    FileBarChart,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface PatientHealthReport {
    id: string | number;
    title: string;
    reportType?: string;
    date?: string;
    status?: "Available" | "Pending" | "Reviewed";
    result?: string;
    onPress?: () => void;
    onDownload?: () => void;
}

interface HealthReportCardProps
    extends PatientHealthReport { }

export default function HealthReportCard({
    title,
    reportType = "Health Report",
    date = "Today",
    status = "Available",
    result,
    onPress,
    onDownload,
}: HealthReportCardProps) {
    const statusStyle = getStatusStyle(status);

    return (
        <View style={styles.card}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.mainContent}
            >
                <View style={styles.iconContainer}>
                    <FileBarChart
                        size={22}
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

                    <Text style={styles.reportType}>
                        {reportType}
                    </Text>

                    <View style={styles.dateRow}>
                        <CalendarDays
                            size={12}
                            color="#64748B"
                            strokeWidth={1.8}
                        />

                        <Text style={styles.date}>
                            {date}
                        </Text>
                    </View>
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
            </TouchableOpacity>

            {result ? (
                <View style={styles.resultContainer}>
                    <View style={styles.resultIcon}>
                        <Activity
                            size={15}
                            color="#2563EB"
                            strokeWidth={2}
                        />
                    </View>

                    <View style={styles.resultContent}>
                        <Text style={styles.resultLabel}>
                            Result
                        </Text>

                        <Text
                            style={styles.resultText}
                            numberOfLines={2}
                        >
                            {result}
                        </Text>
                    </View>
                </View>
            ) : null}

            {onDownload ? (
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={onDownload}
                        style={styles.downloadButton}
                    >
                        <Download
                            size={15}
                            color="#2563EB"
                            strokeWidth={1.9}
                        />

                        <Text style={styles.downloadText}>
                            Download Report
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
}

function getStatusStyle(
    status: PatientHealthReport["status"]
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
        marginBottom: 13,
        overflow: "hidden",
    },

    mainContent: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 15,
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
        marginRight: 8,
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
        marginRight: 4,
    },

    reportType: {
        color: "#2563EB",
        fontSize: 10,
        fontWeight: "500",
        marginTop: 4,
    },

    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
    },

    date: {
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

    resultContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 15,
        paddingTop: 11,
        paddingBottom: 12,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },

    resultIcon: {
        width: 32,
        height: 32,
        borderRadius: 9,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 9,
    },

    resultContent: {
        flex: 1,
    },

    resultLabel: {
        color: "#94A3B8",
        fontSize: 9,
        marginBottom: 2,
    },

    resultText: {
        color: "#475569",
        fontSize: 10,
        lineHeight: 15,
    },

    actionContainer: {
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        padding: 10,
    },

    downloadButton: {
        height: 34,
        borderRadius: 9,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
    },

    downloadText: {
        color: "#2563EB",
        fontSize: 10,
        fontWeight: "600",
    },
});
