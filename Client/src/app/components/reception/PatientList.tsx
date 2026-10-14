
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import PatientCard from "./PatientCard";

export interface ReceptionPatient {
    id: string;
    name: string;
    age?: number | string;
    gender?: string;
    bloodGroup?: string;
    phone?: string;
    email?: string;
    lastVisit?: string;
    status?: "Active" | "Inactive";
    image?: string;
}

interface PatientListProps {
    patients: ReceptionPatient[];
    title?: string;
    emptyMessage?: string;
    onPatientPress?: (patient: ReceptionPatient) => void;
}

export default function PatientList({
    patients,
    title = "Recent Patients",
    emptyMessage = "No patients found.",
    onPatientPress,
}: PatientListProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.subtitle}>
                        {patients.length}{" "}
                        {patients.length === 1 ? "patient" : "patients"}
                    </Text>
                </View>

                <View style={styles.countBadge}>
                    <Text style={styles.countText}>
                        {patients.length}
                    </Text>
                </View>
            </View>

            {patients.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                        No Patients
                    </Text>

                    <Text style={styles.emptyMessage}>
                        {emptyMessage}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={patients}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PatientCard
                            id={item.id}
                            name={item.name}
                            age={item.age}
                            gender={item.gender}
                            bloodGroup={item.bloodGroup}
                            phone={item.phone}
                            email={item.email}
                            lastVisit={item.lastVisit}
                            status={item.status}
                            image={item.image}
                            onPress={() => onPatientPress?.(item)}
                        />
                    )}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },

    subtitle: {
        marginTop: 4,
        color: "#777777",
        fontSize: 11,
        fontWeight: "500",
    },

    countBadge: {
        minWidth: 34,
        height: 34,
        paddingHorizontal: 9,
        borderRadius: 11,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    countText: {
        color: "#CB9E53",
        fontSize: 12,
        fontWeight: "700",
    },

    listContent: {
        paddingBottom: 2,
    },

    emptyContainer: {
        minHeight: 120,
        backgroundColor: "#151515",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.14)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    emptyTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    emptyMessage: {
        marginTop: 6,
        color: "#777777",
        fontSize: 11,
        textAlign: "center",
    },
});
