
import {
    CalendarDays,
    ChevronRight,
    Droplets,
    Mail,
    Phone,
    UserRound,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface PatientCardProps {
    id: string;
    name: string;
    age?: number | string;
    gender?: string;
    bloodGroup?: string;
    phone?: string;
    email?: string;
    lastVisit?: string;
    status?: "Active" | "Inactive";
    image?: string;
    onPress?: () => void;
}

export default function PatientCard({
    name,
    age,
    gender,
    bloodGroup,
    phone,
    email,
    lastVisit,
    status = "Active",
    onPress,
}: PatientCardProps) {
    const content = (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.patientInfo}>
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

                        <View style={styles.basicInfo}>
                            {age !== undefined ? (
                                <Text style={styles.basicText}>
                                    {age} yrs
                                </Text>
                            ) : null}

                            {age !== undefined && gender ? (
                                <Text style={styles.separator}>•</Text>
                            ) : null}

                            {gender ? (
                                <Text style={styles.basicText}>
                                    {gender}
                                </Text>
                            ) : null}
                        </View>
                    </View>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        status === "Active"
                            ? styles.activeBadge
                            : styles.inactiveBadge,
                    ]}
                >
                    <View
                        style={[
                            styles.statusDot,
                            status === "Active"
                                ? styles.activeDot
                                : styles.inactiveDot,
                        ]}
                    />

                    <Text
                        style={[
                            styles.statusText,
                            status === "Active"
                                ? styles.activeText
                                : styles.inactiveText,
                        ]}
                    >
                        {status}
                    </Text>
                </View>
            </View>

            {/* Blood Group */}
            {bloodGroup ? (
                <View style={styles.bloodGroupContainer}>
                    <View style={styles.bloodIcon}>
                        <Droplets
                            size={17}
                            color="#CB9E53"
                            strokeWidth={2}
                        />
                    </View>

                    <View>
                        <Text style={styles.smallLabel}>
                            Blood Group
                        </Text>

                        <Text style={styles.bloodGroup}>
                            {bloodGroup}
                        </Text>
                    </View>
                </View>
            ) : null}

            {/* Contact Details */}
            {(phone || email) && (
                <View style={styles.contactContainer}>
                    {phone ? (
                        <View style={styles.contactRow}>
                            <Phone
                                size={15}
                                color="#8A8A8A"
                                strokeWidth={2}
                            />

                            <Text
                                style={styles.contactText}
                                numberOfLines={1}
                            >
                                {phone}
                            </Text>
                        </View>
                    ) : null}

                    {email ? (
                        <View style={styles.contactRow}>
                            <Mail
                                size={15}
                                color="#8A8A8A"
                                strokeWidth={2}
                            />

                            <Text
                                style={styles.contactText}
                                numberOfLines={1}
                            >
                                {email}
                            </Text>
                        </View>
                    ) : null}
                </View>
            )}

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.visitContainer}>
                    <CalendarDays
                        size={15}
                        color="#CB9E53"
                        strokeWidth={2}
                    />

                    <View style={styles.visitTextContainer}>
                        <Text style={styles.smallLabel}>
                            Last Visit
                        </Text>

                        <Text style={styles.visitDate}>
                            {lastVisit || "No previous visit"}
                        </Text>
                    </View>
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

    patientInfo: {
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

    basicInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    basicText: {
        color: "#858585",
        fontSize: 11,
        fontWeight: "500",
    },

    separator: {
        marginHorizontal: 6,
        color: "#555555",
        fontSize: 11,
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
    },

    activeBadge: {
        backgroundColor: "rgba(85, 194, 122, 0.08)",
        borderColor: "rgba(85, 194, 122, 0.20)",
    },

    inactiveBadge: {
        backgroundColor: "rgba(229, 107, 111, 0.08)",
        borderColor: "rgba(229, 107, 111, 0.20)",
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },

    activeDot: {
        backgroundColor: "#55C27A",
    },

    inactiveDot: {
        backgroundColor: "#E56B6F",
    },

    statusText: {
        fontSize: 10,
        fontWeight: "700",
    },

    activeText: {
        color: "#55C27A",
    },

    inactiveText: {
        color: "#E56B6F",
    },

    bloodGroupContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        backgroundColor: "rgba(203, 158, 83, 0.06)",
        borderRadius: 14,
        padding: 11,
    },

    bloodIcon: {
        width: 34,
        height: 34,
        borderRadius: 11,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        alignItems: "center",
        justifyContent: "center",
    },

    smallLabel: {
        color: "#777777",
        fontSize: 10,
        fontWeight: "500",
    },

    bloodGroup: {
        marginTop: 2,
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
    },

    contactContainer: {
        marginTop: 14,
        paddingTop: 13,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.06)",
        gap: 9,
    },

    contactRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    contactText: {
        flex: 1,
        marginLeft: 9,
        color: "#999999",
        fontSize: 11,
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

    visitContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    visitTextContainer: {
        marginLeft: 8,
    },

    visitDate: {
        marginTop: 2,
        color: "#B5B5B5",
        fontSize: 11,
        fontWeight: "600",
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
