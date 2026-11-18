
import { BarChart, LineChart } from "react-native-chart-kit";
import { View, StyleSheet } from "react-native";

export function WeeklyAppointmentsChart({
    width,
}: {
    width: number;
}) {
    return (
        <View style={styles.chart}>
            <BarChart
                data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [{ data: [42, 55, 38, 68, 74, 51, 63] }],
                }}
                width={width}
                height={250}
                yAxisLabel=""
                yAxisSuffix=""
                fromZero
                showValuesOnTopOfBars
                withInnerLines
                chartConfig={{
                    backgroundColor: "#FFFFFF",
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientTo: "#FFFFFF",
                    decimalPlaces: 0,
                    color: (opacity = 1) =>
                        `rgba(37, 99, 235, ${opacity})`,
                    labelColor: (opacity = 1) =>
                        `rgba(100, 116, 139, ${opacity})`,
                    propsForBackgroundLines: {
                        stroke: "#E2E8F0",
                    },
                    barPercentage: 0.55,
                }}
                style={styles.chart}
            />
        </View>
    );
}

export function PatientGrowthChart({
    width,
}: {
    width: number;
}) {
    return (
        <View style={styles.chart}>
            <LineChart
                data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [{ data: [820, 910, 975, 1080, 1165, 1248] }],
                }}
                width={width}
                height={250}
                yAxisLabel=""
                yAxisSuffix=""
                fromZero
                bezier
                withInnerLines
                withDots
                chartConfig={{
                    backgroundColor: "#FFFFFF",
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientTo: "#FFFFFF",
                    decimalPlaces: 0,
                    color: (opacity = 1) =>
                        `rgba(22, 163, 74, ${opacity})`,
                    labelColor: (opacity = 1) =>
                        `rgba(100, 116, 139, ${opacity})`,
                    propsForBackgroundLines: {
                        stroke: "#E2E8F0",
                    },
                    propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: "#FFFFFF",
                    },
                }}
                style={styles.chart}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    chart: {
        marginTop: 8,
    },
});
