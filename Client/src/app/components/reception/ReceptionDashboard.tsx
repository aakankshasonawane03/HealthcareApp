
import {
    CalendarDays,
    ChevronRight,
    ClipboardList,
    Clock3,
    Plus,
    UserRound,
    Users,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import ReceptionHeader from "./ReceptionHeader";

export default function ReceptionDashboard() {
    const router = useRouter();

    const stats = [
        { title: "Today's Appointments", value: "24", icon: CalendarDays },
        { title: "Waiting Patients", value: "08", icon: Users },
        { title: "Doctors Available", value: "06", icon: UserRound },
        { title: "Completed Today", value: "16", icon: ClipboardList },
    ];

    const appointments = [
        {
            id: 1,
            patient: "Rahul Patil",
            doctor: "Dr. Anjali Sharma",
            time: "10:30 AM",
            type: "General Consultation",
            status: "Confirmed",
        },
        {
            id: 2,
            patient: "Sneha Joshi",
            doctor: "Dr. Amit Kulkarni",
            time: "11:15 AM",
            type: "Follow-up",
            status: "Waiting",
        },
        {
            id: 3,
            patient: "Rohan Deshmukh",
            doctor: "Dr. Priya Shah",
            time: "12:00 PM",
            type: "Dental Consultation",
            status: "Confirmed",
        },
    ];

    const openAppointments = () => {
        router.push("/main/appointments" as never);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <ReceptionHeader
                        name="Receptionist"
                        role="Reception Desk"
                        notificationCount={3}
                    />

                    {/* Welcome */}
                    <View style={styles.welcomeSection}>
                        <View style={styles.welcomeTextContainer}>
                            <Text style={styles.greeting}>
                                Good morning 👋
                            </Text>

                            <Text style={styles.title}>
                                Reception Dashboard
                            </Text>

                            <Text style={styles.subtitle}>
                                Manage appointments, patients and today's
                                clinic activities.
                            </Text>
                        </View>

                        <View style={styles.dateCard}>
                            <CalendarDays size={18} color="#2563EB" />
                            <Text style={styles.dateText}>Today</Text>
                            <Text style={styles.dateValue}>19 Oct</Text>
                        </View>
                    </View>

                    {/* Overview */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Overview</Text>
                    </View>

                    <View style={styles.statsGrid}>
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <View key={stat.title} style={styles.statCard}>
                                    <View style={styles.statIcon}>
                                        <Icon size={20} color="#2563EB" />
                                    </View>

                                    <Text style={styles.statValue}>
                                        {stat.value}
                                    </Text>

                                    <Text
                                        style={styles.statTitle}
                                        numberOfLines={2}
                                    >
                                        {stat.title}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>

                    {/* Quick Actions */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                    </View>

                    <View style={styles.quickActions}>
                        <Pressable
                            onPress={openAppointments}
                            accessibilityRole="button"
                            accessibilityLabel="Open appointments"
                            style={({ pressed }) => [
                                styles.quickAction,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View style={styles.quickActionIcon}>
                                <Plus size={21} color="#2563EB" />
                            </View>

                            <View style={styles.quickActionContent}>
                                <Text style={styles.quickActionTitle}>
                                    New Appointment
                                </Text>
                                <Text style={styles.quickActionSubtitle}>
                                    Schedule a patient visit
                                </Text>
                            </View>

                            <ChevronRight size={19} color="#94A3B8" />
                        </Pressable>

                        <Pressable
                            onPress={() => router.push("/main/patient" as never)}
                            accessibilityRole="button"
                            accessibilityLabel="Open patient module"
                            style={({ pressed }) => [
                                styles.quickAction,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View style={styles.quickActionIcon}>
                                <UserRound size={20} color="#2563EB" />
                            </View>

                            <View style={styles.quickActionContent}>
                                <Text style={styles.quickActionTitle}>
                                    Register Patient
                                </Text>
                                <Text style={styles.quickActionSubtitle}>
                                    Open patient module
                                </Text>
                            </View>

                            <ChevronRight size={19} color="#94A3B8" />
                        </Pressable>
                    </View>

                    {/* Appointments */}
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Today's Appointments
                            </Text>
                            <Text style={styles.sectionSubtitle}>
                                Upcoming patient appointments
                            </Text>
                        </View>

                        <Pressable
                            style={styles.viewAllButton}
                            onPress={openAppointments}
                            accessibilityRole="button"
                            accessibilityLabel="View all appointments"
                        >
                            <Text style={styles.viewAllText}>View all</Text>
                            <ChevronRight size={16} color="#2563EB" />
                        </Pressable>
                    </View>

                    <View style={styles.appointmentsContainer}>
                        {appointments.map((appointment) => (
                            <Pressable
                                key={appointment.id}
                                onPress={openAppointments}
                                accessibilityRole="button"
                                accessibilityLabel={`Open appointments for ${appointment.patient}`}
                                style={({ pressed }) => [
                                    styles.appointmentCard,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <View style={styles.timeContainer}>
                                    <Clock3 size={16} color="#2563EB" />
                                    <Text style={styles.timeText}>
                                        {appointment.time}
                                    </Text>
                                </View>

                                <View style={styles.appointmentMain}>
                                    <Text style={styles.patientName}>
                                        {appointment.patient}
                                    </Text>
                                    <Text style={styles.doctorName}>
                                        {appointment.doctor}
                                    </Text>
                                    <Text style={styles.appointmentType}>
                                        {appointment.type}
                                    </Text>
                                </View>

                                <View style={styles.appointmentRight}>
                                    <View
                                        style={[
                                            styles.statusBadge,
                                            appointment.status === "Waiting"
                                                ? styles.waitingBadge
                                                : styles.confirmedBadge,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.statusText,
                                                appointment.status === "Waiting"
                                                    ? styles.waitingText
                                                    : styles.confirmedText,
                                            ]}
                                        >
                                            {appointment.status}
                                        </Text>
                                    </View>

                                    <ChevronRight
                                        size={17}
                                        color="#94A3B8"
                                    />
                                </View>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.bottomSpacing} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 30,
    },

    welcomeSection: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 24,
    },

    welcomeTextContainer: {
        flex: 1,
        paddingRight: 12,
    },

    greeting: {
        color: "#64748B",
        fontSize: 12,
        marginBottom: 5,
    },

    title: {
        color: "#172554",
        fontSize: 23,
        fontWeight: "800",
        letterSpacing: -0.5,
    },

    subtitle: {
        color: "#64748B",
        fontSize: 11,
        lineHeight: 17,
        marginTop: 7,
    },

    dateCard: {
        minWidth: 74,
        paddingVertical: 10,
        paddingHorizontal: 9,
        borderRadius: 13,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    dateText: {
        color: "#64748B",
        fontSize: 9,
        marginTop: 4,
    },

    dateValue: {
        color: "#172554",
        fontSize: 11,
        fontWeight: "700",
        marginTop: 2,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        marginTop: 5,
    },

    sectionTitle: {
        color: "#172554",
        fontSize: 16,
        fontWeight: "700",
    },

    sectionSubtitle: {
        color: "#64748B",
        fontSize: 10,
        marginTop: 3,
    },

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    statCard: {
        width: "48.5%",
        minHeight: 125,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 17,
        padding: 14,
        marginBottom: 10,
        elevation: 1,
        shadowColor: "#0F172A",
        shadowOpacity: 0.03,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    statIcon: {
        width: 38,
        height: 38,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#DBEAFE",
        marginBottom: 12,
    },

    statValue: {
        color: "#172554",
        fontSize: 23,
        fontWeight: "800",
    },

    statTitle: {
        color: "#64748B",
        fontSize: 10,
        lineHeight: 14,
        marginTop: 3,
    },

    quickActions: {
        gap: 10,
        marginBottom: 22,
    },

    quickAction: {
        minHeight: 70,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 16,
        paddingHorizontal: 13,
        paddingVertical: 10,
    },

    quickActionIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#DBEAFE",
    },

    quickActionContent: {
        flex: 1,
        marginLeft: 12,
    },

    quickActionTitle: {
        color: "#172554",
        fontSize: 13,
        fontWeight: "700",
    },

    quickActionSubtitle: {
        color: "#64748B",
        fontSize: 10,
        marginTop: 3,
    },

    viewAllButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },

    viewAllText: {
        color: "#2563EB",
        fontSize: 11,
        fontWeight: "600",
    },

    appointmentsContainer: {
        gap: 10,
    },

    appointmentCard: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 91,
        padding: 12,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 16,
        elevation: 1,
        shadowColor: "#0F172A",
        shadowOpacity: 0.03,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    timeContainer: {
        width: 72,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: "#E2E8F0",
    },

    timeText: {
        color: "#475569",
        fontSize: 10,
        fontWeight: "600",
        marginTop: 6,
        textAlign: "center",
    },

    appointmentMain: {
        flex: 1,
        minWidth: 0,
        paddingHorizontal: 12,
    },

    patientName: {
        color: "#172554",
        fontSize: 13,
        fontWeight: "700",
    },

    doctorName: {
        color: "#2563EB",
        fontSize: 10,
        marginTop: 4,
    },

    appointmentType: {
        color: "#64748B",
        fontSize: 9,
        marginTop: 4,
    },

    appointmentRight: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        minHeight: 55,
    },

    statusBadge: {
        paddingHorizontal: 7,
        paddingVertical: 4,
        borderRadius: 7,
        borderWidth: 1,
    },

    confirmedBadge: {
        backgroundColor: "#ECFDF5",
        borderColor: "#A7F3D0",
    },

    waitingBadge: {
        backgroundColor: "#FFF7ED",
        borderColor: "#FED7AA",
    },

    statusText: {
        fontSize: 8,
        fontWeight: "700",
    },

    confirmedText: {
        color: "#15803D",
    },

    waitingText: {
        color: "#C2410C",
    },

    pressed: {
        opacity: 0.75,
        transform: [{ scale: 0.99 }],
    },

    bottomSpacing: {
        height: 30,
    },
});
