
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import {
    Building2,
    Stethoscope,
    MapPin,
    Phone,
    Mail,
    ArrowLeft,
    CheckCircle2,
} from "lucide-react-native";

type OrganizationType = "Hospital" | "Clinic" | "Healthcare Center" | "Diagnostic Center";

export default function OrganizationRegister() {
    const { doctorName, doctorEmail } = useLocalSearchParams<{
        doctorName: string;
        doctorEmail: string;
    }>();

    // Organization details
    const [organizationName, setOrganizationName] = useState("");
    const [organizationType, setOrganizationType] =
        useState<OrganizationType>("Clinic");
    const [organizationEmail, setOrganizationEmail] = useState("");
    const [organizationPhone, setOrganizationPhone] = useState("");
    const [organizationAddress, setOrganizationAddress] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");

    // Doctor details
    const [specialization, setSpecialization] = useState("");
    const [qualification, setQualification] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");

    // Main branch details
    const [branchName, setBranchName] = useState("");
    const [branchAddress, setBranchAddress] = useState("");
    const [branchPhone, setBranchPhone] = useState("");
    const [branchEmail, setBranchEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const InputField = ({
        label,
        placeholder,
        value,
        onChangeText,
        keyboardType = "default",
        multiline = false,
    }: {
        label: string;
        placeholder: string;
        value: string;
        onChangeText: (value: string) => void;
        keyboardType?: "default" | "email-address" | "phone-pad";
        multiline?: boolean;
    }) => (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[
                    styles.input,
                    multiline && styles.multilineInput,
                ]}
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                multiline={multiline}
                textAlignVertical={multiline ? "top" : "center"}
                autoCapitalize={
                    keyboardType === "email-address" ? "none" : "sentences"
                }
            />
        </View>
    );

    const handleSubmit = () => {
        if (
            !organizationName.trim() ||
            !organizationEmail.trim() ||
            !organizationPhone.trim() ||
            !organizationAddress.trim()
        ) {
            Alert.alert(
                "Missing Organization Details",
                "Please complete all required organization fields."
            );
            return;
        }

        if (!doctorName || !doctorEmail) {
            Alert.alert(
                "Doctor Details Missing",
                "Please register your doctor account again."
            );
            return;
        }

        if (
            !specialization.trim() ||
            !qualification.trim() ||
            !licenseNumber.trim()
        ) {
            Alert.alert(
                "Missing Doctor Details",
                "Please complete your specialization, qualification and license number."
            );
            return;
        }

        if (
            !branchName.trim() ||
            !branchAddress.trim() ||
            !branchPhone.trim()
        ) {
            Alert.alert(
                "Missing Branch Details",
                "Please enter your main branch name, address and phone number."
            );
            return;
        }

        if (
            !/\S+@\S+\.\S+/.test(organizationEmail.trim()) ||
            (branchEmail.trim() &&
                !/\S+@\S+\.\S+/.test(branchEmail.trim()))
        ) {
            Alert.alert("Invalid Email", "Please enter valid email addresses.");
            return;
        }

        if (!/^\+?[0-9\s-]{10,15}$/.test(organizationPhone.trim()) ||
            !/^\+?[0-9\s-]{10,15}$/.test(branchPhone.trim())) {
            Alert.alert("Invalid Phone", "Please enter valid phone numbers.");
            return;
        }

        // Backend API integration will be added in the next step.
        // Do not mark the organization as registered until the API saves it.
        Alert.alert(
            "Organization Form Completed",
            "Your details are ready. The next step is connecting this form to your Go + MongoDB backend so your organization and main branch are saved.",
            [{ text: "OK" }]
        );
    };

    const organizationTypes: OrganizationType[] = [
        "Hospital",
        "Clinic",
        "Healthcare Center",
        "Diagnostic Center",
    ];

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* HEADER */}
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <ArrowLeft size={20} color="#334155" />
                    <Text style={styles.backText}>Back</Text>
                </Pressable>

                <View style={styles.header}>
                    <View style={styles.headerIcon}>
                        <Building2 size={32} color="#2563EB" />
                    </View>

                    <Text style={styles.title}>
                        Register Your Organization
                    </Text>

                    <Text style={styles.subtitle}>
                        Set up your healthcare organization and start
                        managing multiple branches.
                    </Text>
                </View>

                {/* DOCTOR ACCOUNT */}
                <View style={styles.accountCard}>
                    <CheckCircle2 size={20} color="#16A34A" />

                    <View style={{ flex: 1 }}>
                        <Text style={styles.accountTitle}>
                            Doctor Account Created
                        </Text>
                        <Text style={styles.accountText}>
                            {doctorName || "Doctor"}
                        </Text>
                        <Text style={styles.accountText}>
                            {doctorEmail || ""}
                        </Text>
                    </View>
                </View>

                {/* ORGANIZATION DETAILS */}
                <View style={styles.section}>
                    <View style={styles.sectionHeading}>
                        <Building2 size={21} color="#2563EB" />
                        <Text style={styles.sectionTitle}>
                            Organization Details
                        </Text>
                    </View>

                    <InputField
                        label="Organization Name *"
                        placeholder="e.g. City Care Hospital"
                        value={organizationName}
                        onChangeText={setOrganizationName}
                    />

                    <Text style={styles.label}>Organization Type *</Text>

                    <View style={styles.typeContainer}>
                        {organizationTypes.map((type) => (
                            <Pressable
                                key={type}
                                onPress={() => setOrganizationType(type)}
                                style={[
                                    styles.typeOption,
                                    organizationType === type &&
                                    styles.typeOptionSelected,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.typeText,
                                        organizationType === type &&
                                        styles.typeTextSelected,
                                    ]}
                                >
                                    {type}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    <InputField
                        label="Organization Email *"
                        placeholder="organization@example.com"
                        value={organizationEmail}
                        onChangeText={setOrganizationEmail}
                        keyboardType="email-address"
                    />

                    <InputField
                        label="Organization Phone *"
                        placeholder="Enter contact number"
                        value={organizationPhone}
                        onChangeText={setOrganizationPhone}
                        keyboardType="phone-pad"
                    />

                    <InputField
                        label="Organization Address *"
                        placeholder="Enter complete organization address"
                        value={organizationAddress}
                        onChangeText={setOrganizationAddress}
                        multiline
                    />

                    <InputField
                        label="Registration / License Number"
                        placeholder="Enter registration number (if applicable)"
                        value={registrationNumber}
                        onChangeText={setRegistrationNumber}
                    />
                </View>

                {/* DOCTOR DETAILS */}
                <View style={styles.section}>
                    <View style={styles.sectionHeading}>
                        <Stethoscope size={21} color="#2563EB" />
                        <Text style={styles.sectionTitle}>
                            Doctor Professional Details
                        </Text>
                    </View>

                    <InputField
                        label="Doctor Name"
                        placeholder="Doctor name"
                        value={doctorName || ""}
                        onChangeText={() => { }}
                    />

                    <InputField
                        label="Doctor Email"
                        placeholder="Doctor email"
                        value={doctorEmail || ""}
                        onChangeText={() => { }}
                        keyboardType="email-address"
                    />

                    <InputField
                        label="Specialization *"
                        placeholder="e.g. Cardiologist, Dentist"
                        value={specialization}
                        onChangeText={setSpecialization}
                    />

                    <InputField
                        label="Qualification *"
                        placeholder="e.g. MBBS, MD, BDS"
                        value={qualification}
                        onChangeText={setQualification}
                    />

                    <InputField
                        label="Medical License Number *"
                        placeholder="Enter medical registration number"
                        value={licenseNumber}
                        onChangeText={setLicenseNumber}
                    />
                </View>

                {/* MAIN BRANCH */}
                <View style={styles.section}>
                    <View style={styles.sectionHeading}>
                        <MapPin size={21} color="#2563EB" />
                        <Text style={styles.sectionTitle}>
                            Main Branch Details
                        </Text>
                    </View>

                    <Text style={styles.sectionDescription}>
                        This will be your organization's first branch.
                        You can add more branches later.
                    </Text>

                    <InputField
                        label="Branch Name *"
                        placeholder="e.g. Main Branch"
                        value={branchName}
                        onChangeText={setBranchName}
                    />

                    <InputField
                        label="Branch Address *"
                        placeholder="Enter branch address"
                        value={branchAddress}
                        onChangeText={setBranchAddress}
                        multiline
                    />

                    <InputField
                        label="Branch Phone *"
                        placeholder="Enter branch contact number"
                        value={branchPhone}
                        onChangeText={setBranchPhone}
                        keyboardType="phone-pad"
                    />

                    <InputField
                        label="Branch Email"
                        placeholder="branch@example.com"
                        value={branchEmail}
                        onChangeText={setBranchEmail}
                        keyboardType="email-address"
                    />
                </View>

                {/* SUBMIT */}
                <Pressable
                    style={[
                        styles.submitButton,
                        loading && styles.disabledButton,
                    ]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.submitButtonText}>
                        Complete Organization Details
                    </Text>
                </Pressable>

                <Text style={styles.footerText}>
                    Your organization will be managed through your
                    doctor dashboard after successful registration.
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    content: {
        padding: 22,
        paddingBottom: 40,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 22,
    },
    backText: {
        fontSize: 14,
        color: "#334155",
        fontWeight: "600",
    },
    header: {
        alignItems: "center",
        marginBottom: 25,
    },
    headerIcon: {
        width: 70,
        height: 70,
        borderRadius: 20,
        backgroundColor: "#DBEAFE",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        color: "#0F172A",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 21,
        marginTop: 8,
    },
    accountCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 15,
        backgroundColor: "#F0FDF4",
        borderColor: "#BBF7D0",
        borderWidth: 1,
        borderRadius: 14,
        marginBottom: 20,
    },
    accountTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#166534",
        marginBottom: 4,
    },
    accountText: {
        fontSize: 12,
        color: "#475569",
        marginTop: 2,
    },
    section: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 18,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    sectionHeading: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 17,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#0F172A",
    },
    sectionDescription: {
        fontSize: 13,
        color: "#64748B",
        lineHeight: 20,
        marginBottom: 12,
    },
    field: {
        marginBottom: 14,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: "#334155",
        marginBottom: 8,
    },
    input: {
        minHeight: 49,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 10,
        paddingHorizontal: 13,
        fontSize: 14,
        color: "#0F172A",
        backgroundColor: "#FFFFFF",
    },
    multilineInput: {
        minHeight: 85,
        paddingTop: 13,
    },
    typeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
    },
    typeOption: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 20,
        paddingVertical: 9,
        paddingHorizontal: 12,
        backgroundColor: "#FFFFFF",
    },
    typeOptionSelected: {
        backgroundColor: "#EFF6FF",
        borderColor: "#2563EB",
    },
    typeText: {
        fontSize: 12,
        color: "#475569",
        fontWeight: "600",
    },
    typeTextSelected: {
        color: "#2563EB",
    },
    submitButton: {
        minHeight: 54,
        backgroundColor: "#2563EB",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        marginTop: 5,
    },
    submitButtonText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#FFFFFF",
        textAlign: "center",
    },
    disabledButton: {
        opacity: 0.6,
    },
    footerText: {
        textAlign: "center",
        fontSize: 12,
        color: "#64748B",
        lineHeight: 19,
        marginTop: 15,
    },
});
