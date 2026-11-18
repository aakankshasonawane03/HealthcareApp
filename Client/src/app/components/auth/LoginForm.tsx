import { router } from "expo-router";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
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
import { useLoginMutation } from "@/redux/slices/userApislices";
import { setCredentials } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import AuthScreen from "./AuthScreen";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        setError("");

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!password) {
            setError("Please enter your password.");
            return;
        }

        try {
            const response = await login({
                email: email.trim(),
                password,
            }).unwrap();

            if (!response?.success) {
                setError(response?.message || "Login failed.");
                return;
            }

            dispatch(
                setCredentials({
                    user: response.user,
                    accessToken: response.access_token,
                    refreshToken: response.refresh_token,
                })
            );

            const role = String(response?.user?.role || "").toLowerCase();

            const dashboardRoutes: Record<string, string> = {
                patient: "/main/patient",
                receptionist: "/main/reception",
                doctor: "/main/doctor",
                organization: "/main/organization",
            };

            router.replace(
                (dashboardRoutes[role] || "/main/dashboard") as any
            );
        } catch (err: any) {
            console.error("Login failed:", err?.data || err);

            setError(
                err?.data?.message ||
                err?.data?.error ||
                "Login failed. Please check your credentials."
            );
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <AuthScreen
                title="Welcome Back!"
                subtitle="Sign in to continue to your healthcare account."
            >
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
                        placeholder="Enter your password"
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
                    <Text style={styles.footerText}>
                        Don't have an account?
                    </Text>
                    <Pressable onPress={() => router.push("/auth/signup")}>
                        <Text style={styles.link}> Sign Up</Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Are you an organization?
                    </Text>
                    <Pressable
                        onPress={() =>
                            router.push("/auth/organization-login")
                        }
                    >
                        <Text style={styles.link}> Organization Login</Text>
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
        marginTop: 13,
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
    forgot: {
        alignSelf: "flex-end",
        marginTop: 13,
    },
    forgotText: {
        color: "#1765C1",
        fontSize: 13,
        fontWeight: "700",
    },
    error: {
        color: "#DC2626",
        fontSize: 13,
        marginTop: 10,
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