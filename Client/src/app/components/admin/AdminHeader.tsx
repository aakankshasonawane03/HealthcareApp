
import {
    Bell,
    ChevronDown,
    Menu,
    Search,
} from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface AdminHeaderProps {
    onMenuPress?: () => void;
    onNotificationPress?: () => void;
    onProfilePress?: () => void;
}

export default function AdminHeader({
    onMenuPress,
    onNotificationPress,
    onProfilePress,
}: AdminHeaderProps) {
    return (
        <View style={styles.container}>
            {/* Left section */}
            <View style={styles.leftSection}>
                <Pressable
                    style={styles.iconButton}
                    onPress={onMenuPress}
                >
                    <Menu size={22} color="#0F172A" />
                </Pressable>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Admin Panel</Text>
                    <Text style={styles.subtitle}>
                        Healthcare Management
                    </Text>
                </View>
            </View>

            {/* Right section */}
            <View style={styles.rightSection}>
                <Pressable style={styles.iconButton}>
                    <Search size={21} color="#475569" />
                </Pressable>

                <Pressable
                    style={styles.notificationButton}
                    onPress={onNotificationPress}
                >
                    <Bell size={21} color="#475569" />

                    <View style={styles.notificationDot} />
                </Pressable>

                <Pressable
                    style={styles.profileButton}
                    onPress={onProfilePress}
                >
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>A</Text>
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Admin</Text>
                        <Text style={styles.profileRole}>Administrator</Text>
                    </View>

                    <ChevronDown size={17} color="#64748B" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: 76,
        paddingHorizontal: 24,
        paddingVertical: 14,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },

    titleContainer: {
        marginLeft: 14,
    },

    title: {
        fontSize: 17,
        fontWeight: "700",
        color: "#0F172A",
    },

    subtitle: {
        marginTop: 2,
        fontSize: 12,
        color: "#64748B",
    },

    rightSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
    },

    notificationButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    notificationDot: {
        position: "absolute",
        top: 9,
        right: 9,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#EF4444",
        borderWidth: 1,
        borderColor: "#FFFFFF",
    },

    profileButton: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 8,
        paddingLeft: 8,
    },

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    profileInfo: {
        marginLeft: 10,
        marginRight: 7,
    },

    profileName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#0F172A",
    },

    profileRole: {
        marginTop: 2,
        fontSize: 11,
        color: "#64748B",
    },
});

