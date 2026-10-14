
import {
    CalendarDays,
    ChevronRight,
    Clock3,
    MapPin,
    Star,
    Stethoscope,
    UserRound,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface DoctorCardProps {
    id: string;
    name: string;
    specialty?: string;
    experience?: string;
    rating?: number;
    clinicName?: string;
    location?: string;
    availability?: string;
    consultationFee?: string | number;
    status?: "Available" | "Busy" | "Offline";
    image?: string;
    onPress?: () => void;
}

export default function DoctorCard({
    name,
    specialty,
    experience,
    rating,
    clinicName,
    location,
    availability,
    consultationFee,
    status = "Available",
    onPress,
}: DoctorCardProps) {
    const getStatusColor = () => {
        switch (status) {
            case "Busy":
                return "#CB9E53";
            case "Offline":
                return "#E56B6F";
            default:
                return "#55C27A";
        }
    };

    const content = (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.doctorInfo}>
                    <View style={styles.avatar}>
                        <UserRound
                            size={22}
                            color="#CB9E53"
                            strokeWidth={2}
                        />
                    </View>

                    <View style={styles.nameSection}>
                        <Text style={styles.name} numberOfLines={1}>
                            {name}
                        </Text>

                        {specialty ? (
                            <View style={styles.specialtyRow}>
                                <Stethoscope
                                    size={13}
                                    color="#888888"
                                    strokeWidth={2}
                                />

                                <Text
                                    style={styles.specialty}
                                    numberOfLines={1}
                                >
                                    {specialty}
                                </Text>
                            </View>
                        ) : null}
                    </View>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        {
                            backgroundColor: `${getStatusColor()}12`,
                            borderColor: `${getStatusColor()}35`,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.statusDot,
                            {
                                backgroundColor: getStatusColor(),
                            },
                        ]}
                    />

                    <Text
                        style={[
                            styles.statusText,
                            {
                                color: getStatusColor(),
                            },
                        ]}
                    >
                        {status}
                    </Text>
                </View>
            </View>

            {/* Doctor Details */}
            <View style={styles.detailsGrid}>
                {experience ? (
                    <View style={styles.detailItem}>
                        <View style={styles.detailIcon}>
                            <Clock3
                                size={15}
                                color="#CB9E53"
                                strokeWidth={2}
                            />
                        </View>

                        <View style={styles.detailTextContainer}>
                            <Text style={styles.label}>Experience</Text>
                            <Text style={styles.value}>{experience}</Text>
                        </View>
                    </View>
                ) : null}

                {rating !== undefined ? (
                    <View style={styles.detailItem}>
                        <View style={styles.detailIcon}>
                            <Star
                                size={15}
                                color="#CB9E53"
                                strokeWidth={2}
                            />
                        </View>

                        <View style={styles.detailTextContainer}>
                            <Text style={styles.label}>Rating</Text>

                            <View style={styles.ratingRow}>
                                <Text style={styles.value}>
                                    {rating.toFixed(1)}
                                </Text>

                                <Star
                                    size={11}
                                    color="#CB9E53"
                                    fill="#CB9E53"
                                    strokeWidth={1.5}
                                />
                            </View>
                        </View>
                    </View>
                ) : null}
            </View>

            {/* Clinic */}
            {(clinicName || location) && (
                <View style={styles.clinicContainer}>
                    <MapPin
                        size={16}
                        color="#CB9E53"
                        strokeWidth={2}
                    />

                    <View style={styles.clinicInfo}>
                        {clinicName ? (
                            <Text style={styles.clinicName} numberOfLines={1}>
                                {clinicName}
                            </Text>
                        ) : null}

                        {location ? (
                            <Text style={styles.location} numberOfLines={1}>
                                {location}
                            </Text>
                        ) : null}
                    </View>
                </View>
            )}

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.availabilityContainer}>
                    <CalendarDays
                        size={15}
                        color="#CB9E53"
                        strokeWidth={2}
                    />

                    <View style={styles.availabilityText}>
                        <Text style={styles.label}>Availability</Text>

                        <Text style={styles.availability}>
                            {availability || "Schedule not available"}
                        </Text>
                    </View>
                </View>

                {consultationFee !== undefined ? (
                    <View style={styles.feeContainer}>
                        <Text style={styles.label}>Consultation</Text>

                        <Text style={styles.fee}>
                            ₹{consultationFee}
                        </Text>
                    </View>
                ) : null}

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

    if (onPress) {
        return (
            <TouchableOpacity
                activeOpacity={0.82}
                onPress={onPress}
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

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },

    doctorInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    nameSection: {
        flex: 1,
        marginLeft: 12,
    },

    name: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    specialtyRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    specialty: {
        flex: 1,
        marginLeft: 5,
        color: "#858585",
        fontSize: 11,
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

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },

    statusText: {
        fontSize: 10,
        fontWeight: "700",
    },

    detailsGrid: {
        flexDirection: "row",
        marginTop: 16,
        gap: 12,
    },

    detailItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.025)",
        borderRadius: 13,
        padding: 10,
    },

    detailIcon: {
        width: 30,
        height: 30,
        borderRadius: 9,
        backgroundColor: "rgba(203, 158, 83, 0.08)",
        alignItems: "center",
        justifyContent: "center",
    },

    detailTextContainer: {
        flex: 1,
        marginLeft: 8,
    },

    label: {
        color: "#707070",
        fontSize: 9,
        fontWeight: "500",
    },

    value: {
        marginTop: 2,
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "700",
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    clinicContainer: {
        marginTop: 14,
        paddingTop: 13,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
        flexDirection: "row",
        alignItems: "center",
    },

    clinicInfo: {
        flex: 1,
        marginLeft: 9,
    },

    clinicName: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },

    location: {
        marginTop: 3,
        color: "#777777",
        fontSize: 10,
    },

    footer: {
        marginTop: 14,
        paddingTop: 13,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
        flexDirection: "row",
        alignItems: "center",
    },

    availabilityContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    availabilityText: {
        marginLeft: 8,
    },

    availability: {
        marginTop: 2,
        color: "#B5B5B5",
        fontSize: 10,
        fontWeight: "600",
    },

    feeContainer: {
        marginRight: 12,
        alignItems: "flex-end",
    },

    fee: {
        marginTop: 2,
        color: "#CB9E53",
        fontSize: 12,
        fontWeight: "700",
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