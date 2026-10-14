
import { usePathname, useRouter } from "expo-router";
import {
    Activity,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    UserRound,
    Users,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            route: "/main/dashboard",
        },
        {
            label: "Patients",
            icon: Users,
            route: "/main/patient",
        },
        {
            label: "Doctors",
            icon: UserRound,
            route: "/main/doctor",
        },
    ];

    return (
        <View
            style={[
                styles.sidebar,
                collapsed && styles.sidebarCollapsed,
            ]}
        >
            {/* LOGO */}
            <View
                style={[
                    styles.logoContainer,
                    collapsed && styles.logoContainerCollapsed,
                ]}
            >
                <View style={styles.logoIcon}>
                    <Activity size={22} color="#2563EB" />
                </View>

                {!collapsed && (
                    <View>
                        <Text style={styles.logoTitle}>HealthCare</Text>
                        <Text style={styles.logoSubtitle}>
                            Management
                        </Text>
                    </View>
                )}
            </View>

            {/* TOGGLE BUTTON */}
            <Pressable
                onPress={() => setCollapsed(!collapsed)}
                style={[
                    styles.toggleButton,
                    collapsed && styles.toggleButtonCollapsed,
                ]}
            >
                {collapsed ? (
                    <ChevronRight size={18} color="#475569" />
                ) : (
                    <ChevronLeft size={18} color="#475569" />
                )}
            </Pressable>

            {/* NAVIGATION */}
            <View style={styles.navigation}>
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                        pathname === item.route ||
                        (item.route !== "/main/dashboard" &&
                            pathname.startsWith(item.route));

                    return (
                        <Pressable
                            key={item.route}
                            onPress={() =>
                                router.push(item.route as any)
                            }
                            style={[
                                styles.menuItem,
                                collapsed && styles.menuItemCollapsed,
                                isActive && styles.activeMenuItem,
                            ]}
                        >
                            <Icon
                                size={21}
                                color={
                                    isActive
                                        ? "#FFFFFF"
                                        : "#64748B"
                                }
                            />

                            {!collapsed && (
                                <Text
                                    style={[
                                        styles.menuText,
                                        isActive &&
                                        styles.activeMenuText,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            )}
                        </Pressable>
                    );
                })}
            </View>

            {/* FOOTER */}
            {!collapsed && (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Healthcare Management System
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    /* SIDEBAR */

    sidebar: {
        width: 250,
        height: "100%",
        backgroundColor: "#FFFFFF",
        borderRightWidth: 1,
        borderRightColor: "#E2E8F0",
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 20,

        position: "relative",
    },

    sidebarCollapsed: {
        width: 72,
        paddingHorizontal: 10,
    },

    /* LOGO */

    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        marginBottom: 32,
    },

    logoContainerCollapsed: {
        justifyContent: "center",
        paddingHorizontal: 0,
    },

    logoIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    logoTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#0F172A",
    },

    logoSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },

    /* TOGGLE */

    toggleButton: {
        position: "absolute",
        right: -15,
        top: 82,

        width: 30,
        height: 30,

        borderRadius: 15,
        backgroundColor: "#FFFFFF",

        borderWidth: 1,
        borderColor: "#E2E8F0",

        alignItems: "center",
        justifyContent: "center",

        zIndex: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },

    toggleButtonCollapsed: {
        right: -15,
    },

    /* NAVIGATION */

    navigation: {
        gap: 8,
    },

    menuItem: {
        height: 48,
        borderRadius: 10,

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 14,
    },

    menuItemCollapsed: {
        justifyContent: "center",
        paddingHorizontal: 0,
    },

    activeMenuItem: {
        backgroundColor: "#2563EB",
    },

    menuText: {
        marginLeft: 12,

        fontSize: 14,
        fontWeight: "500",

        color: "#475569",
    },

    activeMenuText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },

    /* FOOTER */

    footer: {
        marginTop: "auto",
        paddingHorizontal: 8,
    },

    footerText: {
        fontSize: 11,
        color: "#94A3B8",
        lineHeight: 16,
    },
});
