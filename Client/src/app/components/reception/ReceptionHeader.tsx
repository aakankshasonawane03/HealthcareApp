
import {
    Bell,
    ChevronDown,
    UserRound,
} from "lucide-react-native";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface ReceptionHeaderProps {
    name?: string;
    role?: string;
    image?: string;
    notificationCount?: number;
    onProfilePress?: () => void;
    onNotificationPress?: () => void;
}

export default function ReceptionHeader({
    name = "Receptionist",
    role = "Reception Desk",
    image,
    notificationCount = 0,
    onProfilePress,
    onNotificationPress,
}: ReceptionHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <Pressable
                    onPress={onProfilePress}
                    style={({ pressed }) => [
                        styles.avatarWrapper,
                        pressed && styles.pressed,
                    ]}
                >
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <UserRound size={23} color="#CB9E53" />
                        </View>
                    )}
                </Pressable>

                <View style={styles.textContainer}>
                    <Text style={styles.welcomeText}>
                        Welcome back
                    </Text>

                    <View style={styles.nameRow}>
                        <Text
                            style={styles.name}
                            numberOfLines={1}
                        >
                            {name}
                        </Text>

                        <ChevronDown
                            size={15}
                            color="#777777"
                        />
                    </View>

                    <Text style={styles.role}>
                        {role}
                    </Text>
                </View>
            </View>

            <Pressable
                onPress={onNotificationPress}
                style={({ pressed }) => [
                    styles.notificationButton,
                    pressed && styles.pressed,
                ]}
            >
                <Bell
                    size={21}
                    color="#D8D8D8"
                    strokeWidth={1.9}
                />

                {notificationCount > 0 ? (
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationCount}>
                            {notificationCount > 9
                                ? "9+"
                                : notificationCount}
                        </Text>
                    </View>
                ) : null}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 2,
        paddingVertical: 8,
    },

    leftSection: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        minWidth: 0,
    },

    avatarWrapper: {
        width: 48,
        height: 48,
        borderRadius: 15,
        overflow: "visible",
    },

    avatar: {
        width: 48,
        height: 48,
        borderRadius: 15,
    },

    avatarPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3020",
    },

    textContainer: {
        flex: 1,
        marginLeft: 12,
        minWidth: 0,
    },

    welcomeText: {
        color: "#777777",
        fontSize: 11,
        marginBottom: 2,
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    name: {
        maxWidth: "85%",
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    role: {
        color: "#CB9E53",
        fontSize: 10,
        fontWeight: "600",
        marginTop: 2,
    },

    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        position: "relative",
    },

    notificationBadge: {
        position: "absolute",
        top: -3,
        right: -3,
        minWidth: 18,
        height: 18,
        paddingHorizontal: 4,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CB9E53",
        borderWidth: 2,
        borderColor: "#0B0B0B",
    },

    notificationCount: {
        color: "#0B0B0B",
        fontSize: 8,
        fontWeight: "800",
    },

    pressed: {
        opacity: 0.7,
    },
});
