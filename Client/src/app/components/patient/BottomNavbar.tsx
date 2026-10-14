
import {
    CalendarDays,
    FileText,
    Home,
    User,
} from "lucide-react-native";
import React from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export type PatientTab =
    | "home"
    | "appointments"
    | "records"
    | "profile";

interface BottomNavbarProps {
    activeTab?: PatientTab;
    onTabChange?: (tab: PatientTab) => void;
}

interface NavItem {
    key: PatientTab;
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
        key: "records",
        label: "Records",
        icon: FileText,
    },
    {
        key: "profile",
        label: "Profile",
        icon: User,
    },
];

export default function BottomNavbar({
    activeTab = "home",
    onTabChange,
}: BottomNavbarProps) {
    const handleTabPress = (tab: PatientTab) => {
        onTabChange?.(tab);
    };

    return (
        <View style={styles.container}>
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
                                pressed && styles.navItemPressed,
                            ]}
                        >
                            <View
                                style={[
                                    styles.iconWrapper,
                                    isActive && styles.activeIconWrapper,
                                ]}
                            >
                                <Icon
                                    size={21}
                                    color={
                                        isActive
                                            ? "#2563EB"
                                            : "#64748B"
                                    }
                                    strokeWidth={isActive ? 2.4 : 1.8}
                                />
                            </View>

                            <Text
                                style={[
                                    styles.label,
                                    isActive && styles.activeLabel,
                                ]}
                            >
                                {item.label}
                            </Text>

                            {isActive && (
                                <View style={styles.activeIndicator} />
                            )}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 14,
        paddingBottom: 12,
        backgroundColor: "transparent",
    },

    navbar: {
        height: 72,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 22,
        paddingHorizontal: 8,
    },

    navItem: {
        flex: 1,
        height: 62,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 16,
    },

    navItemPressed: {
        opacity: 0.7,
    },

    iconWrapper: {
        width: 38,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },

    activeIconWrapper: {
        backgroundColor: "#EFF6FF",
    },

    label: {
        color: "#64748B",
        fontSize: 10,
        fontWeight: "500",
        marginTop: 3,
    },

    activeLabel: {
        color: "#2563EB",
        fontWeight: "700",
    },

    activeIndicator: {
        position: "absolute",
        bottom: 1,
        width: 18,
        height: 2,
        borderRadius: 1,
        backgroundColor: "#2563EB",
    },
});
