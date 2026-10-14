
import {
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock3,
    MapPin,
    UserRound,
    XCircle,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type ReceptionAppointmentStatus =
    | "Confirmed"
    | "Pending"
    | "Completed"
    | "Cancelled";

export interface ReceptionAppointment {
    id: string;
    patientName: string;
    doctorName: string;
    specialty?: string;
    date?: string;
    time?: string;
    clinicName?: string;
    location?: string;
    status?: ReceptionAppointmentStatus;
    appointmentType?: "Online" | "Clinic";
    onPress?: () => void;
}

interface AppointmentCardProps {
    appointment?: ReceptionAppointment;

    id?: string;
    patientName?: string;
    doctorName?: string;
    specialty?: string;
    date?: string;
    time?: string;
    clinicName?: string;
    location?: string;
    status?: ReceptionAppointmentStatus;
    appointmentType?: "Online" | "Clinic";
    onPress?: () => void;
}

export default function AppointmentCard({
    appointment,
    id,
    patientName,
    doctorName,
    specialty,
    date,
    time,
    clinicName,
    location,
    status,
    appointmentType,
    onPress,
}: AppointmentCardProps) {
    const data = appointment ?? {
        id: id ?? "",
        patientName: patientName ?? "Patient",
        doctorName: doctorName ?? "Doctor",
        specialty,
        date,
        time,
        clinicName,
        location,
        status: status ?? "Pending",
        appointmentType,
        onPress,
    };

    const appointmentStatus = data.status ?? "Pending";

    const getStatusColor = () => {
        switch (appointmentStatus) {
            case "Confirmed":
                return "#55C27A";
            case "Completed":
                return "#6FA8FF";
            case "Cancelled":
                return "#E56B6F";
            default:
                return "#CB9E53";
        }
    };

    const StatusIcon =
        appointmentStatus === "Completed"
            ? CheckCircle2
            : appointmentStatus === "Cancelled"
                ? XCircle
                : appointmentStatus === "Confirmed"
                    ? CheckCircle2
                    : Clock3;

    const content = (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <View style={styles.patientSection}>
                    <View style={styles.avatar}>
                        <UserRound size={20} color="#CB9E53" strokeWidth={2} />
                    </View>

                    <View style={styles.patientInfo}>
                        <Text style={styles.patientName} numberOfLines={1}>
                            {data.patientName}
                        </Text>

                        <Text style={styles.doctorName} numberOfLines={1}>
                            {data.doctorName}
                        </Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        {
                            borderColor: `${getStatusColor()}40`,
                            backgroundColor: `${getStatusColor()}12`,
                        },
                    ]}
                >
                    <StatusIcon
                        size={13}
                        color={getStatusColor()}
                        strokeWidth={2}
                    />

                    <Text
                        style={[
                            styles.statusText,
                            {
                                color: getStatusColor(),
                            },
                        ]}
                    >
                        {appointmentStatus}
                    </Text>
                </View>
            </View>

            {data.specialty ? (
                <Text style={styles.specialty}>{data.specialty}</Text>
            ) : null}

            <View style={styles.detailsContainer}>
                {data.date ? (
                    <View style={styles.detailItem}>
                        <CalendarDays
                            size={16}
                            color="#CB9E53"
                            strokeWidth={2}
                        />
                        <Text style={styles.detailText}>{data.date}</Text>
                    </View>
                ) : null}

                {data.time ? (
                    <View style={styles.detailItem}>
                        <Clock3
                            size={16}
                            color="#CB9E53"
                            strokeWidth={2}
                        />
                        <Text style={styles.detailText}>{data.time}</Text>
                    </View>
                ) : null}

                {data.location ? (
                    <View style={styles.detailItem}>
                        <MapPin
                            size={16}
                            color="#CB9E53"
                            strokeWidth={2}
                        />
                        <Text
                            style={styles.detailText}
                            numberOfLines={1}
                        >
                            {data.location}
                        </Text>
                    </View>
                ) : null}
            </View>

            <View style={styles.footer}>
                <View>
                    {data.clinicName ? (
                        <Text style={styles.clinicName} numberOfLines={1}>
                            {data.clinicName}
                        </Text>
                    ) : null}

                    {data.appointmentType ? (
                        <Text style={styles.appointmentType}>
                            {data.appointmentType} Appointment
                        </Text>
                    ) : null}
                </View>

                <View style={styles.arrowContainer}>
                    <ChevronRight
                        size={18}
                        color="#CB9E53"
                        strokeWidth={2}
                    />
                </View>
            </View>
        </View>
    );

    if (data.onPress) {
        return (
            <TouchableOpacity
                activeOpacity={0.82}
                onPress={data.onPress}
                style={styles.wrapper}
            >
                {content}
            </TouchableOpacity>
        );
    }

    return <View style={styles.wrapper}>{content}</View>;
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        marginBottom: 14,
    },

    card: {
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.16)",
        borderRadius: 20,
        padding: 16,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },

    patientSection: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },

    avatar: {
        width: 46,
        height: 46,
        borderRadius: 15,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    patientInfo: {
        flex: 1,
        marginLeft: 12,
    },

    patientName: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    doctorName: {
        marginTop: 4,
        color: "#888888",
        fontSize: 12,
        fontWeight: "500",
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
    },

    statusText: {
        marginLeft: 5,
        fontSize: 10,
        fontWeight: "700",
    },

    specialty: {
        marginTop: 14,
        color: "#B0B0B0",
        fontSize: 12,
        fontWeight: "500",
    },

    detailsContainer: {
        marginTop: 14,
        paddingTop: 13,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
        gap: 10,
    },

    detailItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    detailText: {
        flex: 1,
        marginLeft: 9,
        color: "#B8B8B8",
        fontSize: 12,
        fontWeight: "500",
    },

    footer: {
        marginTop: 15,
        paddingTop: 13,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    clinicName: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },

    appointmentType: {
        marginTop: 3,
        color: "#777777",
        fontSize: 10,
    },

    arrowContainer: {
        width: 34,
        height: 34,
        borderRadius: 11,
        backgroundColor: "rgba(203, 158, 83, 0.08)",
        alignItems: "center",
        justifyContent: "center",
    },
});
