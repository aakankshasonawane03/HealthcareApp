
import {
    CalendarDays,
    ClipboardList,
    FileText,
    Home,
    LogOut,
    Menu,
    Settings,
    Stethoscope,
    UserRound,
    Users,
    X,
} from "lucide-react-native";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type DoctorSidebarItem =
    | "dashboard"
    | "appointments"
    | "patients"
    | "records"
    | "prescriptions"
    | "profile"
    | "settings";

interface DoctorSidebarProps {
    activeItem?: DoctorSidebarItem;
    onItemPress?: (item: DoctorSidebarItem) => void;
    onLogout?: () => void;
    collapsed?: boolean;
    onToggle?: () => void;
}

interface SidebarItemProps {
    icon: React.ComponentType<any>;
    label: string;
    item: DoctorSidebarItem;
    activeItem: DoctorSidebarItem;
    collapsed: boolean;
    onPress?: (item: DoctorSidebarItem) => void;
}

function SidebarItem({
    icon: Icon,
    label,
    item,
    activeItem,
    collapsed,
    onPress,
}: SidebarItemProps) {
    const isActive = activeItem === item;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress?.(item)}
            style={[
                styles.item,
                isActive && styles.activeItem,
                collapsed && styles.collapsedItem,
            ]}
        >
            <View
                style={[
                    styles.itemIcon,
                    isActive && styles.activeIcon,
                ]}
            >
                <Icon
                    size={19}
                    color={isActive ? "#FFFFFF" : "#64748B"}
                />
            </View>

            {!collapsed && (
                <Text
                    style={[
                        styles.itemText,
                        isActive && styles.activeText,
                    ]}
                >
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
}

export default function DoctorSidebar({
    activeItem = "dashboard",
    onItemPress,
    onLogout,
    collapsed = false,
    onToggle,
}: DoctorSidebarProps) {
    return (
        <View
            style={[
                styles.sidebar,
                collapsed
                    ? styles.sidebarCollapsed
                    : styles.sidebarExpanded,
            ]}
        >
            {/* Brand */}
            <View
                style={[
                    styles.brandContainer,
                    collapsed && styles.brandCollapsed,
                ]}
            >
                <View style={styles.logo}>
                    <Stethoscope size={21} color="#FFFFFF" />
                </View>

                {!collapsed && (
                    <View style={styles.brandTextContainer}>
                        <Text style={styles.brandTitle}>
                            HealthCare
                        </Text>

                        <Text style={styles.brandSubtitle}>
                            Doctor Portal
                        </Text>
                    </View>
                )}
            </View>

            {/* Toggle */}
            {onToggle && (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onToggle}
                    style={[
                        styles.toggleButton,
                        collapsed && styles.toggleCollapsed,
                    ]}
                >
                    {collapsed ? (
                        <Menu size={19} color="#64748B" />
                    ) : (
                        <X size={18} color="#64748B" />
                    )}
                </TouchableOpacity>
            )}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Main */}
                {!collapsed && (
                    <Text style={styles.sectionTitle}>
                        MAIN
                    </Text>
                )}

                <SidebarItem
                    item="dashboard"
                    label="Dashboard"
                    icon={Home}
                    activeItem={activeItem}
                    collapsed={collapsed}
                    onPress={onItemPress}
                />

                <SidebarItem
                    item="appointments"
                    label="Appointments"
                    icon={CalendarDays}
                    activeItem={activeItem}
                    collapsed={collapsed}
                    onPress={onItemPress}
                />

                <SidebarItem
                    item="patients"
                    label="My Patients"
                    icon={Users}
                    activeItem={activeItem}
                    collapsed={collapsed}
                    onPress={onItemPress}
                />

                <SidebarItem
                    item="records"
                    label="Medical Records"
                    icon={ClipboardList}
                    activeItem={activeItem}
                    collapsed={collapsed}
                    onPress={onItemPress}
                />

                <SidebarItem
                    item="prescriptions"
                    label="Prescriptions"
                    icon={FileText}
                    activeItem={activeItem}
                    collapsed={collapsed}
                    onPress={onItemPress}
                />

                {!collapsed && (
                    <Text style={styles.sectionTitle}>
                        ACCOUNT
                    </Text>
                )}

                <SidebarItem
                    item="profile"
                    label="My Profile"
                    icon={UserRound}
                    activeItem={activeItem}
                    collapsed={collapsed}
                    onPress={onItemPress}
                />

                <SidebarItem
                    item="settings"
                    label="Settings"
                    icon={Settings}
                    activeItem={activeItem}
                    collapsed={collapsed}
                    onPress={onItemPress}
                />
            </ScrollView>

            {/* Doctor Info */}
            {!collapsed && (
                <View style={styles.doctorInfo}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            DR
                        </Text>
                    </View>

                    <View style={styles.doctorDetails}>
                        <Text
                            style={styles.doctorName}
                            numberOfLines={1}
                        >
                            Dr. Doctor
                        </Text>

                        <Text style={styles.doctorRole}>
                            Medical Specialist
                        </Text>
                    </View>
                </View>
            )}

            {/* Logout */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onLogout}
                style={[
                    styles.logoutButton,
                    collapsed && styles.logoutCollapsed,
                ]}
            >
                <LogOut size={18} color="#EF4444" />

                {!collapsed && (
                    <Text style={styles.logoutText}>
                        Logout
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        backgroundColor: "#FFFFFF",
        borderRightWidth: 1,
        borderRightColor: "#E2E8F0",
        minHeight: "100%",
    },

    sidebarExpanded: {
        width: 250,
    },

    sidebarCollapsed: {
        width: 76,
    },

    brandContainer: {
        minHeight: 76,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 17,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },

    brandCollapsed: {
        justifyContent: "center",
        paddingHorizontal: 0,
    },

    logo: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
    },

    brandTextContainer: {
        marginLeft: 11,
    },

    brandTitle: {
        color: "#0F172A",
        fontSize: 15,
        fontWeight: "800",
    },

    brandSubtitle: {
        color: "#64748B",
        fontSize: 10,
        marginTop: 3,
    },

    toggleButton: {
        position: "absolute",
        top: 24,
        right: -13,
        zIndex: 10,
        width: 27,
        height: 27,
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
    },

    toggleCollapsed: {
        right: -13,
    },

    scrollContent: {
        paddingHorizontal: 11,
        paddingTop: 22,
        paddingBottom: 15,
    },

    sectionTitle: {
        color: "#94A3B8",
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 1.2,
        marginLeft: 11,
        marginBottom: 9,
        marginTop: 5,
    },

    item: {
        minHeight: 46,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        paddingHorizontal: 9,
        marginBottom: 5,
    },

    collapsedItem: {
        justifyContent: "center",
        paddingHorizontal: 0,
    },

    activeItem: {
        backgroundColor: "#2563EB",
    },

    itemIcon: {
        width: 32,
        height: 32,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
    },

    activeIcon: {
        backgroundColor: "rgba(255,255,255,0.15)",
    },

    itemText: {
        color: "#475569",
        fontSize: 12,
        fontWeight: "500",
        marginLeft: 8,
    },

    activeText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    doctorInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 12,
        paddingVertical: 13,
        paddingHorizontal: 10,
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 13,
        marginBottom: 10,
    },

    avatar: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#BFDBFE",
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        color: "#2563EB",
        fontSize: 10,
        fontWeight: "800",
    },

    doctorDetails: {
        flex: 1,
        marginLeft: 9,
    },

    doctorName: {
        color: "#0F172A",
        fontSize: 11,
        fontWeight: "700",
    },

    doctorRole: {
        color: "#64748B",
        fontSize: 9,
        marginTop: 3,
    },

    logoutButton: {
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 12,
        marginBottom: 15,
        paddingHorizontal: 12,
        borderRadius: 11,
        backgroundColor: "#FEF2F2",
        borderWidth: 1,
        borderColor: "#FECACA",
    },

    logoutCollapsed: {
        justifyContent: "center",
        paddingHorizontal: 0,
    },

    logoutText: {
        color: "#EF4444",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 9,
    },
});
