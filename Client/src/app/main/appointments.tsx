
import { useMemo, useState } from "react";
import {
    CalendarDays,
    ChevronLeft,
    Clock3,
    Search,
    UserRound,
} from "lucide-react-native";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useRouter } from "expo-router";

type AppointmentStatus = "Confirmed" | "Waiting" | "Completed";

interface Appointment {
    id: number;
    patient: string;
    doctor: string;
    time: string;
    type: string;
    status: AppointmentStatus;
}

const appointments: Appointment[] = [
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
    {
        id: 4,
        patient: "Priya More",
        doctor: "Dr. Anjali Sharma",
        time: "09:30 AM",
        type: "General Consultation",
        status: "Completed",
    },
];

const filters = ["All", "Confirmed", "Waiting", "Completed"] as const;
type Filter = (typeof filters)[number];

export default function AppointmentsScreen() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<Filter>("All");

    const filteredAppointments = useMemo(() => {
        const query = search.trim().toLowerCase();

        return appointments.filter((appointment) => {
            const matchesFilter =
                activeFilter === "All" ||
                appointment.status === activeFilter;

            const matchesSearch =
                appointment.patient.toLowerCase().includes(query) ||
                appointment.doctor.toLowerCase().includes(query) ||
                appointment.type.toLowerCase().includes(query);

            return matchesFilter && matchesSearch;
        });
    }, [search, activeFilter]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                >
                    <ChevronLeft size={22} color="#222222" />
                    <Text style={styles.backText}>Back</Text>
                </Pressable>

                <View style={styles.headingRow}>
                    <View style={styles.headingIcon}>
                        <CalendarDays size={23} color="#8B5CF6" />
                    </View>
                    <View style={styles.headingContent}>
                        <Text style={styles.title}>All Appointments</Text>
                        <Text style={styles.subtitle}>
                            View and manage patient appointments
                        </Text>
                    </View>
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>
                        Total appointments
                    </Text>
                    <Text style={styles.summaryValue}>
                        {appointments.length}
                    </Text>
                    <Text style={styles.summaryHint}>
                        Sample appointments for the module preview
                    </Text>
                </View>

                <View style={styles.searchBox}>
                    <Search size={19} color="#888888" />
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search patient, doctor or visit type"
                        placeholderTextColor="#999999"
                        style={styles.searchInput}
                        accessibilityLabel="Search appointments"
                    />
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterRow}
                >
                    {filters.map((filter) => {
                        const selected = activeFilter === filter;

                        return (
                            <Pressable
                                key={filter}
                                onPress={() => setActiveFilter(filter)}
                                style={[
                                    styles.filterButton,
                                    selected && styles.filterButtonActive,
                                ]}
                                accessibilityRole="button"
                                accessibilityState={{ selected }}
                            >
                                <Text
                                    style={[
                                        styles.filterText,
                                        selected && styles.filterTextActive,
                                    ]}
                                >
                                    {filter}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>

                <View style={styles.listHeading}>
                    <Text style={styles.sectionTitle}>
                        Appointments
                    </Text>
                    <Text style={styles.resultCount}>
                        {filteredAppointments.length} found
                    </Text>
                </View>

                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                        <View key={appointment.id} style={styles.card}>
                            <View style={styles.cardTop}>
                                <View style={styles.patientIcon}>
                                    <UserRound size={21} color="#8B5CF6" />
                                </View>

                                <View style={styles.patientDetails}>
                                    <Text style={styles.patientName}>
                                        {appointment.patient}
                                    </Text>
                                    <Text style={styles.doctorName}>
                                        {appointment.doctor}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        styles.statusBadge,
                                        appointment.status === "Waiting" &&
                                        styles.waitingBadge,
                                        appointment.status === "Completed" &&
                                        styles.completedBadge,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.statusText,
                                            appointment.status === "Waiting" &&
                                            styles.waitingText,
                                            appointment.status === "Completed" &&
                                            styles.completedText,
                                        ]}
                                    >
                                        {appointment.status}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.cardDivider} />

                            <Text style={styles.appointmentType}>
                                {appointment.type}
                            </Text>

                            <View style={styles.timeRow}>
                                <Clock3 size={16} color="#777777" />
                                <Text style={styles.timeText}>
                                    {appointment.time}
                                </Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <CalendarDays size={32} color="#999999" />
                        <Text style={styles.emptyTitle}>
                            No appointments found
                        </Text>
                        <Text style={styles.emptyText}>
                            Try another search or select a different filter.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F7F8FC",
    },
    container: {
        padding: 18,
        paddingBottom: 36,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingVertical: 8,
        marginBottom: 18,
    },
    backText: {
        color: "#333333",
        fontSize: 14,
        marginLeft: 3,
    },
    headingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 22,
    },
    headingIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: "#EEE8FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    headingContent: {
        flex: 1,
    },
    title: {
        color: "#20202A",
        fontSize: 22,
        fontWeight: "800",
    },
    subtitle: {
        color: "#777784",
        fontSize: 12,
        marginTop: 5,
    },
    summaryCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#ECECF2",
        padding: 18,
        marginBottom: 18,
    },
    summaryLabel: {
        color: "#777784",
        fontSize: 13,
    },
    summaryValue: {
        color: "#20202A",
        fontSize: 30,
        fontWeight: "800",
        marginTop: 5,
    },
    summaryHint: {
        color: "#888894",
        fontSize: 11,
        marginTop: 5,
    },
    searchBox: {
        minHeight: 48,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E8E8EF",
        paddingHorizontal: 13,
        marginBottom: 15,
    },
    searchInput: {
        flex: 1,
        color: "#222222",
        fontSize: 13,
        paddingVertical: 11,
        paddingLeft: 9,
    },
    filterRow: {
        gap: 9,
        paddingBottom: 20,
    },
    filterButton: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E5E5ED",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    filterButtonActive: {
        backgroundColor: "#7C3AED",
        borderColor: "#7C3AED",
    },
    filterText: {
        color: "#555563",
        fontSize: 12,
        fontWeight: "600",
    },
    filterTextActive: {
        color: "#FFFFFF",
    },
    listHeading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    sectionTitle: {
        color: "#22222D",
        fontSize: 17,
        fontWeight: "700",
    },
    resultCount: {
        color: "#777784",
        fontSize: 12,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#ECECF2",
        padding: 15,
        marginBottom: 12,
    },
    cardTop: {
        flexDirection: "row",
        alignItems: "center",
    },
    patientIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#F0EBFF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },
    patientDetails: {
        flex: 1,
    },
    patientName: {
        color: "#22222D",
        fontSize: 14,
        fontWeight: "700",
    },
    doctorName: {
        color: "#777784",
        fontSize: 12,
        marginTop: 5,
    },
    statusBadge: {
        backgroundColor: "#E9F8EF",
        borderRadius: 7,
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    waitingBadge: {
        backgroundColor: "#FFF3DA",
    },
    completedBadge: {
        backgroundColor: "#E9EEFF",
    },
    statusText: {
        color: "#218348",
        fontSize: 10,
        fontWeight: "700",
    },
    waitingText: {
        color: "#9A6700",
    },
    completedText: {
        color: "#4059A8",
    },
    cardDivider: {
        height: 1,
        backgroundColor: "#EEEEF3",
        marginVertical: 13,
    },
    appointmentType: {
        color: "#444451",
        fontSize: 12,
        fontWeight: "600",
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    timeText: {
        color: "#777784",
        fontSize: 12,
        marginLeft: 7,
    },
    emptyState: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 28,
    },
    emptyTitle: {
        color: "#33333D",
        fontSize: 15,
        fontWeight: "700",
        marginTop: 12,
    },
    emptyText: {
        color: "#777784",
        fontSize: 12,
        textAlign: "center",
        marginTop: 6,
        lineHeight: 18,
    },
});
