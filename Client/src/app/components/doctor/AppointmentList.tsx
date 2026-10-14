
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AppointmentCard, {
    DoctorAppointment,
} from "./AppointmentCard";

interface AppointmentListProps {
    appointments: DoctorAppointment[];
    title?: string;
    subtitle?: string;
    showViewAll?: boolean;
    onViewAll?: () => void;
    onAppointmentPress?: (appointment: DoctorAppointment) => void;
    onMenuPress?: (appointment: DoctorAppointment) => void;
    emptyMessage?: string;
}

export default function AppointmentList({
    appointments,
    title = "Today's Appointments",
    subtitle = "Your upcoming appointments",
    showViewAll = true,
    onViewAll,
    onAppointmentPress,
    onMenuPress,
    emptyMessage = "No appointments scheduled.",
}: AppointmentListProps) {
    return (
        <View style={styles.container}>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {title}
                    </Text>

                    <Text style={styles.subtitle}>
                        {subtitle}
                    </Text>
                </View>

                {showViewAll && (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onViewAll}
                    >
                        <Text style={styles.viewAll}>
                            View All
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Appointment List */}
            {appointments.length > 0 ? (
                <View>
                    {appointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            onPress={onAppointmentPress}
                            onMenuPress={onMenuPress}
                        />
                    ))}
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                        No Appointments
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
