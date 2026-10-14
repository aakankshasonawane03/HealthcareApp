
import {
    Bell,
    ChevronDown,
    MapPin,
} from "lucide-react-native";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface PatientHeaderProps {
    firstName?: string;
    location?: string;
    profileImage?: string;
    notificationCount?: number;
    onProfilePress?: () => void;
    onNotificationPress?: () => void;
}

export default function PatientHeader({
    firstName = "Prathamesh",
    location = "Mumbai, India",
    profileImage,
    notificationCount = 0,
    onProfilePress,
    onNotificationPress,
}: PatientHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onProfilePress}
                    style={styles.avatarContainer}
                >
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatarFallback}>
                            <Text style={styles.avatarText}>
                                {firstName.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>

                <View style={styles.userInfo}>
                    <Text style={styles.greeting}>
                        Good morning,
                    </Text>

                    <Text
                        style={styles.name}
                        numberOfLines={1}
                    >
                        {firstName}
                    </Text>

                    <View style={styles.locationRow}>
                        <MapPin
                            size={12}
                            color="#2563EB"
                            strokeWidth={2}
                        />

                        <Text
                            style={styles.location}
                            numberOfLines={1}
                        >
                            {location}
                        </Text>

                        <ChevronDown
                            size={13}
                            color="#94A3B8"
                            strokeWidth={2}
                        />
                    </View>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={0.75}
                onPress={onNotificationPress}
                style={styles.notificationButton}
            >
                <Bell
                    size={21}
                    color="#475569"
                    strokeWidth={1.8}
                />

                {notificationCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>
                            {notificationCount > 9
                                ? "9+"
                                : notificationCount}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 8,
        paddingBottom: 8,
    },

    leftSection: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    avatarContainer: {
        marginRight: 12,
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 16,
    },

    avatarFallback: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: "#2563EB",
        borderWidth: 1,
        borderColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },

    userInfo: {
        flex: 1,
    },

    greeting: {
        color: "#64748B",
        fontSize: 11,
        marginBottom: 2,
    },

    name: {
        color: "#0F172A",
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 3,
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    location: {
        maxWidth: 130,
        color: "#64748B",
        fontSize: 11,
        marginLeft: 4,
        marginRight: 2,
    },

    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
    },

    badge: {
        position: "absolute",
        top: -3,
        right: -3,
        minWidth: 17,
        height: 17,
        paddingHorizontal: 4,
        borderRadius: 9,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#F8FAFC",
    },

    badgeText: {
        color: "#FFFFFF",
        fontSize: 8,
        fontWeight: "800",
    },
});
