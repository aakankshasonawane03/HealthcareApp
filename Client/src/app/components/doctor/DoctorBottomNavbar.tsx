
import {
    CalendarDays,
    ClipboardList,
    Home,
    UserRound,
    Users,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type DoctorTab =
    | "home"
    | "appointments"
    | "patients"
    | "records"
    | "profile";

interface DoctorBottomNavbarProps {
    activeTab?: DoctorTab;
    onTabPress?: (tab: DoctorTab) => void;
}

const tabs: {
    id: DoctorTab;
    label: string;
    icon: typeof Home;
}[] = [
        {
            id: "home",
            label: "Home",
            icon: Home,
        },
        {
            id: "appointments",
            label: "Appointments",
            icon: CalendarDays,
        },
        {
            id: "patients",
            label: "Patients",
            icon: Users,
        },
        {
            id: "records",
            label: "Records",
            icon: ClipboardList,
        },
        {
            id: "profile",
            label: "Profile",
            icon: UserRound,
        },
    ];

export default function DoctorBottomNavbar({
    activeTab = "home",
    onTabPress,
}: DoctorBottomNavbarProps) {
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <TouchableOpacity
                            key={tab.id}
                            style={styles.tab}
                            activeOpacity={0.75}
                            onPress={() => onTabPress?.(tab.id)}
                        >
                            <View
                                style={[
                                    styles.iconContainer,
                                    isActive && styles.activeIconContainer,
                                ]}
                            >
                                <Icon
                                    size={21}
                                    color={
                                        isActive
                                            ? "#2563EB"
                                            : "#64748B"
                                    }
                                    strokeWidth={isActive ? 2.2 : 1.8}
                                />

                                {isActive && (
                                    <View style={styles.activeDot} />
                                )}
                            </View>

                            <Text
                                style={[
                                    styles.label,
                                    isActive && styles.activeLabel,
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 12,
        paddingBottom: 10,
        paddingTop: 5,
    },

    navbar: {
        height: 68,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 4,
    },

    tab: {
        flex: 1,
        height: 62,
        alignItems: "center",
        justifyContent: "center",
    },

    iconContainer: {
        width: 36,
        height: 34,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    activeIconContainer: {
        backgroundColor: "#EFF6FF",
    },

    activeDot: {
        position: "absolute",
        bottom: 1,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#2563EB",
    },

    label: {
        color: "#64748B",
        fontSize: 9,
        marginTop: 3,
    },

    activeLabel: {
        color: "#2563EB",
        fontWeight: "600",
    },
});
