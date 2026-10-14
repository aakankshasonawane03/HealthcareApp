
import {
    CalendarDays,
    ChevronRight,
    Clock3,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface DashboardHeaderProps {
    title?: string;
    subtitle?: string;
    appointmentCount?: number;
    nextAppointmentTime?: string;
    onViewAppointments?: () => void;
}

export default function DashboardHeader({
    title = "How are you feeling today?",
    subtitle = "Take care of your health with easy access to your healthcare.",
    appointmentCount = 1,
    nextAppointmentTime = "10:30 AM",
    onViewAppointments,
}: DashboardHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.textSection}>
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onViewAppointments}
                style={styles.appointmentCard}
            >
                <View style={styles.appointmentIcon}>
                    <CalendarDays
                        size={19}
                        color="#2563EB"
                        strokeWidth={1.8}
                    />
                </View>

                <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentLabel}>
                        Upcoming
                    </Text>

                    <View style={styles.timeRow}>
                        <Clock3
                            size={12}
                            color="#64748B"
                            strokeWidth={1.8}
                        />

                        <Text style={styles.timeText}>
                            {nextAppointmentTime}
                        </Text>
                    </View>
                </View>

                <View style={styles.countContainer}>
                    <Text style={styles.countText}>
                        {appointmentCount}
                    </Text>

                    <ChevronRight
                        size={15}
                        color="#2563EB"
                        strokeWidth={2}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 14,
    },

    textSection: {
        marginBottom: 17,
    },

    title: {
        color: "#0F172A",
        fontSize: 22,
        lineHeight: 29,
        fontWeight: "700",
    },

    subtitle: {
        color: "#64748B",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 7,
        maxWidth: 340,
    },

    appointmentCard: {
        minHeight: 68,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 17,
        paddingHorizontal: 13,
        paddingVertical: 11,
    },

    appointmentIcon: {
        width: 43,
        height: 43,
        borderRadius: 13,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    appointmentInfo: {
        flex: 1,
    },

    appointmentLabel: {
        color: "#0F172A",
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 4,
    },

    timeRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    timeText: {
        color: "#64748B",
        fontSize: 11,
        marginLeft: 5,
    },

    countContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    countText: {
        color: "#2563EB",
        fontSize: 15,
        fontWeight: "700",
    },
});
