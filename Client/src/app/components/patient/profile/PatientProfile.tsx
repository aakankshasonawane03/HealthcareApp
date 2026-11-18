
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import {
    UserRound,
    Mail,
    Phone,
    CalendarDays,
    MapPin,
    Droplets,
    ShieldCheck,
    HeartPulse,
    IdCard,
    PhoneCall,
} from "lucide-react-native";

const BLUE = "#2563EB";

export default function PatientProfile() {
    const userInfo = useSelector(
        (state: any) => state.auth?.userInfo
    );

    // Support common login response structures.
    const patient =
        userInfo?.patient ??
        userInfo?.user ??
        userInfo?.Patient ??
        userInfo ??
        {};

    const firstName = patient.FirstName ?? patient.firstName ?? "";
    const lastName = patient.LastName ?? patient.lastName ?? "";

    const fullName =
        patient.FullName ??
        patient.fullName ??
        patient.name ??
        `${firstName} ${lastName}`.trim() ??
        "Patient";

    const email = patient.Email ?? patient.email ?? "Not added";
    const phone = patient.Phone ?? patient.phone ?? "Not added";
    const gender = patient.Gender ?? patient.gender ?? "Not added";
    const dob = patient.DateOfBirth ?? patient.dateOfBirth ?? "Not added";
    const bloodGroup = patient.BloodGroup ?? patient.bloodGroup ?? "Not added";
    const address = patient.Address ?? patient.address ?? "Not added";
    const emergency = patient.EmergencyContact ?? patient.emergencyContact ?? "Not added";

    const patientId =
        patient.PatientID ??
        patient.patientId ??
        patient._id ??
        patient.id ??
        "Not available";

    const registered = patient.CreatedAt ?? patient.createdAt ?? "Not available";

    const status =
        patient.IsActive === false || patient.isActive === false
            ? "Inactive"
            : "Active";

    const initial = fullName?.charAt(0)?.toUpperCase() || "P";

    const InfoCard = ({
        icon,
        label,
        value,
    }: {
        icon: React.ReactNode;
        label: string;
        value: string;
    }) => (
        <View style={styles.infoItem}>
            <View style={styles.infoIcon}>{icon}</View>
            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{String(value || "Not added")}</Text>
            </View>
        </View>
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.pageHeading}>
                <Text style={styles.pageTitle}>My Profile</Text>
                <Text style={styles.pageSubtitle}>
                    Manage your personal and healthcare information.
                </Text>
            </View>

            {/* Profile Banner */}
            <View style={styles.banner}>
                <View style={styles.bannerLeft}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{initial}</Text>
                    </View>

                    <View style={styles.bannerInfo}>
                        <Text style={styles.bannerName}>{fullName}</Text>
                        <Text style={styles.bannerEmail}>{email}</Text>

                        <View style={styles.patientBadge}>
                            <ShieldCheck size={14} color={BLUE} />
                            <Text style={styles.patientBadgeText}>
                                PATIENT ACCOUNT
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bannerDecoration}>
                    <HeartPulse size={75} color="#DCE8FF" />
                </View>
            </View>

            {/* Main Information */}
            <View style={styles.mainLayout}>
                <View style={styles.leftColumn}>
                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeading}>
                            <View style={styles.headingIcon}>
                                <UserRound size={21} color="#FFFFFF" />
                            </View>
                            <View>
                                <Text style={styles.sectionTitle}>
                                    Personal Information
                                </Text>
                                <Text style={styles.sectionSubtitle}>
                                    Your personal account details
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoGrid}>
                            <InfoCard
                                icon={<UserRound size={19} color={BLUE} />}
                                label="Full Name"
                                value={fullName}
                            />
                            <InfoCard
                                icon={<Mail size={19} color={BLUE} />}
                                label="Email Address"
                                value={email}
                            />
                            <InfoCard
                                icon={<Phone size={19} color={BLUE} />}
                                label="Phone Number"
                                value={phone}
                            />
                            <InfoCard
                                icon={<UserRound size={19} color={BLUE} />}
                                label="Gender"
                                value={gender}
                            />
                            <InfoCard
                                icon={<CalendarDays size={19} color={BLUE} />}
                                label="Date of Birth"
                                value={dob}
                            />
                            <InfoCard
                                icon={<MapPin size={19} color={BLUE} />}
                                label="Address"
                                value={address}
                            />
                        </View>
                    </View>

                    <View style={styles.sectionCard}>
                        <View style={styles.sectionHeading}>
                            <View style={[styles.headingIcon, { backgroundColor: "#16A34A" }]}>
                                <HeartPulse size={21} color="#FFFFFF" />
                            </View>
                            <View>
                                <Text style={styles.sectionTitle}>
                                    Medical Information
                                </Text>
                                <Text style={styles.sectionSubtitle}>
                                    Important healthcare details
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoGrid}>
                            <InfoCard
                                icon={<Droplets size={19} color="#DC2626" />}
                                label="Blood Group"
                                value={bloodGroup}
                            />
                            <InfoCard
                                icon={<PhoneCall size={19} color={BLUE} />}
                                label="Emergency Contact"
                                value={emergency}
                            />
                        </View>
                    </View>
                </View>

                {/* Account Summary */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryHeading}>
                        <IdCard size={22} color={BLUE} />
                        <Text style={styles.summaryTitle}>Account Summary</Text>
                    </View>

                    <SummaryRow label="Patient ID" value={String(patientId)} />
                    <SummaryRow label="Email" value={email} />
                    <SummaryRow label="Phone" value={phone} />
                    <SummaryRow label="Registered" value={String(registered)} />

                    <View style={styles.statusContainer}>
                        <Text style={styles.summaryLabel}>Account Status</Text>
                        <View style={[
                            styles.statusBadge,
                            status === "Inactive" && styles.inactiveBadge
                        ]}>
                            <View style={[
                                styles.statusDot,
                                status === "Inactive" && { backgroundColor: "#DC2626" }
                            ]} />
                            <Text style={[
                                styles.statusText,
                                status === "Inactive" && { color: "#DC2626" }
                            ]}>
                                {status}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.summaryNote}>
                        <ShieldCheck size={19} color="#16A34A" />
                        <Text style={styles.summaryNoteText}>
                            Your healthcare account information is displayed here.
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{ height: 30 }} />
        </ScrollView>
    );
}

function SummaryRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <Text style={styles.summaryValue} numberOfLines={2}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6FC",
    },
    content: {
        padding: 22,
        paddingBottom: 35,
    },
    pageHeading: {
        marginBottom: 22,
    },
    pageTitle: {
        fontSize: 27,
        fontWeight: "800",
        color: "#172033",
    },
    pageSubtitle: {
        color: "#7B8497",
        fontSize: 13,
        marginTop: 6,
    },
    banner: {
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 24,
        minHeight: 180,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: "#E8EBF4",
        overflow: "hidden",
        justifyContent: "center",
    },
    bannerLeft: {
        flexDirection: "row",
        alignItems: "center",
        zIndex: 2,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#E8F0FF",
        borderWidth: 4,
        borderColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
    },
    avatarText: {
        fontSize: 35,
        color: BLUE,
        fontWeight: "800",
    },
    bannerInfo: {
        marginLeft: 18,
        flex: 1,
    },
    bannerName: {
        fontSize: 25,
        fontWeight: "800",
        color: "#111827",
    },
    bannerEmail: {
        fontSize: 13,
        color: "#778195",
        marginTop: 5,
    },
    patientBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#EFF5FF",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 7,
        marginTop: 12,
        gap: 6,
    },
    patientBadgeText: {
        color: BLUE,
        fontWeight: "800",
        fontSize: 10,
    },
    bannerDecoration: {
        position: "absolute",
        right: 20,
        bottom: 12,
        opacity: 0.7,
    },
    mainLayout: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 18,
    },
    leftColumn: {
        flex: 2,
        minWidth: 0,
    },
    sectionCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 19,
        padding: 19,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#E8EBF4",
    },
    sectionHeading: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 22,
        gap: 12,
    },
    headingIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: BLUE,
        alignItems: "center",
        justifyContent: "center",
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: "#172033",
    },
    sectionSubtitle: {
        color: "#8992A2",
        fontSize: 12,
        marginTop: 4,
    },
    infoGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    infoItem: {
        width: "48%",
        minHeight: 70,
        flexGrow: 1,
        flexBasis: "40%",
        borderWidth: 1,
        borderColor: "#E9EBF0",
        borderRadius: 14,
        padding: 11,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    infoIcon: {
        width: 35,
        height: 35,
        borderRadius: 11,
        backgroundColor: "#EFF5FF",
        alignItems: "center",
        justifyContent: "center",
    },
    infoContent: {
        flex: 1,
        minWidth: 0,
    },
    infoLabel: {
        fontSize: 11,
        color: "#8992A2",
        marginBottom: 5,
    },
    infoValue: {
        fontSize: 13,
        color: "#263247",
        fontWeight: "600",
    },
    summaryCard: {
        flex: 1,
        minWidth: 220,
        backgroundColor: "#FFFFFF",
        borderRadius: 19,
        padding: 20,
        borderWidth: 1,
        borderColor: "#E8EBF4",
    },
    summaryHeading: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: "#172033",
    },
    summaryRow: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#EDF0F5",
        gap: 6,
    },
    summaryLabel: {
        fontSize: 12,
        color: "#8992A2",
    },
    summaryValue: {
        fontSize: 13,
        color: "#253044",
        fontWeight: "700",
    },
    statusContainer: {
        paddingVertical: 16,
        gap: 10,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 7,
        backgroundColor: "#ECFDF3",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 7,
    },
    inactiveBadge: {
        backgroundColor: "#FEF2F2",
    },
    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 5,
        backgroundColor: "#16A34A",
    },
    statusText: {
        color: "#15803D",
        fontSize: 12,
        fontWeight: "700",
    },
    summaryNote: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#F0FDF4",
        borderRadius: 12,
        padding: 12,
        gap: 9,
        marginTop: 10,
    },
    summaryNoteText: {
        flex: 1,
        fontSize: 11,
        lineHeight: 17,
        color: "#39734A",
    },
});
