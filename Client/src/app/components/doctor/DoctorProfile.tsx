
import {
    Award,
    CalendarDays,
    CheckCircle2,
    Edit3,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    Stethoscope
} from "lucide-react-native";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface DoctorProfileData {
    id?: string | number;
    firstName?: string;
    lastName?: string;
    name?: string;
    email?: string;
    phone?: string;
    specialty?: string;
    qualification?: string;
    experience?: string;
    registrationNumber?: string;
    hospitalName?: string;
    address?: string;
    consultationFee?: string | number;
    availableDays?: string;
    availableTime?: string;
    isAvailable?: boolean;
}

interface DoctorProfileProps {
    doctor?: DoctorProfileData;
    onEdit?: () => void;
}

interface ProfileDetailProps {
    icon: React.ComponentType<any>;
    label: string;
    value?: string;
}

function ProfileDetail({
    icon: Icon,
    label,
    value,
}: ProfileDetailProps) {
    if (!value) {
        return null;
    }

    return (
        <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
                <Icon size={17} color="#CB9E53" />
            </View>

            <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text style={styles.detailValue}>{value}</Text>
            </View>
        </View>
    );
}

export default function DoctorProfile({
    doctor = {},
    onEdit,
}: DoctorProfileProps) {
    const fullName =
        doctor.name ||
        `${doctor.firstName || "Doctor"} ${doctor.lastName || ""
            }`.trim();

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {/* Profile Header */}
            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Stethoscope size={34} color="#CB9E53" />
                </View>

                <View style={styles.profileInfo}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name} numberOfLines={1}>
                            {fullName}
                        </Text>

                        {doctor.isAvailable !== false && (
                            <View style={styles.availableBadge}>
                                <View style={styles.availableDot} />
                                <Text style={styles.availableText}>
                                    Available
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={styles.specialty}>
                        {doctor.specialty || "Medical Specialist"}
                    </Text>

                    {doctor.qualification && (
                        <Text style={styles.qualification}>
                            {doctor.qualification}
                        </Text>
                    )}
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onEdit}
                    style={styles.editButton}
                >
                    <Edit3 size={17} color="#CB9E53" />
                </TouchableOpacity>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsCard}>
                <ProfileStat
                    icon={Award}
                    label="Experience"
                    value={doctor.experience || "—"}
                />

                <View style={styles.statDivider} />

                <ProfileStat
                    icon={GraduationCap}
                    label="Qualification"
                    value={doctor.qualification || "—"}
                />

                <View style={styles.statDivider} />

                <ProfileStat
                    icon={CalendarDays}
                    label="Consultation"
                    value={
                        doctor.consultationFee
                            ? `₹${doctor.consultationFee}`
                            : "—"
                    }
                />
            </View>

            {/* Professional Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Professional Information
                </Text>

                <View style={styles.detailsCard}>
                    <ProfileDetail
                        icon={Stethoscope}
                        label="Specialization"
                        value={doctor.specialty}
                    />

                    <ProfileDetail
                        icon={GraduationCap}
                        label="Qualification"
                        value={doctor.qualification}
                    />

                    <ProfileDetail
                        icon={Award}
                        label="Experience"
                        value={doctor.experience}
                    />

                    <ProfileDetail
                        icon={CheckCircle2}
                        label="Medical Registration"
                        value={doctor.registrationNumber}
                    />

                    <ProfileDetail
                        icon={MapPin}
                        label="Hospital / Clinic"
                        value={doctor.hospitalName}
                    />
                </View>
            </View>

            {/* Contact Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Contact Information
                </Text>

                <View style={styles.detailsCard}>
                    <ProfileDetail
                        icon={Mail}
                        label="Email"
                        value={doctor.email}
                    />

                    <ProfileDetail
                        icon={Phone}
                        label="Phone"
                        value={doctor.phone}
                    />

                    <ProfileDetail
                        icon={MapPin}
                        label="Address"
                        value={doctor.address}
                    />
                </View>
            </View>

            {/* Availability */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Availability
                </Text>

                <View style={styles.availabilityCard}>
                    <View style={styles.availabilityIcon}>
                        <CalendarDays size={20} color="#CB9E53" />
                    </View>

                    <View style={styles.availabilityContent}>
                        <Text style={styles.availabilityLabel}>
                            Available Days
                        </Text>

                        <Text style={styles.availabilityValue}>
                            {doctor.availableDays || "Monday - Saturday"}
                        </Text>

                        <Text style={styles.availabilityLabel}>
                            Consultation Hours
                        </Text>

                        <Text style={styles.availabilityValue}>
                            {doctor.availableTime || "10:00 AM - 6:00 PM"}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.availabilityStatus,
                            doctor.isAvailable === false &&
                            styles.unavailableStatus,
                        ]}
                    >
                        <View
                            style={[
                                styles.statusDot,
                                doctor.isAvailable === false &&
                                styles.unavailableDot,
                            ]}
                        />

                        <Text
                            style={[
                                styles.statusText,
                                doctor.isAvailable === false &&
                                styles.unavailableText,
                            ]}
                        >
                            {doctor.isAvailable === false
                                ? "Unavailable"
                                : "Available"}
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

