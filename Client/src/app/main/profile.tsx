
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, UserRound, Mail, ShieldCheck, LogOut } from "lucide-react-native";

import {
    setLogout,
} from "@/redux/slices/authSlice";
import {
    persistor,
    type RootState,
    type AppDispatch,
} from "@/redux/store";

export default function ProfileScreen() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [loggingOut, setLoggingOut] = useState(false);

    const userInfo = useSelector(
        (state: RootState) => state.auth.userInfo
    ) as any;

    // Support common API response shapes.
    const user =
        userInfo?.user ??
        userInfo?.data?.user ??
        userInfo?.data ??
        userInfo ??
        {};

    const name =
        user.name ??
        user.fullName ??
        user.full_name ??
        user.username ??
        "User";

    const email = user.email ?? user.emailAddress ?? "Not provided";

    const role = String(
        user.role ?? user.userRole ?? user.user_type ?? "User"
    )
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (letter: string) => letter.toUpperCase());

    const phone =
        user.phone ??
        user.phoneNumber ??
        user.mobile ??
        user.mobileNumber;

    const initials = String(name)
        .trim()
        .split(/\s+/)
        .map((part: string) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U";

    const logout = async () => {
        if (loggingOut) return;

        const performLogout = async () => {
            setLoggingOut(true);

            try {
                dispatch(setLogout());
                await persistor.purge();
                router.replace("/auth/login");
            } catch (error) {
                console.error("Logout failed:", error);
                if (Platform.OS === "web") {
                    window.alert("Unable to finish logout. Please try again.");
                } else {
                    Alert.alert("Logout failed", "Please try again.");
                }
            } finally {
                setLoggingOut(false);
            }
        };

        if (Platform.OS === "web") {
            if (window.confirm("Are you sure you want to log out?")) {
                await performLogout();
            }
        } else {
            Alert.alert(
                "Log out",
                "Are you sure you want to log out?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Log out",
                        style: "destructive",
                        onPress: () => {
                            void performLogout();
                        },
                    },
                ]
            );
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <ArrowLeft size={20} color="#0F172A" />
                    <Text style={styles.backText}>Back to dashboard</Text>
                </Pressable>

                <Text style={styles.heading}>My Profile</Text>
                <Text style={styles.subtitle}>
                    View your account information
                </Text>

                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{initials}</Text>
                    </View>

                    <Text style={styles.name}>{String(name)}</Text>
                    <Text style={styles.email}>{String(email)}</Text>

                    <View style={styles.roleBadge}>
                        <ShieldCheck size={16} color="#2563EB" />
                        <Text style={styles.roleText}>{role}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Account Information</Text>

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoIcon}>
                            <UserRound size={20} color="#2563EB" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.label}>Full Name</Text>
                            <Text style={styles.value}>{String(name)}</Text>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.infoRow}>
                        <View style={styles.infoIcon}>
                            <Mail size={20} color="#2563EB" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.label}>Email Address</Text>
                            <Text style={styles.value}>{String(email)}</Text>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.infoRow}>
                        <View style={styles.infoIcon}>
                            <ShieldCheck size={20} color="#2563EB" />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.label}>Account Role</Text>
                            <Text style={styles.value}>{role}</Text>
                        </View>
                    </View>

                    {phone != null && (
                        <>
                            <View style={styles.separator} />
                            <View style={styles.infoRow}>
                                <View style={styles.infoIcon}>
                                    <UserRound size={20} color="#2563EB" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.label}>Phone Number</Text>
                                    <Text style={styles.value}>{String(phone)}</Text>
                                </View>
                            </View>
                        </>
                    )}
                </View>

                <Pressable
                    style={[
                        styles.logoutButton,
                        loggingOut && styles.disabledButton,
                    ]}
                    onPress={logout}
                    disabled={loggingOut}
                >
                    {loggingOut ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <LogOut size={20} color="#FFFFFF" />
                    )}

                    <Text style={styles.logoutText}>
                        {loggingOut ? "Logging out..." : "Logout"}
                    </Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    content: {
        flexGrow: 1,
        width: "100%",
        maxWidth: 900,
        alignSelf: "center",
        padding: 24,
        paddingBottom: 48,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 8,
        paddingVertical: 10,
        marginBottom: 20,
    },
    backText: {
        color: "#0F172A",
        fontSize: 14,
        fontWeight: "600",
    },
    heading: {
        fontSize: 28,
        fontWeight: "700",
        color: "#0F172A",
    },
    subtitle: {
        color: "#64748B",
        fontSize: 14,
        marginTop: 6,
        marginBottom: 24,
    },
    profileCard: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 28,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 28,
    },
    avatar: {
        width: 82,
        height: 82,
        borderRadius: 41,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "700",
    },
    name: {
        color: "#0F172A",
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
    },
    email: {
        color: "#64748B",
        fontSize: 14,
        marginTop: 6,
        textAlign: "center",
    },
    roleBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#EFF6FF",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginTop: 16,
    },
    roleText: {
        color: "#2563EB",
        fontSize: 13,
        fontWeight: "600",
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 14,
    },
    infoCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 24,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 17,
        gap: 14,
    },
    infoIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
    },
    infoContent: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: "#64748B",
        marginBottom: 5,
    },
    value: {
        fontSize: 15,
        fontWeight: "600",
        color: "#0F172A",
    },
    separator: {
        height: 1,
        backgroundColor: "#E2E8F0",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: "#DC2626",
        borderRadius: 12,
        padding: 16,
    },
    disabledButton: {
        opacity: 0.65,
    },
    logoutText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});

