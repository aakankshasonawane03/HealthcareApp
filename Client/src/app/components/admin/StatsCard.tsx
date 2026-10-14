
import { ArrowUpRight } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface StatsCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: React.ReactNode;
    iconBackground?: string;
    onPress?: () => void;
}

export default function StatsCard({
    title,
    value,
    description,
    icon,
    iconBackground = "#EFF6FF",
    onPress,
}: StatsCardProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={!onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
            ]}
        >
            {/* Top Row */}
            <View style={styles.topRow}>
                <View
                    style={[
                        styles.iconContainer,
                        { backgroundColor: iconBackground },
                    ]}
                >
                    {icon}
                </View>

                <View style={styles.arrowButton}>
                    <ArrowUpRight size={17} color="#64748B" />
                </View>
            </View>

            {/* Content */}
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.value}>{value}</Text>

            {description ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        minWidth: 220,
        minHeight: 160,
        padding: 18,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    pressed: {
        opacity: 0.8,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    iconContainer: {
        width: 46,
        height: 46,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },

    arrowButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        fontSize: 13,
        fontWeight: "500",
        color: "#64748B",
        marginBottom: 5,
    },

    value: {
        fontSize: 27,
        fontWeight: "700",
        color: "#0F172A",
    },

    description: {
        marginTop: 6,
        fontSize: 12,
        color: "#64748B",
    },
});

