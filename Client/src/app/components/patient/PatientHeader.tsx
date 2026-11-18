
import React, { useState } from "react";
import {
    Bell,
    ChevronDown,
    UserRound,
    FileText,
    Settings,
    LogOut,
    X,
} from "lucide-react-native";
import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { setLogout } from "../../../redux/slices/authSlice";

interface PatientHeaderProps {
    firstName?: string;
    location?: string;
    profileImage?: string;
    notificationCount?: number;
    onProfilePress?: () => void;
    onNotificationPress?: () => void;
    onRecordsPress?: () => void;
}

export default function PatientHeader({
    firstName,
    location = "Healthcare Account",
    profileImage,
    notificationCount = 0,
    onProfilePress,
    onNotificationPress,
    onRecordsPress,
}: PatientHeaderProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const dispatch = useDispatch();

    const userInfo = useSelector(
        (state: any) => state.auth?.userInfo
    );

    const patient =
        userInfo?.patient ??
        userInfo?.user ??
        userInfo?.Patient ??
        userInfo ??
        {};

    const name =
        firstName ||
        patient.FirstName ||
        patient.firstName ||
        patient.name ||
        patient.FullName ||
        "Patient";

    const email =
        patient.Email ||
        patient.email ||
        userInfo?.email ||
        "No email available";

    const image =
        profileImage ||
        patient.ProfileImage ||
        patient.profileImage ||
        patient.avatar ||
        "";

    const initial = String(name).charAt(0).toUpperCase();

    const openProfile = () => {
        setMenuVisible(false);
        onProfilePress?.();
    };

    const openRecords = () => {
        setMenuVisible(false);
        onRecordsPress?.();
    };

    const logout = () => {
        setMenuVisible(false);
        dispatch(setLogout());
        router.replace("/auth/login");
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setMenuVisible(true)}
                    style={styles.leftSection}
                >
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatarFallback}>
                            <Text style={styles.avatarText}>{initial}</Text>
                        </View>
                    )}

                    <View style={styles.userInfo}>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.name} numberOfLines={1}>
                            {name}
                        </Text>
                        <View style={styles.locationRow}>
                            <Text style={styles.location}>{location}</Text>
                            <ChevronDown size={14} color="#64748B" />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={onNotificationPress}
                    style={styles.notificationButton}
                >
                    <Bell size={21} color="#475569" />

                    {notificationCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>
                                {notificationCount > 9 ? "9+" : notificationCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
                statusBarTranslucent
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setMenuVisible(false)}
                >
                    <Pressable
                        style={styles.profileMenu}
                        onPress={(event) => event.stopPropagation()}
                    >
                        <View style={styles.menuHeader}>
                            {image ? (
                                <Image
                                    source={{ uri: image }}
                                    style={styles.menuAvatar}
                                />
                            ) : (
                                <View style={styles.menuAvatarFallback}>
                                    <Text style={styles.menuAvatarText}>
                                        {initial}
                                    </Text>
                                </View>
                            )}

                            <View style={styles.menuUserInfo}>
                                <Text style={styles.menuName} numberOfLines={1}>
                                    {name}
                                </Text>
                                <Text style={styles.menuEmail} numberOfLines={1}>
                                    {email}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => setMenuVisible(false)}
                            >
                                <X size={20} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuDivider} />

                        <MenuItem
                            icon={<UserRound size={20} color="#334155" />}
                            label="My Profile"
                            onPress={openProfile}
                        />

                        <MenuItem
                            icon={<FileText size={20} color="#334155" />}
                            label="Medical Records"
                            onPress={openRecords}
                        />

                        <View style={styles.menuDivider} />

                        <MenuItem
                            icon={<LogOut size={20} color="#DC4757" />}
                            label="Logout"
                            danger
                            onPress={logout}
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}

function MenuItem({
    icon,
    label,
    onPress,
    danger = false,
}: {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
    danger?: boolean;
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={styles.menuItem}
        >
            {icon}
            <Text style={[
                styles.menuItemText,
                danger && styles.dangerText,
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 8,
        paddingBottom: 8,
    },
    leftSection: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 49,
        height: 49,
        borderRadius: 17,
        marginRight: 12,
    },
    avatarFallback: {
        width: 49,
        height: 49,
        borderRadius: 17,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 19,
        fontWeight: "800",
    },
    userInfo: {
        flex: 1,
    },
    greeting: {
        color: "#64748B",
        fontSize: 11,
        marginBottom: 2,
    },
    name: {
        color: "#0F172A",
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 3,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    location: {
        color: "#64748B",
        fontSize: 11,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
    },
    badge: {
        position: "absolute",
        top: -3,
        right: -3,
        minWidth: 17,
        height: 17,
        borderRadius: 9,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#FFFFFF",
        paddingHorizontal: 3,
    },
    badgeText: {
        color: "#FFFFFF",
        fontSize: 8,
        fontWeight: "800",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(15,23,42,0.28)",
        alignItems: "flex-end",
        paddingTop: 65,
        paddingHorizontal: 12,
    },
    profileMenu: {
        width: 325,
        maxWidth: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 19,
        elevation: 12,
        shadowColor: "#000000",
        shadowOpacity: 0.15,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
    },
    menuHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 17,
    },
    menuAvatar: {
        width: 49,
        height: 49,
        borderRadius: 25,
    },
    menuAvatarFallback: {
        width: 49,
        height: 49,
        borderRadius: 25,
        backgroundColor: "#DBEAFE",
        alignItems: "center",
        justifyContent: "center",
    },
    menuAvatarText: {
        color: "#2563EB",
        fontSize: 20,
        fontWeight: "800",
    },
    menuUserInfo: {
        flex: 1,
    },
    menuName: {
        fontSize: 16,
        fontWeight: "800",
        color: "#172033",
    },
    menuEmail: {
        fontSize: 12,
        color: "#8992A2",
        marginTop: 4,
    },
    menuDivider: {
        height: 1,
        backgroundColor: "#EDF0F5",
        marginVertical: 10,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 17,
        minHeight: 52,
        paddingHorizontal: 5,
    },
    menuItemText: {
        fontSize: 15,
        color: "#263247",
        fontWeight: "500",
    },
    dangerText: {
        color: "#DC4757",
    },
});
