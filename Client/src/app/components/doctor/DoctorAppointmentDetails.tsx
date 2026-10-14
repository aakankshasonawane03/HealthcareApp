
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    MapPin,
    Phone,
    Stethoscope,
    UserRound,
    Video,
    XCircle,
} from "lucide-react-native";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface DoctorAppointmentDetailsData {
    id: string | number;
    patientName: string;
    age?: number;
    gender?: string;
    date?: string;
    time?: string;
    type?: string;
    mode?: "Online" | "Clinic";
    status?: "Confirmed" | "Pending" | "Completed" | "Cancelled";
    phone?: string;
    location?: string;
    reason?: string;
    notes?: string;
    doctorName?: string;
}

interface DoctorAppointmentDetailsProps {
    appointment: DoctorAppointmentDetailsData;
    onConfirm?: () => void;
    onCancel?: () => void;
    onCall?: () => void;
    onStartConsultation?: () => void;
}

export default function DoctorAppointmentDetails({
    appointment,
    onConfirm,
    onCancel,
    onCall,
    onStartConsultation,
}: DoctorAppointmentDetailsProps) {
    const isOnline = appointment.mode === "Online";
    const isCompleted = appointment.status === "Completed";
    const isCancelled = appointment.status === "Cancelled";

    return (
        <View style={styles.container}>
            {/* Patient Header */}
            <View style={styles.patientHeader}>
                <View style={styles.patientAvatar}>
                    <UserRound size={26} color="#CB9E53" />
                </View>

                <View style={styles.patientInfo}>
                    <Text style={styles.patientName}>
                        {appointment.patientName}
                    </Text>

                    <View style={styles.patientMeta}>
                        {appointment.age !== undefined && (
                            <Text style={styles.metaText}>
                                {appointment.age} yrs
                            </Text>
                        )}

                        {appointment.gender && (
                            <>
                                <View style={styles.metaDot} />
                                <Text style={styles.metaText}>
                                    {appointment.gender}
                                </Text>
                            </>
                        )}
                    </View>
                </View>

                {appointment.status && (
                    <View
                        style={[
                            styles.statusBadge,
                            appointment.status === "Confirmed" &&
                            styles.confirmedBadge,
                            appointment.status === "Pending" &&
                            styles.pendingBadge,
                            appointment.status === "Completed" &&
                            styles.completedBadge,
                            appointment.status === "Cancelled" &&
                            styles.cancelledBadge,
                        ]}
                    >
                        <Text
                            style={[
                                styles.statusText,
                                appointment.status === "Confirmed" &&
                                styles.confirmedText,
                                appointment.status === "Pending" &&
                                styles.pendingText,
                                appointment.status === "Completed" &&
                                styles.completedText,
                                appointment.status === "Cancelled" &&
                                styles.cancelledText,
                            ]}
                        >
                            {appointment.status}
                        </Text>
                    </View>
                )}
            </View>

            {/* Appointment Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Appointment Details
                </Text>

                <View style={styles.infoGrid}>
                    <InfoItem
                        icon={CalendarDays}
                        label="Date"
                        value={appointment.date || "Not specified"}
                    />

                    <InfoItem
                        icon={Clock3}
                        label="Time"
                        value={appointment.time || "Not specified"}
                    />

                    <InfoItem
                        icon={isOnline ? Video : MapPin}
                        label="Mode"
                        value={appointment.mode || "Clinic"}
                    />

                    <InfoItem
                        icon={Stethoscope}
                        label="Appointment Type"
                        value={appointment.type || "General Consultation"}
                    />
                </View>
            </View>

            {/* Patient Contact */}
            {appointment.phone && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Patient Contact
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onCall}
                        style={styles.contactCard}
                    >
                        <View style={styles.contactIcon}>
                            <Phone size={18} color="#CB9E53" />
                        </View>

                        <View style={styles.contactInfo}>
                            <Text style={styles.contactLabel}>
                                Phone Number
                            </Text>

                            <Text style={styles.contactValue}>
                                {appointment.phone}
                            </Text>
                        </View>

                        <Text style={styles.callText}>Call</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Location */}
            {appointment.location && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Location
                    </Text>

                    <View style={styles.locationCard}>
                        <MapPin size={18} color="#CB9E53" />

                        <Text style={styles.locationText}>
                            {appointment.location}
                        </Text>
                    </View>
                </View>
            )}

            {/* Reason */}
            {appointment.reason && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Reason for Visit
                    </Text>

                    <View style={styles.textCard}>
                        <Text style={styles.bodyText}>
                            {appointment.reason}
                        </Text>
                    </View>
                </View>
            )}

            {/* Notes */}
            {appointment.notes && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Notes
                    </Text>

                    <View style={styles.textCard}>
                        <Text style={styles.bodyText}>
                            {appointment.notes}
                        </Text>
                    </View>
                </View>
            )}

            {/* Actions */}
            {!isCompleted && !isCancelled && (
                <View style={styles.actions}>
                    {appointment.status === "Pending" && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={onConfirm}
                            style={styles.confirmButton}
                        >
                            <CheckCircle2 size={17} color="#0B0B0B" />

                            <Text style={styles.confirmButtonText}>
                                Confirm Appointment
                            </Text>
                        </TouchableOpacity>
                    )}

                    {appointment.status === "Confirmed" && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={onStartConsultation}
                            style={styles.consultButton}
                        >
                            {isOnline ? (
                                <Video size={17} color="#0B0B0B" />
                            ) : (
                                <Stethoscope size={17} color="#0B0B0B" />
                            )}

                            <Text style={styles.consultButtonText}>
                                Start Consultation
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onCancel}
                        style={styles.cancelButton}
                    >
                        <XCircle size={17} color="#B56C6C" />

                        <Text style={styles.cancelButtonText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

interface InfoItemProps {
    icon: React.ComponentType<any>;
    label: string;
    value: string;
}

function InfoItem({
    icon: Icon,
    label,
    value,
}: InfoItemProps) {
    return (
        <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
                <Icon size={17} color="#CB9E53" />
            </View>

            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{label}</Text>

                <Text style={styles.infoValue} numberOfLines={2}>
                    {value}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 20,
        padding: 18,
    },

    patientHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#292929",
    },

    patientAvatar: {
        width: 54,
        height: 54,
        borderRadius: 16,
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3123",
        alignItems: "center",
        justifyContent: "center",
    },

    patientInfo: {
        flex: 1,
        marginLeft: 12,
    },

    patientName: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },

    patientMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    metaText: {
        color: "#858585",
        fontSize: 11,
    },

    metaDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#555555",
        marginHorizontal: 7,
    },

    statusBadge: {
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
    },

    confirmedBadge: {
        backgroundColor: "#182019",
        borderColor: "#304A35",
    },

    pendingBadge: {
        backgroundColor: "#211D16",
        borderColor: "#4A3B25",
    },

    completedBadge: {
        backgroundColor: "#171F24",
        borderColor: "#30424A",
    },

    cancelledBadge: {
        backgroundColor: "#211616",
        borderColor: "#4A2D2D",
    },

    statusText: {
        fontSize: 10,
        fontWeight: "700",
    },

    confirmedText: {
        color: "#8FC69A",
    },

    pendingText: {
        color: "#CB9E53",
    },

    completedText: {
        color: "#82A9BA",
    },

    cancelledText: {
        color: "#B56C6C",
    },

    section: {
        marginTop: 20,
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 11,
    },

    infoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    infoItem: {
        width: "48%",
        minHeight: 66,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#101010",
        borderWidth: 1,
        borderColor: "#242424",
        borderRadius: 12,
        padding: 10,
    },

    infoIcon: {
        width: 34,
        height: 34,
        borderRadius: 9,
        backgroundColor: "#211D16",
        alignItems: "center",
        justifyContent: "center",
    },

    infoContent: {
        flex: 1,
        marginLeft: 9,
    },

    infoLabel: {
        color: "#666666",
        fontSize: 9,
        marginBottom: 4,
    },

    infoValue: {
        color: "#D8D8D8",
        fontSize: 11,
        fontWeight: "600",
    },

    contactCard: {
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#101010",
        borderWidth: 1,
        borderColor: "#242424",
        borderRadius: 12,
        paddingHorizontal: 11,
    },

    contactIcon: {
        width: 35,
        height: 35,
        borderRadius: 9,
        backgroundColor: "#211D16",
        alignItems: "center",
        justifyContent: "center",
    },

    contactInfo: {
        flex: 1,
        marginLeft: 10,
    },

    contactLabel: {
        color: "#666666",
        fontSize: 9,
        marginBottom: 3,
    },

    contactValue: {
        color: "#D8D8D8",
        fontSize: 12,
        fontWeight: "600",
    },

    callText: {
        color: "#CB9E53",
        fontSize: 11,
        fontWeight: "700",
    },

    locationCard: {
        minHeight: 52,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#101010",
        borderWidth: 1,
        borderColor: "#242424",
        borderRadius: 12,
        paddingHorizontal: 12,
    },

    locationText: {
        flex: 1,
        color: "#A5A5A5",
        fontSize: 12,
        lineHeight: 18,
        marginLeft: 9,
    },

    textCard: {
        backgroundColor: "#101010",
        borderWidth: 1,
        borderColor: "#242424",
        borderRadius: 12,
        padding: 13,
    },

    bodyText: {
        color: "#A5A5A5",
        fontSize: 12,
        lineHeight: 19,
    },

    actions: {
        marginTop: 22,
        gap: 10,
    },

    confirmButton: {
        minHeight: 46,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CB9E53",
        borderRadius: 11,
        paddingHorizontal: 15,
    },

    confirmButtonText: {
        color: "#0B0B0B",
        fontSize: 12,
        fontWeight: "800",
        marginLeft: 8,
    },

    consultButton: {
        minHeight: 46,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CB9E53",
        borderRadius: 11,
        paddingHorizontal: 15,
    },

    consultButtonText: {
        color: "#0B0B0B",
        fontSize: 12,
        fontWeight: "800",
        marginLeft: 8,
    },

    cancelButton: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#181313",
        borderWidth: 1,
        borderColor: "#3A2727",
        borderRadius: 11,
    },

    cancelButtonText: {
        color: "#B56C6C",
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 7,
    },
});

