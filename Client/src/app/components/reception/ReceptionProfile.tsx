
import {
    ArrowLeft,
    CalendarDays,
    Camera,
    CheckCircle2,
    Edit3,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    UserRound,
} from "lucide-react-native";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface ReceptionProfileProps {
    firstName?: string;
    lastName?: string;
    role?: string;
    employeeId?: string;
    email?: string;
    phone?: string;
    gender?: string;
    dateOfBirth?: string;
    address?: string;
    joiningDate?: string;
    department?: string;
    image?: string;
    isActive?: boolean;
    onBack?: () => void;
    onEdit?: () => void;
    onChangePhoto?: () => void;
    onSecurityPress?: () => void;
}

export default function ReceptionProfile({
    firstName = "Receptionist",
    lastName = "",
    role = "Reception Desk",
    employeeId = "REC-001",
    email = "reception@healthcare.com",
    phone = "+91 98765 43210",
    gender = "Female",
    dateOfBirth = "15 May 1998",
    address = "Chhatrapati Sambhajinagar, Maharashtra, India",
    joiningDate = "10 January 2025",
    department = "Reception",
    image,
    isActive = true,
    onBack,
    onEdit,
    onChangePhoto,
    onSecurityPress,
}: ReceptionProfileProps) {
    const fullName = `${firstName} ${lastName}`.trim();

    const initials = `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""
        }`.toUpperCase();

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {onBack ? (
                            <Pressable
                                onPress={onBack}
                                style={({ pressed }) => [
                                    styles.backButton,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <ArrowLeft size={19} color="#FFFFFF" />
                            </Pressable>
                        ) : null}

                        <View>
                            <Text style={styles.eyebrow}>RECEPTION DESK</Text>
                            <Text style={styles.title}>My Profile</Text>
                            <Text style={styles.subtitle}>
                                Manage your personal information
                            </Text>
                        </View>
                    </View>

                    {onEdit ? (
                        <Pressable
                            onPress={onEdit}
                            style={({ pressed }) => [
                                styles.editButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Edit3 size={16} color="#090909" />
                            <Text style={styles.editButtonText}>Edit</Text>
                        </Pressable>
                    ) : null}
                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileTop}>
                        <View style={styles.avatarWrapper}>
                            {image ? (
                                <Image
                                    source={{ uri: image }}
                                    style={styles.avatarImage}
                                />
                            ) : (
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{initials}</Text>
                                </View>
                            )}

                            {onChangePhoto ? (
                                <Pressable
                                    onPress={onChangePhoto}
                                    style={({ pressed }) => [
                                        styles.cameraButton,
                                        pressed && styles.pressed,
                                    ]}
                                >
                                    <Camera size={14} color="#090909" />
                                </Pressable>
                            ) : null}
                        </View>

                        <View style={styles.profileMain}>
                            <Text style={styles.profileName}>{fullName}</Text>

                            <Text style={styles.profileRole}>{role}</Text>

                            <View style={styles.statusRow}>
                                <View
                                    style={[
                                        styles.statusDot,
                                        {
                                            backgroundColor: isActive
                                                ? "#53C878"
                                                : "#777777",
                                        },
                                    ]}
                                />

                                <Text
                                    style={[
                                        styles.statusText,
                                        {
                                            color: isActive
                                                ? "#53C878"
                                                : "#777777",
                                        },
                                    ]}
                                >
                                    {isActive ? "Active" : "Inactive"}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.employeeBadge}>
                            <Text style={styles.employeeLabel}>EMPLOYEE ID</Text>
                            <Text style={styles.employeeId}>{employeeId}</Text>
                        </View>
                    </View>

                    <View style={styles.profileDivider} />

                    <View style={styles.profileStats}>
                        <ProfileStat
                            label="Department"
                            value={department}
                        />

                        <View style={styles.statDivider} />

                        <ProfileStat
                            label="Joining Date"
                            value={joiningDate}
                        />

                        <View style={styles.statDivider} />

                        <ProfileStat
                            label="Role"
                            value="Reception"
                        />
                    </View>
                </View>

                {/* Personal Information */}
                <Section title="Personal Information">
                    <View style={styles.grid}>
                        <InfoItem
                            icon={<UserRound size={17} color="#CB9E53" />}
                            label="Full Name"
                            value={fullName}
                        />

                        <InfoItem
                            icon={<UserRound size={17} color="#CB9E53" />}
                            label="Gender"
                            value={gender}
                        />

                        <InfoItem
                            icon={<CalendarDays size={17} color="#CB9E53" />}
                            label="Date of Birth"
                            value={dateOfBirth}
                        />

                        <InfoItem
                            icon={<CalendarDays size={17} color="#CB9E53" />}
                            label="Joining Date"
                            value={joiningDate}
                        />
                    </View>
                </Section>

                {/* Contact Information */}
                <Section title="Contact Information">
                    <InfoItem
                        icon={<Mail size={17} color="#CB9E53" />}
                        label="Email Address"
                        value={email}
                    />

                    <Divider />

                    <InfoItem
                        icon={<Phone size={17} color="#CB9E53" />}
                        label="Phone Number"
                        value={phone}
                    />

                    <Divider />

                    <InfoItem
                        icon={<MapPin size={17} color="#CB9E53" />}
                        label="Address"
                        value={address}
                        multiline
                    />
                </Section>

                {/* Account & Security */}
                <Section title="Account & Security">
                    <Pressable
                        onPress={onSecurityPress}
                        disabled={!onSecurityPress}
                        style={({ pressed }) => [
                            styles.securityRow,
                            pressed && styles.rowPressed,
                        ]}
                    >
                        <View style={styles.infoIcon}>
                            <ShieldCheck size={18} color="#CB9E53" />
                        </View>

                        <View style={styles.securityContent}>
                            <Text style={styles.infoLabel}>
                                Security Settings
                            </Text>

                            <Text style={styles.infoDescription}>
                                Manage password and account security
                            </Text>
                        </View>

                        <View style={styles.securityAction}>
                            <Text style={styles.manageText}>Manage</Text>
                        </View>
                    </Pressable>

                    <Divider />

                    <View style={styles.securityRow}>
                        <View style={styles.infoIcon}>
                            <CheckCircle2 size={18} color="#53C878" />
                        </View>

                        <View style={styles.securityContent}>
                            <Text style={styles.infoLabel}>
                                Account Status
                            </Text>

                            <Text style={styles.infoDescription}>
                                Your reception account is currently{" "}
                                {isActive ? "active" : "inactive"}
                            </Text>
                        </View>

                        <View style={styles.activeBadge}>
                            <Text style={styles.activeBadgeText}>
                                {isActive ? "Active" : "Inactive"}
                            </Text>
                        </View>
                    </View>
                </Section>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    {onEdit ? (
                        <Pressable
                            onPress={onEdit}
                            style={({ pressed }) => [
                                styles.secondaryButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Edit3 size={17} color="#CB9E53" />
                            <Text style={styles.secondaryButtonText}>
                                Edit Profile
                            </Text>
                        </Pressable>
                    ) : null}

                    {onSecurityPress ? (
                        <Pressable
                            onPress={onSecurityPress}
                            style={({ pressed }) => [
                                styles.secondaryButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <ShieldCheck size={17} color="#CB9E53" />
                            <Text style={styles.secondaryButtonText}>
                                Security
                            </Text>
                        </Pressable>
                    ) : null}
                </View>

                <Text style={styles.footer}>
                    HealthcareApp • Reception Module
                </Text>
            </ScrollView>
        </View>
    );
}

interface ProfileStatProps {
    label: string;
    value: string;
}

function ProfileStat({ label, value }: ProfileStatProps) {
    return (
        <View style={styles.profileStat}>
            <Text style={styles.profileStatLabel}>{label}</Text>
            <Text style={styles.profileStatValue}>{value}</Text>
        </View>
    );
}

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>

            <View style={styles.sectionBody}>{children}</View>
        </View>
    );
}

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    multiline?: boolean;
}

function InfoItem({
    icon,
    label,
    value,
    multiline = false,
}: InfoItemProps) {
    return (
        <View style={styles.infoRow}>
            <View style={styles.infoIcon}>{icon}</View>

            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{label}</Text>

                <Text
                    style={[
                        styles.infoValue,
                        multiline && styles.multilineValue,
                    ]}
                >
                    {value}
                </Text>
            </View>
        </View>
    );
}

function Divider() {
    return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#080808",
    },

    content: {
        width: "100%",
        maxWidth: 1100,
        alignSelf: "center",
        padding: 24,
        paddingBottom: 50,
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 26,
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "flex-start",
        flex: 1,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#111111",
        borderWidth: 1,
        borderColor: "#292929",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 13,
        marginTop: 2,
    },

    eyebrow: {
        color: "#CB9E53",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.5,
        marginBottom: 5,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "700",
    },

    subtitle: {
        color: "#777777",
        fontSize: 14,
        marginTop: 5,
    },

    editButton: {
        height: 40,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: "#CB9E53",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    editButtonText: {
        color: "#090909",
        fontSize: 13,
        fontWeight: "800",
        marginLeft: 7,
    },

    profileCard: {
        backgroundColor: "#101010",
        borderWidth: 1,
        borderColor: "#242424",
        borderRadius: 18,
        padding: 20,
        marginBottom: 18,
    },

    profileTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatarWrapper: {
        position: "relative",
        marginRight: 15,
    },

    avatar: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: "#19150E",
        borderWidth: 1,
        borderColor: "#6D582F",
        justifyContent: "center",
        alignItems: "center",
    },

    avatarImage: {
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 1,
        borderColor: "#6D582F",
    },

    avatarText: {
        color: "#CB9E53",
        fontSize: 24,
        fontWeight: "800",
    },

    cameraButton: {
        position: "absolute",
        right: -3,
        bottom: -2,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#CB9E53",
        borderWidth: 2,
        borderColor: "#101010",
        justifyContent: "center",
        alignItems: "center",
    },

    profileMain: {
        flex: 1,
    },

    profileName: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
    },

    profileRole: {
        color: "#8A8A8A",
        fontSize: 13,
        marginTop: 4,
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 9,
    },

    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        marginRight: 6,
    },

    statusText: {
        fontSize: 11,
        fontWeight: "700",
    },

    employeeBadge: {
        backgroundColor: "#171717",
        borderWidth: 1,
        borderColor: "#292929",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: "center",
    },

    employeeLabel: {
        color: "#626262",
        fontSize: 8,
        fontWeight: "700",
        letterSpacing: 1,
    },

    employeeId: {
        color: "#CB9E53",
        fontSize: 12,
        fontWeight: "700",
        marginTop: 4,
    },

    profileDivider: {
        height: 1,
        backgroundColor: "#222222",
        marginVertical: 18,
    },

    profileStats: {
        flexDirection: "row",
        alignItems: "center",
    },

    profileStat: {
        flex: 1,
    },

    profileStatLabel: {
        color: "#626262",
        fontSize: 10,
        marginBottom: 5,
    },

    profileStatValue: {
        color: "#D7D7D7",
        fontSize: 12,
        fontWeight: "600",
    },

    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: "#292929",
        marginHorizontal: 15,
    },

    section: {
        backgroundColor: "#101010",
        borderWidth: 1,
        borderColor: "#222222",
        borderRadius: 16,
        marginBottom: 18,
        overflow: "hidden",
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        paddingHorizontal: 18,
        paddingTop: 17,
        paddingBottom: 15,
    },

    sectionBody: {
        paddingHorizontal: 18,
        paddingBottom: 5,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        flex: 1,
        minWidth: 280,
    },

    infoIcon: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#171717",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    infoContent: {
        flex: 1,
    },

    infoLabel: {
        color: "#686868",
        fontSize: 10,
        marginBottom: 5,
    },

    infoValue: {
        color: "#E5E5E5",
        fontSize: 13,
        fontWeight: "600",
    },

    multilineValue: {
        lineHeight: 19,
    },

    divider: {
        height: 1,
        backgroundColor: "#202020",
    },

    securityRow: {
        minHeight: 70,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 11,
    },

    securityContent: {
        flex: 1,
        paddingRight: 12,
    },

    infoDescription: {
        color: "#696969",
        fontSize: 11,
        marginTop: 4,
        lineHeight: 16,
    },

    securityAction: {
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 8,
        backgroundColor: "#171717",
        borderWidth: 1,
        borderColor: "#292929",
    },

    manageText: {
        color: "#CB9E53",
        fontSize: 11,
        fontWeight: "700",
    },

    activeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 8,
        backgroundColor: "#102218",
        borderWidth: 1,
        borderColor: "#234A31",
    },

    activeBadgeText: {
        color: "#53C878",
        fontSize: 11,
        fontWeight: "700",
    },

    quickActions: {
        flexDirection: "row",
        marginBottom: 5,
    },

    secondaryButton: {
        flex: 1,
        height: 46,
        borderRadius: 11,
        backgroundColor: "#101010",
        borderWidth: 1,
        borderColor: "#292929",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
    },

    secondaryButtonText: {
        color: "#D7D7D7",
        fontSize: 12,
        fontWeight: "600",
        marginLeft: 8,
    },

    rowPressed: {
        opacity: 0.65,
    },

    pressed: {
        opacity: 0.7,
    },

    footer: {
        color: "#4F4F4F",
        fontSize: 11,
        textAlign: "center",
        marginTop: 20,
    },
});
