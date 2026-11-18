
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
} from "react-native";
import PatientProfile from "../components/patient/profile/PatientProfile";
import {
    CalendarDays,
    FileText,
    User,
    Clock,
    HeartPulse,
    Search,
} from "lucide-react-native";

import BottomNavbar, {
    PatientTab,
} from "../components/patient/BottomNavbar";
import PatientDashboard from "../components/patient/PatientDashboard";

const BLUE = "#2563EB";

function PageHeader({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
}

function EmptyState({
    icon,
    title,
    message,
    buttonText,
    onPress,
}: {
    icon: React.ReactNode;
    title: string;
    message: string;
    buttonText: string;
    onPress: () => void;
}) {
    return (
        <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>{icon}</View>
            <Text style={styles.emptyTitle}>{title}</Text>
            <Text style={styles.emptyMessage}>{message}</Text>

            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.pressed,
                ]}
            >
                <Text style={styles.primaryButtonText}>
                    {buttonText}
                </Text>
            </Pressable>
        </View>
    );
}

function AppointmentsScreen({
    onFindDoctor,
}: {
    onFindDoctor: () => void;
}) {
    return (
        <ScrollView
            style={styles.page}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <PageHeader
                title="My Appointments"
                subtitle="View and manage your doctor visits."
            />

            <View style={styles.infoCard}>
                <CalendarDays size={25} color={BLUE} />
                <View style={styles.infoText}>
                    <Text style={styles.cardTitle}>
                        Your appointments
                    </Text>
                    <Text style={styles.cardDescription}>
                        Your booked appointments will appear here.
                    </Text>
                </View>
            </View>

            <EmptyState
                icon={<Clock size={30} color={BLUE} />}
                title="No appointments to show"
                message="Find a doctor to get started with your next appointment."
                buttonText="Find a Doctor"
                onPress={onFindDoctor}
            />
        </ScrollView>
    );
}

function RecordsScreen() {
    return (
        <ScrollView
            style={styles.page}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <PageHeader
                title="Medical Records"
                subtitle="Keep your health information in one place."
            />

            <View style={styles.infoCard}>
                <FileText size={25} color={BLUE} />
                <View style={styles.infoText}>
                    <Text style={styles.cardTitle}>
                        Your health records
                    </Text>
                    <Text style={styles.cardDescription}>
                        View your available medical documents and reports.
                    </Text>
                </View>
            </View>

            <EmptyState
                icon={<HeartPulse size={30} color={BLUE} />}
                title="No records to show"
                message="Medical records and reports will appear here when available."
                buttonText="View Home"
                onPress={() => { }}
            />
        </ScrollView>
    );
}

function ProfileScreen() {
    return (
        <ScrollView
            style={styles.page}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <PageHeader
                title="My Profile"
                subtitle="Your personal account overview."
            />

            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <User size={34} color={BLUE} />
                </View>

                <Text style={styles.profileTitle}>
                    Patient Profile
                </Text>
                <Text style={styles.cardDescription}>
                    Your account details can be displayed here.
                </Text>
            </View>

            <View style={styles.infoCard}>
                <User size={23} color={BLUE} />
                <View style={styles.infoText}>
                    <Text style={styles.cardTitle}>
                        Personal information
                    </Text>
                    <Text style={styles.cardDescription}>
                        Connect this section to your saved patient details
                        to show your name and contact information.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default function PatientRoute() {
    const [activeTab, setActiveTab] =
        useState<PatientTab>("home");

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return (
                    <PatientDashboard
                        onOpenProfile={() => setActiveTab("profile")}
                        onOpenRecords={() => setActiveTab("records")}
                    />
                );



            case "appointments":
                return (
                    <AppointmentsScreen
                        onFindDoctor={() => setActiveTab("home")}
                    />
                );

            case "records":
                return <RecordsScreen />;

            case "profile":
                return <ProfileScreen />;

            default:
                return (
                    <PatientDashboard
                        onOpenProfile={() => setActiveTab("profile")}
                        onOpenRecords={() => setActiveTab("records")}
                    />
                );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.screen}>
                {renderContent()}
            </View>

            <BottomNavbar
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    screen: {
        flex: 1,
        paddingBottom: 92,
    },
    page: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 24,
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#0F172A",
        marginBottom: 7,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 21,
        color: "#64748B",
    },
    infoCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#FFFFFF",
        padding: 18,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 20,
        gap: 14,
    },
    infoText: {
        flex: 1,
    },
    cardTitle: {
        color: "#0F172A",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 6,
    },
    cardDescription: {
        color: "#64748B",
        fontSize: 13,
        lineHeight: 20,
    },
    emptyCard: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 22,
        paddingVertical: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    emptyIcon: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        textAlign: "center",
        marginBottom: 8,
    },
    emptyMessage: {
        fontSize: 14,
        lineHeight: 21,
        color: "#64748B",
        textAlign: "center",
        marginBottom: 20,
    },
    primaryButton: {
        backgroundColor: BLUE,
        paddingHorizontal: 22,
        paddingVertical: 13,
        borderRadius: 12,
        alignItems: "center",
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 14,
    },
    pressed: {
        opacity: 0.75,
    },
    profileCard: {
        alignItems: "center",
        padding: 24,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 20,
        marginBottom: 20,
    },
    avatar: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 14,
    },
    profileTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 7,
    },
});
