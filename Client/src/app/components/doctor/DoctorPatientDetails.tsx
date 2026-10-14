
import {
    CalendarDays,
    Edit3,
    FileText,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    UserRound,
} from "lucide-react-native";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface DoctorPatientDetailsData {
    id: string | number;
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    gender?: string;
    age?: number;
    dateOfBirth?: string;
    bloodGroup?: string;
    address?: string;
    emergencyContact?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    image?: string;
}

interface DoctorPatientDetailsProps {
    patient: DoctorPatientDetailsData;
    onEdit?: () => void;
    onViewRecords?: () => void;
}

interface DetailItemProps {
    icon: React.ComponentType<any>;
    label: string;
    value?: string;
}

function DetailItem({
    icon: Icon,
    label,
    value,
}: DetailItemProps) {
    if (!value) {
        return null;
    }

    return (
        <View style={styles.detailItem}>
            <View style={styles.detailIcon}>
                <Icon size={17} color="#CB9E53" />
            </View>

            <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{label}</Text>

                <Text style={styles.detailValue} numberOfLines={3}>
                    {value}
                </Text>
            </View>
        </View>
    );
}

export default function DoctorPatientDetails({
    patient,
    onEdit,
    onViewRecords,
}: DoctorPatientDetailsProps) {
    const fullName = `${patient.firstName} ${patient.lastName || ""
        }`.trim();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {/* Profile Header */}
            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <UserRound size={32} color="#CB9E53" />
                </View>

                <View style={styles.profileInfo}>
                    <Text style={styles.patientName}>{fullName}</Text>

                    <Text style={styles.patientId}>
                        Patient ID: {patient.id}
                    </Text>

                    <View style={styles.activeRow}>
                        <View
                            style={[
                                styles.activeDot,
                                patient.isActive
                                    ? styles.activeDotGreen
                                    : styles.activeDotGray,
                            ]}
                        />

                        <Text
                            style={[
                                styles.activeText,
                                patient.isActive
                                    ? styles.activeTextGreen
                                    : styles.activeTextGray,
                            ]}
                        >
                            {patient.isActive ? "Active Patient" : "Inactive"}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onEdit}
                    style={styles.editButton}
                >
                    <Edit3 size={17} color="#CB9E53" />
                </TouchableOpacity>
            </View>

            {/* Quick Information */}
            <View style={styles.quickInfoCard}>
                <QuickInfo
                    label="Gender"
                    value={patient.gender || "—"}
                />

                <View style={styles.quickDivider} />

                <QuickInfo
                    label="Age"
                    value={
                        patient.age !== undefined
                            ? `${patient.age} yrs`
                            : "—"
                    }
                />

                <View style={styles.quickDivider} />

                <QuickInfo
                    label="Blood Group"
                    value={patient.bloodGroup || "—"}
                />
            </View>

            {/* Contact Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Contact Information
                </Text>

                <View style={styles.detailsCard}>
                    <DetailItem
                        icon={Mail}
                        label="Email"
                        value={patient.email}
                    />

                    <DetailItem
                        icon={Phone}
                        label="Phone"
                        value={patient.phone}
                    />

                    <DetailItem
                        icon={MapPin}
                        label="Address"
                        value={patient.address}
                    />

                    <DetailItem
                        icon={Phone}
                        label="Emergency Contact"
                        value={patient.emergencyContact}
                    />
                </View>
            </View>

            {/* Personal Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Personal Information
                </Text>

                <View style={styles.detailsCard}>
                    <DetailItem
                        icon={CalendarDays}
                        label="Date of Birth"
                        value={patient.dateOfBirth}
                    />

                    <DetailItem
                        icon={UserRound}
                        label="Gender"
                        value={patient.gender}
                    />

                    <DetailItem
                        icon={ShieldCheck}
                        label="Blood Group"
                        value={patient.bloodGroup}
                    />
                </View>
            </View>

            {/* Account Information */}
            {(patient.createdAt || patient.updatedAt) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Account Information
                    </Text>

                    <View style={styles.detailsCard}>
                        <DetailItem
                            icon={CalendarDays}
                            label="Registered On"
                            value={patient.createdAt}
                        />

                        <DetailItem
                            icon={CalendarDays}
                            label="Last Updated"
                            value={patient.updatedAt}
                        />
                    </View>
                </View>
            )}

            {/* Records Button */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onViewRecords}
                style={styles.recordsButton}
            >
                <View style={styles.recordsIcon}>
                    <FileText size={18} color="#CB9E53" />
                </View>

                <View style={styles.recordsContent}>
                    <Text style={styles.recordsTitle}>
                        Medical Records
                    </Text>

                    <Text style={styles.recordsSubtitle}>
                        View patient history, reports and prescriptions
                    </Text>
                </View>

                <Text style={styles.viewText}>View</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

