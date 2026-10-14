
import {
    Bell,
    ChevronDown,
    Menu,
    Search,
    UserRound,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface ReceptionTopbarProps {
    name?: string;
    role?: string;
    notificationCount?: number;
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onMenuPress?: () => void;
    onNotificationPress?: () => void;
    onProfilePress?: () => void;
}

export default function ReceptionTopbar({
    name = "Receptionist",
    role = "Reception Desk",
    notificationCount = 0,
    searchPlaceholder = "Search patients, appointments...",
    searchValue = "",
    onSearchChange,
    onMenuPress,
    onNotificationPress,
    onProfilePress,
}: ReceptionTopbarProps) {
    return (
        <View style={styles.container}>
            {/* Mobile Menu */}
            <TouchableOpacity
                activeOpacity={0.75}
                onPress={onMenuPress}
                style={styles.menuButton}
            >
                <Menu
                    size={21}
                    color="#CB9E53"
                    strokeWidth={2}
                />
            </TouchableOpacity>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Search
                    size={18}
                    color="#666666"
                    strokeWidth={2}
                />

                <TextInput
                    value={searchValue}
                    onChangeText={onSearchChange}
                    placeholder={searchPlaceholder}
                    placeholderTextColor="#5F5F5F"
                    style={styles.searchInput}
                    returnKeyType="search"
                />
            </View>

            {/* Right Actions */}
            <View style={styles.actions}>
                {/* Notification */}
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={onNotificationPress}
                    style={styles.iconButton}
                >
                    <Bell
                        size={19}
                        color="#B7B7B7"
                        strokeWidth={1.9}
                    />

                    {notificationCount > 0 ? (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationText}>
                                {notificationCount > 99
                                    ? "99+"
                                    : notificationCount}
                            </Text>
                        </View>
                    ) : null}
                </TouchableOpacity>

                {/* Profile */}
                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={onProfilePress}
                    style={styles.profileButton}
                >
                    <View style={styles.avatar}>
                        <UserRound
                            size={18}
                            color="#CB9E53"
                            strokeWidth={2}
                        />
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.name} numberOfLines={1}>
                            {name}
                        </Text>

                        <Text style={styles.role} numberOfLines={1}>
                            {role}
                        </Text>
                    </View>

                    <ChevronDown
                        size={16}
                        color="#777777"
                        strokeWidth={2}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: 72,
        paddingHorizontal: 22,
        paddingVertical: 12,
        backgroundColor: "#101010",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(203, 158, 83, 0.12)",
        flexDirection: "row",
        alignItems: "center",
    },

    menuButton: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 12,
        backgroundColor: "rgba(203, 158, 83, 0.08)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.12)",
        alignItems: "center",
        justifyContent: "center",
    },

    searchContainer: {
        flex: 1,
        maxWidth: 460,
        height: 43,
        paddingHorizontal: 13,
        borderRadius: 13,
        backgroundColor: "#161616",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.07)",
        flexDirection: "row",
        alignItems: "center",
    },

    searchInput: {
        flex: 1,
        marginLeft: 9,
        paddingVertical: 0,
        color: "#FFFFFF",
        fontSize: 12,
    },

    actions: {
        marginLeft: "auto",
        flexDirection: "row",
        alignItems: "center",
    },

    iconButton: {
        width: 42,
        height: 42,
        marginLeft: 10,
        borderRadius: 13,
        backgroundColor: "#161616",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.07)",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    notificationBadge: {
        position: "absolute",
        top: 5,
        right: 5,
        minWidth: 15,
        height: 15,
        paddingHorizontal: 3,
        borderRadius: 8,
        backgroundColor: "#CB9E53",
        alignItems: "center",
        justifyContent: "center",
    },

    notificationText: {
        color: "#101010",
        fontSize: 7,
        fontWeight: "800",
    },

    profileButton: {
        minHeight: 45,
        marginLeft: 10,
        paddingLeft: 6,
        paddingRight: 9,
        borderRadius: 13,
        backgroundColor: "#161616",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.07)",
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 34,
        height: 34,
        borderRadius: 11,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    profileInfo: {
        width: 90,
        marginLeft: 8,
        marginRight: 7,
    },

    name: {
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: "600",
    },

    role: {
        marginTop: 2,
        color: "#666666",
        fontSize: 9,
    },
});
