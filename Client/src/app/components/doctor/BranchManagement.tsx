
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import { apiSlice } from "../../../redux/slices/apiSlice";

type Branch = {
    id?: string;
    _id?: string;
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    phone?: string;
    email?: string;
    is_active?: boolean;
};

const branchApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBranches: builder.query<Branch[], void>({
            query: () => "/clinics/list",
            transformResponse: (response: any) => {
                if (Array.isArray(response)) return response;
                if (Array.isArray(response?.data)) return response.data;
                if (Array.isArray(response?.clinics)) return response.clinics;
                return [];
            },
            providesTags: ["Clinic" as never],
        }),
        createBranch: builder.mutation<Branch, Partial<Branch>>({
            query: (body) => ({
                url: "/clinics/createclinic",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Clinic" as never],
        }),
    }),
    overrideExisting: false,
});

const { useGetBranchesQuery, useCreateBranchMutation } = branchApi;

export default function BranchManagement() {
    const router = useRouter();
    const { data: branches = [], isLoading, error, refetch } =
        useGetBranchesQuery();

    const [createBranch, { isLoading: saving }] = useCreateBranchMutation();
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        email: "",
    });

    const updateField = (key: keyof typeof form, value: string) => {
        setForm((previous) => ({ ...previous, [key]: value }));
    };

    const notify = (message: string) => {
        if (Platform.OS === "web") {
            window.alert(message);
        } else {
            Alert.alert("Branch Management", message);
        }
    };

    const saveBranch = async () => {
        if (
            !form.name.trim() ||
            !form.address.trim() ||
            !form.city.trim() ||
            !form.state.trim() ||
            !form.pincode.trim() ||
            !form.phone.trim()
        ) {
            notify("Please fill in all required fields.");
            return;
        }

        try {
            await createBranch({
                name: form.name.trim(),
                address: form.address.trim(),
                city: form.city.trim(),
                state: form.state.trim(),
                pincode: form.pincode.trim(),
                phone: form.phone.trim(),
                email: form.email.trim(),
                is_active: true,
            }).unwrap();

            setForm({
                name: "",
                address: "",
                city: "",
                state: "",
                pincode: "",
                phone: "",
                email: "",
            });
            setShowForm(false);
            notify("Branch created successfully.");
        } catch (e: any) {
            notify(
                e?.data?.message ||
                e?.data?.error ||
                "Could not create branch. Please check your API."
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.title}>Branch Management</Text>
                    <Text style={styles.subtitle}>Manage your clinic locations</Text>
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => setShowForm((value) => !value)}
                >
                    <Text style={styles.addButtonText}>
                        {showForm ? "Cancel" : "+ Add Branch"}
                    </Text>
                </TouchableOpacity>
            </View>

            {showForm && (
                <View style={styles.form}>
                    <Text style={styles.formTitle}>New Branch</Text>

                    {(
                        [
                            ["name", "Branch name *"],
                            ["address", "Full address *"],
                            ["city", "City *"],
                            ["state", "State *"],
                            ["pincode", "PIN code *"],
                            ["phone", "Phone number *"],
                            ["email", "Email (optional)"],
                        ] as [keyof typeof form, string][]
                    ).map(([key, placeholder]) => (
                        <TextInput
                            key={key}
                            style={styles.input}
                            placeholder={placeholder}
                            value={form[key]}
                            onChangeText={(value) => updateField(key, value)}
                            keyboardType={
                                key === "phone" || key === "pincode"
                                    ? "phone-pad"
                                    : key === "email"
                                        ? "email-address"
                                        : "default"
                            }
                            autoCapitalize={key === "email" ? "none" : "sentences"}
                        />
                    ))}

                    <TouchableOpacity
                        style={[styles.addButton, saving && styles.disabled]}
                        onPress={saveBranch}
                        disabled={saving}
                    >
                        <Text style={styles.addButtonText}>
                            {saving ? "Saving..." : "Save Branch"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.summary}>
                <Text style={styles.summaryLabel}>Branches returned by API</Text>
                <Text style={styles.count}>{branches.length}</Text>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#2563EB" />
            ) : error ? (
                <View style={styles.empty}>
                    <Text style={styles.errorText}>Could not load branches.</Text>
                    <TouchableOpacity onPress={() => refetch()}>
                        <Text style={styles.link}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={branches}
                    keyExtractor={(item, index) =>
                        String(item.id || item._id || index)
                    }
                    contentContainerStyle={styles.list}
                    onRefresh={refetch}
                    refreshing={isLoading}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Text style={styles.emptyTitle}>No branches found</Text>
                            <Text style={styles.subtitle}>
                                Add a branch to get started.
                            </Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.branchCard}
                            activeOpacity={0.8}
                            onPress={() =>
                                router.push({
                                    pathname: "/main/branches",
                                    params: {
                                        branchId: String(item.id || item._id || ""),
                                        branchName: item.name || "Branch",
                                        address: item.address || "",
                                        city: item.city || "",
                                    },
                                })
                            }
                        >
                            <View style={styles.branchIcon}>
                                <Text style={styles.branchIconText}>
                                    {(item.name || "B").charAt(0).toUpperCase()}
                                </Text>
                            </View>

                            <View style={styles.branchDetails}>
                                <Text style={styles.branchName}>
                                    {item.name || "Unnamed Branch"}
                                </Text>
                                <Text style={styles.branchAddress}>
                                    {[item.address, item.city, item.state, item.pincode]
                                        .filter(Boolean)
                                        .join(", ")}
                                </Text>
                                {!!item.phone && (
                                    <Text style={styles.branchMeta}>Phone: {item.phone}</Text>
                                )}
                                <Text style={styles.link}>View Branch Details →</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 400,
        padding: 20,
        backgroundColor: "#F5F7FB",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 20,
    },
    headerText: { flexShrink: 1 },
    title: { fontSize: 24, fontWeight: "700", color: "#172554" },
    subtitle: { marginTop: 5, fontSize: 14, color: "#64748B" },
    addButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    addButtonText: { color: "#FFFFFF", fontWeight: "700" },
    disabled: { opacity: 0.6 },
    form: {
        padding: 18,
        marginBottom: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        gap: 12,
    },
    formTitle: { fontSize: 18, fontWeight: "700", color: "#172554" },
    input: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 9,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 15,
        backgroundColor: "#FFFFFF",
        color: "#0F172A",
    },
    summary: {
        backgroundColor: "#FFFFFF",
        padding: 18,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 16,
    },
    summaryLabel: { color: "#64748B", fontSize: 14 },
    count: {
        fontSize: 30,
        fontWeight: "700",
        color: "#2563EB",
        marginTop: 6,
    },
    list: { gap: 12, paddingBottom: 24 },
    branchCard: {
        flexDirection: "row",
        gap: 14,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    branchIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#DBEAFE",
        alignItems: "center",
        justifyContent: "center",
    },
    branchIconText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1D4ED8",
    },
    branchDetails: { flex: 1, gap: 5 },
    branchName: { fontSize: 17, fontWeight: "700", color: "#0F172A" },
    branchAddress: { fontSize: 14, lineHeight: 20, color: "#475569" },
    branchMeta: { fontSize: 13, color: "#64748B" },
    link: { marginTop: 8, color: "#2563EB", fontSize: 13, fontWeight: "700" },
    empty: {
        padding: 24,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        gap: 8,
    },
    emptyTitle: { fontSize: 17, fontWeight: "700", color: "#172554" },
    errorText: { color: "#991B1B" },
});
