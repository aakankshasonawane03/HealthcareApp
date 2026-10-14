
import { router } from "expo-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
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

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = () => {
        setError("");

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password.");
            return;
        }

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
                        Your health, our priority
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.title}>Welcome Back</Text>

                    <Text style={styles.description}>
                        Sign in to continue to your account
                    </Text>

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

                    <Text style={styles.label}>Password</Text>

                    <View style={styles.inputContainer}>
                        <Lock size={20} color="#64748B" />

                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#94A3B8"
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
                        style={styles.forgotButton}
                        onPress={() => router.push("/auth/forgot-password")}
                    >
                        <Text style={styles.forgotText}>
                            Forgot Password?
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginButtonText}>
                            Sign In
                        </Text>
                    </Pressable>

                    <View style={styles.signupRow}>
                        <Text style={styles.signupText}>
                            Don't have an account?
                        </Text>

                        <Pressable
                            onPress={() => router.push("/auth/signup")}
                        >
                            <Text style={styles.signupLink}>
                                {" "}Sign Up
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
        marginBottom: 35,
    },

    logoCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },

    logoText: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "700",
    },

    appName: {
        fontSize: 28,
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
        marginBottom: 25,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#334155",
        marginBottom: 8,
        marginTop: 10,
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

    forgotButton: {
        alignSelf: "flex-end",
        marginTop: 12,
    },

    forgotText: {
        color: "#2563EB",
        fontSize: 13,
        fontWeight: "600",
    },

    loginButton: {
        height: 52,
        borderRadius: 12,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },

    loginButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    signupRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 22,
    },

    signupText: {
        color: "#64748B",
        fontSize: 14,
    },

    signupLink: {
        color: "#2563EB",
        fontSize: 14,
        fontWeight: "700",
    },
});

