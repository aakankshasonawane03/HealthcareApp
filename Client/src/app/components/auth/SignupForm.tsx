
import { router } from "expo-router";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    User,
} from "lucide-react-native";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useDispatch } from "react-redux";
import  { setCredentials } from "../../../redux/slices/authSlice";
import { useRegisterMutation } from "@/redux/slices/userApislices";

export default function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const [register] = useRegisterMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [error, setError] = useState("");

    const handleSignup = () => {
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
        const response = register({ name, email, password });
        console.log("response", response);
        dispatch(setCredentials(response));

        router.replace("/main/dashboard");
    };

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
                <View style={styles.logoContainer}>
                    <View style={styles.logoCircle}>
                        <Text style={styles.logoText}>H</Text>
                    </View>

                    <Text style={styles.appName}>HealthCare</Text>

                    <Text style={styles.subtitle}>
                        Create your healthcare account
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Create Account</Text>

                    <Text style={styles.description}>
                        Sign up to get started
                    </Text>

                    {/* Name */}
                    <Text style={styles.label}>Full Name</Text>

                    <View style={styles.inputContainer}>
                        <User size={20} color="#64748B" />

                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full name"
                            placeholderTextColor="#94A3B8"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
                    </View>

                    {/* Email */}
                    <Text style={styles.label}>Email</Text>

                    <View style={styles.inputContainer}>
                        <Mail size={20} color="#64748B" />

                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#94A3B8"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    {/* Password */}
                    <Text style={styles.label}>Password</Text>

                    <View style={styles.inputContainer}>
                        <Lock size={20} color="#64748B" />

                        <TextInput
                            style={styles.input}
                            placeholder="Create a password"
                            placeholderTextColor="#94A3B8"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />

                        <Pressable
                            onPress={() =>
                                setShowPassword(!showPassword)
                            }
                            hitSlop={10}
                        >
                            {showPassword ? (
                                <EyeOff size={20} color="#64748B" />
                            ) : (
                                <Eye size={20} color="#64748B" />
                            )}
                        </Pressable>
                    </View>

                    {/* Confirm Password */}
                    <Text style={styles.label}>Confirm Password</Text>

                    <View style={styles.inputContainer}>
                        <Lock size={20} color="#64748B" />

                        <TextInput
                            style={styles.input}
                            placeholder="Confirm your password"
                            placeholderTextColor="#94A3B8"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize="none"
                        />

                        <Pressable
                            onPress={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            hitSlop={10}
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={20} color="#64748B" />
                            ) : (
                                <Eye size={20} color="#64748B" />
                            )}
                        </Pressable>
                    </View>

                    {error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : null}

                    <Pressable
                        style={styles.signupButton}
                        onPress={handleSignup}
                    >
                        <Text style={styles.signupButtonText}>
                            Create Account
                        </Text>
                    </Pressable>

                    <View style={styles.loginRow}>
                        <Text style={styles.loginText}>
                            Already have an account?
                        </Text>

                        <Pressable
                            onPress={() => router.replace("/auth/login")}
                        >
                            <Text style={styles.loginLink}>
                                {" "}Sign In
                            </Text>
                        </Pressable>
                    </View>
                </View>
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
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },

    logoCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    logoText: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "700",
    },

    appName: {
        fontSize: 27,
        fontWeight: "700",
        color: "#0F172A",
    },

    subtitle: {
        marginTop: 5,
        fontSize: 14,
        color: "#64748B",
    },

    formContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    title: {
        fontSize: 25,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 6,
    },

    description: {
        fontSize: 14,
        color: "#64748B",
        marginBottom: 18,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
        marginTop: 10,
        marginBottom: 8,
    },

    inputContainer: {
        height: 52,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        backgroundColor: "#FFFFFF",
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: "#0F172A",
    },

    errorText: {
        color: "#DC2626",
        fontSize: 13,
        marginTop: 10,
    },

    signupButton: {
        height: 52,
        borderRadius: 12,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },

    signupButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    loginRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 22,
    },

    loginText: {
        color: "#64748B",
        fontSize: 14,
    },

    loginLink: {
        color: "#2563EB",
        fontSize: 14,
        fontWeight: "700",
    },
});

