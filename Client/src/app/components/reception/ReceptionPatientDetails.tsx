
import {
    CalendarDays,
    ChevronRight,
    Droplets,
    FileText,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    UserRound,
} from "lucide-react-native";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface ReceptionPatientDetailsProps {
    id: string;
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    gender?: string;
    dateOfBirth?: string;
    bloodGroup?: string;
    address?: string;
    emergencyContact?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    lastVisit?: string;
    onBack?: () => void;
    onEdit?: () => void;
    onBookAppointment?: () => void;
    onViewRecords?: () => void;
}

export default function ReceptionPatientDetails({
    id,
    firstName,
    lastName,
    email,
    phone,
    gender,
    dateOfBirth,
    bloodGroup,
    address,
    emergencyContact,
    isActive = true,
    createdAt,
    updatedAt,
    lastVisit,
    onBack,
    onEdit,
    onBookAppointment,
    onViewRecords,
}: ReceptionPatientDetailsProps) {
    const fullName = [firstName, lastName]
        .filter(Boolean)
        .join(" ");

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    {onBack ? (
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={onBack}
                            style={styles.backButton}
                        >
                            <Text style={styles.backText}>‹</Text>
                        </TouchableOpacity>
                    ) : null}

                    <View>
                        <Text style={styles.title}>
                            Patient Details
                        </Text>

                        <Text style={styles.subtitle}>
                            View and manage patient information
                        </Text>
                    </View>
                </View>

                {onEdit ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onEdit}
                        style={styles.editButton}
                    >
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                ) : null}
            </View>

            {/* Profile Card */}
            <View style={styles.profileCard}>
                <View style={styles.profileTop}>
                    <View style={styles.avatar}>
                        <UserRound
                            size={30}
                            color="#CB9E53"
                            strokeWidth={2}
                        />
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.patientName}>
                            {fullName || "Patient"}
                        </Text>

                        <Text style={styles.patientId}>
                            Patient ID: {id}
                        </Text>

                        <View
                            style={[
                                styles.statusBadge,
                                isActive
                                    ? styles.activeBadge
                                    : styles.inactiveBadge,
                            ]}
                        >
                            <View
                                style={[
                                    styles.statusDot,
                                    isActive
                                        ? styles.activeDot
                                        : styles.inactiveDot,
                                ]}
                            />

                            <Text
                                style={[
                                    styles.statusText,
                                    isActive
                                        ? styles.activeText
                                        : styles.inactiveText,
                                ]}
                            >
                                {isActive ? "Active" : "Inactive"}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.profileDivider} />

                <View style={styles.quickContactRow}>
                    {phone ? (
                        <View style={styles.quickContact}>
                            <Phone
                                size={15}
                                color="#CB9E53"
                                strokeWidth={2}
                            />

                            <Text
                                style={styles.quickContactText}
                                numberOfLines={1}
                            >
                                {phone}
                            </Text>
                        </View>
                    ) : null}

                    {email ? (
                        <View style={styles.quickContact}>
                            <Mail
                                size={15}
                                color="#CB9E53"
                                strokeWidth={2}
                            />

                            <Text
                                style={styles.quickContactText}
                                numberOfLines={1}
                            >
                                {email}
                            </Text>
                        </View>
                    ) : null}
                </View>
            </View>

            {/* Personal Information */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>
                    Personal Information
                </Text>

                <View style={styles.infoGrid}>
                    {gender ? (
                        <InfoItem
                            label="Gender"
                            value={gender}
                        />
                    ) : null}

                    {dateOfBirth ? (
                        <InfoItem
                            label="Date of Birth"
                            value={dateOfBirth}
                            icon={<CalendarDays size={15} color="#CB9E53" />}
                        />
                    ) : null}
                </View>
            </View>

            {/* Blood Group */}
            {bloodGroup ? (
                <View style={styles.card}>
                    <View style={styles.bloodRow}>
                        <View style={styles.bloodIcon}>
                            <Droplets
                                size={20}
                                color="#CB9E53"
                                strokeWidth={2}
                            />
                        </View>

                        <View style={styles.bloodInfo}>
                            <Text style={styles.infoLabel}>
                                Blood Group
                            </Text>

                            <Text style={styles.bloodValue}>
                                {bloodGroup}
                            </Text>
                        </View>
                    </View>
                </View>
            ) : null}

            {/* Contact Information */}
            {(phone || email || address) && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Contact Information
                    </Text>

                    <View style={styles.contactList}>
                        {phone ? (
                            <ContactItem
                                icon={
                                    <Phone size={17} color="#CB9E53" />
                                }
                                label="Phone"
                                value={phone}
                            />
                        ) : null}

                        {email ? (
                            <ContactItem
                                icon={
                                    <Mail size={17} color="#CB9E53" />
                                }
                                label="Email"
                                value={email}
                            />
                        ) : null}

                        {address ? (
                            <ContactItem
                                icon={
                                    <MapPin size={17} color="#CB9E53" />
                                }
                                label="Address"
                                value={address}
                            />
                        ) : null}
                    </View>
                </View>
            )}

            {/* Emergency Contact */}
            {emergencyContact ? (
                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <ShieldCheck
                            size={18}
                            color="#CB9E53"
                            strokeWidth={2}
                        />

                        <Text style={styles.sectionTitle}>
                            Emergency Contact
                        </Text>
                    </View>

                    <View style={styles.emergencyBox}>
                        <Phone
                            size={17}
                            color="#CB9E53"
                            strokeWidth={2}
                        />

                        <Text style={styles.emergencyText}>
                            {emergencyContact}
                        </Text>
                    </View>
                </View>
            ) : null}

            {/* Visit Information */}
            {(lastVisit || createdAt || updatedAt) && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Patient History
                    </Text>

                    <View style={styles.historyList}>
                        {lastVisit ? (
                            <HistoryItem
                                label="Last Visit"
                                value={lastVisit}
                            />
                        ) : null}

                        {createdAt ? (
                            <HistoryItem
                                label="Registered On"
                                value={createdAt}
                            />
                        ) : null}

                        {updatedAt ? (
                            <HistoryItem
                                label="Last Updated"
                                value={updatedAt}
                            />
                        ) : null}
                    </View>
                </View>
            )}

            {/* Actions */}
            <View style={styles.actions}>
                {onBookAppointment ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onBookAppointment}
                        style={styles.primaryButton}
                    >
                        <CalendarDays
                            size={18}
                            color="#101010"
                            strokeWidth={2.2}
                        />

                        <Text style={styles.primaryButtonText}>
                            Book Appointment
                        </Text>
                    </TouchableOpacity>
                ) : null}

                {onViewRecords ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onViewRecords}
                        style={styles.secondaryButton}
                    >
                        <FileText
                            size={18}
                            color="#CB9E53"
                            strokeWidth={2}
                        />

                        <Text style={styles.secondaryButtonText}>
                            View Medical Records
                        </Text>

                        <ChevronRight
                            size={17}
                            color="#CB9E53"
                            strokeWidth={2}
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
        </ScrollView>
    );
}

