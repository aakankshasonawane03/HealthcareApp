
import {
    CalendarDays,
    ChevronRight,
    FileText,
    HeartPulse,
    Search,
    Stethoscope,
} from "lucide-react-native";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useRouter } from "expo-router";
import AppointmentCard from "./AppointmentCard";
import BottomNavbar from "./BottomNavbar";
import ClinicCard from "./ClinicCard";
import DashboardHeader from "./DashboardHeader";
import DoctorCard from "./DoctorCard";
import HealthReportCard from "./HealthReportCard";
import MedicalRecordCard from "./MedicalRecordCard";
import PatientHeader from "./PatientHeader";
import PrescriptionCard from "./PrescriptionCard";

export default function PatientDashboard() {
    const router = useRouter();
    const handleAppointments = () => {
        Alert.alert("Appointments", "Opening your appointments.");
    };

    const handleFindDoctor = () => {
        Alert.alert("Find Doctor", "Opening doctor search.");
    };

    const handleRecords = () => {
        Alert.alert("Medical Records", "Opening your medical records.");
    };

    const handleHealth = () => {
        Alert.alert("Health", "Opening your health reports.");
    };

    const handleSearch = () => {
        Alert.alert(
            "Search",
            "Search doctors, clinics or healthcare services."
        );
    };

    const handleAppointmentPress = () => {
        Alert.alert(
            "Appointment",
            "Opening appointment details."
        );
    };

    const handleDoctorPress = (doctorName: string) => {
        Alert.alert(
            "Doctor",
            `Opening ${doctorName}'s profile.`
        );
    };

    const handleBookDoctor = (doctorName: string) => {
        Alert.alert(
            "Book Appointment",
            `Booking an appointment with ${doctorName}.`
        );
    };

    const handlePrescriptionPress = () => {
        Alert.alert(
            "Prescription",
            "Opening prescription details."
        );
    };

    const handleMedicalRecordPress = () => {
        Alert.alert(
            "Medical Record",
            "Opening medical record details."
        );
    };

    const handleHealthReportPress = () => {
        Alert.alert(
            "Health Report",
            "Opening health report details."
        );
    };

    const handleClinicPress = () => {
        Alert.alert(
            "Clinic",
            "Opening clinic details."
        );
    };

    const handleViewAll = (section: string) => {
        Alert.alert(
            section,
            `Opening all ${section.toLowerCase()}.`
        );
    };

    const handleBottomTabChange = (tab: string) => {
        if (tab === "home") {
            router.push("/main/dashboard");
        }

        if (tab === "patients") {
            router.push("/main/patient");
        }

        if (tab === "doctors") {
            router.push("/main/doctor");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <PatientHeader />

                <DashboardHeader />

                {/* Search */}
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

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleAppointments}
                        style={styles.quickAction}
                    >
                        <View style={styles.quickIcon}>
                            <CalendarDays
                                size={20}
                                color="#2563EB"
                            />
                        </View>

                        <Text style={styles.quickTitle}>
                            Appointments
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleFindDoctor}
                        style={styles.quickAction}
                    >
                        <View style={styles.quickIcon}>
                            <Stethoscope
                                size={20}
                                color="#16A34A"
                            />
                        </View>

                        <Text style={styles.quickTitle}>
                            Find Doctor
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleRecords}
                        style={styles.quickAction}
                    >
                        <View style={styles.quickIcon}>
                            <FileText
                                size={20}
                                color="#9333EA"
                            />
                        </View>

                        <Text style={styles.quickTitle}>
                            Records
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleHealth}
                        style={styles.quickAction}
                    >
                        <View style={styles.quickIcon}>
                            <HeartPulse
                                size={20}
                                color="#EA580C"
                            />
                        </View>

                        <Text style={styles.quickTitle}>
                            Health
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Upcoming Appointment */}
                <SectionHeader
                    title="Upcoming Appointment"
                    onPress={() =>
                        handleViewAll("Upcoming Appointments")
                    }
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

                {/* Recommended Doctors */}
                <SectionHeader
                    title="Recommended Doctors"
                    onPress={() =>
                        handleViewAll("Recommended Doctors")
                    }
                />

                <DoctorCard
                    id="doctor-1"
                    name="Dr. Anjali Sharma"
                    specialty="General Physician"
                    experience="8 years"
                    rating={4.8}
                    clinicName="City Care Clinic"
                    location="Aurangabad"
                    onPress={() =>
                        handleDoctorPress("Dr. Anjali Sharma")
                    }
                    onBookPress={() =>
                        handleBookDoctor("Dr. Anjali Sharma")
                    }
                />

                <DoctorCard
                    id="doctor-2"
                    name="Dr. Rahul Patil"
                    specialty="Cardiologist"
                    experience="12 years"
                    rating={4.9}
                    clinicName="Heart Care Hospital"
                    location="Aurangabad"
                    onPress={() =>
                        handleDoctorPress("Dr. Rahul Patil")
                    }
                    onBookPress={() =>
                        handleBookDoctor("Dr. Rahul Patil")
                    }
                />

                {/* Prescriptions */}
                <SectionHeader
                    title="Prescriptions"
                    onPress={() =>
                        handleViewAll("Prescriptions")
                    }
                />

                <PrescriptionCard
                    id="prescription-1"
                    doctorName="Dr. Anjali Sharma"
                    medicineCount={3}
                    date="18 Sep 2026"
                    status="Active"
                    onPress={handlePrescriptionPress}
                />

                {/* Medical Records */}
                <SectionHeader
                    title="Medical Records"
                    onPress={() =>
                        handleViewAll("Medical Records")
                    }
                />

                <MedicalRecordCard
                    id="record-1"
                    title="General Consultation"
                    doctorName="Dr. Anjali Sharma"
                    date="15 Sep 2026"
                    recordType="Consultation"
                    onPress={handleMedicalRecordPress}
                />

                {/* Health Reports */}
                <SectionHeader
                    title="Health Reports"
                    onPress={() =>
                        handleViewAll("Health Reports")
                    }
                />

                <HealthReportCard
                    id="report-1"
                    title="Complete Blood Count"
                    reportType="Blood Test"
                    date="12 Sep 2026"
                    status="Available"
                    onPress={handleHealthReportPress}
                />

                {/* Nearby Clinics */}
                <SectionHeader
                    title="Nearby Clinics"
                    onPress={() =>
                        handleViewAll("Nearby Clinics")
                    }
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

            <BottomNavbar
                activeTab="home"
                onTabChange={handleBottomTabChange}
            />
        </View>
    );
}

interface SectionHeaderProps {
    title: string;
    onPress?: () => void;
}

function SectionHeader({
    title,
    onPress,
}: SectionHeaderProps) {
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
                {title}
            </Text>

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                style={styles.viewAllButton}
            >
                <Text style={styles.viewAllText}>
                    View All
                </Text>

                <ChevronRight
                    size={16}
                    color="#2563EB"
                    strokeWidth={2}
                />
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
        color: "#2563EB",
        fontSize: 12,
        fontWeight: "600",
    },

    bottomSpace: {
        height: 100,
    },
});
