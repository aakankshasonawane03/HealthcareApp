
import {
    Award,
    CalendarDays,
    ChevronRight,
    Clock3,
    GraduationCap,
    MapPin,
    Stethoscope,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface DoctorProfileCardProps {
    name?: string;
    specialization?: string;
    qualification?: string;
    experience?: string;
    location?: string;
    availability?: string;
    onPress?: () => void;
}

export default function DoctorProfileCard({
    name = "Dr. John Smith",
    specialization = "General Physician",
    qualification = "MBBS, MD",
    experience = "8+ Years Experience",
    location = "Mumbai, India",
    availability = "Available Today",
    onPress,
}: DoctorProfileCardProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={onPress}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Stethoscope size={25} color="#2563EB" />
                </View>

                <View style={styles.doctorInfo}>
                    <Text style={styles.name}>{name}</Text>

                    <Text style={styles.specialization}>
                        {specialization}
                    </Text>

                    <View style={styles.qualificationRow}>
                        <GraduationCap size={13} color="#64748B" />

                        <Text style={styles.qualification}>
                            {qualification}
                        </Text>
                    </View>
                </View>

                <ChevronRight size={19} color="#64748B" />
            </View>

            {/* Details */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <View style={styles.detailIcon}>
                        <Award size={15} color="#2563EB" />
                    </View>

                    <View>
                        <Text style={styles.detailLabel}>Experience</Text>

                        <Text style={styles.detailValue}>
                            {experience}
                        </Text>
                    </View>
                </View>

                <View style={styles.detailItem}>
                    <View style={styles.detailIcon}>
                        <MapPin size={15} color="#2563EB" />
                    </View>

                    <View style={styles.detailTextContainer}>
                        <Text style={styles.detailLabel}>Location</Text>

                        <Text
                            style={styles.detailValue}
                            numberOfLines={1}
                        >
                            {location}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Availability */}
            <View style={styles.footer}>
                <View style={styles.availability}>
                    <View style={styles.activeDot} />

                    <Text style={styles.availabilityText}>
                        {availability}
                    </Text>
                </View>

                <View style={styles.schedule}>
                    <CalendarDays size={14} color="#2563EB" />

                    <Text style={styles.scheduleText}>
                        View Schedule
                    </Text>

                    <Clock3 size={13} color="#64748B" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 17,
        padding: 16,
        marginBottom: 14,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#BFDBFE",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    doctorInfo: {
        flex: 1,
    },

    name: {
        color: "#0F172A",
        fontSize: 16,
        fontWeight: "700",
    },

    specialization: {
        color: "#2563EB",
        fontSize: 11,
        marginTop: 3,
    },

    qualificationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    qualification: {
        color: "#64748B",
        fontSize: 10,
        marginLeft: 5,
    },

    detailsContainer: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E2E8F0",
        marginTop: 15,
        paddingVertical: 13,
        gap: 20,
    },

    detailItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    detailIcon: {
        width: 30,
        height: 30,
        borderRadius: 9,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },

    detailTextContainer: {
        flex: 1,
    },

    detailLabel: {
        color: "#94A3B8",
        fontSize: 9,
    },

    detailValue: {
        color: "#475569",
        fontSize: 10,
        marginTop: 3,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 13,
    },

    availability: {
        flexDirection: "row",
        alignItems: "center",
    },

    activeDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#16A34A",
        marginRight: 6,
    },

    availabilityText: {
        color: "#16A34A",
        fontSize: 10,
        fontWeight: "600",
    },

    schedule: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    scheduleText: {
        color: "#475569",
        fontSize: 10,
    },
});

