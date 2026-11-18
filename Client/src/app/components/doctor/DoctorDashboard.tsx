
import React, { useMemo, useState } from "react";
import {
    Bell,
    CalendarDays,
    ChevronRight,
    ClipboardList,
    MapPin,
    Users,
} from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { apiSlice } from "../../../redux/slices/apiSlice";
import DoctorBottomNavbar from "./DoctorBottomNavbar";

interface Branch {
    _id?: string;
    id?: string;
    name?: string;
    Name?: string;
    address?: string;
    Address?: string;
    city?: string;
    City?: string;
    is_active?: boolean;
}

interface Appointment {
    id: number | string;
    patientName: string;
    age: number;
    gender: string;
    time: string;
    type: string;
    status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
    mode: "Online" | "Clinic";
    branchId?: string;
}

interface DoctorDashboardProps {
    doctorName?: string;
    specialization?: string;
    appointments?: Appointment[];
}

const branchesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDoctorDashboardBranches: builder.query<any, void>({
            query: () => "/clinics/list",
        }),
    }),
    overrideExisting: false,
});

const { useGetDoctorDashboardBranchesQuery } = branchesApi;

const defaultAppointments: Appointment[] = [
    {
        id: 1,
        patientName: "Rahul Sharma",
        age: 32,
        gender: "Male",
        time: "10:30 AM",
        type: "General Consultation",
        status: "Confirmed",
        mode: "Clinic",
    },
    {
        id: 2,
        patientName: "Priya Patil",
        age: 27,
        gender: "Female",
        time: "11:00 AM",
        type: "Follow-up",
        status: "Pending",
        mode: "Online",
    },
    {
        id: 3,
        patientName: "Amit Deshmukh",
        age: 45,
        gender: "Male",
        time: "12:00 PM",
        type: "General Consultation",
        status: "Confirmed",
        mode: "Clinic",
    },
];

function getBranches(response: any): Branch[] {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.clinics)) return response.clinics;
    if (Array.isArray(response?.branches)) return response.branches;
    return [];
}

function getBranchId(branch: Branch): string {
    return String(branch._id ?? branch.id ?? "");
}

