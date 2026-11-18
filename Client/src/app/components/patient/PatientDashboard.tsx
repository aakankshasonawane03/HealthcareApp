
import React, { useMemo, useState } from "react";
import {
    CalendarDays,
    ChevronRight,
    FileText,
    HeartPulse,
    Search,
    Stethoscope,
    X,
} from "lucide-react-native";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";

import AppointmentCard from "./AppointmentCard";
import ClinicCard from "./ClinicCard";
import DashboardHeader from "./DashboardHeader";
import DoctorCard from "./DoctorCard";
import HealthReportCard from "./HealthReportCard";
import MedicalRecordCard from "./MedicalRecordCard";
import PatientHeader from "./PatientHeader";
import PrescriptionCard from "./PrescriptionCard";

const BLUE = "#2563EB";

const DOCTORS = [
    {
        id: "doctor-1",
        name: "Dr. Anjali Sharma",
        specialty: "General Physician",
        experience: "8 years",
        rating: 4.8,
        clinicName: "City Care Clinic",
        location: "Aurangabad",
    },
    {
        id: "doctor-2",
        name: "Dr. Rahul Patil",
        specialty: "Cardiologist",
        experience: "12 years",
        rating: 4.9,
        clinicName: "Heart Care Hospital",
        location: "Aurangabad",
    },
];

type PatientTab = "home" | "appointments" | "records" | "profile";

