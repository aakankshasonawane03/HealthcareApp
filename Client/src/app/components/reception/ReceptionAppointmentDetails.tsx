import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileText,
    MapPin,
    Phone,
    Stethoscope,
    UserRound,
    XCircle,
} from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type ReceptionAppointmentDetailStatus =
    | "Confirmed"
    | "Pending"
    | "Completed"
    | "Cancelled";

interface ReceptionAppointmentDetailsProps {
    id: string;
    patientName: string;
    doctorName: string;
    specialty?: string;
    date?: string;
    time?: string;
    clinicName?: string;
    location?: string;
    phone?: string;
    appointmentType?: "Online" | "Clinic";
    status?: ReceptionAppointmentDetailStatus;
    reason?: string;
    notes?: string;
    onBack?: () => void;
    onEdit?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    onComplete?: () => void;
}

export default function ReceptionAppointmentDetails({
    patientName,
    doctorName,
    specialty,
    date,
    time,
    clinicName,
    location,
    phone,
    appointmentType = "Clinic",
    status = "Pending",
    reason,
    notes,
    onBack,
    onEdit,
    onConfirm,
    onCancel,
    onComplete,
}: ReceptionAppointmentDetailsProps) {
    const getStatusColor = () => {
        switch (status) {
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
        status === "Completed"
            ? CheckCircle2
            : status === "Cancelled"
                ? XCircle
                : status === "Confirmed"
                    ? CheckCircle2
                    : Clock3;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    {onBack ? (
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={onBack}
                            style={styles.backButton}
                        >
                            <Text style={styles.backText}>‹</Text>
                        </TouchableOpacity>
                    ) : null}

                    <View>
                        <Text style={styles.title}>
                            Appointment Details
                        </Text>

                        <Text style={styles.subtitle}>
                            View and manage appointment information
                        </Text>
                    </View>
                </View>

                {onEdit ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onEdit}
                        style={styles.editButton}
                    >
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* Status */}
            <View style={styles.statusCard}>
                <View
                    style={[
                        styles.statusIcon,
                        {
                            backgroundColor: `${getStatusColor()}12`,
                            borderColor: `${getStatusColor()}30`,
                        },
                    ]}
                >
                    <StatusIcon
                        size={22}
                        color={getStatusColor()}
                        strokeWidth={2}
                    />
                </View>

                <View style={styles.statusInfo}>
                    <Text style={styles.statusLabel}>
                        Appointment Status
                    </Text>

                    <Text
                        style={[
                            styles.statusValue,
                            { color: getStatusColor() },
                        ]}
                    >
                        {status}
                    </Text>
                </View>

                <View
                    style={[
                        styles.typeBadge,
                        {
                            borderColor: "rgba(203, 158, 83, 0.20)",
                        },
                    ]}
                >
                    <Text style={styles.typeText}>
                        {appointmentType}
                    </Text>
                </View>
            </View>

            {/* Patient */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Patient Information
                </Text>

                <View style={styles.personRow}>
                    <View style={styles.avatar}>
                        <UserRound
                            size={23}
                            color="#CB9E53"
                            strokeWidth={2}
                        />
                    </View>

                    <View style={styles.personInfo}>
                        <Text style={styles.personName}>
                            {patientName}
                        </Text>

                        <Text style={styles.personRole}>
                            Patient
                        </Text>
                    </View>

                    {phone ? (
                        <TouchableOpacity
                            activeOpacity={0.75}
                            style={styles.callButton}
                        >
                            <Phone
                                size={17}
                                color="#CB9E53"
                                strokeWidth={2}
                            />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>

            {/* Doctor */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Doctor Information
                </Text>

                <View style={styles.personRow}>
                    <View style={styles.avatar}>
                        <Stethoscope
                            size={23}
                            color="#CB9E53"
                            strokeWidth={2}
                        />
                    </View>

                    <View style={styles.personInfo}>
                        <Text style={styles.personName}>
                            {doctorName}
                        </Text>

                        {specialty ? (
                            <Text style={styles.personRole}>
                                {specialty}
                            </Text>
                        ) : null}
                    </View>
                </View>
            </View>

            {/* Appointment Information */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Appointment Information
                </Text>

                <View style={styles.infoGrid}>
                    {date ? (
                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <CalendarDays
                                    size={17}
                                    color="#CB9E53"
                                    strokeWidth={2}
                                />
                            </View>

                            <View>
                                <Text style={styles.infoLabel}>Date</Text>
                                <Text style={styles.infoValue}>{date}</Text>
                            </View>
                        </View>
                    ) : null}

                    {time ? (
                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <Clock3
                                    size={17}
                                    color="#CB9E53"
                                    strokeWidth={2}
                                />
                            </View>

                            <View>
                                <Text style={styles.infoLabel}>Time</Text>
                                <Text style={styles.infoValue}>{time}</Text>
                            </View>
                        </View>
                    ) : null}

                    {clinicName ? (
                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <MapPin
                                    size={17}
                                    color="#CB9E53"
                                    strokeWidth={2}
                                />
                            </View>

                            <View style={styles.flexInfo}>
                                <Text style={styles.infoLabel}>Clinic</Text>
                                <Text
                                    style={styles.infoValue}
                                    numberOfLines={1}
                                >
                                    {clinicName}
                                </Text>
                            </View>
                        </View>
                    ) : null}

                    {location ? (
                        <View style={styles.infoItem}>
                            <View style={styles.infoIcon}>
                                <MapPin
                                    size={17}
                                    color="#CB9E53"
                                    strokeWidth={2}
                                />
                            </View>

                            <View style={styles.flexInfo}>
                                <Text style={styles.infoLabel}>
                                    Location
                                </Text>
                                <Text
                                    style={styles.infoValue}
                                    numberOfLines={1}
                                >
                                    {location}
                                </Text>
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>

            {/* Reason */}
            {reason ? (
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <FileText
                            size={17}
                            color="#CB9E53"
                            strokeWidth={2}
                        />

                        <Text style={styles.sectionTitle}>
                            Reason for Visit
                        </Text>
                    </View>

                    <Text style={styles.description}>
                        {reason}
                    </Text>
                </View>
            ) : null}

            {/* Notes */}
            {notes ? (
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <FileText
                            size={17}
                            color="#CB9E53"
                            strokeWidth={2}
                        />

                        <Text style={styles.sectionTitle}>
                            Notes
                        </Text>
                    </View>

                    <Text style={styles.description}>
                        {notes}
                    </Text>
                </View>
            ) : null}

            {/* Actions */}
            <View style={styles.actions}>
                {status === "Pending" && onConfirm ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onConfirm}
                        style={styles.primaryButton}
                    >
                        <CheckCircle2
                            size={18}
                            color="#101010"
                            strokeWidth={2.2}
                        />

                        <Text style={styles.primaryButtonText}>
                            Confirm Appointment
                        </Text>
                    </TouchableOpacity>
                ) : null}

                {status === "Confirmed" && onComplete ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onComplete}
                        style={styles.primaryButton}
                    >
                        <CheckCircle2
                            size={18}
                            color="#101010"
                            strokeWidth={2.2}
                        />

                        <Text style={styles.primaryButtonText}>
                            Mark Completed
                        </Text>
                    </TouchableOpacity>
                ) : null}

                {(status === "Pending" ||
                    status === "Confirmed") &&
                    onCancel ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onCancel}
                        style={styles.cancelButton}
                    >
                        <XCircle
                            size={18}
                            color="#E56B6F"
                            strokeWidth={2}
                        />

                        <Text style={styles.cancelButtonText}>
                            Cancel Appointment
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101010",
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    headerTitleContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        width: 38,
        height: 38,
        marginRight: 10,
        borderRadius: 12,
        backgroundColor: "#161616",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.14)",
        alignItems: "center",
        justifyContent: "center",
    },

    backText: {
        marginTop: -3,
        color: "#CB9E53",
        fontSize: 28,
        lineHeight: 30,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 21,
        fontWeight: "700",
    },

    subtitle: {
        marginTop: 4,
        color: "#777777",
        fontSize: 11,
    },

    editButton: {
        paddingHorizontal: 15,
        paddingVertical: 9,
        borderRadius: 11,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.18)",
    },

    editText: {
        color: "#CB9E53",
        fontSize: 11,
        fontWeight: "700",
    },

    statusCard: {
        marginBottom: 14,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.15)",
        flexDirection: "row",
        alignItems: "center",
    },

    statusIcon: {
        width: 48,
        height: 48,
        borderRadius: 15,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    statusInfo: {
        flex: 1,
        marginLeft: 12,
    },

    statusLabel: {
        color: "#777777",
        fontSize: 10,
    },

    statusValue: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: "700",
    },

    typeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 9,
        backgroundColor: "rgba(203, 158, 83, 0.08)",
        borderWidth: 1,
    },

    typeText: {
        color: "#CB9E53",
        fontSize: 10,
        fontWeight: "600",
    },

    card: {
        marginBottom: 14,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.14)",
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },

    personRow: {
        marginTop: 14,
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    personInfo: {
        flex: 1,
        marginLeft: 12,
    },

    personName: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    personRole: {
        marginTop: 4,
        color: "#777777",
        fontSize: 11,
    },

    callButton: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "rgba(203, 158, 83, 0.08)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.15)",
        alignItems: "center",
        justifyContent: "center",
    },

    infoGrid: {
        marginTop: 14,
        gap: 12,
    },

    infoItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    infoIcon: {
        width: 36,
        height: 36,
        borderRadius: 11,
        backgroundColor: "rgba(203, 158, 83, 0.08)",
        alignItems: "center",
        justifyContent: "center",
    },

    flexInfo: {
        flex: 1,
    },

    infoLabel: {
        marginLeft: 10,
        color: "#707070",
        fontSize: 9,
    },

    infoValue: {
        marginLeft: 10,
        marginTop: 3,
        color: "#BDBDBD",
        fontSize: 12,
        fontWeight: "600",
    },

    description: {
        marginTop: 2,
        color: "#9B9B9B",
        fontSize: 12,
        lineHeight: 19,
    },

    actions: {
        marginTop: 2,
        gap: 10,
    },

    primaryButton: {
        minHeight: 48,
        borderRadius: 14,
        backgroundColor: "#CB9E53",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },

    primaryButtonText: {
        marginLeft: 8,
        color: "#101010",
        fontSize: 12,
        fontWeight: "800",
    },

    cancelButton: {
        minHeight: 48,
        borderRadius: 14,
        backgroundColor: "rgba(229, 107, 111, 0.08)",
        borderWidth: 1,
        borderColor: "rgba(229, 107, 111, 0.20)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },

    cancelButtonText: {
        marginLeft: 8,
        color: "#E56B6F",
        fontSize: 12,
        fontWeight: "700",
    },
});