export default function DoctorDashboard({
    doctorName = "Doctor",
    specialization = "Medical Specialist",
    appointments = defaultAppointments,
}: DoctorDashboardProps) {
    const router = useRouter();
    const { tab = "home" } = useLocalSearchParams<{ tab?: string }>();

    const {
        data: branchData,
        isLoading: branchesLoading,
        isError: branchesError,
        refetch,
    } = useGetDoctorDashboardBranchesQuery(undefined);

    const branches = useMemo(
        () => getBranches(branchData),
        [branchData]
    );

    const [selectedBranchId, setSelectedBranchId] = useState("");

    const selectedBranch =
        branches.find((branch) => getBranchId(branch) === selectedBranchId) ??
        branches[0];

    const branchAppointments = useMemo(() => {
        if (!selectedBranch) return [];

        return appointments.filter(
            (appointment) =>
                appointment.branchId === getBranchId(selectedBranch)
        );
    }, [appointments, selectedBranch]);

    const confirmedCount = branchAppointments.filter(
        (appointment) => appointment.status === "Confirmed"
    ).length;

    const pendingCount = branchAppointments.filter(
        (appointment) => appointment.status === "Pending"
    ).length;

    const openBranchDetails = (branch: Branch) => {
        const branchId = getBranchId(branch);
        if (!branchId) return;

        router.push({
            pathname: "/main/branch-details",
            params: { branchId },
        } as any);
    };

    const goToTab = (
        nextTab: "home" | "appointments" | "patients" | "records" | "profile"
    ) => {
        router.setParams({ tab: nextTab });
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.greeting}>Doctor Dashboard</Text>
                        <Text style={styles.doctorName}>Dr. {doctorName}</Text>
                        <Text style={styles.specialization}>{specialization}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.notificationButton}
                        onPress={() => router.push("/main/doctor" as any)}
                    >
                        <Bell size={21} color="#2563EB" />
                    </TouchableOpacity>
                </View>

                {tab === "home" ? (
                    <>
                        <View style={styles.sectionHeading}>
                            <View>
                                <Text style={styles.sectionTitle}>Your Branches</Text>
                                <Text style={styles.sectionSubtitle}>
                                    Select a branch to view its dashboard
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => router.push("/main/branches" as any)}
                            >
                                <Text style={styles.linkText}>Manage</Text>
                            </TouchableOpacity>
                        </View>

                        {branchesLoading ? (
                            <View style={styles.loadingBox}>
                                <ActivityIndicator size="small" color="#2563EB" />
                                <Text style={styles.mutedText}>Loading branches...</Text>
                            </View>
                        ) : branchesError ? (
                            <View style={styles.messageCard}>
                                <Text style={styles.messageText}>
                                    Unable to load branches.
                                </Text>
                                <TouchableOpacity onPress={() => refetch()}>
                                    <Text style={styles.linkText}>Try again</Text>
                                </TouchableOpacity>
                            </View>
                        ) : branches.length === 0 ? (
                            <View style={styles.messageCard}>
                                <MapPin size={26} color="#64748B" />
                                <Text style={styles.messageTitle}>No branches found</Text>
                                <Text style={styles.messageText}>
                                    Add your first clinic branch to get started.
                                </Text>
                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={() => router.push("/main/branches" as any)}
                                >
                                    <Text style={styles.primaryButtonText}>+ Add Branch</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.branchList}
                                >
                                    {branches.map((branch, index) => {
                                        const branchId = getBranchId(branch);
                                        const active =
                                            getBranchId(selectedBranch ?? {}) === branchId;

                                        return (
                                            <TouchableOpacity
                                                key={branchId || `branch-${index}`}
                                                style={[
                                                    styles.branchCard,
                                                    active && styles.branchCardActive,
                                                ]}
                                                onPress={() => setSelectedBranchId(branchId)}
                                            >
                                                <View
                                                    style={[
                                                        styles.branchIcon,
                                                        active && styles.branchIconActive,
                                                    ]}
                                                >
                                                    <MapPin
                                                        size={20}
                                                        color={active ? "#FFFFFF" : "#2563EB"}
                                                    />
                                                </View>

                                                <Text
                                                    numberOfLines={1}
                                                    style={[
                                                        styles.branchName,
                                                        active && styles.branchNameActive,
                                                    ]}
                                                >
                                                    {branch.name ??
                                                        branch.Name ??
                                                        `Branch ${index + 1}`}
                                                </Text>

                                                <Text
                                                    numberOfLines={2}
                                                    style={[
                                                        styles.branchAddress,
                                                        active && styles.branchAddressActive,
                                                    ]}
                                                >
                                                    {branch.city ??
                                                        branch.City ??
                                                        branch.address ??
                                                        branch.Address ??
                                                        "Clinic location"}
                                                </Text>

                                                <Text
                                                    style={[
                                                        styles.branchSelection,
                                                        active && styles.branchSelectionActive,
                                                    ]}
                                                >
                                                    {active ? "Selected" : "Select branch"}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>

                                {selectedBranch && (
                                    <TouchableOpacity
                                        style={styles.detailsButton}
                                        onPress={() => openBranchDetails(selectedBranch)}
                                    >
                                        <Text style={styles.detailsButtonText}>
                                            View Branch Details
                                        </Text>
                                        <ChevronRight size={18} color="#2563EB" />
                                    </TouchableOpacity>
                                )}
                            </>
                        )}

                        <View style={styles.sectionHeading}>
                            <View>
                                <Text style={styles.sectionTitle}>Branch Overview</Text>
                                <Text style={styles.sectionSubtitle}>
                                    {selectedBranch
                                        ? selectedBranch.name ??
                                        selectedBranch.Name ??
                                        "Selected branch"
                                        : "Select a branch to continue"}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.statsGrid}>
                            <View style={styles.statCard}>
                                <View
                                    style={[styles.statIcon, { backgroundColor: "#DBEAFE" }]}
                                >
                                    <CalendarDays size={21} color="#2563EB" />
                                </View>
                                <Text style={styles.statNumber}>
                                    {branchAppointments.length}
                                </Text>
                                <Text style={styles.statLabel}>Appointments</Text>
                            </View>

                            <View style={styles.statCard}>
                                <View
                                    style={[styles.statIcon, { backgroundColor: "#D1FAE5" }]}
                                >
                                    <Users size={21} color="#059669" />
                                </View>
                                <Text style={styles.statNumber}>{confirmedCount}</Text>
                                <Text style={styles.statLabel}>Confirmed</Text>
                            </View>

                            <View style={styles.statCard}>
                                <View
                                    style={[styles.statIcon, { backgroundColor: "#FEF3C7" }]}
                                >
                                    <ClipboardList size={21} color="#D97706" />
                                </View>
                                <Text style={styles.statNumber}>{pendingCount}</Text>
                                <Text style={styles.statLabel}>Pending</Text>
                            </View>
                        </View>

                        <View style={styles.sectionHeading}>
                            <View>
                                <Text style={styles.sectionTitle}>Appointments</Text>
                                <Text style={styles.sectionSubtitle}>
                                    Appointments linked to the selected branch
                                </Text>
                            </View>
                        </View>

                        {!selectedBranch ? (
                            <View style={styles.messageCard}>
                                <Text style={styles.messageText}>
                                    Add or select a branch to continue.
                                </Text>
                            </View>
                        ) : branchAppointments.length === 0 ? (
                            <View style={styles.messageCard}>
                                <CalendarDays size={27} color="#64748B" />
                                <Text style={styles.messageTitle}>
                                    No branch-linked appointments
                                </Text>
                                <Text style={styles.messageText}>
                                    Appointments need a matching branchId to appear here.
                                </Text>
                            </View>
                        ) : (
                            branchAppointments.map((appointment) => (
                                <View key={appointment.id} style={styles.appointmentCard}>
                                    <View style={styles.appointmentTop}>
                                        <View style={styles.patientAvatar}>
                                            <Users size={20} color="#2563EB" />
                                        </View>

                                        <View style={styles.patientInfo}>
                                            <Text style={styles.patientName}>
                                                {appointment.patientName}
                                            </Text>
                                            <Text style={styles.patientMeta}>
                                                {appointment.age} years · {appointment.gender}
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

                                    <View style={styles.appointmentDivider} />
                                    <Text style={styles.appointmentType}>
                                        {appointment.type}
                                    </Text>
                                    <Text style={styles.appointmentMeta}>
                                        {appointment.time} · {appointment.mode}
                                    </Text>
                                </View>
                            ))
                        )}

                        <TouchableOpacity
                            style={styles.manageBranchesButton}
                            onPress={() => router.push("/main/branches" as any)}
                        >
                            <MapPin size={19} color="#FFFFFF" />
                            <Text style={styles.manageBranchesButtonText}>
                                Branch Management
                            </Text>
                            <ChevronRight size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.messageCard}>
                        <Text style={styles.messageTitle}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </Text>
                        <Text style={styles.messageText}>
                            This tab is selected. Its dedicated screen still needs to be
                            connected to your existing appointment, patient, records, or
                            profile components.
                        </Text>
                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={() => goToTab("home")}
                        >
                            <Text style={styles.primaryButtonText}>Back to Home</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            <DoctorBottomNavbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },
    scrollContent: {
        padding: 18,
        paddingBottom: 28,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 26,
    },
    headerText: { flex: 1 },
    greeting: { fontSize: 13, color: "#64748B", marginBottom: 5 },
    doctorName: { fontSize: 25, fontWeight: "700", color: "#0F172A" },
    specialization: { fontSize: 14, color: "#64748B", marginTop: 4 },
    notificationButton: {
        height: 44,
        width: 44,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        elevation: 2,
    },
    sectionHeading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 13,
        marginTop: 5,
    },
    sectionTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
    sectionSubtitle: { fontSize: 12, color: "#64748B", marginTop: 4 },
    linkText: { fontSize: 13, fontWeight: "700", color: "#2563EB" },
    branchList: { gap: 12, paddingBottom: 5 },
    branchCard: {
        width: 178,
        padding: 14,
        borderRadius: 17,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    branchCardActive: {
        backgroundColor: "#EFF6FF",
        borderColor: "#2563EB",
        borderWidth: 2,
    },
    branchIcon: {
        height: 40,
        width: 40,
        borderRadius: 12,
        backgroundColor: "#DBEAFE",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    branchIconActive: { backgroundColor: "#2563EB" },
    branchName: { color: "#0F172A", fontWeight: "700", fontSize: 15 },
    branchNameActive: { color: "#1D4ED8" },
    branchAddress: {
        color: "#64748B",
        fontSize: 12,
        marginTop: 6,
        minHeight: 32,
    },
    branchAddressActive: { color: "#1E40AF" },
    branchSelection: {
        color: "#64748B",
        fontWeight: "600",
        fontSize: 11,
        marginTop: 12,
    },
    branchSelectionActive: { color: "#2563EB" },
    detailsButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        marginTop: 10,
        marginBottom: 22,
    },
    detailsButtonText: { color: "#2563EB", fontWeight: "700", fontSize: 13 },
    loadingBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 22,
    },
    mutedText: { color: "#64748B", fontSize: 13 },
    messageCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 22,
        gap: 8,
    },
    messageTitle: {
        color: "#0F172A",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
    },
    messageText: {
        color: "#64748B",
        fontSize: 13,
        lineHeight: 19,
        textAlign: "center",
    },
    primaryButton: {
        backgroundColor: "#2563EB",
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 11,
        marginTop: 7,
    },
    primaryButtonText: { color: "#FFFFFF", fontWeight: "700" },
    statsGrid: { flexDirection: "row", gap: 10, marginBottom: 25 },
    statCard: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 13,
        minHeight: 130,
    },
    statIcon: {
        height: 38,
        width: 38,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    statNumber: { fontSize: 23, fontWeight: "700", color: "#0F172A" },
    statLabel: { fontSize: 11, color: "#64748B", marginTop: 4 },
    appointmentCard: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
    },
    appointmentTop: { flexDirection: "row", alignItems: "center" },
    patientAvatar: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "#DBEAFE",
        alignItems: "center",
        justifyContent: "center",
    },
    patientInfo: { flex: 1, marginLeft: 11 },
    patientName: { fontSize: 14, fontWeight: "700", color: "#0F172A" },
    patientMeta: { fontSize: 12, color: "#64748B", marginTop: 4 },
    statusBadge: {
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 20,
    },
    confirmedBadge: { backgroundColor: "#D1FAE5" },
    pendingBadge: { backgroundColor: "#FEF3C7" },
    statusText: { fontSize: 10, fontWeight: "700" },
    confirmedText: { color: "#047857" },
    pendingText: { color: "#B45309" },
    appointmentDivider: {
        height: 1,
        backgroundColor: "#E2E8F0",
        marginVertical: 13,
    },
    appointmentType: { color: "#334155", fontSize: 13, fontWeight: "600" },
    appointmentMeta: { color: "#64748B", fontSize: 12, marginTop: 6 },
    manageBranchesButton: {
        backgroundColor: "#2563EB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderRadius: 14,
        marginTop: 12,
    },
    manageBranchesButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
        flex: 1,
        marginLeft: 10,
    },
});
