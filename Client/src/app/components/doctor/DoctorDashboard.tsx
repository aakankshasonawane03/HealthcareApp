
import {
    Bell,
    CalendarDays,
    ChevronRight,
    ClipboardList,
    Clock3,
    MapPin,
    Search,
    Users,
    Video,
} from "lucide-react-native";
import React from "react";
import { useGetAllDoctorsQuery } from "../../../redux/slices/doctorApiSlice";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import DoctorBottomNavbar from "./DoctorBottomNavbar";

interface Appointment {
    id: number;
    patientName: string;
    age: number;
    gender: string;
    time: string;
    type: string;
    status: "Confirmed" | "Pending";
    mode: "Online" | "Clinic";
}

interface DoctorDashboardProps {
    doctorName?: string;
    specialization?: string;
    appointments?: Appointment[];
}

const defaultAppointments: Appointment[] = [
    {
        id: 1,
        patientName: "Aarav Sharma",
        age: 28,
        gender: "Male",
        time: "10:00 AM",
        type: "General Consultation",
        status: "Confirmed",
        mode: "Online",
    },
    {
        id: 2,
        patientName: "Priya Patil",
        age: 34,
        gender: "Female",
        time: "11:30 AM",
        type: "Follow-up",
        status: "Confirmed",
        mode: "Clinic",
    },
    {
        id: 3,
        patientName: "Rahul Deshmukh",
        age: 42,
        gender: "Male",
        time: "01:00 PM",
        type: "Health Checkup",
        status: "Pending",
        mode: "Clinic",
    },
];
<DoctorBottomNavbar />

export default function DoctorDashboard({
    doctorName = "Dr. John Smith",
    specialization = "General Physician",
    appointments = defaultAppointments,
}: DoctorDashboardProps) {
    const todayAppointments = appointments.length;
    const { data: doctors, isLoading, isError } = useGetAllDoctorsQuery();
    console.log("Doctors Data:", doctors);
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>DR</Text>
                        </View>

                        <View>
                            <Text style={styles.welcomeText}>
                                Good Morning 👋
                            </Text>

                            <Text style={styles.doctorName}>
                                {doctorName}
                            </Text>

                            <Text style={styles.specialization}>
                                {specialization}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.notificationButton}
                    >
                        <Bell
                            size={21}
                            color="#2563EB"
                        />

                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Search
                        size={19}
                        color="#64748B"
                    />

                    <Text style={styles.searchPlaceholder}>
                        Search patients, appointments...
                    </Text>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <StatCard
                        icon={
                            <CalendarDays
                                size={21}
                                color="#2563EB"
                            />
                        }
                        value={String(todayAppointments)}
                        label="Appointments"
                    />

                    <StatCard
                        icon={
                            <Users
                                size={21}
                                color="#16A34A"
                            />
                        }
                        value="124"
                        label="Total Patients"
                    />

                    <StatCard
                        icon={
                            <Clock3
                                size={21}
                                color="#EA580C"
                            />
                        }
                        value="05"
                        label="Pending"
                    />
                </View>

                {/* Today's Schedule */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            Today's Schedule
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Your upcoming appointments
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                    >
                        <Text style={styles.viewAll}>
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Appointment Cards */}
                {appointments.map((appointment) => (
                    <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                    />
                ))}

                {/* Quick Actions */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            Quick Actions
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Manage your practice
                        </Text>
                    </View>
                </View>

                <View style={styles.actionsGrid}>
                    <QuickAction
                        icon={
                            <Users
                                size={23}
                                color="#2563EB"
                            />
                        }
                        title="Patients"
                        subtitle="View patients"
                    />

                    <QuickAction
                        icon={
                            <CalendarDays
                                size={23}
                                color="#16A34A"
                            />
                        }
                        title="Appointments"
                        subtitle="Manage schedule"
                    />

                    <QuickAction
                        icon={
                            <ClipboardList
                                size={23}
                                color="#9333EA"
                            />
                        }
                        title="Prescriptions"
                        subtitle="Create prescriptions"
                    />

                    <QuickAction
                        icon={
                            <Clock3
                                size={23}
                                color="#EA580C"
                            />
                        }
                        title="Availability"
                        subtitle="Set availability"
                    />
                </View>

                {/* Today's Summary */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryIcon}>
                        <CalendarDays
                            size={22}
                            color="#2563EB"
                        />
                    </View>

                    <View style={styles.summaryContent}>
                        <Text style={styles.summaryTitle}>
                            Today's Summary
                        </Text>

                        <Text style={styles.summaryText}>
                            You have {todayAppointments} appointments
                            scheduled today.
                        </Text>
                    </View>

                    <ChevronRight
                        size={20}
                        color="#94A3B8"
                    />
                </View>
            </ScrollView>
        </View>
    );
}

/* =========================
   STAT CARD
========================= */

interface StatCardProps {
    icon: React.ReactNode;
    value: string;
    label: string;
}

function StatCard({
    icon,
    value,
    label,
}: StatCardProps) {
    return (
        <View style={styles.statCard}>
            <View style={styles.statIcon}>
                {icon}
            </View>

            <Text style={styles.statValue}>
                {value}
            </Text>

            <Text style={styles.statLabel}>
                {label}
            </Text>
        </View>
    );
}

/* =========================
   APPOINTMENT CARD
========================= */

interface AppointmentCardProps {
    appointment: Appointment;
}

