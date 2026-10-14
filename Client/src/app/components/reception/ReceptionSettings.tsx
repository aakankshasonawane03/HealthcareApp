
import {
    Bell,
    ChevronRight,
    Clock3,
    Globe2,
    Lock,
    Moon,
    Save,
    ShieldCheck,
    Smartphone,
    Volume2,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";

export interface ReceptionSettingsState {
    notifications: boolean;
    appointmentReminders: boolean;
    sound: boolean;
    darkMode: boolean;
    twoFactorAuthentication: boolean;
    language: string;
    clinicOpeningTime: string;
    clinicClosingTime: string;
}

interface ReceptionSettingsProps {
    onBack?: () => void;
    onSave?: (settings: ReceptionSettingsState) => void;
    onChangePassword?: () => void;
    onPrivacyPress?: () => void;
    onSecurityPress?: () => void;
}

interface SettingsSectionProps {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

interface SettingRowProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    right: React.ReactNode;
    onPress?: () => void;
}

export default function ReceptionSettings({
    onBack,
    onSave,
    onChangePassword,
    onPrivacyPress,
    onSecurityPress,
}: ReceptionSettingsProps) {
    const [settings, setSettings] = useState<ReceptionSettingsState>({
        notifications: true,
        appointmentReminders: true,
        sound: true,
        darkMode: true,
        twoFactorAuthentication: false,
        language: "English",
        clinicOpeningTime: "09:00 AM",
        clinicClosingTime: "08:00 PM",
    });

    const updateSetting = <K extends keyof ReceptionSettingsState>(
        key: K,
        value: ReceptionSettingsState[K]
    ) => {
        setSettings((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    const handleSave = () => {
        if (onSave) {
            onSave(settings);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.eyebrow}>RECEPTION DESK</Text>

                        <Text style={styles.title}>Settings</Text>

                        <Text style={styles.subtitle}>
                            Manage your reception preferences
                        </Text>
                    </View>

                    {onBack ? (
                        <Pressable
                            onPress={onBack}
                            style={({ pressed }) => [
                                styles.backButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.backText}>Back</Text>
                        </Pressable>
                    ) : null}
                </View>

                {/* Notifications */}
                <SettingsSection
                    title="Notifications"
                    subtitle="Control reception alerts and reminders"
                    icon={<Bell size={19} color="#CB9E53" />}
                >
                    <SettingRow
                        icon={<Bell size={18} color="#CB9E53" />}
                        title="Push Notifications"
                        description="Receive important reception alerts"
                        right={
                            <Switch
                                value={settings.notifications}
                                onValueChange={(value) =>
                                    updateSetting("notifications", value)
                                }
                                trackColor={{
                                    false: "#292929",
                                    true: "#6D582F",
                                }}
                                thumbColor={
                                    settings.notifications ? "#CB9E53" : "#777777"
                                }
                            />
                        }
                    />

                    <Divider />

                    <SettingRow
                        icon={<Clock3 size={18} color="#CB9E53" />}
                        title="Appointment Reminders"
                        description="Get reminders for upcoming appointments"
                        right={
                            <Switch
                                value={settings.appointmentReminders}
                                onValueChange={(value) =>
                                    updateSetting("appointmentReminders", value)
                                }
                                trackColor={{
                                    false: "#292929",
                                    true: "#6D582F",
                                }}
                                thumbColor={
                                    settings.appointmentReminders ? "#CB9E53" : "#777777"
                                }
                            />
                        }
                    />

                    <Divider />

                    <SettingRow
                        icon={<Volume2 size={18} color="#CB9E53" />}
                        title="Notification Sound"
                        description="Play sound for new reception alerts"
                        right={
                            <Switch
                                value={settings.sound}
                                onValueChange={(value) => updateSetting("sound", value)}
                                trackColor={{
                                    false: "#292929",
                                    true: "#6D582F",
                                }}
                                thumbColor={settings.sound ? "#CB9E53" : "#777777"}
                            />
                        }
                    />
                </SettingsSection>

                {/* Clinic Settings */}
                <SettingsSection
                    title="Clinic Settings"
                    subtitle="Configure reception working hours"
                    icon={<Clock3 size={19} color="#CB9E53" />}
                >
                    <View style={styles.timeRow}>
                        <View style={styles.timeField}>
                            <Text style={styles.inputLabel}>Opening Time</Text>

                            <View style={styles.inputWrapper}>
                                <Clock3 size={17} color="#777777" />

                                <TextInput
                                    value={settings.clinicOpeningTime}
                                    onChangeText={(value) =>
                                        updateSetting("clinicOpeningTime", value)
                                    }
                                    placeholder="09:00 AM"
                                    placeholderTextColor="#666666"
                                    style={styles.input}
                                />
                            </View>
                        </View>

                        <View style={styles.timeField}>
                            <Text style={styles.inputLabel}>Closing Time</Text>

                            <View style={styles.inputWrapper}>
                                <Clock3 size={17} color="#777777" />

                                <TextInput
                                    value={settings.clinicClosingTime}
                                    onChangeText={(value) =>
                                        updateSetting("clinicClosingTime", value)
                                    }
                                    placeholder="08:00 PM"
                                    placeholderTextColor="#666666"
                                    style={styles.input}
                                />
                            </View>
                        </View>
                    </View>

                    <Divider />

                    <SettingRow
                        icon={<Globe2 size={18} color="#CB9E53" />}
                        title="Language"
                        description="Application display language"
                        right={
                            <View style={styles.languageBadge}>
                                <Text style={styles.languageText}>
                                    {settings.language}
                                </Text>
                            </View>
                        }
                    />
                </SettingsSection>

                {/* Appearance */}
                <SettingsSection
                    title="Appearance"
                    subtitle="Customize your application experience"
                    icon={<Moon size={19} color="#CB9E53" />}
                >
                    <SettingRow
                        icon={<Moon size={18} color="#CB9E53" />}
                        title="Dark Mode"
                        description="Use the dark interface throughout the app"
                        right={
                            <Switch
                                value={settings.darkMode}
                                onValueChange={(value) =>
                                    updateSetting("darkMode", value)
                                }
                                trackColor={{
                                    false: "#292929",
                                    true: "#6D582F",
                                }}
                                thumbColor={
                                    settings.darkMode ? "#CB9E53" : "#777777"
                                }
                            />
                        }
                    />
                </SettingsSection>

                {/* Security */}
                <SettingsSection
                    title="Security"
                    subtitle="Protect your reception account"
                    icon={<ShieldCheck size={19} color="#CB9E53" />}
                >
                    <SettingRow
                        icon={<Lock size={18} color="#CB9E53" />}
                        title="Change Password"
                        description="Update your account password"
                        right={<ChevronRight size={19} color="#666666" />}
                        onPress={onChangePassword}
                    />

                    <Divider />

                    <SettingRow
                        icon={<ShieldCheck size={18} color="#CB9E53" />}
                        title="Two-Factor Authentication"
                        description="Add an additional layer of account security"
                        right={
                            <Switch
                                value={settings.twoFactorAuthentication}
                                onValueChange={(value) =>
                                    updateSetting(
                                        "twoFactorAuthentication",
                                        value
                                    )
                                }
                                trackColor={{
                                    false: "#292929",
                                    true: "#6D582F",
                                }}
                                thumbColor={
                                    settings.twoFactorAuthentication
                                        ? "#CB9E53"
                                        : "#777777"
                                }
                            />
                        }
                    />

                    <Divider />

                    <SettingRow
                        icon={<ShieldCheck size={18} color="#CB9E53" />}
                        title="Security Settings"
                        description="Review your account security options"
                        right={<ChevronRight size={19} color="#666666" />}
                        onPress={onSecurityPress}
                    />

                    <Divider />

                    <SettingRow
                        icon={<Smartphone size={18} color="#CB9E53" />}
                        title="Privacy"
                        description="Manage privacy and data preferences"
                        right={<ChevronRight size={19} color="#666666" />}
                        onPress={onPrivacyPress}
                    />
                </SettingsSection>

                {/* Save Button */}
                <Pressable
                    onPress={handleSave}
                    style={({ pressed }) => [
                        styles.saveButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Save size={18} color="#090909" />

                    <Text style={styles.saveText}>Save Settings</Text>
                </Pressable>

                <Text style={styles.version}>
                    HealthcareApp • Reception Module
                </Text>
            </ScrollView>
        </View>
    );
}

function SettingsSection({
    title,
    subtitle,
    icon,
    children,
}: SettingsSectionProps) {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>{icon}</View>

                <View style={styles.sectionHeading}>
                    <Text style={styles.sectionTitle}>{title}</Text>

                    <Text style={styles.sectionSubtitle}>
                        {subtitle}
                    </Text>
                </View>
            </View>

            <View style={styles.sectionBody}>{children}</View>
        </View>
    );
}

function SettingRow({
    icon,
    title,
    description,
    right,
    onPress,
}: SettingRowProps) {
    const content = (
        <View style={styles.settingRow}>
            <View style={styles.settingIcon}>{icon}</View>

            <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{title}</Text>

                <Text style={styles.settingDescription}>
                    {description}
                </Text>
            </View>

            <View style={styles.settingRight}>{right}</View>
        </View>
    );

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    pressed && styles.rowPressed,
                ]}
            >
                {content}
            </Pressable>
        );
    }

    return content;
}

function Divider() {
    return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#080808",
    },

    content: {
        width: "100%",
        maxWidth: 1100,
        alignSelf: "center",
        padding: 24,
        paddingBottom: 50,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 28,
    },

    headerContent: {
        flex: 1,
    },

    eyebrow: {
        color: "#CB9E53",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.5,
        marginBottom: 6,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "700",
    },

    subtitle: {
        color: "#777777",
        fontSize: 14,
        marginTop: 6,
    },

    backButton: {
        minWidth: 70,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#292929",
        backgroundColor: "#111111",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },

    backText: {
        color: "#D0D0D0",
        fontSize: 13,
        fontWeight: "600",
    },

    section: {
        backgroundColor: "#101010",
        borderWidth: 1,
        borderColor: "#222222",
        borderRadius: 16,
        marginBottom: 18,
        overflow: "hidden",
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 17,
        borderBottomWidth: 1,
        borderBottomColor: "#202020",
    },

    sectionIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#19150E",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    sectionHeading: {
        flex: 1,
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    sectionSubtitle: {
        color: "#6F6F6F",
        fontSize: 12,
        marginTop: 4,
    },

    sectionBody: {
        paddingHorizontal: 18,
    },

    settingRow: {
        minHeight: 72,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },

    settingIcon: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#171717",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    settingContent: {
        flex: 1,
        paddingRight: 12,
    },

    settingTitle: {
        color: "#EEEEEE",
        fontSize: 14,
        fontWeight: "600",
    },

    settingDescription: {
        color: "#696969",
        fontSize: 11,
        marginTop: 4,
        lineHeight: 16,
    },

    settingRight: {
        justifyContent: "center",
        alignItems: "center",
    },

    divider: {
        height: 1,
        backgroundColor: "#202020",
    },

    rowPressed: {
        opacity: 0.65,
    },

    pressed: {
        opacity: 0.7,
    },

    languageBadge: {
        minWidth: 82,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#171717",
        borderWidth: 1,
        borderColor: "#292929",
        alignItems: "center",
    },

    languageText: {
        color: "#CB9E53",
        fontSize: 12,
        fontWeight: "600",
    },

    timeRow: {
        flexDirection: "row",
        paddingVertical: 16,
    },

    timeField: {
        flex: 1,
        marginRight: 6,
    },

    inputLabel: {
        color: "#888888",
        fontSize: 11,
        marginBottom: 7,
    },

    inputWrapper: {
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#171717",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#292929",
        paddingHorizontal: 12,
    },

    input: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 13,
        marginLeft: 9,
    },

    saveButton: {
        height: 50,
        borderRadius: 12,
        backgroundColor: "#CB9E53",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },

    saveText: {
        color: "#090909",
        fontSize: 14,
        fontWeight: "800",
        marginLeft: 9,
    },

    version: {
        color: "#4F4F4F",
        fontSize: 11,
        textAlign: "center",
        marginTop: 22,
    },
});
