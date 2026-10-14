
import {
    CalendarDays,
    ChevronRight,
    ClipboardList,
    Clock3,
    Plus,
    UserRound,
    Users,
} from "lucide-react-native";
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
    const stats = [
        {
            title: "Today's Appointments",
            value: "24",
            icon: CalendarDays,
        },
        {
            title: "Waiting Patients",
            value: "08",
            icon: Users,
        },
        {
            title: "Doctors Available",
            value: "06",
            icon: UserRound,
        },
        {
            title: "Completed Today",
            value: "16",
            icon: ClipboardList,
        },
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Header */}
                    <ReceptionHeader
                        name="Receptionist"
                        role="Reception Desk"
                        notificationCount={3}
                    />

                    {/* Welcome Section */}
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
                            <CalendarDays
                                size={18}
                                color="#CB9E53"
                            />

                            <Text style={styles.dateText}>
                                Today
                            </Text>

                            <Text style={styles.dateValue}>
                                21 Sep
                            </Text>
                        </View>
                    </View>

                    {/* Stats */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Overview
                        </Text>
                    </View>

                    <View style={styles.statsGrid}>
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <View
                                    key={stat.title}
                                    style={styles.statCard}
                                >
                                    <View style={styles.statIcon}>
                                        <Icon
                                            size={19}
                                            color="#CB9E53"
                                        />
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
                        <Text style={styles.sectionTitle}>
                            Quick Actions
                        </Text>
                    </View>

                    <View style={styles.quickActions}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.quickAction,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View style={styles.quickActionIcon}>
                                <Plus
                                    size={20}
                                    color="#0B0B0B"
                                />
                            </View>

                            <View style={styles.quickActionContent}>
                                <Text style={styles.quickActionTitle}>
                                    New Appointment
                                </Text>

                                <Text style={styles.quickActionSubtitle}>
                                    Schedule a patient visit
                                </Text>
                            </View>

                            <ChevronRight
                                size={18}
                                color="#777777"
                            />
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.quickAction,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View style={styles.quickActionIcon}>
                                <UserRound
                                    size={19}
                                    color="#CB9E53"
                                />
                            </View>

                            <View style={styles.quickActionContent}>
                                <Text style={styles.quickActionTitle}>
                                    Register Patient
                                </Text>

                                <Text style={styles.quickActionSubtitle}>
                                    Add a new patient
                                </Text>
                            </View>

                            <ChevronRight
                                size={18}
                                color="#777777"
                            />
                        </Pressable>
                    </View>

                    {/* Today's Appointments */}
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>
                                Today's Appointments
                            </Text>

                            <Text style={styles.sectionSubtitle}>
                                Upcoming patient appointments
                            </Text>
                        </View>

                        <Pressable style={styles.viewAllButton}>
                            <Text style={styles.viewAllText}>
                                View all
                            </Text>

                            <ChevronRight
                                size={15}
                                color="#CB9E53"
                            />
                        </Pressable>
                    </View>

                    <View style={styles.appointmentsContainer}>
                        {appointments.map((appointment) => (
                            <Pressable
                                key={appointment.id}
                                style={({ pressed }) => [
                                    styles.appointmentCard,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <View style={styles.timeContainer}>
                                    <Clock3
                                        size={15}
                                        color="#CB9E53"
                                    />

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
                                            appointment.status ===
                                                "Waiting"
                                                ? styles.waitingBadge
                                                : styles.confirmedBadge,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.statusText,
                                                appointment.status ===
                                                    "Waiting"
                                                    ? styles.waitingText
                                                    : styles.confirmedText,
                                            ]}
                                        >
                                            {appointment.status}
                                        </Text>
                                    </View>

                                    <ChevronRight
                                        size={17}
                                        color="#666666"
                                    />
                                </View>
                            </Pressable>
                        ))}
                    </View>

                    {/* Bottom spacing */}
                    <View style={styles.bottomSpacing} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#0B0B0B",
    },

    container: {
        flex: 1,
        backgroundColor: "#0B0B0B",
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
        color: "#8A8A8A",
        fontSize: 12,
        marginBottom: 5,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 23,
        fontWeight: "800",
        letterSpacing: -0.5,
    },

    subtitle: {
        color: "#777777",
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
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
    },

    dateText: {
        color: "#888888",
        fontSize: 9,
        marginTop: 4,
    },

    dateValue: {
        color: "#FFFFFF",
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
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    sectionSubtitle: {
        color: "#777777",
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
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 17,
        padding: 14,
        marginBottom: 10,
    },

    statIcon: {
        width: 38,
        height: 38,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3020",
        marginBottom: 12,
    },

    statValue: {
        color: "#FFFFFF",
        fontSize: 23,
        fontWeight: "800",
    },

    statTitle: {
        color: "#777777",
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
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
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
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3020",
    },

    quickActionContent: {
        flex: 1,
        marginLeft: 12,
    },

    quickActionTitle: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
    },

    quickActionSubtitle: {
        color: "#777777",
        fontSize: 10,
        marginTop: 3,
    },

    viewAllButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },

    viewAllText: {
        color: "#CB9E53",
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
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 16,
    },

    timeContainer: {
        width: 72,
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 10,
        borderRightWidth: 1,
        borderRightColor: "#292929",
    },

    timeText: {
        color: "#D2D2D2",
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
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
    },

    doctorName: {
        color: "#CB9E53",
        fontSize: 10,
        marginTop: 4,
    },

    appointmentType: {
        color: "#777777",
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
        backgroundColor: "#142019",
        borderColor: "#294C35",
    },

    waitingBadge: {
        backgroundColor: "#211D16",
        borderColor: "#4A3B22",
    },

    statusText: {
        fontSize: 8,
        fontWeight: "700",
    },

    confirmedText: {
        color: "#5CCB78",
    },

    waitingText: {
        color: "#CB9E53",
    },

    pressed: {
        opacity: 0.75,
        transform: [{ scale: 0.99 }],
    },

    bottomSpacing: {
        height: 30,
    },
});
