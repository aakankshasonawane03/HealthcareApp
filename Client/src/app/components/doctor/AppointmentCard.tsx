
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    MapPin,
    MoreVertical,
    Video,
    XCircle,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface DoctorAppointment {
    id: string | number;
    patientName: string;
    age?: number;
    gender?: string;
    time: string;
    date?: string;
    type?: string;
    mode?: "Online" | "Clinic";
    status?: "Confirmed" | "Pending" | "Completed" | "Cancelled";
    image?: string;
}

interface AppointmentCardProps {
    appointment: DoctorAppointment;
    onPress?: (appointment: DoctorAppointment) => void;
    onMenuPress?: (appointment: DoctorAppointment) => void;
}

export default function AppointmentCard({
    appointment,
    onPress,
    onMenuPress,
}: AppointmentCardProps) {
    const initials = appointment.patientName
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const status = appointment.status || "Pending";
    const mode = appointment.mode || "Clinic";

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => onPress?.(appointment)}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.patientSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {initials}
                        </Text>
                    </View>

                    <View style={styles.patientInfo}>
                        <Text style={styles.patientName}>
                            {appointment.patientName}
                        </Text>

                        {(appointment.age || appointment.gender) && (
                            <Text style={styles.patientDetails}>
                                {appointment.age
                                    ? `${appointment.age} years`
                                    : ""}
                                {appointment.age && appointment.gender
                                    ? " • "
                                    : ""}
                                {appointment.gender || ""}
                            </Text>
                        )}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.menuButton}
                    activeOpacity={0.7}
                    onPress={() => onMenuPress?.(appointment)}
                >
                    <MoreVertical
                        size={19}
                        color="#64748B"
                    />
                </TouchableOpacity>
            </View>

            {/* Appointment Time */}
            <View style={styles.timeContainer}>
                <View style={styles.timeItem}>
                    <Clock3
                        size={16}
                        color="#2563EB"
                    />

                    <Text style={styles.timeText}>
                        {appointment.time}
                    </Text>
                </View>

                {appointment.date && (
                    <View style={styles.timeItem}>
                        <CalendarDays
                            size={15}
                            color="#64748B"
                        />

                        <Text style={styles.dateText}>
                            {appointment.date}
                        </Text>
                    </View>
                )}
            </View>

            {/* Appointment Type */}
            {appointment.type && (
                <Text style={styles.appointmentType}>
                    {appointment.type}
                </Text>
            )}

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.modeContainer}>
                    {mode === "Online" ? (
                        <Video
                            size={15}
                            color="#2563EB"
                        />
                    ) : (
                        <MapPin
                            size={15}
                            color="#2563EB"
                        />
                    )}

                    <Text style={styles.modeText}>
                        {mode}
                    </Text>
                </View>

                <StatusBadge status={status} />
            </View>
        </TouchableOpacity>
    );
}

/* =========================
   STATUS BADGE
========================= */

interface StatusBadgeProps {
    status: DoctorAppointment["status"];
}

function StatusBadge({ status }: StatusBadgeProps) {
    if (status === "Confirmed") {
        return (
            <View
                style={[
                    styles.statusBadge,
                    styles.confirmedBadge,
                ]}
            >
                <CheckCircle2
                    size={13}
                    color="#16A34A"
                />

                <Text
                    style={[
                        styles.statusText,
                        styles.confirmedText,
                    ]}
                >
                    Confirmed
                </Text>
            </View>
        );
    }

    if (status === "Completed") {
        return (
            <View
                style={[
                    styles.statusBadge,
                    styles.completedBadge,
                ]}
            >
                <CheckCircle2
                    size={13}
                    color="#16A34A"
                />

                <Text
                    style={[
                        styles.statusText,
                        styles.completedText,
                    ]}
                >
                    Completed
                </Text>
            </View>
        );
    }

    if (status === "Cancelled") {
        return (
            <View
                style={[
                    styles.statusBadge,
                    styles.cancelledBadge,
                ]}
            >
                <XCircle
                    size={13}
                    color="#EF4444"
                />

                <Text
                    style={[
                        styles.statusText,
                        styles.cancelledText,
                    ]}
                >
                    Cancelled
                </Text>
            </View>
        );
    }

    return (
        <View
            style={[
                styles.statusBadge,
                styles.pendingBadge,
            ]}
        >
            <Clock3
                size={13}
                color="#EA580C"
            />

            <Text
                style={[
                    styles.statusText,
                    styles.pendingText,
                ]}
            >
                Pending
            </Text>
        </View>
    );
}

/* =========================
   STYLES
========================= */

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
        justifyContent: "space-between",
    },

    patientSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#BFDBFE",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    avatarText: {
        color: "#2563EB",
        fontSize: 13,
        fontWeight: "700",
    },

    patientInfo: {
        flex: 1,
    },

    patientName: {
        color: "#0F172A",
        fontSize: 14,
        fontWeight: "600",
    },

    patientDetails: {
        color: "#64748B",
        fontSize: 11,
        marginTop: 4,
    },

    menuButton: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },

    timeContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        gap: 18,
    },

    timeItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    timeText: {
        color: "#0F172A",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 6,
    },

    dateText: {
        color: "#64748B",
        fontSize: 11,
        marginLeft: 5,
    },

    appointmentType: {
        color: "#64748B",
        fontSize: 11,
        marginTop: 9,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        marginTop: 14,
        paddingTop: 12,
    },

    modeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    modeText: {
        color: "#475569",
        fontSize: 11,
        marginLeft: 6,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 8,
        gap: 4,
    },

    confirmedBadge: {
        backgroundColor: "#F0FDF4",
        borderWidth: 1,
        borderColor: "#BBF7D0",
    },

    completedBadge: {
        backgroundColor: "#F0FDF4",
        borderWidth: 1,
        borderColor: "#BBF7D0",
    },

    pendingBadge: {
        backgroundColor: "#FFF7ED",
        borderWidth: 1,
        borderColor: "#FED7AA",
    },

    cancelledBadge: {
        backgroundColor: "#FEF2F2",
        borderWidth: 1,
        borderColor: "#FECACA",
    },

    statusText: {
        fontSize: 9,
        fontWeight: "600",
    },

    confirmedText: {
        color: "#16A34A",
    },

    completedText: {
        color: "#16A34A",
    },

    pendingText: {
        color: "#EA580C",
    },

    cancelledText: {
        color: "#EF4444",
    },
});