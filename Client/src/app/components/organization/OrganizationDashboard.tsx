
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from "react-native";
import {
    Building2,
    Users,
    Stethoscope,
    CalendarDays,
    UserRound,
    FileText,
    Activity,
    ChevronRight,
    MapPin,
    Settings,
    Bell,
    Plus,
    ClipboardList,
} from "lucide-react-native";
import { useRouter } from "expo-router";

const PRIMARY = "#2476C7";

type ModuleItem = {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    background: string;
    route?: string;
};

export default function OrganizationDashboard() {
    const router = useRouter();

    const modules: ModuleItem[] = [
        {
            title: "Branch Management",
            description: "Create and manage organization branches",
            icon: Building2,
            color: "#2476C7",
            background: "#EAF3FF",
            route: "/main/branches",
        },
        {
            title: "Doctor Management",
            description: "Manage doctors associated with your organization",
            icon: Stethoscope,
            color: "#159B83",
            background: "#E5F7F2",
            route: "/main/doctor",
        },
        {
            title: "Staff Management",
            description: "Manage receptionists and organization staff",
            icon: Users,
            color: "#9A69D4",
            background: "#F2EAFE",
        },
        {
            title: "Patient Management",
            description: "View and manage patient information",
            icon: UserRound,
            color: "#D58B31",
            background: "#FFF3E3",
            route: "/main/patient",
        },
        {
            title: "Appointments",
            description: "View and manage appointments",
            icon: CalendarDays,
            color: "#D45B7A",
            background: "#FCEAF0",
            route: "/main/appointments",
        },
        {
            title: "Reports",
            description: "Organization performance and reports",
            icon: FileText,
            color: "#5476C7",
            background: "#EAF0FF",
        },
    ];

    const quickActions = [
        {
            title: "Add Branch",
            icon: Plus,
            route: "/main/branches",
        },
        {
            title: "View Doctors",
            icon: Stethoscope,
            route: "/main/doctor",
        },
        {
            title: "View Patients",
            icon: Users,
            route: "/main/patient",
        },
    ];

    const openModule = (route?: string) => {
        if (route) {
            router.push(route as any);
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.organizationIcon}>
                            <Building2 size={25} color="#FFFFFF" />
                        </View>

                        <View style={styles.headerText}>
                            <Text style={styles.welcome}>Welcome back,</Text>
                            <Text style={styles.organizationName}>
                                Organization Admin
                            </Text>
                            <Text style={styles.headerSubtitle}>
                                Organization Dashboard
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.notificationButton}
                        activeOpacity={0.8}
                        onPress={() => { }}
                    >
                        <Bell size={21} color="#344563" />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                {/* ORGANIZATION BANNER */}
                <View style={styles.banner}>
                    <View style={styles.bannerContent}>
                        <Text style={styles.bannerEyebrow}>
                            ORGANIZATION OVERVIEW
                        </Text>

                        <Text style={styles.bannerTitle}>
                            Manage your healthcare network
                        </Text>

                        <Text style={styles.bannerDescription}>
                            Manage branches, doctors, staff, patients and appointments
                            from one place.
                        </Text>

                        <TouchableOpacity
                            style={styles.bannerButton}
                            onPress={() => openModule("/main/branches")}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.bannerButtonText}>
                                Manage Branches
                            </Text>
                            <ChevronRight size={17} color={PRIMARY} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bannerIcon}>
                        <Building2 size={57} color="#FFFFFF" />
                    </View>
                </View>

                {/* OVERVIEW */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Overview</Text>
                        <Text style={styles.sectionSubtitle}>
                            Organization activity summary
                        </Text>
                    </View>

                    <Activity size={21} color={PRIMARY} />
                </View>

                <View style={styles.statsGrid}>
                    <StatCard
                        title="Total Branches"
                        value="—"
                        subtitle="Branch records"
                        icon={Building2}
                        color="#2476C7"
                        background="#EAF3FF"
                    />

                    <StatCard
                        title="Total Doctors"
                        value="—"
                        subtitle="Doctor records"
                        icon={Stethoscope}
                        color="#159B83"
                        background="#E5F7F2"
                    />

                    <StatCard
                        title="Total Staff"
                        value="—"
                        subtitle="Staff records"
                        icon={Users}
                        color="#9A69D4"
                        background="#F2EAFE"
                    />

                    <StatCard
                        title="Total Patients"
                        value="—"
                        subtitle="Patient records"
                        icon={UserRound}
                        color="#D58B31"
                        background="#FFF3E3"
                    />
                </View>

                {/* MODULES */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            Organization Management
                        </Text>
                        <Text style={styles.sectionSubtitle}>
                            Select a module to continue
                        </Text>
                    </View>
                </View>

                <View style={styles.modulesGrid}>
                    {modules.map((module) => {
                        const Icon = module.icon;

                        return (
                            <TouchableOpacity
                                key={module.title}
                                style={styles.moduleCard}
                                activeOpacity={0.8}
                                onPress={() => openModule(module.route)}
                            >
                                <View
                                    style={[
                                        styles.moduleIcon,
                                        { backgroundColor: module.background },
                                    ]}
                                >
                                    <Icon size={23} color={module.color} />
                                </View>

                                <View style={styles.moduleText}>
                                    <Text style={styles.moduleTitle}>
                                        {module.title}
                                    </Text>
                                    <Text style={styles.moduleDescription}>
                                        {module.description}
                                    </Text>
                                </View>

                                <ChevronRight size={19} color="#9AA7B8" />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* QUICK ACTIONS */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                        <Text style={styles.sectionSubtitle}>
                            Frequently used organization actions
                        </Text>
                    </View>
                </View>

                <View style={styles.quickActions}>
                    {quickActions.map((action) => {
                        const Icon = action.icon;

                        return (
                            <TouchableOpacity
                                key={action.title}
                                style={styles.quickAction}
                                activeOpacity={0.8}
                                onPress={() => openModule(action.route)}
                            >
                                <View style={styles.quickIcon}>
                                    <Icon size={20} color={PRIMARY} />
                                </View>

                                <Text style={styles.quickActionText}>
                                    {action.title}
                                </Text>

                                <ChevronRight size={16} color="#9AA7B8" />
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* INFORMATION */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <ClipboardList size={22} color={PRIMARY} />
                    </View>

                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>
                            Organization workspace
                        </Text>
                        <Text style={styles.infoDescription}>
                            Your organization dashboard is ready for module
                            integration. Live counts and reports will appear
                            after connecting organization-scoped APIs.
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Healthcare Management System
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    background,
}: {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    color: string;
    background: string;
}) {
    return (
        <View style={styles.statCard}>
            <View style={styles.statTop}>
                <View
                    style={[styles.statIcon, { backgroundColor: background }]}
                >
                    <Icon size={21} color={color} />
                </View>
            </View>

            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
            <Text style={styles.statSubtitle}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },
    scroll: {
        flex: 1,
    },
    container: {
        padding: 24,
        paddingBottom: 45,
        maxWidth: 1450,
        width: "100%",
        alignSelf: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    organizationIcon: {
        width: 54,
        height: 54,
        borderRadius: 15,
        backgroundColor: PRIMARY,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        marginLeft: 14,
    },
    welcome: {
        color: "#718096",
        fontSize: 13,
    },
    organizationName: {
        fontSize: 21,
        fontWeight: "800",
        color: "#172B4D",
        marginTop: 2,
    },
    headerSubtitle: {
        color: "#718096",
        fontSize: 12,
        marginTop: 3,
    },
    notificationButton: {
        width: 45,
        height: 45,
        borderRadius: 13,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E8EDF4",
    },
    notificationDot: {
        position: "absolute",
        top: 10,
        right: 11,
        height: 7,
        width: 7,
        borderRadius: 5,
        backgroundColor: "#E45B65",
    },
    banner: {
        backgroundColor: PRIMARY,
        borderRadius: 18,
        padding: 25,
        minHeight: 210,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        marginBottom: 30,
    },
    bannerContent: {
        flex: 1,
        maxWidth: 620,
    },
    bannerEyebrow: {
        color: "#D8E9FF",
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.2,
    },
    bannerTitle: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "800",
        marginTop: 10,
    },
    bannerDescription: {
        color: "#E5F0FF",
        fontSize: 13,
        lineHeight: 20,
        marginTop: 9,
        maxWidth: 480,
    },
    bannerButton: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 11,
        borderRadius: 9,
        marginTop: 18,
    },
    bannerButtonText: {
        color: PRIMARY,
        fontSize: 13,
        fontWeight: "700",
        marginRight: 6,
    },
    bannerIcon: {
        width: 105,
        height: 105,
        borderRadius: 28,
        backgroundColor: "rgba(255,255,255,0.13)",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: "#172B4D",
    },
    sectionSubtitle: {
        fontSize: 12,
        color: "#8492A6",
        marginTop: 4,
    },
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 14,
        marginBottom: 30,
    },
    statCard: {
        flexGrow: 1,
        flexBasis: Platform.OS === "web" ? 190 : "44%",
        backgroundColor: "#FFFFFF",
        padding: 17,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EDF0F5",
        minHeight: 145,
    },
    statTop: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    statIcon: {
        height: 39,
        width: 39,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
    },
    statValue: {
        fontSize: 25,
        fontWeight: "800",
        color: "#172B4D",
        marginTop: 12,
    },
    statTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#344563",
        marginTop: 3,
    },
    statSubtitle: {
        fontSize: 11,
        color: "#9AA7B8",
        marginTop: 4,
    },
    modulesGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 13,
        marginBottom: 28,
    },
    moduleCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#EDF0F5",
        padding: 15,
        flexGrow: 1,
        flexBasis: Platform.OS === "web" ? 340 : "100%",
        minHeight: 91,
    },
    moduleIcon: {
        height: 46,
        width: 46,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    moduleText: {
        flex: 1,
        marginLeft: 13,
        marginRight: 8,
    },
    moduleTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#172B4D",
    },
    moduleDescription: {
        fontSize: 11,
        color: "#8492A6",
        marginTop: 5,
        lineHeight: 16,
    },
    quickActions: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EDF0F5",
        paddingHorizontal: 15,
        marginBottom: 22,
    },
    quickAction: {
        minHeight: 62,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F0F2F6",
    },
    quickIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#EAF3FF",
        alignItems: "center",
        justifyContent: "center",
    },
    quickActionText: {
        flex: 1,
        fontSize: 13,
        fontWeight: "600",
        color: "#344563",
        marginLeft: 12,
    },
    infoCard: {
        backgroundColor: "#EAF3FF",
        borderRadius: 13,
        padding: 17,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 11,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    infoContent: {
        flex: 1,
        marginLeft: 12,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1D4F85",
    },
    infoDescription: {
        color: "#54718F",
        fontSize: 12,
        lineHeight: 19,
        marginTop: 5,
    },
    footer: {
        alignItems: "center",
        marginTop: 25,
    },
    footerText: {
        color: "#A0AABA",
        fontSize: 11,
    },
});
