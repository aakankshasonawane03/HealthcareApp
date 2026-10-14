import { usePathname, useRouter } from "expo-router";
import {
    LayoutDashboard,
    UserRound,
    Users,
} from "lucide-react-native";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function BottomNavbar() {
    const router = useRouter();
    const pathname = usePathname();

    const isDashboard = pathname === "/main/dashboard";
    const isPatient = pathname === "/main/patient";
    const isDoctor = pathname === "/main/doctor";

    return (
        <View style={styles.container}>

            {/* Dashboard */}
            <Pressable
                style={styles.item}
                onPress={() =>
                    router.push("/main/dashboard")
                }
            >
                <View
                    style={[
                        styles.iconContainer,
                        isDashboard &&
                        styles.iconContainerActive,
                    ]}
                >
                    <LayoutDashboard
                        size={22}
                        color={
                            isDashboard
                                ? "#2563EB"
                                : "#64748B"
                        }
                    />
                </View>

                <Text
                    style={[
                        styles.text,
                        isDashboard &&
                        styles.textActive,
                    ]}
                >
                    Dashboard
                </Text>
            </Pressable>

            {/* Patients */}
            <Pressable
                style={styles.item}
                onPress={() =>
                    router.push("/main/patient")
                }
            >
                <View
                    style={[
                        styles.iconContainer,
                        isPatient &&
                        styles.iconContainerActive,
                    ]}
                >
                    <Users
                        size={22}
                        color={
                            isPatient
                                ? "#2563EB"
                                : "#64748B"
                        }
                    />
                </View>

                <Text
                    style={[
                        styles.text,
                        isPatient &&
                        styles.textActive,
                    ]}
                >
                    Patients
                </Text>
            </Pressable>

            {/* Doctors */}
            <Pressable
                style={styles.item}
                onPress={() =>
                    router.push("/main/doctor")
                }
            >
                <View
                    style={[
                        styles.iconContainer,
                        isDoctor &&
                        styles.iconContainerActive,
                    ]}
                >
                    <UserRound
                        size={22}
                        color={
                            isDoctor
                                ? "#2563EB"
                                : "#64748B"
                        }
                    />
                </View>

                <Text
                    style={[
                        styles.text,
                        isDoctor &&
                        styles.textActive,
                    ]}
                >
                    Doctors
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 72,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 10,
    },

    item: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    iconContainer: {
        width: 36,
        height: 32,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 3,
    },

    iconContainerActive: {
        backgroundColor: "#EFF6FF",
    },

    text: {
        fontSize: 10,
        color: "#64748B",
        fontWeight: "500",
    },

    textActive: {
        color: "#2563EB",
        fontWeight: "700",
    },
});