
import {
    MoreVertical,
    Search,
    UserPlus,
} from "lucide-react-native";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: "Patient" | "Doctor" | "Receptionist" | "Admin";
    status: "Active" | "Inactive" | "Pending";
    joinedDate: string;
}

interface UserTableProps {
    users?: AdminUser[];
    onAddUser?: () => void;
    onUserPress?: (user: AdminUser) => void;
    onSearchPress?: () => void;
}

const defaultUsers: AdminUser[] = [
    {
        id: "1",
        name: "Prathamesh Patil",
        email: "prathamesh@example.com",
        role: "Patient",
        status: "Active",
        joinedDate: "17 Sep 2026",
    },
    {
        id: "2",
        name: "Dr. Rahul Sharma",
        email: "rahul.sharma@example.com",
        role: "Doctor",
        status: "Active",
        joinedDate: "15 Sep 2026",
    },
    {
        id: "3",
        name: "Sneha Joshi",
        email: "sneha.joshi@example.com",
        role: "Receptionist",
        status: "Active",
        joinedDate: "12 Sep 2026",
    },
    {
        id: "4",
        name: "Amit Kulkarni",
        email: "amit.kulkarni@example.com",
        role: "Patient",
        status: "Pending",
        joinedDate: "10 Sep 2026",
    },
    {
        id: "5",
        name: "Dr. Neha Deshmukh",
        email: "neha.deshmukh@example.com",
        role: "Doctor",
        status: "Inactive",
        joinedDate: "08 Sep 2026",
    },
];

export default function UserTable({
    users = defaultUsers,
    onAddUser,
    onUserPress,
    onSearchPress,
}: UserTableProps) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Users</Text>
                    <Text style={styles.subtitle}>
                        Manage all registered users
                    </Text>
                </View>

                <View style={styles.headerActions}>
                    <Pressable
                        style={styles.searchButton}
                        onPress={onSearchPress}
                    >
                        <Search size={19} color="#475569" />
                    </Pressable>

                    <Pressable
                        style={styles.addButton}
                        onPress={onAddUser}
                    >
                        <UserPlus size={18} color="#FFFFFF" />
                        <Text style={styles.addButtonText}>Add User</Text>
                    </Pressable>
                </View>
            </View>

            {/* Table */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={[styles.headerCell, styles.nameColumn]}>
                            USER
                        </Text>

                        <Text style={[styles.headerCell, styles.roleColumn]}>
                            ROLE
                        </Text>

                        <Text style={[styles.headerCell, styles.statusColumn]}>
                            STATUS
                        </Text>

                        <Text style={[styles.headerCell, styles.dateColumn]}>
                            JOINED
                        </Text>

                        <Text style={[styles.headerCell, styles.actionColumn]}>
                            ACTION
                        </Text>
                    </View>

                    {/* Rows */}
                    {users.map((user) => (
                        <Pressable
                            key={user.id}
                            onPress={() => onUserPress?.(user)}
                            style={({ pressed }) => [
                                styles.tableRow,
                                pressed && styles.pressedRow,
                            ]}
                        >
                            {/* User */}
                            <View style={[styles.userCell, styles.nameColumn]}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>
                                        {getInitials(user.name)}
                                    </Text>
                                </View>

                                <View style={styles.userInfo}>
                                    <Text
                                        style={styles.userName}
                                        numberOfLines={1}
                                    >
                                        {user.name}
                                    </Text>

                                    <Text
                                        style={styles.userEmail}
                                        numberOfLines={1}
                                    >
                                        {user.email}
                                    </Text>
                                </View>
                            </View>

                            {/* Role */}
                            <View style={styles.roleColumn}>
                                <Text style={styles.roleText}>{user.role}</Text>
                            </View>

                            {/* Status */}
                            <View style={styles.statusColumn}>
                                <View
                                    style={[
                                        styles.statusBadge,
                                        getStatusStyle(user.status),
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.statusDot,
                                            getStatusDotStyle(user.status),
                                        ]}
                                    />

                                    <Text
                                        style={[
                                            styles.statusText,
                                            getStatusTextStyle(user.status),
                                        ]}
                                    >
                                        {user.status}
                                    </Text>
                                </View>
                            </View>

                            {/* Date */}
                            <View style={styles.dateColumn}>
                                <Text style={styles.dateText}>
                                    {user.joinedDate}
                                </Text>
                            </View>

                            {/* Action */}
                            <View style={styles.actionColumn}>
                                <Pressable
                                    style={styles.moreButton}
                                    onPress={() => onUserPress?.(user)}
                                >
                                    <MoreVertical
                                        size={19}
                                        color="#64748B"
                                    />
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

function getInitials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
}

function getStatusStyle(status: AdminUser["status"]) {
    switch (status) {
        case "Active":
            return styles.activeStatus;

        case "Inactive":
            return styles.inactiveStatus;

        case "Pending":
            return styles.pendingStatus;

        default:
            return {};
    }
}

function getStatusDotStyle(status: AdminUser["status"]) {
    switch (status) {
        case "Active":
            return styles.activeDot;

        case "Inactive":
            return styles.inactiveDot;

        case "Pending":
            return styles.pendingDot;

        default:
            return {};
    }
}

function getStatusTextStyle(status: AdminUser["status"]) {
    switch (status) {
        case "Active":
            return styles.activeText;

        case "Inactive":
            return styles.inactiveText;

        case "Pending":
            return styles.pendingText;

        default:
            return {};
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
    },

    header: {
        minHeight: 82,
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
    },

    subtitle: {
        marginTop: 4,
        fontSize: 12,
        color: "#64748B",
    },

    headerActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    addButton: {
        height: 40,
        paddingHorizontal: 14,
        borderRadius: 10,
        backgroundColor: "#2563EB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
    },

    addButtonText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },

    table: {
        minWidth: 850,
    },

    tableRow: {
        minHeight: 72,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },

    tableHeader: {
        minHeight: 46,
        backgroundColor: "#F8FAFC",
    },

    pressedRow: {
        backgroundColor: "#F8FAFC",
    },

    headerCell: {
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.7,
        color: "#94A3B8",
    },

    nameColumn: {
        width: 290,
    },

    roleColumn: {
        width: 140,
    },

    statusColumn: {
        width: 140,
    },

    dateColumn: {
        width: 150,
    },

    actionColumn: {
        width: 80,
        alignItems: "center",
    },

    userCell: {
        flexDirection: "row",
        alignItems: "center",
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#2563EB",
    },

    userInfo: {
        marginLeft: 11,
        flex: 1,
    },

    userName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#0F172A",
    },

    userEmail: {
        marginTop: 4,
        fontSize: 11,
        color: "#64748B",
    },

    roleText: {
        fontSize: 13,
        color: "#475569",
    },

    statusBadge: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },

    activeStatus: {
        backgroundColor: "#ECFDF5",
    },

    inactiveStatus: {
        backgroundColor: "#F1F5F9",
    },

    pendingStatus: {
        backgroundColor: "#FFFBEB",
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },

    activeDot: {
        backgroundColor: "#16A34A",
    },

    inactiveDot: {
        backgroundColor: "#64748B",
    },

    pendingDot: {
        backgroundColor: "#D97706",
    },

    statusText: {
        fontSize: 11,
        fontWeight: "600",
    },

    activeText: {
        color: "#15803D",
    },

    inactiveText: {
        color: "#475569",
    },

    pendingText: {
        color: "#B45309",
    },

    dateText: {
        fontSize: 12,
        color: "#64748B",
    },

    moreButton: {
        width: 34,
        height: 34,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
    },
});

