
import {
    Bell,
    ChevronDown,
    Menu,
    Search,
    UserRound,
} from "lucide-react-native";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface DoctorTopbarProps {
    doctorName?: string;
    specialty?: string;
    profileImage?: string;
    searchValue?: string;
    onSearchChange?: (text: string) => void;
    onNotificationPress?: () => void;
    onProfilePress?: () => void;
    onMenuPress?: () => void;
}

export default function DoctorTopbar({
    doctorName = "Dr. Doctor",
    specialty = "Medical Specialist",
    profileImage,
    searchValue = "",
    onSearchChange,
    onNotificationPress,
    onProfilePress,
    onMenuPress,
}: DoctorTopbarProps) {
    return (
        <View style={styles.container}>
            {/* Mobile Menu */}
            {onMenuPress && (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onMenuPress}
                    style={styles.menuButton}
                >
                    <Menu size={21} color="#B0B0B0" />
                </TouchableOpacity>
            )}

            {/* Search */}
            <View style={styles.searchContainer}>
                <Search size={18} color="#6F6F6F" />

                <TextInput
                    value={searchValue}
                    onChangeText={onSearchChange}
                    placeholder="Search patients, appointments..."
                    placeholderTextColor="#606060"
                    style={styles.searchInput}
                />
            </View>

            {/* Right Actions */}
            <View style={styles.rightSection}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onNotificationPress}
                    style={styles.notificationButton}
                >
                    <Bell size={19} color="#A7A7A7" />

                    <View style={styles.notificationDot} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onProfilePress}
                    style={styles.profileButton}
                >
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.profilePlaceholder}>
                            <UserRound size={18} color="#CB9E53" />
                        </View>
                    )}

                    <View style={styles.profileInfo}>
                        <Text
                            style={styles.doctorName}
                            numberOfLines={1}
                        >
                            {doctorName}
                        </Text>

                        <Text
                            style={styles.specialty}
                            numberOfLines={1}
                        >
                            {specialty}
                        </Text>
                    </View>

                    <ChevronDown size={16} color="#777777" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: 72,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0D0D0D",
        borderBottomWidth: 1,
        borderBottomColor: "#252525",
        paddingHorizontal: 18,
        gap: 12,
    },

    menuButton: {
        width: 40,
        height: 40,
        borderRadius: 11,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        alignItems: "center",
        justifyContent: "center",
    },

    searchContainer: {
        flex: 1,
        maxWidth: 520,
        height: 42,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 11,
        paddingHorizontal: 12,
    },

    searchInput: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 12,
        marginLeft: 8,
        paddingVertical: 0,
    },

    rightSection: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
    },

    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: 11,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        position: "relative",
    },

    notificationDot: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#CB9E53",
    },

    profileButton: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 12,
        paddingHorizontal: 8,
    },

    profileImage: {
        width: 34,
        height: 34,
        borderRadius: 10,
    },

    profilePlaceholder: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3123",
        alignItems: "center",
        justifyContent: "center",
    },

    profileInfo: {
        maxWidth: 130,
        marginHorizontal: 9,
    },

    doctorName: {
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: "700",
    },

    specialty: {
        color: "#707070",
        fontSize: 9,
        marginTop: 3,
    },
});
