
import {
    Activity,
    ArrowUpRight,
    CalendarDays,
    Stethoscope,
    UserRound,
    Users,
} from "lucide-react-native";
import React from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface StatCardProps {
    title: string;
    value: string;
    description: string;
    icon: React.ReactNode;
}

function StatCard({
    title,
    value,
    description,
    icon,
}: StatCardProps) {
    return (
        <View style={styles.statCard}>
            <View style={styles.statTop}>
                <View style={styles.iconContainer}>{icon}</View>

                <Pressable style={styles.arrowButton}>
                    <ArrowUpRight size={18} color="#111827" />
                </Pressable>
            </View>

            <Text style={styles.statTitle}>{title}</Text>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statDescription}>{description}</Text>
        </View>
    );
}

export default function AdminDashboard() {
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Good Morning</Text>
                        <Text style={styles.title}>Admin Dashboard</Text>
                        <Text style={styles.subtitle}>
                            Manage your healthcare system from one place.
                        </Text>
                    </View>

                    <View style={styles.adminBadge}>
                        <Text style={styles.adminBadgeText}>A</Text>
                    </View>
                </View>

                {/* Statistics */}
                <View style={styles.statsGrid}>
                    <StatCard
                        title="Total Patients"
                        value="1,248"
                        description="+12% from last month"
                        icon={<Users size={22} color="#2563EB" />}
                    />

                    <StatCard
                        title="Doctors"
                        value="86"
                        description="+4 new this month"
                        icon={<Stethoscope size={22} color="#16A34A" />}
                    />

                    <StatCard
                        title="Appointments"
                        value="324"
                        description="This month"
                        icon={<CalendarDays size={22} color="#9333EA" />}
                    />

                    <StatCard
                        title="Active Users"
                        value="1,576"
                        description="Currently active"
                        icon={<UserRound size={22} color="#EA580C" />}
                    />
                </View>

                {/* System Overview */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>System Overview</Text>
                            <Text style={styles.sectionSubtitle}>
                                Healthcare platform activity
                            </Text>
                        </View>

                        <Activity size={22} color="#2563EB" />
                    </View>

                    <View style={styles.overviewCard}>
                        <View style={styles.overviewRow}>
                            <View>
                                <Text style={styles.overviewLabel}>
                                    Patient Registration
                                </Text>
                                <Text style={styles.overviewValue}>78%</Text>
                            </View>

                            <View style={styles.progressBackground}>
                                <View
                                    style={[
                                        styles.progress,
                                        { width: "78%" },
                                    ]}
                                />
                            </View>
                        </View>

                        <View style={styles.overviewRow}>
                            <View>
                                <Text style={styles.overviewLabel}>
                                    Doctor Availability
                                </Text>
                                <Text style={styles.overviewValue}>92%</Text>
                            </View>

                            <View style={styles.progressBackground}>
                                <View
                                    style={[
                                        styles.progress,
                                        { width: "92%" },
                                    ]}
                                />
                            </View>
                        </View>

                        <View style={styles.overviewRow}>
                            <View>
                                <Text style={styles.overviewLabel}>
                                    Appointment Completion
                                </Text>
                                <Text style={styles.overviewValue}>86%</Text>
                            </View>

                            <View style={styles.progressBackground}>
                                <View
                                    style={[
                                        styles.progress,
                                        { width: "86%" },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>

                    <View style={styles.actionsGrid}>
                        <Pressable style={styles.actionCard}>
                            <View style={styles.actionIcon}>
                                <Users size={22} color="#2563EB" />
                            </View>

                            <Text style={styles.actionTitle}>Manage Users</Text>
                            <Text style={styles.actionDescription}>
                                View and manage users
                            </Text>
                        </Pressable>

                        <Pressable style={styles.actionCard}>
                            <View style={styles.actionIcon}>
                                <Stethoscope size={22} color="#16A34A" />
                            </View>

                            <Text style={styles.actionTitle}>Doctors</Text>
                            <Text style={styles.actionDescription}>
                                Manage medical staff
                            </Text>
                        </Pressable>

                        <Pressable style={styles.actionCard}>
                            <View style={styles.actionIcon}>
                                <UserRound size={22} color="#9333EA" />
                            </View>

                            <Text style={styles.actionTitle}>Patients</Text>
                            <Text style={styles.actionDescription}>
                                Manage patient records
                            </Text>
                        </Pressable>

                        <Pressable style={styles.actionCard}>
                            <View style={styles.actionIcon}>
                                <CalendarDays size={22} color="#EA580C" />
                            </View>

                            <Text style={styles.actionTitle}>Appointments</Text>
                            <Text style={styles.actionDescription}>
                                Monitor appointments
                            </Text>
                        </Pressable>
                    </View>
                </View>
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
        padding: 24,
        paddingBottom: 40,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
    },

    greeting: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 4,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#0F172A",
    },

    subtitle: {
        marginTop: 6,
        fontSize: 14,
        color: "#64748B",
    },

    adminBadge: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
    },

    adminBadgeText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: 28,
    },

    statCard: {
        width: "48%",
        minHeight: 170,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    statTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
    },

    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
    },

    arrowButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
    },

    statTitle: {
        fontSize: 13,
        color: "#64748B",
        marginBottom: 6,
    },

    statValue: {
        fontSize: 26,
        fontWeight: "700",
        color: "#0F172A",
    },

    statDescription: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 6,
    },

    section: {
        marginBottom: 28,
    },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
    },

    sectionSubtitle: {
        marginTop: 4,
        fontSize: 13,
        color: "#64748B",
    },

    overviewCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 20,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    overviewRow: {
        marginBottom: 22,
    },

    overviewLabel: {
        fontSize: 14,
        color: "#334155",
        marginBottom: 5,
    },

    overviewValue: {
        fontSize: 13,
        fontWeight: "600",
        color: "#2563EB",
        marginBottom: 8,
    },

    progressBackground: {
        height: 8,
        width: "100%",
        borderRadius: 8,
        backgroundColor: "#E2E8F0",
        overflow: "hidden",
    },

    progress: {
        height: "100%",
        borderRadius: 8,
        backgroundColor: "#2563EB",
    },

    actionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        marginTop: 14,
    },

    actionCard: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 18,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    actionIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },

    actionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#0F172A",
    },

    actionDescription: {
        marginTop: 5,
        fontSize: 12,
        color: "#64748B",
        lineHeight: 18,
    },
});

