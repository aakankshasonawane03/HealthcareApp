
import {
    CalendarDays,
    ClipboardList,
    Home,
    LogOut,
    Settings,
    Stethoscope,
    UserRound,
    Users,
} from "lucide-react-native";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type ReceptionSidebarItem =
    | "dashboard"
    | "appointments"
    | "patients"
    | "doctors"
    | "records"
    | "profile"
    | "settings";

interface SidebarItem {
    id: ReceptionSidebarItem;
    label: string;
    icon: React.ComponentType<any>;
}

interface ReceptionSidebarProps {
    activeItem?: ReceptionSidebarItem;
    onItemPress?: (item: ReceptionSidebarItem) => void;
    onLogout?: () => void;
}

const sidebarItems: SidebarItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
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
        id: "doctors",
        label: "Doctors",
        icon: Stethoscope,
    },
    {
        id: "records",
        label: "Medical Records",
        icon: ClipboardList,
    },
    {
        id: "profile",
        label: "Profile",
        icon: UserRound,
    },
    {
        id: "settings",
        label: "Settings",
        icon: Settings,
    },
];

export default function ReceptionSidebar({
    activeItem = "dashboard",
    onItemPress,
    onLogout,
}: ReceptionSidebarProps) {
    return (
        <View style={styles.sidebar}>
            {/* Brand */}
            <View style={styles.brandContainer}>
                <View style={styles.logo}>
                    <Stethoscope
                        size={23}
                        color="#CB9E53"
                        strokeWidth={2}
                    />
                </View>

                <View style={styles.brandTextContainer}>
                    <Text style={styles.brandName}>Healthcare</Text>
                    <Text style={styles.brandSubtitle}>Reception</Text>
                </View>
            </View>

            {/* Navigation */}
            <View style={styles.navigation}>
                <Text style={styles.sectionTitle}>MENU</Text>

                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.75}
                            onPress={() => onItemPress?.(item.id)}
                            style={[
                                styles.navItem,
                                isActive && styles.activeNavItem,
                            ]}
                        >
                            <View
                                style={[
                                    styles.iconContainer,
                                    isActive && styles.activeIconContainer,
                                ]}
                            >
                                <Icon
                                    size={19}
                                    color={isActive ? "#CB9E53" : "#777777"}
                                    strokeWidth={isActive ? 2.2 : 1.8}
                                />
                            </View>

                            <Text
                                style={[
                                    styles.navText,
                                    isActive && styles.activeNavText,
                                ]}
                            >
                                {item.label}
                            </Text>

                            {isActive ? (
                                <View style={styles.activeIndicator} />
                            ) : null}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Bottom */}
            <View style={styles.bottomContainer}>
                <View style={styles.divider} />

                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={onLogout}
                    style={styles.logoutButton}
                >
                    <View style={styles.logoutIcon}>
                        <LogOut
                            size={18}
                            color="#D56B6F"
                            strokeWidth={1.9}
                        />
                    </View>

                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        width: 250,
        flex: 1,
        minHeight: "100%",
        backgroundColor: "#101010",
        borderRightWidth: 1,
        borderRightColor: "rgba(203, 158, 83, 0.12)",
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 18,
    },

    brandContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        marginBottom: 32,
    },

    logo: {
        width: 45,
        height: 45,
        borderRadius: 14,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.20)",
        alignItems: "center",
        justifyContent: "center",
    },

    brandTextContainer: {
        marginLeft: 11,
    },

    brandName: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    brandSubtitle: {
        marginTop: 2,
        color: "#CB9E53",
        fontSize: 10,
        fontWeight: "600",
    },

    navigation: {
        flex: 1,
    },

    sectionTitle: {
        marginHorizontal: 10,
        marginBottom: 10,
        color: "#555555",
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1.2,
    },

    navItem: {
        minHeight: 48,
        marginBottom: 5,
        paddingHorizontal: 9,
        borderRadius: 13,
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },

    activeNavItem: {
        backgroundColor: "rgba(203, 158, 83, 0.08)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.12)",
    },

    iconContainer: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    activeIconContainer: {
        backgroundColor: "rgba(203, 158, 83, 0.10)",
    },

    navText: {
        marginLeft: 9,
        color: "#777777",
        fontSize: 12,
        fontWeight: "500",
    },

    activeNavText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },

    activeIndicator: {
        position: "absolute",
        right: 0,
        width: 3,
        height: 22,
        borderRadius: 3,
        backgroundColor: "#CB9E53",
    },

    bottomContainer: {
        marginTop: "auto",
    },

    divider: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.06)",
        marginBottom: 12,
    },

    logoutButton: {
        minHeight: 46,
        paddingHorizontal: 9,
        borderRadius: 13,
        flexDirection: "row",
        alignItems: "center",
    },

    logoutIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "rgba(213, 107, 111, 0.08)",
        alignItems: "center",
        justifyContent: "center",
    },

    logoutText: {
        marginLeft: 9,
        color: "#D56B6F",
        fontSize: 12,
        fontWeight: "600",
    },
});
