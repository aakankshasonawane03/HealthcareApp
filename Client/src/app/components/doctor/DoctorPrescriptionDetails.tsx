
import {
    CalendarDays,
    CheckCircle2,
    FileText,
    Pill,
    Printer,
    UserRound,
} from "lucide-react-native";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface PrescriptionMedicine {
    id: string | number;
    name: string;
    dosage?: string;
    frequency?: string;
    duration?: string;
    instructions?: string;
}

export interface DoctorPrescriptionDetailsData {
    id: string | number;
    patientName: string;
    patientAge?: number;
    patientGender?: string;
    diagnosis?: string;
    medicines?: PrescriptionMedicine[];
    date?: string;
    doctorName?: string;
    notes?: string;
    status?: "Active" | "Completed" | "Draft";
}

interface DoctorPrescriptionDetailsProps {
    prescription: DoctorPrescriptionDetailsData;
    onPrint?: () => void;
    onEdit?: () => void;
}

export default function DoctorPrescriptionDetails({
    prescription,
    onPrint,
    onEdit,
}: DoctorPrescriptionDetailsProps) {
    const medicines = prescription.medicines || [];

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {/* Prescription Header */}
            <View style={styles.headerCard}>
                <View style={styles.headerTop}>
                    <View style={styles.prescriptionIcon}>
                        <FileText size={24} color="#CB9E53" />
                    </View>

                    <View style={styles.headerInfo}>
                        <Text style={styles.headerTitle}>
                            Prescription
                        </Text>

                        <Text style={styles.prescriptionId}>
                            Prescription ID: {prescription.id}
                        </Text>
                    </View>

                    {prescription.status && (
                        <View
                            style={[
                                styles.statusBadge,
                                prescription.status === "Active" &&
                                styles.activeBadge,
                                prescription.status === "Completed" &&
                                styles.completedBadge,
                                prescription.status === "Draft" &&
                                styles.draftBadge,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statusText,
                                    prescription.status === "Active" &&
                                    styles.activeText,
                                    prescription.status === "Completed" &&
                                    styles.completedText,
                                    prescription.status === "Draft" &&
                                    styles.draftText,
                                ]}
                            >
                                {prescription.status}
                            </Text>
                        </View>
                    )}
                </View>

                {prescription.date && (
                    <View style={styles.dateRow}>
                        <CalendarDays size={15} color="#777777" />

                        <Text style={styles.dateText}>
                            {prescription.date}
                        </Text>
                    </View>
                )}
            </View>

            {/* Patient Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Patient Information
                </Text>

                <View style={styles.patientCard}>
                    <View style={styles.patientAvatar}>
                        <UserRound size={23} color="#CB9E53" />
                    </View>

                    <View style={styles.patientInfo}>
                        <Text style={styles.patientName}>
                            {prescription.patientName}
                        </Text>

                        <View style={styles.patientMeta}>
                            {prescription.patientAge !== undefined && (
                                <Text style={styles.metaText}>
                                    {prescription.patientAge} yrs
                                </Text>
                            )}

                            {prescription.patientGender && (
                                <>
                                    <View style={styles.metaDot} />

                                    <Text style={styles.metaText}>
                                        {prescription.patientGender}
                                    </Text>
                                </>
                            )}
                        </View>
                    </View>
                </View>
            </View>

            {/* Doctor Information */}
            {prescription.doctorName && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Prescribed By
                    </Text>

                    <View style={styles.doctorCard}>
                        <View style={styles.doctorIcon}>
                            <UserRound size={18} color="#CB9E53" />
                        </View>

                        <Text style={styles.doctorName}>
                            {prescription.doctorName}
                        </Text>
                    </View>
                </View>
            )}

            {/* Diagnosis */}
            {prescription.diagnosis && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Diagnosis
                    </Text>

                    <View style={styles.diagnosisCard}>
                        <CheckCircle2 size={18} color="#CB9E53" />

                        <Text style={styles.diagnosisText}>
                            {prescription.diagnosis}
                        </Text>
                    </View>
                </View>
            )}

            {/* Medicines */}
            <View style={styles.section}>
                <View style={styles.medicineHeader}>
                    <Text style={styles.sectionTitle}>
                        Medicines
                    </Text>

                    <View style={styles.medicineCount}>
                        <Pill size={13} color="#CB9E53" />

                        <Text style={styles.medicineCountText}>
                            {medicines.length}
                        </Text>
                    </View>
                </View>

                {medicines.length > 0 ? (
                    <View style={styles.medicineList}>
                        {medicines.map((medicine, index) => (
                            <View
                                key={medicine.id}
                                style={[
                                    styles.medicineCard,
                                    index === medicines.length - 1 &&
                                    styles.lastMedicineCard,
                                ]}
                            >
                                <View style={styles.medicineNumber}>
                                    <Text style={styles.medicineNumberText}>
                                        {index + 1}
                                    </Text>
                                </View>

                                <View style={styles.medicineInfo}>
                                    <Text style={styles.medicineName}>
                                        {medicine.name}
                                    </Text>

                                    {medicine.dosage && (
                                        <Text style={styles.medicineDetail}>
                                            Dosage: {medicine.dosage}
                                        </Text>
                                    )}

                                    {medicine.frequency && (
                                        <Text style={styles.medicineDetail}>
                                            Frequency: {medicine.frequency}
                                        </Text>
                                    )}

                                    {medicine.duration && (
                                        <Text style={styles.medicineDetail}>
                                            Duration: {medicine.duration}
                                        </Text>
                                    )}

                                    {medicine.instructions && (
                                        <Text style={styles.instructions}>
                                            {medicine.instructions}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyMedicine}>
                        <Pill size={22} color="#555555" />

                        <Text style={styles.emptyText}>
                            No medicines added
                        </Text>
                    </View>
                )}
            </View>

            {/* Notes */}
            {prescription.notes && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Doctor's Notes
                    </Text>

                    <View style={styles.notesCard}>
                        <Text style={styles.notesText}>
                            {prescription.notes}
                        </Text>
                    </View>
                </View>
            )}

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onPrint}
                    style={styles.printButton}
                >
                    <Printer size={17} color="#0B0B0B" />

                    <Text style={styles.printButtonText}>
                        Print Prescription
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onEdit}
                    style={styles.editButton}
                >
                    <FileText size={17} color="#CB9E53" />

                    <Text style={styles.editButtonText}>
                        Edit Prescription
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 25,
    },

    headerCard: {
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 19,
        padding: 17,
    },

    headerTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    prescriptionIcon: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3123",
        alignItems: "center",
        justifyContent: "center",
    },

    headerInfo: {
        flex: 1,
        marginLeft: 11,
    },

    headerTitle: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "800",
    },

    prescriptionId: {
        color: "#666666",
        fontSize: 9,
        marginTop: 4,
    },

    statusBadge: {
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
    },

    activeBadge: {
        backgroundColor: "#182019",
        borderColor: "#304A35",
    },

    completedBadge: {
        backgroundColor: "#171F24",
        borderColor: "#30424A",
    },

    draftBadge: {
        backgroundColor: "#211D16",
        borderColor: "#4A3B25",
    },

    statusText: {
        fontSize: 10,
        fontWeight: "700",
    },

    activeText: {
        color: "#8FC69A",
    },

    completedText: {
        color: "#82A9BA",
    },

    draftText: {
        color: "#CB9E53",
    },

    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#242424",
        marginTop: 15,
        paddingTop: 13,
    },

    dateText: {
        color: "#858585",
        fontSize: 11,
        marginLeft: 7,
    },

    section: {
        marginTop: 20,
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 10,
    },

    patientCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 16,
        padding: 13,
    },

    patientAvatar: {
        width: 45,
        height: 45,
        borderRadius: 13,
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3123",
        alignItems: "center",
        justifyContent: "center",
    },

    patientInfo: {
        flex: 1,
        marginLeft: 10,
    },

    patientName: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    patientMeta: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    metaText: {
        color: "#777777",
        fontSize: 10,
    },

    metaDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#555555",
        marginHorizontal: 7,
    },

    doctorCard: {
        minHeight: 53,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 14,
        paddingHorizontal: 12,
    },

    doctorIcon: {
        width: 35,
        height: 35,
        borderRadius: 10,
        backgroundColor: "#211D16",
        alignItems: "center",
        justifyContent: "center",
    },

    doctorName: {
        color: "#D4D4D4",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 9,
    },

    diagnosisCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#3A3123",
        borderRadius: 14,
        padding: 13,
    },

    diagnosisText: {
        flex: 1,
        color: "#D4D4D4",
        fontSize: 12,
        lineHeight: 18,
        marginLeft: 9,
    },

    medicineHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    medicineCount: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3123",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginBottom: 10,
    },

    medicineCountText: {
        color: "#CB9E53",
        fontSize: 10,
        fontWeight: "700",
        marginLeft: 5,
    },

    medicineList: {
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 16,
        overflow: "hidden",
    },

    medicineCard: {
        flexDirection: "row",
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#292929",
    },

    lastMedicineCard: {
        borderBottomWidth: 0,
    },

    medicineNumber: {
        width: 28,
        height: 28,
        borderRadius: 9,
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3123",
        alignItems: "center",
        justifyContent: "center",
    },

    medicineNumberText: {
        color: "#CB9E53",
        fontSize: 11,
        fontWeight: "800",
    },

    medicineInfo: {
        flex: 1,
        marginLeft: 10,
    },

    medicineName: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 6,
    },

    medicineDetail: {
        color: "#8A8A8A",
        fontSize: 10,
        lineHeight: 17,
    },

    instructions: {
        color: "#CB9E53",
        fontSize: 10,
        lineHeight: 17,
        marginTop: 5,
    },

    emptyMedicine: {
        minHeight: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 16,
    },

    emptyText: {
        color: "#555555",
        fontSize: 11,
        marginTop: 8,
    },

    notesCard: {
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 15,
        padding: 14,
    },

    notesText: {
        color: "#9A9A9A",
        fontSize: 12,
        lineHeight: 19,
    },

    actions: {
        marginTop: 22,
        gap: 10,
    },

    printButton: {
        minHeight: 46,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#CB9E53",
        borderRadius: 11,
    },

    printButtonText: {
        color: "#0B0B0B",
        fontSize: 12,
        fontWeight: "800",
        marginLeft: 8,
    },

    editButton: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#211D16",
        borderWidth: 1,
        borderColor: "#3A3123",
        borderRadius: 11,
    },

    editButtonText: {
        color: "#CB9E53",
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 8,
    },
});