function AppointmentCard({
    appointment,
}: AppointmentCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.appointmentCard}
        >
            <View style={styles.appointmentTop}>
                <View style={styles.patientAvatar}>
                    <Text style={styles.patientAvatarText}>
                        {appointment.patientName
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                    </Text>
                </View>

                <View style={styles.patientInfo}>
                    <Text style={styles.patientName}>
                        {appointment.patientName}
                    </Text>

                    <Text style={styles.patientDetails}>
                        {appointment.age} years •{" "}
                        {appointment.gender}
                    </Text>
                </View>

                <View
                    style={[
                        styles.statusBadge,
                        appointment.status === "Confirmed"
                            ? styles.confirmedBadge
                            : styles.pendingBadge,
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            appointment.status === "Confirmed"
                                ? styles.confirmedText
                                : styles.pendingText,
                        ]}
                    >
                        {appointment.status}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.appointmentBottom}>
                <View style={styles.appointmentMeta}>
                    <Clock3
                        size={16}
                        color="#2563EB"
                    />

                    <Text style={styles.metaText}>
                        {appointment.time}
                    </Text>
                </View>

                <View style={styles.appointmentMeta}>
                    {appointment.mode === "Online" ? (
                        <Video
                            size={16}
                            color="#2563EB"
                        />
                    ) : (
                        <MapPin
                            size={16}
                            color="#2563EB"
                        />
                    )}

                    <Text style={styles.metaText}>
                        {appointment.mode}
                    </Text>
                </View>
            </View>

            <Text style={styles.appointmentType}>
                {appointment.type}
            </Text>
        </TouchableOpacity>
    );
}

/* =========================
   QUICK ACTION
========================= */

interface QuickActionProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

function QuickAction({
    icon,
    title,
    subtitle,
}: QuickActionProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionCard}
        >
            <View style={styles.actionIcon}>
                {icon}
            </View>

            <Text style={styles.actionTitle}>
                {title}
            </Text>

            <Text style={styles.actionSubtitle}>
                {subtitle}
            </Text>

            <ChevronRight
                size={17}
                color="#94A3B8"
                style={styles.actionArrow}
            />
        </TouchableOpacity>
    );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 22,
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#BFDBFE",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    avatarText: {
        color: "#2563EB",
        fontSize: 15,
        fontWeight: "700",
    },

    welcomeText: {
        color: "#64748B",
        fontSize: 12,
        marginBottom: 3,
    },

    doctorName: {
        color: "#0F172A",
        fontSize: 19,
        fontWeight: "700",
    },

    specialization: {
        color: "#2563EB",
        fontSize: 12,
        marginTop: 2,
    },

    notificationButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
    },

    notificationDot: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#2563EB",
        borderWidth: 1,
        borderColor: "#FFFFFF",
    },

    searchContainer: {
        height: 48,
        borderRadius: 13,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        marginBottom: 18,
    },

    searchPlaceholder: {
        color: "#64748B",
        fontSize: 13,
        marginLeft: 10,
    },

    statsRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 28,
    },

    statCard: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 15,
        padding: 13,
        minHeight: 112,
    },

    statIcon: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    statValue: {
        color: "#0F172A",
        fontSize: 20,
        fontWeight: "700",
    },

    statLabel: {
        color: "#64748B",
        fontSize: 10,
        marginTop: 3,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 13,
    },

    sectionTitle: {
        color: "#0F172A",
        fontSize: 18,
        fontWeight: "700",
    },

    sectionSubtitle: {
        color: "#64748B",
        fontSize: 11,
        marginTop: 3,
    },

    viewAll: {
        color: "#2563EB",
        fontSize: 12,
        fontWeight: "600",
    },

    appointmentCard: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 16,
        padding: 15,
        marginBottom: 12,
    },

    appointmentTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    patientAvatar: {
        width: 43,
        height: 43,
        borderRadius: 22,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    patientAvatarText: {
        color: "#2563EB",
        fontSize: 13,
        fontWeight: "700",
    },

    patientInfo: {
        flex: 1,
    },

    patientName: {
        color: "#0F172A",
        fontSize: 14,
        fontWeight: "600",
    },

    patientDetails: {
        color: "#64748B",
        fontSize: 11,
        marginTop: 4,
    },

    statusBadge: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 8,
    },

    confirmedBadge: {
        backgroundColor: "#F0FDF4",
        borderWidth: 1,
        borderColor: "#BBF7D0",
    },

    pendingBadge: {
        backgroundColor: "#FFF7ED",
        borderWidth: 1,
        borderColor: "#FED7AA",
    },

    statusText: {
        fontSize: 9,
        fontWeight: "600",
    },

    confirmedText: {
        color: "#16A34A",
    },

    pendingText: {
        color: "#EA580C",
    },

    divider: {
        height: 1,
        backgroundColor: "#E2E8F0",
        marginVertical: 13,
    },

    appointmentBottom: {
        flexDirection: "row",
        gap: 20,
    },

    appointmentMeta: {
        flexDirection: "row",
        alignItems: "center",
    },

    metaText: {
        color: "#475569",
        fontSize: 11,
        marginLeft: 6,
    },

    appointmentType: {
        color: "#64748B",
        fontSize: 11,
        marginTop: 9,
    },

    actionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 20,
    },

    actionCard: {
        width: "48%",
        minHeight: 125,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 15,
        padding: 14,
        position: "relative",
    },

    actionIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    actionTitle: {
        color: "#0F172A",
        fontSize: 13,
        fontWeight: "600",
    },

    actionSubtitle: {
        color: "#64748B",
        fontSize: 10,
        marginTop: 4,
    },

    actionArrow: {
        position: "absolute",
        right: 12,
        top: 16,
    },

    summaryCard: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 16,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
    },

    summaryIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    summaryContent: {
        flex: 1,
    },

    summaryTitle: {
        color: "#0F172A",
        fontSize: 13,
        fontWeight: "600",
    },

    summaryText: {
        color: "#64748B",
        fontSize: 10,
        marginTop: 4,
    },
});