interface InfoItemProps {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

function InfoItem({
    label,
    value,
    icon,
}: InfoItemProps) {
    return (
        <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
                {icon || (
                    <UserRound
                        size={15}
                        color="#CB9E53"
                        strokeWidth={2}
                    />
                )}
            </View>

            <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>{label}</Text>

                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

interface ContactItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function ContactItem({
    icon,
    label,
    value,
}: ContactItemProps) {
    return (
        <View style={styles.contactItem}>
            <View style={styles.infoIcon}>{icon}</View>

            <View style={styles.contactTextContainer}>
                <Text style={styles.infoLabel}>{label}</Text>

                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

interface HistoryItemProps {
    label: string;
    value: string;
}

function HistoryItem({
    label,
    value,
}: HistoryItemProps) {
    return (
        <View style={styles.historyItem}>
            <Text style={styles.historyLabel}>{label}</Text>

            <Text style={styles.historyValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101010",
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    headerTitleContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        width: 38,
        height: 38,
        marginRight: 10,
        borderRadius: 12,
        backgroundColor: "#161616",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.14)",
        alignItems: "center",
        justifyContent: "center",
    },

    backText: {
        marginTop: -3,
        color: "#CB9E53",
        fontSize: 28,
        lineHeight: 30,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 21,
        fontWeight: "700",
    },

    subtitle: {
        marginTop: 4,
        color: "#777777",
        fontSize: 11,
    },

    editButton: {
        paddingHorizontal: 15,
        paddingVertical: 9,
        borderRadius: 11,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.18)",
    },

    editText: {
        color: "#CB9E53",
        fontSize: 11,
        fontWeight: "700",
    },

    profileCard: {
        marginBottom: 14,
        padding: 18,
        borderRadius: 20,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.16)",
    },

    profileTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 68,
        height: 68,
        borderRadius: 21,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.20)",
        alignItems: "center",
        justifyContent: "center",
    },

    profileInfo: {
        flex: 1,
        marginLeft: 14,
    },

    patientName: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },

