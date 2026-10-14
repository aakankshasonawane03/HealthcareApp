import { router } from "expo-router";
import { ArrowLeft, Mail } from "lucide-react-native";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");

    const handleResetPassword = () => {
        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email address.");
            return;
        }

        Alert.alert(
            "Reset Link Sent",
            "If this email is registered, you will receive a password reset link."
        );
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <ArrowLeft size={22} color="#111827" />
            </Pressable>

            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Mail size={30} color="#2563EB" />
                </View>

                <Text style={styles.title}>Forgot Password?</Text>

                <Text style={styles.subtitle}>
                    Enter your email address and we'll send you a link to reset your
                    password.
                </Text>

                <Text style={styles.label}>Email Address</Text>

                <View style={styles.inputContainer}>
                    <Mail size={20} color="#6B7280" />

                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <Pressable
                    style={styles.resetButton}
                    onPress={handleResetPassword}
                >
                    <Text style={styles.resetButtonText}>Send Reset Link</Text>
                </Pressable>

                <Pressable
                    style={styles.backToLogin}
                    onPress={() => router.replace("/auth/login")}
                >
                    <ArrowLeft size={18} color="#2563EB" />

                    <Text style={styles.backToLoginText}>
                        Back to Login
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 24,
        paddingTop: 60,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },

    content: {
        width: "100%",
        maxWidth: 480,
        alignSelf: "center",
        marginTop: 70,
    },

    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#DBEAFE",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 15,
        lineHeight: 23,
        color: "#6B7280",
        marginBottom: 32,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 8,
    },

    inputContainer: {
        height: 52,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        marginBottom: 20,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: "#111827",
    },

    resetButton: {
        height: 52,
        borderRadius: 10,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
    },

    resetButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    backToLogin: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
        gap: 6,
    },

    backToLoginText: {
        color: "#2563EB",
        fontSize: 15,
        fontWeight: "600",
    },
});