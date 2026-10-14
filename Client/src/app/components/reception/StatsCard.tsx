
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    LucideIcon,
    Users,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: LucideIcon;
    iconColor?: string;
    onPress?: () => void;
}

const iconMap: Record<string, LucideIcon> = {
    appointments: CalendarDays,
    waiting: Clock3,
    patients: Users,
    completed: CheckCircle2,
};

export default function StatsCard({
    title,
    value,
    subtitle,
    icon,
    iconColor = "#CB9E53",
    onPress,
}: StatsCardProps) {
    const Icon = icon || iconMap[title.toLowerCase()] || CalendarDays;

    const content = (
        <View style={styles.card}>
            <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                    <Icon size={20} color={iconColor} strokeWidth={2} />
                </View>

                {subtitle ? (
                    <Text style={styles.subtitle} numberOfLines={1}>
                        {subtitle}
                    </Text>
                ) : null}
            </View>

            <Text style={styles.value}>{value}</Text>

            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.wrapper}
            >
                {content}
            </TouchableOpacity>
        );
    }

    return <View style={styles.wrapper}>{content}</View>;
}

const styles = StyleSheet.create({
    wrapper: {
        width: "48%",
        marginBottom: 12,
    },

    card: {
        minHeight: 145,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.18)",
        borderRadius: 20,
        padding: 16,
        justifyContent: "space-between",
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 14,
        backgroundColor: "rgba(203, 158, 83, 0.10)",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    subtitle: {
        flex: 1,
        marginLeft: 8,
        color: "#777777",
        fontSize: 11,
        fontWeight: "500",
        textAlign: "right",
    },

    value: {
        marginTop: 12,
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "700",
    },

    title: {
        marginTop: 4,
        color: "#A0A0A0",
        fontSize: 13,
        fontWeight: "500",
    },
});
