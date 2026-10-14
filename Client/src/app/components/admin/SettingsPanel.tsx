
import {
    Bell,
    Globe,
    Lock,
    Mail,
    Save,
    ShieldCheck,
} from "lucide-react-native";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";

interface SettingsPanelProps {
    onSave?: (settings: AdminSettings) => void;
}

export interface AdminSettings {
    systemName: string;
    supportEmail: string;
    notifications: boolean;
    emailAlerts: boolean;
    maintenanceMode: boolean;
}

interface SettingToggleProps {
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

function SettingToggle({
    title,
    description,
    value,
    onValueChange,
}: SettingToggleProps) {
    return (
        <View style={styles.toggleRow}>
            <View style={styles.toggleContent}>
                <Text style={styles.toggleTitle}>{title}</Text>
                <Text style={styles.toggleDescription}>
                    {description}
                </Text>
            </View>

            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{
                    false: "#CBD5E1",
                    true: "#93C5FD",
                }}
                thumbColor={value ? "#2563EB" : "#F8FAFC"}
            />
        </View>
    );
}

export default function SettingsPanel({
    onSave,
}: SettingsPanelProps) {
    const [systemName, setSystemName] = useState("HealthCare");
    const [supportEmail, setSupportEmail] = useState(
        "support@healthcare.com"
    );

    const [notifications, setNotifications] = useState(true);
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    const handleSave = () => {
        onSave?.({
            systemName,
            supportEmail,
            notifications,
            emailAlerts,
            maintenanceMode,
        });
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Page Header */}
            <View style={styles.pageHeader}>
                <View>
                    <Text style={styles.pageTitle}>System Settings</Text>
                    <Text style={styles.pageSubtitle}>
                        Manage your healthcare platform settings
                    </Text>
                </View>

                <Pressable
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Save size={18} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </Pressable>
            </View>

            {/* General Settings */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardIcon}>
                        <Globe size={20} color="#2563EB" />
                    </View>

                    <View>
                        <Text style={styles.cardTitle}>General Settings</Text>
                        <Text style={styles.cardSubtitle}>
                            Basic system information
                        </Text>
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>System Name</Text>

                    <TextInput
                        value={systemName}
                        onChangeText={setSystemName}
                        placeholder="Enter system name"
                        placeholderTextColor="#94A3B8"
                        style={styles.input}
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Support Email</Text>

                    <View style={styles.inputWrapper}>
                        <Mail size={18} color="#94A3B8" />

                        <TextInput
                            value={supportEmail}
                            onChangeText={setSupportEmail}
                            placeholder="Enter support email"
                            placeholderTextColor="#94A3B8"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.iconInput}
                        />
                    </View>
                </View>
            </View>

            {/* Notification Settings */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardIcon}>
                        <Bell size={20} color="#2563EB" />
                    </View>

                    <View>
                        <Text style={styles.cardTitle}>
                            Notification Settings
                        </Text>
                        <Text style={styles.cardSubtitle}>
                            Control system notifications
                        </Text>
                    </View>
                </View>

                <SettingToggle
                    title="Push Notifications"
                    description="Receive notifications for important system events."
                    value={notifications}
                    onValueChange={setNotifications}
                />

                <SettingToggle
                    title="Email Alerts"
                    description="Send important system alerts to administrators."
                    value={emailAlerts}
                    onValueChange={setEmailAlerts}
                />
            </View>

            {/* Security Settings */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardIcon}>
                        <ShieldCheck size={20} color="#2563EB" />
                    </View>

                    <View>
                        <Text style={styles.cardTitle}>
                            Security Settings
                        </Text>
                        <Text style={styles.cardSubtitle}>
                            Manage system security
                        </Text>
                    </View>
                </View>

                <Pressable style={styles.securityRow}>
                    <View style={styles.securityIcon}>
                        <Lock size={18} color="#475569" />
                    </View>

                    <View style={styles.securityContent}>
                        <Text style={styles.securityTitle}>
                            Change Admin Password
                        </Text>
                        <Text style={styles.securityDescription}>
                            Update your administrator account password.
                        </Text>
                    </View>

                    <Text style={styles.securityAction}>Change</Text>
                </Pressable>
            </View>

            {/* Maintenance */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardIcon}>
                        <ShieldCheck size={20} color="#D97706" />
                    </View>

                    <View>
                        <Text style={styles.cardTitle}>
                            Maintenance
                        </Text>
                        <Text style={styles.cardSubtitle}>
                            Control system availability
                        </Text>
                    </View>
                </View>

                <SettingToggle
                    title="Maintenance Mode"
                    description="Temporarily prevent users from accessing the system."
                    value={maintenanceMode}
                    onValueChange={setMaintenanceMode}
                />

                {maintenanceMode && (
                    <View style={styles.warningBox}>
                        <Text style={styles.warningTitle}>
                            Maintenance mode is active
                        </Text>

                        <Text style={styles.warningText}>
                            Regular users may not be able to access the
                            healthcare platform while maintenance mode is
                            enabled.
                        </Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    content: {
        padding: 24,
        paddingBottom: 40,
    },

    pageHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },

    pageTitle: {
        fontSize: 26,
        fontWeight: "700",
        color: "#0F172A",
    },

    pageSubtitle: {
        marginTop: 5,
        fontSize: 13,
        color: "#64748B",
    },

    saveButton: {
        height: 42,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: "#2563EB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },

    card: {
        marginBottom: 18,
        padding: 20,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 22,
    },

    cardIcon: {
        width: 42,
        height: 42,
        borderRadius: 11,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
    },

    cardSubtitle: {
        marginTop: 3,
        fontSize: 12,
        color: "#64748B",
    },

    formGroup: {
        marginBottom: 18,
    },

    label: {
        marginBottom: 8,
        fontSize: 13,
        fontWeight: "600",
        color: "#334155",
    },

    input: {
        height: 46,
        paddingHorizontal: 13,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        backgroundColor: "#FFFFFF",
        color: "#0F172A",
        fontSize: 13,
    },

    inputWrapper: {
        height: 46,
        paddingHorizontal: 13,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
    },

    iconInput: {
        flex: 1,
        marginLeft: 9,
        color: "#0F172A",
        fontSize: 13,
    },

    toggleRow: {
        minHeight: 70,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },

    toggleContent: {
        flex: 1,
        paddingRight: 20,
    },

    toggleTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
    },

    toggleDescription: {
        marginTop: 4,
        fontSize: 12,
        lineHeight: 18,
        color: "#64748B",
    },

    securityRow: {
        minHeight: 66,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#F8FAFC",
        flexDirection: "row",
        alignItems: "center",
    },

    securityIcon: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },

    securityContent: {
        flex: 1,
        marginLeft: 11,
    },

    securityTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#334155",
    },

    securityDescription: {
        marginTop: 3,
        fontSize: 11,
        color: "#64748B",
    },

    securityAction: {
        fontSize: 12,
        fontWeight: "600",
        color: "#2563EB",
    },

    warningBox: {
        marginTop: 10,
        padding: 14,
        borderRadius: 11,
        backgroundColor: "#FFFBEB",
        borderWidth: 1,
        borderColor: "#FDE68A",
    },

    warningTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#92400E",
    },

    warningText: {
        marginTop: 5,
        fontSize: 11,
        lineHeight: 17,
        color: "#A16207",
    },
});

