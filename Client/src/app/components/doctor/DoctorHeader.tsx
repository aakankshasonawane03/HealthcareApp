
import {
    Bell,
    ChevronDown,
    Search,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface DoctorHeaderProps {
    doctorName?: string;
    specialization?: string;
    onNotificationPress?: () => void;
    onProfilePress?: () => void;
    onSearchPress?: () => void;
}

export default function DoctorHeader({
    doctorName = "Dr. John Smith",
    specialization = "General Physician",
    onNotificationPress,
    onProfilePress,
    onSearchPress,
}: DoctorHeaderProps) {
    return (
        <View style={styles.container}>
            {/* Top Header */}
            <View style={styles.topRow}>
                <TouchableOpacity
                    style={styles.profileSection}
                    activeOpacity={0.8}
                    onPress={onProfilePress}
                >
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>DR</Text>
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.greeting}>
                            Good Morning 👋
                        </Text>

                        <View style={styles.nameRow}>
                            <Text style={styles.doctorName}>
                                {doctorName}
                            </Text>

                            <ChevronDown
                                size={15}
                                color="#64748B"
                                style={styles.chevron}
                            />
                        </View>

                        <Text style={styles.specialization}>
                            {specialization}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.notificationButton}
                    activeOpacity={0.8}
                    onPress={onNotificationPress}
                >
                    <Bell
                        size={20}
                        color="#2563EB"
                    />

                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </View>

            {/* Search */}
            <TouchableOpacity
                style={styles.searchContainer}
                activeOpacity={0.8}
                onPress={onSearchPress}
            >
                <Search
                    size={19}
                    color="#64748B"
                />

                <Text style={styles.searchText}>
                    Search patients, appointments...
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 22,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#BFDBFE",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    avatarText: {
        color: "#2563EB",
        fontSize: 15,
        fontWeight: "700",
    },

    profileInfo: {
        flex: 1,
    },

    greeting: {
        color: "#64748B",
        fontSize: 11,
        marginBottom: 3,
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    doctorName: {
        color: "#0F172A",
        fontSize: 18,
        fontWeight: "700",
    },

    chevron: {
        marginLeft: 4,
    },

    specialization: {
        color: "#2563EB",
        fontSize: 11,
        marginTop: 3,
    },

    notificationButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    notificationDot: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#2563EB",
        borderWidth: 1,
        borderColor: "#FFFFFF",
    },

    searchContainer: {
        height: 48,
        borderRadius: 13,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
    },

    searchText: {
        color: "#64748B",
        fontSize: 12,
        marginLeft: 10,
    },
});
