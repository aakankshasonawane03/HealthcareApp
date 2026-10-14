
import {
    ArrowDown,
    ArrowUp,
    LucideIcon,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    change?: string;
    changeType?: "up" | "down" | "neutral";
    subtitle?: string;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    change,
    changeType = "neutral",
    subtitle,
}: StatsCardProps) {
    return (
        <View style={styles.card}>
            {/* Top */}
            <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                    <Icon
                        size={20}
                        color="#2563EB"
                    />
                </View>

                {change && changeType !== "neutral" && (
                    <View
                        style={[
                            styles.changeBadge,
                            changeType === "up"
                                ? styles.upBadge
                                : styles.downBadge,
                        ]}
                    >
                        {changeType === "up" ? (
                            <ArrowUp
                                size={11}
                                color="#16A34A"
                            />
                        ) : (
                            <ArrowDown
                                size={11}
                                color="#EF4444"
                            />
                        )}

                        <Text
                            style={[
                                styles.changeText,
                                changeType === "up"
                                    ? styles.upText
                                    : styles.downText,
                            ]}
                        >
                            {change}
                        </Text>
                    </View>
                )}
            </View>

            {/* Value */}
            <Text style={styles.value}>
                {value}
            </Text>

            {/* Title */}
            <Text style={styles.title}>
                {title}
            </Text>

            {/* Subtitle */}
            {subtitle && (
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minHeight: 120,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 15,
        padding: 13,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    iconContainer: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
    },

    changeBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 7,
        gap: 2,
    },

    upBadge: {
        backgroundColor: "#F0FDF4",
        borderWidth: 1,
        borderColor: "#BBF7D0",
    },

    downBadge: {
        backgroundColor: "#FEF2F2",
        borderWidth: 1,
        borderColor: "#FECACA",
    },

    changeText: {
        fontSize: 9,
        fontWeight: "600",
    },

    upText: {
        color: "#16A34A",
    },

    downText: {
        color: "#EF4444",
    },

    value: {
        color: "#0F172A",
        fontSize: 21,
        fontWeight: "700",
        marginTop: 11,
    },

    title: {
        color: "#475569",
        fontSize: 10,
        marginTop: 3,
    },

    subtitle: {
        color: "#94A3B8",
        fontSize: 9,
        marginTop: 3,
    },
});