
import {
    CalendarDays,
    ClipboardList,
    Home,
    Settings,
    UserRound,
    Users,
} from "lucide-react-native";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export type ReceptionTab =
    | "home"
    | "appointments"
    | "patients"
    | "records"
    | "profile"
    | "settings";

interface ReceptionBottomNavbarProps {
    activeTab?: ReceptionTab;
    onTabChange?: (tab: ReceptionTab) => void;
}

interface NavItem {
    key: ReceptionTab;
    label: string;
    icon: React.ComponentType<{
        size?: number;
        color?: string;
        strokeWidth?: number;
    }>;
}

const navItems: NavItem[] = [
    {
        key: "home",
        label: "Home",
        icon: Home,
    },
    {
        key: "appointments",
        label: "Appointments",
        icon: CalendarDays,
    },
    {
        key: "patients",
        label: "Patients",
        icon: Users,
    },
    {
        key: "records",
        label: "Records",
        icon: ClipboardList,
    },
    {
        key: "profile",
        label: "Profile",
        icon: UserRound,
    },
    {
        key: "settings",
        label: "Settings",
        icon: Settings,
    },
];

export default function ReceptionBottomNavbar({
    activeTab = "home",
    onTabChange,
}: ReceptionBottomNavbarProps) {
    const handleTabPress = (tab: ReceptionTab) => {
        if (onTabChange) {
            onTabChange(tab);
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.navbar}>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.key;

                    return (
                        <Pressable
                            key={item.key}
                            onPress={() => handleTabPress(item.key)}
                            style={({ pressed }) => [
                                styles.navItem,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View
                                style={[
                                    styles.iconContainer,
                                    isActive && styles.activeIconContainer,
                                ]}
                            >
                                <Icon
                                    size={20}
                                    color={isActive ? "#CB9E53" : "#777777"}
                                    strokeWidth={isActive ? 2.4 : 1.8}
                                />

                                {isActive ? (
                                    <View style={styles.activeDot} />
                                ) : null}
                            </View>

                            <Text
                                style={[
                                    styles.label,
                                    isActive && styles.activeLabel,
                                ]}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        backgroundColor: "#080808",
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 10,
    },

    navbar: {
        width: "100%",
        maxWidth: 760,
        minHeight: 68,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#101010",
        borderWidth: 1,
        borderColor: "#242424",
        borderRadius: 18,
        paddingHorizontal: 6,
    },

    navItem: {
        flex: 1,
        minHeight: 58,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 13,
    },

    iconContainer: {
        width: 38,
        height: 32,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },

    activeIconContainer: {
        backgroundColor: "#19150E",
    },

    activeDot: {
        position: "absolute",
        bottom: 1,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#CB9E53",
    },

    label: {
        color: "#696969",
        fontSize: 9,
        fontWeight: "600",
        marginTop: 3,
    },

    activeLabel: {
        color: "#CB9E53",
        fontWeight: "700",
    },

    pressed: {
        opacity: 0.65,
    },
});
