
import {
    CalendarDays,
    ChevronRight,
    SlidersHorizontal,
} from "lucide-react-native";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface DashboardHeaderProps {
    title?: string;
    subtitle?: string;
    date?: string;
    onDatePress?: () => void;
    onFilterPress?: () => void;
}

export default function DashboardHeader({
    title = "Today's Schedule",
    subtitle = "Manage your clinic activities",
    date = "21 Sep 2026",
    onDatePress,
    onFilterPress,
}: DashboardHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
            </View>

            <View style={styles.actions}>
                <Pressable
                    onPress={onDatePress}
                    style={({ pressed }) => [
                        styles.dateButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <CalendarDays
                        size={16}
                        color="#CB9E53"
                    />

                    <View style={styles.dateTextContainer}>
                        <Text style={styles.dateLabel}>
                            Date
                        </Text>

                        <Text
                            style={styles.date}
                            numberOfLines={1}
                        >
                            {date}
                        </Text>
                    </View>

                    <ChevronRight
                        size={14}
                        color="#777777"
                    />
                </Pressable>

                {onFilterPress ? (
                    <Pressable
                        onPress={onFilterPress}
                        style={({ pressed }) => [
                            styles.filterButton,
                            pressed && styles.pressed,
                        ]}
                    >
                        <SlidersHorizontal
                            size={17}
                            color="#CB9E53"
                        />
                    </Pressable>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    textContainer: {
        flex: 1,
        paddingRight: 10,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
    },

    subtitle: {
        color: "#777777",
        fontSize: 10,
        marginTop: 4,
    },

    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },

    dateButton: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 44,
        maxWidth: 150,
        paddingHorizontal: 9,
        borderRadius: 12,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
        gap: 7,
    },

    dateTextContainer: {
        flex: 1,
        minWidth: 0,
    },

    dateLabel: {
        color: "#666666",
        fontSize: 8,
        marginBottom: 2,
    },

    date: {
        color: "#D8D8D8",
        fontSize: 10,
        fontWeight: "600",
    },

    filterButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        backgroundColor: "#151515",
        borderWidth: 1,
        borderColor: "#292929",
    },

    pressed: {
        opacity: 0.7,
    },
});
