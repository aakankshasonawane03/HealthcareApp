
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import AppointmentCard, {
    ReceptionAppointment,
} from "./AppointmentCard";

interface AppointmentListProps {
    appointments: ReceptionAppointment[];
    title?: string;
    emptyMessage?: string;
    onAppointmentPress?: (
        appointment: ReceptionAppointment
    ) => void;
}

export default function AppointmentList({
    appointments,
    title = "Today's Appointments",
    emptyMessage = "No appointments scheduled.",
    onAppointmentPress,
}: AppointmentListProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.subtitle}>
                        {appointments.length}{" "}
                        {appointments.length === 1
                            ? "appointment"
                            : "appointments"}
                    </Text>
                </View>

                <View style={styles.countBadge}>
                    <Text style={styles.countText}>
                        {appointments.length}
                    </Text>
                </View>
            </View>

            {appointments.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                        No Appointments
                    </Text>

                    <Text style={styles.emptyMessage}>
                        {emptyMessage}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <AppointmentCard
                            appointment={{
                                ...item,
                                onPress: () =>
                                    onAppointmentPress?.(item),
                            }}
                        />
                    )}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },

    subtitle: {
        marginTop: 4,
        color: "#777777",
        fontSize: 11,
        fontWeight: "500",
    },

    countBadge: {
        minWidth: 34,
        height: 34,
        paddingHorizontal: 9,
        borderRadius: 11,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    countText: {
        color: "#CB9E53",
        fontSize: 12,
        fontWeight: "700",
    },

    listContent: {
        paddingBottom: 2,
    },

    emptyContainer: {
        minHeight: 120,
        backgroundColor: "#151515",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.14)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    emptyTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    emptyMessage: {
        marginTop: 6,
        color: "#777777",
        fontSize: 11,
        textAlign: "center",
    },
});