    patientId: {
        marginTop: 5,
        color: "#707070",
        fontSize: 10,
    },

    statusBadge: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 9,
        borderWidth: 1,
    },

    activeBadge: {
        backgroundColor: "rgba(85, 194, 122, 0.08)",
        borderColor: "rgba(85, 194, 122, 0.20)",
    },

    inactiveBadge: {
        backgroundColor: "rgba(229, 107, 111, 0.08)",
        borderColor: "rgba(229, 107, 111, 0.20)",
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },

    activeDot: {
        backgroundColor: "#55C27A",
    },

    inactiveDot: {
        backgroundColor: "#E56B6F",
    },

    statusText: {
        fontSize: 9,
        fontWeight: "700",
    },

    activeText: {
        color: "#55C27A",
    },

    inactiveText: {
        color: "#E56B6F",
    },

    profileDivider: {
        height: 1,
        marginVertical: 16,
        backgroundColor: "rgba(255,255,255,0.06)",
    },

    quickContactRow: {
        gap: 10,
    },

    quickContact: {
        flexDirection: "row",
        alignItems: "center",
    },

    quickContactText: {
        flex: 1,
        marginLeft: 8,
        color: "#999999",
        fontSize: 11,
    },

    card: {
        marginBottom: 14,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.14)",
    },

    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 13,
    },

    infoGrid: {
        marginTop: 14,
        gap: 12,
    },

    infoItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    infoIcon: {
        width: 36,
        height: 36,
        borderRadius: 11,
        backgroundColor: "rgba(203, 158, 83, 0.08)",
        alignItems: "center",
        justifyContent: "center",
    },

    infoTextContainer: {
        marginLeft: 9,
    },

    infoLabel: {
        color: "#707070",
        fontSize: 9,
    },

    infoValue: {
        marginTop: 3,
        color: "#BDBDBD",
        fontSize: 12,
        fontWeight: "600",
    },

    bloodRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    bloodIcon: {
        width: 42,
        height: 42,
        borderRadius: 13,
        backgroundColor: "rgba(203, 158, 83, 0.09)",
        alignItems: "center",
        justifyContent: "center",
    },

    bloodInfo: {
        marginLeft: 11,
    },

    bloodValue: {
        marginTop: 3,
        color: "#CB9E53",
        fontSize: 16,
        fontWeight: "700",
    },

    contactList: {
        marginTop: 14,
        gap: 13,
    },

    contactItem: {
        flexDirection: "row",
        alignItems: "center",
    },

    contactTextContainer: {
        flex: 1,
        marginLeft: 9,
    },

    emergencyBox: {
        marginTop: 14,
        minHeight: 48,
        paddingHorizontal: 13,
        borderRadius: 13,
        backgroundColor: "rgba(203, 158, 83, 0.06)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.12)",
        flexDirection: "row",
        alignItems: "center",
    },

    emergencyText: {
        flex: 1,
        marginLeft: 9,
        color: "#BDBDBD",
        fontSize: 12,
        fontWeight: "600",
    },

    historyList: {
        marginTop: 14,
        gap: 12,
    },

    historyItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.05)",
    },

    historyLabel: {
        color: "#707070",
        fontSize: 10,
    },

    historyValue: {
        maxWidth: "60%",
        color: "#BDBDBD",
        fontSize: 11,
        fontWeight: "600",
        textAlign: "right",
    },

    actions: {
        marginTop: 2,
        gap: 10,
    },

    primaryButton: {
        minHeight: 48,
        borderRadius: 14,
        backgroundColor: "#CB9E53",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
    },

    primaryButtonText: {
        marginLeft: 8,
        color: "#101010",
        fontSize: 12,
        fontWeight: "800",
    },

    secondaryButton: {
        minHeight: 48,
        borderRadius: 14,
        backgroundColor: "rgba(203, 158, 83, 0.07)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.16)",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
    },

    secondaryButtonText: {
        flex: 1,
        marginLeft: 8,
        color: "#CB9E53",
        fontSize: 12,
        fontWeight: "700",
    },
});
