
import { ChevronRight, LucideIcon } from "lucide-react-native";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface QuickActionCardProps {
    title: string;
    subtitle?: string;
    icon: LucideIcon;
    onPress?: () => void;
}

export default function QuickActionCard({
    title,
    subtitle,
    icon: Icon,
    onPress,
}: QuickActionCardProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Icon size={22} color="#2563EB" />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>

                {subtitle && (
                    <Text style={styles.subtitle}>{subtitle}</Text>
                )}
            </View>

            <ChevronRight size={18} color="#64748B" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "48%",
        minHeight: 110,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 15,
        padding: 14,
        marginBottom: 10,
    },

    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    content: {
        flex: 1,
    },

    title: {
        color: "#0F172A",
        fontSize: 13,
        fontWeight: "600",
    },

    subtitle: {
        color: "#64748B",
        fontSize: 10,
        marginTop: 4,
    },
});
