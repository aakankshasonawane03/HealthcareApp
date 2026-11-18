import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Line, Polyline } from "react-native-svg";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const APPOINTMENTS = [42, 55, 38, 68, 74, 51, 63];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const PATIENTS = [820, 910, 975, 1080, 1165, 1248];

export function WeeklyAppointmentsChart({ width }: { width: number }) {
    const maxValue = Math.max(...APPOINTMENTS);
    const chartWidth = Math.max(width - 32, 200);

    return (
        <View style={[styles.chart, { width: "100%" }]}>
            <View style={styles.barChart}>
                {APPOINTMENTS.map((value, index) => (
                    <View key={DAYS[index]} style={styles.barColumn}>
                        <Text style={styles.valueLabel}>{value}</Text>
                        <View style={styles.barTrack}>
                            <View
                                style={[
                                    styles.bar,
                                    { height: `${(value / maxValue) * 100}%` },
                                ]}
                            />
                        </View>
                        <Text style={styles.axisLabel}>{DAYS[index]}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

export function PatientGrowthChart({ width }: { width: number }) {
    const chartWidth = Math.max(width - 32, 200);
    const chartHeight = 190;
    const padding = 16;

    const minValue = 750;
    const maxValue = 1300;

    const points = PATIENTS.map((value, index) => {
        const x =
            padding +
            (index * (chartWidth - padding * 2)) / (PATIENTS.length - 1);

        const y =
            chartHeight -
            padding -
            ((value - minValue) / (maxValue - minValue)) *
            (chartHeight - padding * 2);

        return { x, y };
    });

    const polylinePoints = points
        .map((point) => `${point.x},${point.y}`)
        .join(" ");

    return (
        <View style={styles.chart}>
            <Svg width={chartWidth} height={chartHeight}>
                {[0, 1, 2, 3].map((item) => {
                    const y =
                        padding +
                        (item * (chartHeight - padding * 2)) / 3;

                    return (
                        <Line
                            key={item}
                            x1={padding}
                            y1={y}
                            x2={chartWidth - padding}
                            y2={y}
                            stroke="#E5E7EB"
                            strokeWidth={1}
                        />
                    );
                })}

                <Polyline
                    points={polylinePoints}
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth={3}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />

                {points.map((point, index) => (
                    <Circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={4}
                        fill="#16A34A"
                    />
                ))}
            </Svg>

            <View style={styles.monthRow}>
                {MONTHS.map((month) => (
                    <Text key={month} style={styles.axisLabel}>
                        {month}
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    chart: {
        width: "100%",
        marginTop: 8,
        alignItems: "center",
    },
    barChart: {
        width: "100%",
        height: 250,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-end",
        paddingHorizontal: 8,
    },
    barColumn: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        marginHorizontal: 3,
    },
    valueLabel: {
        fontSize: 11,
        color: "#64748B",
        marginBottom: 6,
    },
    barTrack: {
        height: 190,
        width: "65%",
        backgroundColor: "#EFF6FF",
        borderRadius: 6,
        justifyContent: "flex-end",
        overflow: "hidden",
    },
    bar: {
        width: "100%",
        backgroundColor: "#2563EB",
        borderRadius: 6,
    },
    axisLabel: {
        fontSize: 11,
        color: "#64748B",
        marginTop: 8,
    },
    monthRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 8,
    },
});

export default WeeklyAppointmentsChart;