interface ProfileStatProps {
    icon: React.ComponentType<any>;
    label: string;
    value: string;
}

function ProfileStat({
    icon: Icon,
    label,
    value,
}: ProfileStatProps) {
    return (
        <View style={styles.stat}>
            <View style={styles.statIcon}>
                <Icon size={17} color="#CB9E53" />
            </View>

            <Text style={styles.statLabel}>{label}</Text>

            <Text style={styles.statValue} numberOfLines={1}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 30,
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
        width: 70,
        height: 70,
        borderRadius: 21,
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

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },

    name: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "800",
        maxWidth: "75%",
    },

    availableBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#182019",
        borderWidth: 1,
        borderColor: "#304A35",
        borderRadius: 8,
        paddingHorizontal: 7,
        paddingVertical: 4,
        marginLeft: 7,
    },

    availableDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#8FC69A",
        marginRight: 5,
    },

    availableText: {
        color: "#8FC69A",
        fontSize: 8,
        fontWeight: "700",
    },

    specialty: {
        color: "#CB9E53",
        fontSize: 12,
        fontWeight: "600",
        marginTop: 6,
    },

    qualification: {
        color: "#777777",
        fontSize: 10,
        marginTop: 4,
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

    statsCard: {
        minHeight: 96,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 17,
        marginTop: 12,
        paddingVertical: 12,
    },

    stat: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 5,
    },

    statIcon: {
        width: 32,
        height: 32,
        borderRadius: 9,
        backgroundColor: "#211D16",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
    },

    statLabel: {
        color: "#666666",
        fontSize: 8,
        marginBottom: 4,
    },

    statValue: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "700",
        maxWidth: 90,
    },

    statDivider: {
        width: 1,
        height: 42,
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

    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 61,
        paddingVertical: 10,
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
        color: "#D2D2D2",
        fontSize: 12,
        lineHeight: 18,
    },

    availabilityCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 17,
        padding: 14,
    },

    availabilityIcon: {
        width: 40,
        height: 40,
        borderRadius: 11,
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3123",
        alignItems: "center",
        justifyContent: "center",
    },

    availabilityContent: {
        flex: 1,
        marginLeft: 10,
    },

    availabilityLabel: {
        color: "#666666",
        fontSize: 9,
        marginBottom: 3,
    },

    availabilityValue: {
        color: "#D4D4D4",
        fontSize: 11,
        fontWeight: "600",
        marginBottom: 10,
    },

    availabilityStatus: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#182019",
        borderWidth: 1,
        borderColor: "#304A35",
        borderRadius: 8,
        paddingHorizontal: 7,
        paddingVertical: 5,
    },

    unavailableStatus: {
        backgroundColor: "#211616",
        borderColor: "#4A2D2D",
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#8FC69A",
        marginRight: 5,
    },

    unavailableDot: {
        backgroundColor: "#B56C6C",
    },

    statusText: {
        color: "#8FC69A",
        fontSize: 8,
        fontWeight: "700",
    },

    unavailableText: {
        color: "#B56C6C",
    },
});

