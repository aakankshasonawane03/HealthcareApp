
import {
    CalendarPlus,
    ClipboardList,
    FilePlus2,
    LucideIcon,
    UserPlus,
} from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface QuickActionCardProps {
    title: string;
    subtitle?: string;
    icon?: LucideIcon;
    iconColor?: string;
    onPress?: () => void;
}

const actionIcons: Record<string, LucideIcon> = {
    appointment: CalendarPlus,
    patient: UserPlus,
    record: ClipboardList,
    prescription: FilePlus2,
};

export default function QuickActionCard({
    title,
    subtitle,
    icon,
    iconColor = "#CB9E53",
    onPress,
}: QuickActionCardProps) {
    const Icon =
        icon ||
        Object.entries(actionIcons).find(([key]) =>
            title.toLowerCase().includes(key)
        )?.[1] ||
        CalendarPlus;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.card}
        >
            <View
                style={[
                    styles.iconContainer,
                    {
                        borderColor: `${iconColor}30`,
                        backgroundColor: `${iconColor}10`,
                    },
                ]}
            >
                <Icon
                    size={21}
                    color={iconColor}
                    strokeWidth={2}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>

                {subtitle ? (
                    <Text style={styles.subtitle} numberOfLines={2}>
                        {subtitle}
                    </Text>
                ) : null}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "48%",
        minHeight: 112,
        marginBottom: 12,
        padding: 15,
        borderRadius: 18,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "rgba(203, 158, 83, 0.15)",
        justifyContent: "space-between",
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 13,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    textContainer: {
        marginTop: 12,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
    },

    subtitle: {
        marginTop: 4,
        color: "#777777",
        fontSize: 10,
        lineHeight: 14,
    },
});
