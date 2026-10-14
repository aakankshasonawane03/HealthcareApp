
import {
    Activity,
    CalendarDays,
    LayoutDashboard,
    LogOut,
    Settings,
    Stethoscope,
    UserRound,
    Users,
    X,
} from "lucide-react-native";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface AdminSidebarProps {
    activeItem?: string;
    onItemPress?: (item: string) => void;
    onClose?: () => void;
}

interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

export default function AdminSidebar({
    activeItem = "dashboard",
    onItemPress,
    onClose,
}: AdminSidebarProps) {
    const menuItems: MenuItem[] = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard size={20} color="#64748B" />,
        },
        {
            id: "patients",
            label: "Patients",
            icon: <Users size={20} color="#64748B" />,
        },
        {
            id: "doctors",
            label: "Doctors",
            icon: <Stethoscope size={20} color="#64748B" />,
        },
        {
            id: "appointments",
            label: "Appointments",
            icon: <CalendarDays size={20} color="#64748B" />,
        },
        {
            id: "users",
            label: "Users",
            icon: <UserRound size={20} color="#64748B" />,
        },
        {
            id: "activity",
            label: "System Activity",
            icon: <Activity size={20} color="#64748B" />,
        },
    ];

    return (
        <View style={styles.sidebar}>
            {/* Logo / Brand */}
            <View style={styles.brandSection}>
                <View style={styles.logo}>
                    <Activity size={24} color="#FFFFFF" />
                </View>

                <View style={styles.brandTextContainer}>
                    <Text style={styles.brandName}>HealthCare</Text>
                    <Text style={styles.brandRole}>ADMIN PANEL</Text>
                </View>

                {onClose && (
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <X size={20} color="#64748B" />
                    </Pressable>
                )}
            </View>

            {/* Navigation */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.navigation}
            >
                <Text style={styles.sectionLabel}>MAIN MENU</Text>

                {menuItems.map((item) => {
                    const isActive = activeItem === item.id;

                    return (
                        <Pressable
                            key={item.id}
                            onPress={() => onItemPress?.(item.id)}
                            style={[
                                styles.menuItem,
                                isActive && styles.activeMenuItem,
                            ]}
                        >
                            <View
                                style={[
                                    styles.menuIcon,
                                    isActive && styles.activeMenuIcon,
                                ]}
                            >
                                {React.cloneElement(
                                    item.icon as React.ReactElement<{
                                        color?: string;
                                    }>,
                                    {
                                        color: isActive ? "#FFFFFF" : "#64748B",
                                    }
                                )}
                            </View>

                            <Text
                                style={[
                                    styles.menuLabel,
                                    isActive && styles.activeMenuLabel,
                                ]}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    );
                })}

                <Text style={[styles.sectionLabel, styles.settingsLabel]}>
                    SYSTEM
                </Text>

                <Pressable
                    onPress={() => onItemPress?.("settings")}
                    style={[
                        styles.menuItem,
                        activeItem === "settings" && styles.activeMenuItem,
                    ]}
                >
                    <View
                        style={[
                            styles.menuIcon,
                            activeItem === "settings" && styles.activeMenuIcon,
                        ]}
                    >
                        <Settings
                            size={20}
                            color={
                                activeItem === "settings" ? "#FFFFFF" : "#64748B"
                            }
                        />
                    </View>

                    <Text
                        style={[
                            styles.menuLabel,
                            activeItem === "settings" && styles.activeMenuLabel,
                        ]}
                    >
                        Settings
                    </Text>
                </Pressable>
            </ScrollView>

            {/* Bottom Admin Card */}
            <View style={styles.bottomSection}>
                <View style={styles.adminCard}>
                    <View style={styles.adminAvatar}>
                        <Text style={styles.adminAvatarText}>A</Text>
                    </View>

                    <View style={styles.adminInfo}>
                        <Text style={styles.adminName}>Administrator</Text>
                        <Text style={styles.adminEmail}>System Admin</Text>
                    </View>
                </View>

                <Pressable
                    style={styles.logoutButton}
                    onPress={() => onItemPress?.("logout")}
                >
                    <LogOut size={18} color="#EF4444" />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        width: 270,
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRightWidth: 1,
        borderRightColor: "#E2E8F0",
    },

    brandSection: {
        height: 88,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },

    logo: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
    },

    brandTextContainer: {
        marginLeft: 12,
        flex: 1,
    },

    brandName: {
        fontSize: 17,
        fontWeight: "700",
        color: "#0F172A",
    },

    brandRole: {
        marginTop: 3,
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1.2,
        color: "#64748B",
    },

    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8FAFC",
    },

    navigation: {
        paddingHorizontal: 14,
        paddingTop: 22,
        paddingBottom: 20,
    },

    sectionLabel: {
        marginLeft: 12,
        marginBottom: 10,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1.1,
        color: "#94A3B8",
    },

    settingsLabel: {
        marginTop: 24,
    },

    menuItem: {
        height: 48,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 5,
    },

    activeMenuItem: {
        backgroundColor: "#2563EB",
    },

    menuIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    activeMenuIcon: {
        backgroundColor: "rgba(255,255,255,0.15)",
    },

    menuLabel: {
        marginLeft: 9,
        fontSize: 14,
        fontWeight: "500",
        color: "#475569",
    },

    activeMenuLabel: {
        color: "#FFFFFF",
        fontWeight: "600",
    },

    bottomSection: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },

    adminCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 12,
        backgroundColor: "#F8FAFC",
    },

    adminAvatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
    },

    adminAvatarText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    adminInfo: {
        marginLeft: 10,
        flex: 1,
    },

    adminName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#0F172A",
    },

    adminEmail: {
        marginTop: 2,
        fontSize: 11,
        color: "#64748B",
    },

    logoutButton: {
        height: 42,
        marginTop: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    },

    logoutText: {
        marginLeft: 10,
        fontSize: 13,
        fontWeight: "500",
        color: "#EF4444",
    },
});

