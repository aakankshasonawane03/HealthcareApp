
import {
    FileText,
    FolderOpen,
    Search,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import MedicalRecordCard, {
    DoctorMedicalRecord,
} from "./MedicalRecordCard";

interface MedicalRecordListProps {
    records: DoctorMedicalRecord[];
    searchQuery?: string;
    onSearchChange?: (text: string) => void;
    onRecordPress?: (record: DoctorMedicalRecord) => void;
    title?: string;
}

export default function MedicalRecordList({
    records,
    searchQuery = "",
    onSearchChange,
    onRecordPress,
    title = "Medical Records",
}: MedicalRecordListProps) {
    const filteredRecords = records.filter((record) => {
        const query = searchQuery.toLowerCase().trim();

        if (!query) {
            return true;
        }

        return (
            record.patientName.toLowerCase().includes(query) ||
            record.recordType?.toLowerCase().includes(query) ||
            record.title?.toLowerCase().includes(query) ||
            record.description?.toLowerCase().includes(query)
        );
    });

    return (
        <View style={styles.container}>
            {/* Section Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>{title}</Text>

                    <Text style={styles.subtitle}>
                        {filteredRecords.length}{" "}
                        {filteredRecords.length === 1
                            ? "record"
                            : "records"}
                    </Text>
                </View>

                <View style={styles.headerIcon}>
                    <FolderOpen size={20} color="#2563EB" />
                </View>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Search size={18} color="#64748B" />

                <TextInput
                    value={searchQuery}
                    onChangeText={onSearchChange}
                    placeholder="Search records..."
                    placeholderTextColor="#94A3B8"
                    style={styles.searchInput}
                />
            </View>

            {/* Records */}
            {filteredRecords.length > 0 ? (
                <View style={styles.list}>
                    {filteredRecords.map((record) => (
                        <MedicalRecordCard
                            key={record.id}
                            record={record}
                            onPress={() => onRecordPress?.(record)}
                        />
                    ))}
                </View>
            ) : (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIcon}>
                        <FileText size={26} color="#2563EB" />
                    </View>

                    <Text style={styles.emptyTitle}>
                        No medical records found
                    </Text>

                    <Text style={styles.emptyText}>
                        Try searching with a different patient name
                        or record title.
                    </Text>
                </View>
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
        color: "#0F172A",
        fontSize: 18,
        fontWeight: "700",
    },

    subtitle: {
        color: "#64748B",
        fontSize: 12,
        marginTop: 4,
    },

    headerIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
    },

    searchContainer: {
        height: 46,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 12,
        paddingHorizontal: 13,
        marginBottom: 16,
    },

    searchInput: {
        flex: 1,
        color: "#0F172A",
        fontSize: 13,
        marginLeft: 9,
        paddingVertical: 0,
    },

    list: {
        width: "100%",
    },

    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 18,
        paddingHorizontal: 25,
        paddingVertical: 40,
    },

    emptyIcon: {
        width: 58,
        height: 58,
        borderRadius: 17,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },

    emptyTitle: {
        color: "#0F172A",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
    },

    emptyText: {
        color: "#64748B",
        fontSize: 12,
        lineHeight: 18,
        textAlign: "center",
        marginTop: 7,
    },
});
