import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import { useRegisterMutation } from "../../../redux/slices/userApislices";
import {
    Building2,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react-native";
import AuthScreen from "./AuthScreen";

export default function OrganizationSignup() {
    const router = useRouter();

    const [register, { isLoading }] = useRegisterMutation();

    const [organizationName, setOrganizationName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignup = async () => {
        setError("");
        setSuccess("");

        if (!organizationName.trim() || !email.trim() || !password) {
            setError("Please fill in all required fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Both passwords must match.");
            return;
        }

        try {
            await register({
                name: organizationName.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                password,
                role: "organization",
            }).unwrap();

            setSuccess(
                "Your organization account has been created. Please log in."
            );
        } catch (err: any) {
            setError(
                err?.data?.message ||
                err?.data?.error ||
                err?.message ||
                "Unable to create organization account."
            );
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <AuthScreen
                title="Register Your Organization"
                subtitle="Create an organization account to manage your healthcare branches."
            >
                <Text style={styles.label}>Organization Name *</Text>
                <View style={styles.inputContainer}>
                    <Building2 size={19} color="#7890A8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter organization name"
                        placeholderTextColor="#A0AEC0"
                        value={organizationName}
                        onChangeText={setOrganizationName}
                        autoCapitalize="words"
                    />
                </View>

                <Text style={styles.label}>Organization Email *</Text>
                <View style={styles.inputContainer}>
                    <Mail size={19} color="#7890A8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter organization email"
                        placeholderTextColor="#A0AEC0"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <Text style={styles.label}>Contact Number</Text>
                <View style={styles.inputContainer}>
                    <Phone size={19} color="#7890A8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter contact number"
                        placeholderTextColor="#A0AEC0"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                </View>

                <Text style={styles.label}>Password *</Text>
                <View style={styles.inputContainer}>
                    <Lock size={19} color="#7890A8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Create password"
                        placeholderTextColor="#A0AEC0"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        hitSlop={10}
                    >
                        {showPassword ? (
                            <EyeOff size={19} color="#7890A8" />
                        ) : (
                            <Eye size={19} color="#7890A8" />
                        )}
                    </Pressable>
                </View>

                <Text style={styles.label}>Confirm Password *</Text>
                <View style={styles.inputContainer}>
                    <Lock size={19} color="#7890A8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm password"
                        placeholderTextColor="#A0AEC0"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <Pressable
                        onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        hitSlop={10}
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={19} color="#7890A8" />
                        ) : (
                            <Eye size={19} color="#7890A8" />
                        )}
                    </Pressable>
                </View>

                {error ? <Text style={styles.error}>{error}</Text> : null}
                {success ? (
                    <Text style={styles.success}>{success}</Text>
                ) : null}

                <Pressable
                    style={[styles.button, isLoading && styles.disabled]}
                    onPress={handleSignup}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {isLoading
                            ? "Creating Account..."
                            : "Create Organization Account"}
                    </Text>
                </Pressable>

                {success ? (
                    <Pressable
                        style={styles.loginButton}
                        onPress={() =>
                            router.replace("/auth/organization-login")
                        }
                    >
                        <Text style={styles.loginButtonText}>
                            Continue to Login
                        </Text>
                    </Pressable>
                ) : null}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already registered?
                    </Text>
                    <Pressable
                        onPress={() =>
                            router.push("/auth/organization-login")
                        }
                    >
                        <Text style={styles.link}> Sign In</Text>
                    </Pressable>
                </View>
            </AuthScreen>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        color: "#334B68",
        fontSize: 13,
        fontWeight: "700",
        marginTop: 12,
        marginBottom: 7,
    },
    inputContainer: {
        minHeight: 49,
        borderWidth: 1,
        borderColor: "#DCE5EF",
        borderRadius: 11,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        backgroundColor: "#F9FBFE",
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: "#17365D",
        paddingVertical: 10,
    },
    error: {
        color: "#DC2626",
        fontSize: 13,
        marginTop: 10,
    },
    success: {
        color: "#15803D",
        fontSize: 13,
        marginTop: 10,
    },
    button: {
        minHeight: 52,
        borderRadius: 11,
        backgroundColor: "#1765C1",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
        marginTop: 21,
    },
    disabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "800",
        textAlign: "center",
    },
    loginButton: {
        height: 48,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#1765C1",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
    },
    loginButtonText: {
        color: "#1765C1",
        fontSize: 14,
        fontWeight: "800",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 19,
    },
    footerText: {
        color: "#718096",
        fontSize: 13,
    },
    link: {
        color: "#1765C1",
        fontSize: 13,
        fontWeight: "800",
    },
});