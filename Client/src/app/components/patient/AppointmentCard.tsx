
import {
    Building2,
    CalendarDays,
    ChevronRight,
    Clock3,
    MapPin,
    Video,
} from "lucide-react-native";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export interface PatientAppointment {
    id: string | number;
    doctorName: string;
    specialty?: string;
    date?: string;
    time?: string;
    clinicName?: string;
    location?: string;
    type?: string;
    mode?: "Online" | "Clinic";
    status?: "Confirmed" | "Pending" | "Completed" | "Cancelled";
    onPress?: () => void;
    onCancel?: () => void;
}

interface AppointmentCardProps extends PatientAppointment { }

export default function AppointmentCard({
    doctorName,
    specialty,
    date,
    time,
    clinicName,
    location,
    mode = "Clinic",
    status = "Confirmed",
    onPress,
}: AppointmentCardProps) {
    const statusColor =
        status === "Confirmed"
            ? "#16A34A"
            : status === "Pending"
                ? "#EA580C"
                : status === "Completed"
                    ? "#2563EB"
                    : "#EF4444";

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.topRow}>
                <View style={styles.doctorInfo}>
                    <View style={styles.iconContainer}>
                        {mode === "Online" ? (
                            <Video size={22} color="#2563EB" />
                        ) : (
                            <Building2 size={22} color="#2563EB" />
                        )}
                    </View>

                    <View style={styles.nameContainer}>
                        <Text style={styles.doctorName} numberOfLines={1}>
                            {doctorName}
                        </Text>

                        {specialty ? (
                            <Text style={styles.specialty} numberOfLines={1}>
                                {specialty}
                            </Text>
                        ) : null}
                    </View>
                </View>

                <ChevronRight size={20} color="#94A3B8" />
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsRow}>
                {date ? (
                    <View style={styles.detailItem}>
                        <CalendarDays size={15} color="#2563EB" />

                        <Text style={styles.detailText}>
                            {date}
                        </Text>
                    </View>
                ) : null}

                {time ? (
                    <View style={styles.detailItem}>
                        <Clock3 size={15} color="#2563EB" />

                        <Text style={styles.detailText}>
                            {time}
                        </Text>
                    </View>
                ) : null}
            </View>

            {clinicName || location ? (
                <View style={styles.locationRow}>
                    <MapPin size={14} color="#64748B" />

                    <Text style={styles.locationText} numberOfLines={1}>
                        {clinicName
                            ? `${clinicName}${location ? ` • ${location}` : ""}`
                            : location}
                    </Text>
                </View>
            ) : null}

            <View style={styles.bottomRow}>
                <View
                    style={[
                        styles.statusBadge,
                        {
                            backgroundColor: `${statusColor}18`,
                            borderColor: `${statusColor}45`,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.statusDot,
                            { backgroundColor: statusColor },
                        ]}
                    />

                    <Text
                        style={[
                            styles.statusText,
                            { color: statusColor },
                        ]}
                    >
                        {status}
                    </Text>
                </View>

                <View style={styles.modeBadge}>
                    {mode === "Online" ? (
                        <Video size={13} color="#64748B" />
                    ) : (
                        <Building2 size={13} color="#64748B" />
                    )}

                    <Text style={styles.modeText}>
                        {mode}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 18,
        padding: 15,
        marginBottom: 12,
    },

    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.99 }],
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    doctorInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    nameContainer: {
        flex: 1,
        marginLeft: 12,
    },

    doctorName: {
        color: "#0F172A",
        fontSize: 15,
        fontWeight: "700",
    },

    specialty: {
        color: "#64748B",
        fontSize: 12,
        marginTop: 4,
    },

    divider: {
        height: 1,
        backgroundColor: "#E2E8F0",
        marginVertical: 13,
    },

    detailsRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 18,
    },

    detailItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },

    detailText: {
        color: "#475569",
        fontSize: 12,
        fontWeight: "500",
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 11,
        gap: 6,
    },

    locationText: {
        flex: 1,
        color: "#64748B",
        fontSize: 11,
    },

    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 13,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },

    statusText: {
        fontSize: 10,
        fontWeight: "700",
    },

    modeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    modeText: {
        color: "#64748B",
        fontSize: 10,
        fontWeight: "500",
    },
});
