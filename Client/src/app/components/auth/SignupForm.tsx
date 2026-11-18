import { router } from "expo-router";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
    Stethoscope,
    ClipboardList,
} from "lucide-react-native";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../redux/slices/authSlice";
import { useRegisterMutation } from "@/redux/slices/userApislices";
import AuthScreen from "./AuthScreen";

type UserRole = "patient" | "receptionist" | "doctor";

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<UserRole | "">("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const handleSignup = async () => {
        setError("");

        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!password.trim()) {
            setError("Please enter a password.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!role) {
            setError("Please select your registration role.");
            return;
        }

        try {
            const response = await register({
                name: name.trim(),
                email: email.trim(),
                password,
                role,
            }).unwrap();

            console.log("Registration successful:", response);

            dispatch(setCredentials(response));

            const dashboardRoutes: Record<UserRole, string> = {
                patient: "/main/patient",
                receptionist: "/main/receptionist",
                doctor: "/main/doctor",
            };

            router.replace(dashboardRoutes[role] as any);
        } catch (err: any) {
            console.error("Registration failed:", err);

            setError(
                err?.data?.message ||
                err?.data?.error ||
                err?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    const renderRoleOption = (
        value: UserRole,
        title: string,
        description: string
    ) => {
        const selected = role === value;

        const Icon =
            value === "patient"
                ? User
                : value === "receptionist"
                    ? ClipboardList
                    : Stethoscope;

        return (
            <Pressable
                key={value}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                onPress={() => {
                    setRole(value);
                    setError("");
                }}
                style={[
                    styles.roleOption,
                    selected && styles.roleSelected,
                ]}
            >
                <View style={styles.roleIcon}>
                    <Icon
                        size={21}
                        color={selected ? "#1765C1" : "#7890A8"}
                    />
                </View>

                <View style={styles.roleText}>
                    <Text style={styles.roleTitle}>{title}</Text>
                    <Text style={styles.roleDescription}>
                        {description}
                    </Text>
                </View>

                <View style={styles.radioOuter}>
                    {selected && <View style={styles.radioInner} />}
                </View>
            </Pressable>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <AuthScreen
                title="Create Your Account"
                subtitle="Join our healthcare platform and get started."
            >
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputContainer}>
                    <User size={19} color="#7890A8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your full name"
                        placeholderTextColor="#A0AEC0"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />
                </View>

                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputContainer}>
                    <Mail size={19} color="#7890A8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#A0AEC0"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                    <Lock size={19} color="#7890A8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Create a password"
                        placeholderTextColor="#A0AEC0"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
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

                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.inputContainer}>
                    <Lock size={19} color="#7890A8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your password"
                        placeholderTextColor="#A0AEC0"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
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

                <Text style={styles.label}>Select Your Role</Text>

                {renderRoleOption(
                    "patient",
                    "Patient",
                    "Appointments and health records"
                )}
                {renderRoleOption(
                    "receptionist",
                    "Receptionist",
                    "Patient registration and appointments"
                )}
                {renderRoleOption(
                    "doctor",
                    "Doctor",
                    "Clinical and patient management"
                )}

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <Pressable
                    style={[styles.button, isLoading && styles.disabled]}
                    onPress={handleSignup}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </Text>
                </Pressable>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?
                    </Text>
                    <Pressable onPress={() => router.replace("/auth/login")}>
                        <Text style={styles.link}> Sign In</Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Registering an organization?
                    </Text>
                    <Pressable
                        onPress={() =>
                            router.push("/auth/organization-signup")
                        }
                    >
                        <Text style={styles.link}> Organization Signup</Text>
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
    roleOption: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DCE5EF",
        borderRadius: 11,
        padding: 10,
        marginTop: 8,
        backgroundColor: "#FFFFFF",
    },
    roleSelected: {
        borderColor: "#1765C1",
        backgroundColor: "#EFF6FF",
    },
    roleIcon: {
        width: 39,
        height: 39,
        borderRadius: 10,
        backgroundColor: "#EDF4FC",
        alignItems: "center",
        justifyContent: "center",
    },
    roleText: {
        flex: 1,
        marginLeft: 11,
    },
    roleTitle: {
        color: "#17365D",
        fontWeight: "700",
        fontSize: 13,
    },
    roleDescription: {
        color: "#718096",
        fontSize: 11,
        marginTop: 3,
    },
    radioOuter: {
        height: 19,
        width: 19,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#94A3B8",
        justifyContent: "center",
        alignItems: "center",
    },
    radioInner: {
        height: 9,
        width: 9,
        borderRadius: 5,
        backgroundColor: "#1765C1",
    },
    error: {
        color: "#DC2626",
        fontSize: 13,
        marginTop: 10,
    },
    button: {
        height: 51,
        borderRadius: 11,
        backgroundColor: "#1765C1",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    disabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "800",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 17,
    },
    footerText: {
        color: "#718096",
        fontSize: 12,
    },
    link: {
        color: "#1765C1",
        fontSize: 12,
        fontWeight: "800",
    },
});