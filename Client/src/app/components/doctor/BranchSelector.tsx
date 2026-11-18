
import React from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type ClinicBranch = {
    id: string;
    name: string;
    address?: string;
    city?: string;
};

type BranchSelectorProps = {
    branches: ClinicBranch[];
    selectedBranchId: string | null;
    onSelect: (branch: ClinicBranch) => void;
    loading?: boolean;
};

export default function BranchSelector({
    branches,
    selectedBranchId,
    onSelect,
    loading = false,
}: BranchSelectorProps) {
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.muted}>Loading branches...</Text>
            </View>
        );
    }

    if (!branches.length) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyTitle}>No branches available</Text>
                <Text style={styles.muted}>
                    Create a branch before selecting one.
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            data={branches}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
                const selected = item.id === selectedBranchId;

                return (
                    <TouchableOpacity
                        style={[styles.card, selected && styles.selectedCard]}
                        onPress={() => onSelect(item)}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                    >
                        <View style={styles.row}>
                            <View style={styles.icon}>
                                <Text style={styles.iconText}>
                                    {item.name.charAt(0).toUpperCase()}
                                </Text>
                            </View>

                            <View style={styles.details}>
                                <Text style={styles.name}>{item.name}</Text>
                                {!!item.address && (
                                    <Text style={styles.address}>{item.address}</Text>
                                )}
                                {!!item.city && (
                                    <Text style={styles.address}>{item.city}</Text>
                                )}
                            </View>

                            <View style={[styles.radio, selected && styles.radioSelected]}>
                                {selected && <View style={styles.radioDot} />}
                            </View>
                        </View>

                        {selected && (
                            <Text style={styles.selectedLabel}>Currently selected</Text>
                        )}
                    </TouchableOpacity>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    center: {
        padding: 24,
        alignItems: "center",
    },
    muted: {
        marginTop: 8,
        color: "#64748B",
        textAlign: "center",
    },
    empty: {
        padding: 24,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        alignItems: "center",
    },
    emptyTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#172554",
    },
    list: {
        paddingBottom: 16,
        gap: 12,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    selectedCard: {
        borderColor: "#2563EB",
        backgroundColor: "#EFF6FF",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    icon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#DBEAFE",
        alignItems: "center",
        justifyContent: "center",
    },
    iconText: {
        color: "#1D4ED8",
        fontSize: 20,
        fontWeight: "700",
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "700",
        color: "#172554",
    },
    address: {
        marginTop: 4,
        fontSize: 13,
        color: "#64748B",
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: "#94A3B8",
        alignItems: "center",
        justifyContent: "center",
    },
    radioSelected: {
        borderColor: "#2563EB",
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#2563EB",
    },
    selectedLabel: {
        marginTop: 12,
        color: "#1D4ED8",
        fontSize: 12,
        fontWeight: "700",
    },
});