export default function PatientDashboard({
    onOpenProfile,
    onOpenRecords,
}: {
    onOpenProfile: () => void;
    onOpenRecords: () => void;
}) {
    const router = useRouter();

    const [searchVisible, setSearchVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [bookingDoctor, setBookingDoctor] = useState<string | null>(null);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("10:30 AM");

    const filteredDoctors = useMemo(() => {
        const query = searchText.trim().toLowerCase();

        if (!query) return DOCTORS;

        return DOCTORS.filter((doctor) =>
            [
                doctor.name,
                doctor.specialty,
                doctor.clinicName,
                doctor.location,
            ].some((value) => value.toLowerCase().includes(query))
        );
    }, [searchText]);

    const openPatientTab = (tab: PatientTab) => {
        router.push({
            pathname: "/main/patient",
            params: { tab },
        });
    };

    const handleAppointments = () => openPatientTab("appointments");

    const handleFindDoctor = () => {
        setSearchText("");
        setSearchVisible(true);
    };

    const handleRecords = () => openPatientTab("records");

    const handleHealth = () => openPatientTab("records");

    const handleSearch = () => {
        setSearchText("");
        setSearchVisible(true);
    };

    const handleAppointmentPress = () => openPatientTab("appointments");

    const handleDoctorPress = (doctorName: string) => {
        Alert.alert(
            doctorName,
            "Select Book Appointment to choose a date and time."
        );
    };

    const handleBookDoctor = (doctorName: string) => {
        setBookingDoctor(doctorName);
        setBookingDate(new Date().toISOString().slice(0, 10));
        setBookingTime("10:30 AM");
    };

    const handlePrescriptionPress = () => openPatientTab("records");

    const handleMedicalRecordPress = () => openPatientTab("records");

    const handleHealthReportPress = () => openPatientTab("records");

    const handleClinicPress = () => {
        setSearchText("City Care Clinic");
        setSearchVisible(true);
    };

    const handleViewAll = (section: string) => {
        const name = section.toLowerCase();

        if (name.includes("appointment")) {
            openPatientTab("appointments");
        } else if (
            name.includes("record") ||
            name.includes("prescription") ||
            name.includes("health")
        ) {
            openPatientTab("records");
        } else {
            setSearchText("");
            setSearchVisible(true);
        }
    };

    const confirmBooking = () => {
        if (!bookingDoctor || !bookingDate.trim() || !bookingTime) {
            Alert.alert("Missing details", "Please enter a date and select a time.");
            return;
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(bookingDate.trim())) {
            Alert.alert("Invalid date", "Enter the date in YYYY-MM-DD format.");
            return;
        }

        Alert.alert(
            "Booking not saved",
            `You selected ${bookingDoctor} for ${bookingDate} at ${bookingTime}.\n\nYour selection has not been saved. The appointment API must be connected before a real booking can be confirmed.`,
            [
                {
                    text: "OK",
                    onPress: () => setBookingDoctor(null),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Doctor search modal */}
            <Modal
                visible={searchVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setSearchVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHeading}>
                            <Text style={styles.modalTitle}>Find a Doctor</Text>
                            <TouchableOpacity
                                onPress={() => setSearchVisible(false)}
                                accessibilityLabel="Close doctor search"
                            >
                                <X size={24} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalSearch}>
                            <Search size={19} color="#64748B" />
                            <TextInput
                                value={searchText}
                                onChangeText={setSearchText}
                                placeholder="Name, specialty or clinic"
                                placeholderTextColor="#94A3B8"
                                style={styles.modalSearchInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <ScrollView
                            style={styles.modalResults}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            {filteredDoctors.map((doctor) => (
                                <View key={doctor.id} style={styles.doctorResult}>
                                    <View style={styles.doctorAvatar}>
                                        <Stethoscope size={23} color={BLUE} />
                                    </View>

                                    <View style={styles.doctorInfo}>
                                        <Text style={styles.doctorName}>
                                            {doctor.name}
                                        </Text>
                                        <Text style={styles.detail}>
                                            {doctor.specialty} · {doctor.experience}
                                        </Text>
                                        <Text style={styles.detail}>
                                            {doctor.clinicName}
                                        </Text>
                                        <Text style={styles.rating}>
                                            ★ {doctor.rating} · {doctor.location}
                                        </Text>

                                        <TouchableOpacity
                                            style={styles.primaryButton}
                                            onPress={() => {
                                                setSearchVisible(false);
                                                handleBookDoctor(doctor.name);
                                            }}
                                        >
                                            <Text style={styles.primaryButtonText}>
                                                Book Appointment
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}

                            {filteredDoctors.length === 0 && (
                                <View style={styles.noResults}>
                                    <Search size={32} color="#94A3B8" />
                                    <Text style={styles.noResultsTitle}>
                                        No doctors found
                                    </Text>
                                    <Text style={styles.detail}>
                                        Try a different name, specialty or clinic.
                                    </Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Appointment selection modal */}
            <Modal
                visible={bookingDoctor !== null}
                animationType="slide"
                transparent
                onRequestClose={() => setBookingDoctor(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHeading}>
                            <Text style={styles.modalTitle}>
                                Book Appointment
                            </Text>
                            <TouchableOpacity
                                onPress={() => setBookingDoctor(null)}
                                accessibilityLabel="Close booking"
                            >
                                <X size={24} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.bookingDoctor}>
                            {bookingDoctor}
                        </Text>

                        <Text style={styles.fieldLabel}>
                            Appointment date (YYYY-MM-DD)
                        </Text>
                        <TextInput
                            value={bookingDate}
                            onChangeText={setBookingDate}
                            placeholder="2026-10-20"
                            placeholderTextColor="#94A3B8"
                            style={styles.dateInput}
                            autoCapitalize="none"
                        />

                        <Text style={styles.fieldLabel}>Available time options</Text>
                        <View style={styles.timeOptions}>
                            {["10:30 AM", "12:00 PM", "3:00 PM"].map((time) => {
                                const selected = bookingTime === time;

                                return (
                                    <TouchableOpacity
                                        key={time}
                                        onPress={() => setBookingTime(time)}
                                        style={[
                                            styles.timeButton,
                                            selected && styles.selectedTimeButton,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.timeText,
                                                selected && styles.selectedTimeText,
                                            ]}
                                        >
                                            {time}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={confirmBooking}
                        >
                            <Text style={styles.primaryButtonText}>
                                Confirm Selection
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.bookingNote}>
                            This is a selection only. It will not create a real booking
                            until the backend API is connected.
                        </Text>

                        <TouchableOpacity
                            onPress={() => setBookingDoctor(null)}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <PatientHeader
                    onProfilePress={onOpenProfile}
                    onRecordsPress={onOpenRecords}
                />
                <DashboardHeader />

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSearch}
                    style={styles.searchCard}
                >
                    <Search size={20} color="#64748B" />
                    <Text style={styles.searchText}>
                        Search doctors, clinics or services
                    </Text>
                </TouchableOpacity>

                <View style={styles.quickActions}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleAppointments}
                        style={styles.quickAction}
                    >
                        <View style={styles.quickIcon}>
                            <CalendarDays size={20} color={BLUE} />
                        </View>
                        <Text style={styles.quickTitle}>Appointments</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleFindDoctor}
                        style={styles.quickAction}
                    >
                        <View style={styles.quickIcon}>
                            <Stethoscope size={20} color="#16A34A" />
                        </View>
                        <Text style={styles.quickTitle}>Find Doctor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleRecords}
                        style={styles.quickAction}
                    >
                        <View style={styles.quickIcon}>
                            <FileText size={20} color="#9333EA" />
                        </View>
                        <Text style={styles.quickTitle}>Records</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleHealth}
                        style={styles.quickAction}
                    >
                        <View style={styles.quickIcon}>
                            <HeartPulse size={20} color="#EA580C" />
                        </View>
                        <Text style={styles.quickTitle}>Health</Text>
                    </TouchableOpacity>
                </View>

                <SectionHeader
                    title="Upcoming Appointment"
                    onPress={() => handleViewAll("Upcoming Appointments")}
                />

                <AppointmentCard
                    id="appointment-1"
                    doctorName="Dr. Anjali Sharma"
                    specialty="General Physician"
                    date="Today"
                    time="10:30 AM"
                    status="Confirmed"
                    onPress={handleAppointmentPress}
                />

                <SectionHeader
                    title="Recommended Doctors"
                    onPress={() => handleViewAll("Recommended Doctors")}
                />

                <DoctorCard
                    id="doctor-1"
                    name="Dr. Anjali Sharma"
                    specialty="General Physician"
                    experience="8 years"
                    rating={4.8}
                    clinicName="City Care Clinic"
                    location="Aurangabad"
                    onPress={() => handleDoctorPress("Dr. Anjali Sharma")}
                    onBookPress={() => handleBookDoctor("Dr. Anjali Sharma")}
                />

                <DoctorCard
                    id="doctor-2"
                    name="Dr. Rahul Patil"
                    specialty="Cardiologist"
                    experience="12 years"
                    rating={4.9}
                    clinicName="Heart Care Hospital"
                    location="Aurangabad"
                    onPress={() => handleDoctorPress("Dr. Rahul Patil")}
                    onBookPress={() => handleBookDoctor("Dr. Rahul Patil")}
                />

                <SectionHeader
                    title="Prescriptions"
                    onPress={() => handleViewAll("Prescriptions")}
                />

                <PrescriptionCard
                    id="prescription-1"
                    doctorName="Dr. Anjali Sharma"
                    medicineCount={3}
                    date="18 Sep 2026"
                    status="Active"
                    onPress={handlePrescriptionPress}
                />

                <SectionHeader
                    title="Medical Records"
                    onPress={() => handleViewAll("Medical Records")}
                />

                <MedicalRecordCard
                    id="record-1"
                    title="General Consultation"
                    doctorName="Dr. Anjali Sharma"
                    date="15 Sep 2026"
                    recordType="Consultation"
                    onPress={handleMedicalRecordPress}
                />

                <SectionHeader
                    title="Health Reports"
                    onPress={() => handleViewAll("Health Reports")}
                />

                <HealthReportCard
                    id="report-1"
                    title="Complete Blood Count"
                    reportType="Blood Test"
                    date="12 Sep 2026"
                    status="Available"
                    onPress={handleHealthReportPress}
                />

                <SectionHeader
                    title="Nearby Clinics"
                    onPress={() => handleViewAll("Nearby Clinics")}
                />

                <ClinicCard
                    id="clinic-1"
                    name="City Care Clinic"
                    location="Aurangabad"
                    distance="1.2 km"
                    rating={4.7}
                    onPress={handleClinicPress}
                />

                <View style={styles.bottomSpace} />
            </ScrollView>
        </View>
    );
}

interface SectionHeaderProps {
    title: string;
    onPress?: () => void;
}

function SectionHeader({ title, onPress }: SectionHeaderProps) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={styles.viewAllButton}
            >
                <Text style={styles.viewAllText}>View All</Text>
                <ChevronRight size={16} color={BLUE} strokeWidth={2} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 18,
        paddingTop: 12,
    },
    searchCard: {
        height: 52,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 18,
        marginBottom: 18,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    searchText: {
        flex: 1,
        color: "#64748B",
        fontSize: 13,
        marginLeft: 11,
    },
    quickActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
    },
    quickAction: {
        width: "23%",
        alignItems: "center",
    },
    quickIcon: {
        width: 48,
        height: 48,
        borderRadius: 15,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    quickTitle: {
        color: "#475569",
        fontSize: 11,
        fontWeight: "500",
        textAlign: "center",
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
        marginBottom: 12,
    },
    sectionTitle: {
        color: "#0F172A",
        fontSize: 17,
        fontWeight: "700",
    },
    viewAllButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        color: BLUE,
        fontSize: 12,
        fontWeight: "600",
    },
    bottomSpace: {
        height: 100,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(15, 23, 42, 0.45)",
    },
    modalSheet: {
        backgroundColor: "#FFFFFF",
        padding: 22,
        paddingBottom: 30,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: "88%",
    },
    modalHeading: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 23,
        fontWeight: "800",
        color: "#0F172A",
    },
    modalSearch: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 12,
        paddingHorizontal: 13,
        marginBottom: 14,
    },
    modalSearchInput: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: "#0F172A",
    },
    modalResults: {
        flexGrow: 0,
    },
    doctorResult: {
        flexDirection: "row",
        gap: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 15,
        marginBottom: 12,
    },
    doctorAvatar: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 5,
    },
    detail: {
        fontSize: 13,
        lineHeight: 20,
        color: "#64748B",
        marginBottom: 4,
    },
    rating: {
        color: "#B45309",
        fontSize: 13,
        marginTop: 3,
    },
    primaryButton: {
        backgroundColor: BLUE,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 11,
        alignItems: "center",
        marginTop: 10,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 13,
    },
    noResults: {
        alignItems: "center",
        paddingVertical: 30,
    },
    noResultsTitle: {
        color: "#0F172A",
        fontSize: 17,
        fontWeight: "700",
        marginTop: 12,
        marginBottom: 6,
    },
    bookingDoctor: {
        fontSize: 16,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 20,
    },
    fieldLabel: {
        color: "#334155",
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 8,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        color: "#0F172A",
        marginBottom: 18,
    },
    timeOptions: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 14,
    },
    timeButton: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    selectedTimeButton: {
        backgroundColor: "#EFF6FF",
        borderColor: BLUE,
    },
    timeText: {
        color: "#334155",
        fontSize: 12,
    },
    selectedTimeText: {
        color: BLUE,
        fontWeight: "700",
    },
    bookingNote: {
        color: "#64748B",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 12,
    },
    cancelButton: {
        paddingVertical: 13,
        alignItems: "center",
        marginTop: 4,
    },
    cancelText: {
        color: BLUE,
        fontWeight: "700",
    },
});
