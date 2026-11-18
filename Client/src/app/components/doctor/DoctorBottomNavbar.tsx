
import React from "react";
import { usePathname, useRouter } from "expo-router";
import {
    CalendarDays,
    ClipboardList,
    Home,
    UserRound,
    Users,
} from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const tabs = [
    { label: "Home", path: "/main/doctor", Icon: Home },
    { label: "Appointments", path: "/main/doctor-appointments", Icon: CalendarDays },
    { label: "Patients", path: "/main/doctor-patients", Icon: Users },
    { label: "Records", path: "/main/doctor-records", Icon: ClipboardList },
    { label: "Profile", path: "/main/doctor-profile", Icon: UserRound },
];

export default function DoctorBottomNavbar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View style={styles.container}>
            {tabs.map(({ label, path, Icon }) => {
                const active = pathname === path;

                return (
                    <TouchableOpacity
                        key={path}
                        style={styles.tab}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={label}
                        onPress={() => router.replace(path as any)}
                    >
                        <View style={[styles.iconBox, active && styles.activeIconBox]}>
                            <Icon
                                size={21}
                                color={active ? "#2563EB" : "#64748B"}
                                strokeWidth={active ? 2.5 : 1.8}
                            />
                        </View>
                        <Text style={[styles.label, active && styles.activeLabel]}>
                            {label}
                        </Text>
                        {active && <View style={styles.indicator} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        paddingTop: 8,
        paddingBottom: 8,
        minHeight: 68,
        elevation: 10,
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
    },
    iconBox: {
        width: 36,
        height: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    activeIconBox: {
        backgroundColor: "#DBEAFE",
    },
    label: {
        fontSize: 10,
        color: "#64748B",
        marginTop: 3,
        fontWeight: "500",
    },
    activeLabel: {
        color: "#2563EB",
        fontWeight: "700",
    },
    indicator: {
        position: "absolute",
        bottom: -8,
        width: 18,
        height: 3,
        borderRadius: 2,
        backgroundColor: "#2563EB",
    },
});
