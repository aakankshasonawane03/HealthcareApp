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
import { useDispatch } from "react-redux";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";

import { useLoginMutation } from "../../../redux/slices/userApislices";
import { setCredentials } from "../../../redux/slices/authSlice";
import AuthScreen from "./AuthScreen";

export default function OrganizationLogin() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            const response = await login({
                email: email.trim().toLowerCase(),
                password,
            }).unwrap();

            const user = response?.user ?? response;
            const role = String(user?.role ?? "").toLowerCase();

            if (role !== "organization") {
                setError(
                    "Access denied. This page is only for organization accounts."
                );
                return;
            }

            dispatch(setCredentials(response));
            router.replace("/main/organization");
        } catch (err: any) {
            setError(
                err?.data?.message ||
                err?.data?.error ||
                err?.message ||
                "Invalid email or password."
            );
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <AuthScreen
                title="Organization Login"
                subtitle="Sign in to manage your healthcare organization and branches."
            >
                <Text style={styles.label}>Organization Email</Text>
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

                <Text style={styles.label}>Password</Text>
                <View style={styles.inputContainer}>
                    <Lock size={19} color="#7890A8" />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
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

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <Pressable
                    style={styles.forgot}
                    onPress={() => router.push("/auth/forgot-password")}
                >
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, isLoading && styles.disabled]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? "Signing In..." : "Sign In"}
                    </Text>
                </Pressable>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>New organization?</Text>
                    <Pressable
                        onPress={() =>
                            router.push("/auth/organization-signup")
                        }
                    >
                        <Text style={styles.link}> Create Account</Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not an organization?</Text>
                    <Pressable
                        onPress={() => router.push("/auth/login")}
                    >
                        <Text style={styles.link}> User Login</Text>
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
        marginTop: 14,
        marginBottom: 8,
    },
    inputContainer: {
        minHeight: 53,
        borderWidth: 1,
        borderColor: "#DCE5EF",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        backgroundColor: "#F9FBFE",
    },
    input: {
        flex: 1,
        marginLeft: 11,
        fontSize: 14,
        color: "#17365D",
        paddingVertical: 12,
    },
    error: {
        color: "#DC2626",
        fontSize: 13,
        marginTop: 10,
    },
    forgot: {
        alignSelf: "flex-end",
        marginTop: 13,
    },
    forgotText: {
        color: "#1765C1",
        fontSize: 13,
        fontWeight: "700",
    },
    button: {
        height: 53,
        borderRadius: 12,
        backgroundColor: "#1765C1",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 23,
    },
    disabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
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