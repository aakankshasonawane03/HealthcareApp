
import {
    ChevronRight,
    Mail,
    Phone,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface DoctorPatient {
    id: string | number;
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    gender?: string;
    age?: number;
    bloodGroup?: string;
    image?: string;
    isActive?: boolean;
}

interface PatientCardProps {
    patient: DoctorPatient;
    onPress?: (patient: DoctorPatient) => void;
}

export default function PatientCard({
    patient,
    onPress,
}: PatientCardProps) {
    const fullName = `${patient.firstName} ${patient.lastName || ""}`.trim();

    const initials = `${patient.firstName.charAt(0)}${patient.lastName?.charAt(0) || ""
        }`.toUpperCase();

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => onPress?.(patient)}
        >
            {/* Patient Header */}
            <View style={styles.header}>
                <View style={styles.patientLeft}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {initials}
                        </Text>

                        {patient.isActive && (
                            <View style={styles.activeDot} />
                        )}
                    </View>

                    <View style={styles.patientInfo}>
                        <Text style={styles.patientName}>
                            {fullName}
                        </Text>

                        <View style={styles.detailsRow}>
                            {patient.age !== undefined && (
                                <Text style={styles.detailText}>
                                    {patient.age} years
                                </Text>
                            )}

                            {patient.age !== undefined &&
                                patient.gender && (
                                    <Text style={styles.separator}>
                                        •
                                    </Text>
                                )}

                            {patient.gender && (
                                <Text style={styles.detailText}>
                                    {patient.gender}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

                <ChevronRight
                    size={19}
                    color="#94A3B8"
                />
            </View>

            {/* Blood Group */}
            {patient.bloodGroup && (
                <View style={styles.bloodGroupContainer}>
                    <Text style={styles.bloodLabel}>
                        Blood Group
                    </Text>

                    <Text style={styles.bloodValue}>
                        {patient.bloodGroup}
                    </Text>
                </View>
            )}

            {/* Contact Information */}
            <View style={styles.contactContainer}>
                {patient.phone && (
                    <View style={styles.contactItem}>
                        <View style={styles.contactIcon}>
                            <Phone
                                size={14}
                                color="#2563EB"
                            />
                        </View>

                        <Text
                            style={styles.contactText}
                            numberOfLines={1}
                        >
                            {patient.phone}
                        </Text>
                    </View>
                )}

                {patient.email && (
                    <View style={styles.contactItem}>
                        <View style={styles.contactIcon}>
                            <Mail
                                size={14}
                                color="#2563EB"
                            />
                        </View>

                        <Text
                            style={styles.contactText}
                            numberOfLines={1}
                        >
                            {patient.email}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

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

    patientLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#BFDBFE",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        position: "relative",
    },

    avatarText: {
        color: "#2563EB",
        fontSize: 14,
        fontWeight: "700",
    },

    activeDot: {
        position: "absolute",
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#16A34A",
        borderWidth: 2,
        borderColor: "#FFFFFF",
        right: 0,
        bottom: 1,
    },

    patientInfo: {
        flex: 1,
    },

    patientName: {
        color: "#0F172A",
        fontSize: 14,
        fontWeight: "600",
    },

    detailsRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    detailText: {
        color: "#64748B",
        fontSize: 11,
    },

    separator: {
        color: "#94A3B8",
        fontSize: 10,
        marginHorizontal: 6,
    },

    bloodGroupContainer: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 8,
        paddingHorizontal: 9,
        paddingVertical: 5,
        marginTop: 13,
    },

    bloodLabel: {
        color: "#94A3B8",
        fontSize: 9,
        marginRight: 6,
    },

    bloodValue: {
        color: "#2563EB",
        fontSize: 10,
        fontWeight: "700",
    },

    contactContainer: {
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        marginTop: 13,
        paddingTop: 12,
        gap: 9,
    },

    contactItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    contactIcon: {
        width: 27,
        height: 27,
        borderRadius: 8,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },

    contactText: {
        color: "#64748B",
        fontSize: 10,
        flex: 1,
    },
});
