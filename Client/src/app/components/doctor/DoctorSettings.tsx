
import {
    Bell,
    CalendarClock,
    ChevronRight,
    LockKeyhole,
    Mail,
    ShieldCheck,
    UserRoundCog,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface DoctorSettingsProps {
    notificationsEnabled?: boolean;
    appointmentRemindersEnabled?: boolean;
    emailNotificationsEnabled?: boolean;

    onNotificationsChange?: (enabled: boolean) => void;
    onAppointmentRemindersChange?: (enabled: boolean) => void;
    onEmailNotificationsChange?: (enabled: boolean) => void;

    onPrivacyPress?: () => void;
    onAccountPress?: () => void;
    onSecurityPress?: () => void;
}

interface SettingRowProps {
    icon: React.ComponentType<any>;
    title: string;
    subtitle?: string;
    right?: React.ReactNode;
    onPress?: () => void;
}

function SettingRow({
    icon: Icon,
    title,
    subtitle,
    right,
    onPress,
}: SettingRowProps) {
    const content = (
        <>
            <View style={styles.rowIcon}>
                <Icon size={20} color="#CB9E53" strokeWidth={2} />
            </View>

            <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>{title}</Text>

                {subtitle ? (
                    <Text style={styles.rowSubtitle}>{subtitle}</Text>
                ) : null}
            </View>

            {right ?? (
                <ChevronRight
                    size={19}
                    color="#777777"
                    strokeWidth={2}
                />
            )}
        </>
    );

    if (onPress) {
        return (
            <TouchableOpacity
                activeOpacity={0.75}
                style={styles.settingRow}
                onPress={onPress}
            >
                {content}
            </TouchableOpacity>
        );
    }

    return <View style={styles.settingRow}>{content}</View>;
}

export default function DoctorSettings({
    notificationsEnabled = true,
    appointmentRemindersEnabled = true,
    emailNotificationsEnabled = false,
    onNotificationsChange,
    onAppointmentRemindersChange,
    onEmailNotificationsChange,
    onPrivacyPress,
    onAccountPress,
    onSecurityPress,
}: DoctorSettingsProps) {
    const [notifications, setNotifications] = useState(
        notificationsEnabled
    );

    const [appointmentReminders, setAppointmentReminders] = useState(
        appointmentRemindersEnabled
    );

    const [emailNotifications, setEmailNotifications] = useState(
        emailNotificationsEnabled
    );

    const handleNotificationsChange = (value: boolean) => {
        setNotifications(value);
        onNotificationsChange?.(value);
    };

    const handleAppointmentRemindersChange = (value: boolean) => {
        setAppointmentReminders(value);
        onAppointmentRemindersChange?.(value);
    };

    const handleEmailNotificationsChange = (value: boolean) => {
        setEmailNotifications(value);
        onEmailNotificationsChange?.(value);
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Settings</Text>
                    <Text style={styles.subtitle}>
                        Manage your account and preferences
                    </Text>
                </View>

                <View style={styles.headerIcon}>
                    <ShieldCheck
                        size={24}
                        color="#CB9E53"
                        strokeWidth={1.8}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>

                <View style={styles.card}>
                    <SettingRow
                        icon={Bell}
                        title="Push Notifications"
                        subtitle="Receive notifications about your account"
                        right={
                            <Switch
                                value={notifications}
                                onValueChange={handleNotificationsChange}
                                trackColor={{
                                    false: "#303030",
                                    true: "#6E572E",
                                }}
                                thumbColor={
                                    notifications ? "#CB9E53" : "#777777"
                                }
                            />
                        }
                    />

                    <View style={styles.divider} />

                    <SettingRow
                        icon={CalendarClock}
                        title="Appointment Reminders"
                        subtitle="Get reminders for upcoming appointments"
                        right={
                            <Switch
                                value={appointmentReminders}
                                onValueChange={handleAppointmentRemindersChange}
                                trackColor={{
                                    false: "#303030",
                                    true: "#6E572E",
                                }}
                                thumbColor={
                                    appointmentReminders
                                        ? "#CB9E53"
                                        : "#777777"
                                }
                            />
                        }
                    />

                    <View style={styles.divider} />

                    <SettingRow
                        icon={Mail}
                        title="Email Notifications"
                        subtitle="Receive important updates through email"
                        right={
                            <Switch
                                value={emailNotifications}
                                onValueChange={handleEmailNotificationsChange}
                                trackColor={{
                                    false: "#303030",
                                    true: "#6E572E",
                                }}
                                thumbColor={
                                    emailNotifications
                                        ? "#CB9E53"
                                        : "#777777"
                                }
                            />
                        }
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>

                <View style={styles.card}>
                    <SettingRow
                        icon={UserRoundCog}
                        title="Account Settings"
                        subtitle="Manage your personal account information"
                        onPress={onAccountPress}
                    />

                    <View style={styles.divider} />

                    <SettingRow
                        icon={LockKeyhole}
                        title="Security"
                        subtitle="Password and account security"
                        onPress={onSecurityPress}
                    />

                    <View style={styles.divider} />

                    <SettingRow
                        icon={ShieldCheck}
                        title="Privacy"
                        subtitle="Manage your privacy preferences"
                        onPress={onPrivacyPress}
                    />
                </View>
            </View>

            <View style={styles.infoCard}>
                <View style={styles.infoIcon}>
                    <ShieldCheck
                        size={20}
                        color="#CB9E53"
                        strokeWidth={2}
                    />
                </View>

                <View style={styles.infoContent}>
                    <Text style={styles.infoTitle}>Your Privacy Matters</Text>
                    <Text style={styles.infoText}>
                        Your healthcare information is protected and
                        handled securely.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B0B0B",
    },

    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "700",
    },

    subtitle: {
        color: "#8E8E8E",
        fontSize: 14,
        marginTop: 6,
    },

    headerIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3020",
        alignItems: "center",
        justifyContent: "center",
    },

    section: {
        marginBottom: 24,
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },

    card: {
        backgroundColor: "#151515",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#292929",
        overflow: "hidden",
    },

    settingRow: {
        minHeight: 76,
        paddingHorizontal: 16,
        paddingVertical: 13,
        flexDirection: "row",
        alignItems: "center",
    },

    rowIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#332A1C",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 13,
    },

    rowContent: {
        flex: 1,
        paddingRight: 10,
    },

    rowTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },

    rowSubtitle: {
        color: "#7F7F7F",
        fontSize: 12,
        lineHeight: 17,
        marginTop: 4,
    },

    divider: {
        height: 1,
        backgroundColor: "#252525",
        marginLeft: 71,
    },

    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#12100D",
        borderWidth: 1,
        borderColor: "#3A3020",
        borderRadius: 18,
        padding: 16,
    },

    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#211D16",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 13,
    },

    infoContent: {
        flex: 1,
    },

    infoTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
    },

    infoText: {
        color: "#858585",
        fontSize: 12,
        lineHeight: 17,
    },
});