interface QuickInfoProps {
    label: string;
    value: string;
}

function QuickInfo({
    label,
    value,
}: QuickInfoProps) {
    return (
        <View style={styles.quickInfo}>
            <Text style={styles.quickLabel}>{label}</Text>
            <Text style={styles.quickValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 25,
    },

    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 20,
        padding: 18,
    },

    avatar: {
        width: 68,
        height: 68,
        borderRadius: 20,
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3123",
        alignItems: "center",
        justifyContent: "center",
    },

    profileInfo: {
        flex: 1,
        marginLeft: 13,
    },

    patientName: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "800",
    },

    patientId: {
        color: "#686868",
        fontSize: 10,
        marginTop: 5,
    },

    activeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
    },

    activeDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        marginRight: 6,
    },

    activeDotGreen: {
        backgroundColor: "#7DB88A",
    },

    activeDotGray: {
        backgroundColor: "#666666",
    },

    activeText: {
        fontSize: 10,
        fontWeight: "600",
    },

    activeTextGreen: {
        color: "#7DB88A",
    },

    activeTextGray: {
        color: "#777777",
    },

    editButton: {
        width: 40,
        height: 40,
        borderRadius: 11,
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3123",
        alignItems: "center",
        justifyContent: "center",
    },

    quickInfoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 16,
        marginTop: 12,
        paddingVertical: 15,
    },

    quickInfo: {
        flex: 1,
        alignItems: "center",
    },

    quickLabel: {
        color: "#666666",
        fontSize: 9,
        marginBottom: 5,
    },

    quickValue: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "700",
    },

    quickDivider: {
        width: 1,
        height: 30,
        backgroundColor: "#292929",
    },

    section: {
        marginTop: 20,
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 10,
    },

    detailsCard: {
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 17,
        paddingHorizontal: 13,
    },

    detailItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderBottomColor: "#242424",
    },

    detailIcon: {
        width: 35,
        height: 35,
        borderRadius: 10,
        backgroundColor: "#211D16",
        alignItems: "center",
        justifyContent: "center",
    },

    detailContent: {
        flex: 1,
        marginLeft: 10,
    },

    detailLabel: {
        color: "#666666",
        fontSize: 9,
        marginBottom: 4,
    },

    detailValue: {
        color: "#D4D4D4",
        fontSize: 12,
        lineHeight: 18,
    },

    recordsButton: {
        minHeight: 66,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#3A3123",
        borderRadius: 16,
        marginTop: 20,
        paddingHorizontal: 13,
    },

    recordsIcon: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "#211D16",
        alignItems: "center",
        justifyContent: "center",
    },

    recordsContent: {
        flex: 1,
        marginLeft: 10,
    },

    recordsTitle: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "700",
    },

    recordsSubtitle: {
        color: "#666666",
        fontSize: 9,
        marginTop: 4,
    },

    viewText: {
        color: "#CB9E53",
        fontSize: 11,
        fontWeight: "700",
    },
});

