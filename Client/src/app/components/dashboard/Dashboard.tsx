import { useRouter } from "expo-router";
import {
  Activity,
  CalendarDays,
  UserRound,
  Users,
} from "lucide-react-native";
import {
  Dimensions, Platform, Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  BarChart,
  LineChart,
} from "react-native-chart-kit";

import BottomNavbar from "../ui/BottomNavbar";

export default function Dashboard() {
  const router = useRouter();

  const screenWidth = Dimensions.get("window").width;

  /*
   * Web
   * ----
   * Sidebar is displayed.
   *
   * Android / iOS
   * -------------
   * BottomNavbar is displayed.
   */
  const isWeb = Platform.OS === "web";

  /*
   * Chart width
   *
   * Desktop:
   * Leave space for the sidebar.
   *
   * Mobile:
   * Use the available screen width.
   */
  const chartWidth = isWeb
    ? Math.max(screenWidth - 300, 500)
    : screenWidth - 48;

  return (
    <View style={styles.container}>

      {/* ================================================= */}
      {/* WEB SIDEBAR */}
      {/* ================================================= */}

      {/* {isWeb && <Sidebar />} */}

      {/* ================================================= */}
      {/* MAIN DASHBOARD CONTENT */}
      {/* ================================================= */}

      <View style={styles.mainContent}>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <View style={styles.header}>

            <View>
              <Text style={styles.welcome}>
                Welcome back 👋
              </Text>

              <Text style={styles.title}>
                Healthcare Dashboard
              </Text>
            </View>

            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>
                A
              </Text>
            </View>

          </View>

          {/* ================================================= */}
          {/* OVERVIEW */}
          {/* ================================================= */}

          <Text style={styles.sectionTitle}>
            Overview
          </Text>

          <View style={styles.statsGrid}>

            {/* Patients */}
            <View style={styles.card}>

              <View style={styles.iconBox}>
                <Users
                  size={22}
                  color="#2563EB"
                />
              </View>

              <Text style={styles.cardTitle}>
                Patients
              </Text>

              <Text style={styles.cardValue}>
                1,248
              </Text>

              <Text style={styles.cardDescription}>
                Total patients
              </Text>

            </View>

            {/* Doctors */}
            <View style={styles.card}>

              <View style={styles.iconBoxGreen}>
                <UserRound
                  size={22}
                  color="#16A34A"
                />
              </View>

              <Text style={styles.cardTitle}>
                Doctors
              </Text>

              <Text style={styles.cardValue}>
                86
              </Text>

              <Text style={styles.cardDescription}>
                Active doctors
              </Text>

            </View>

            {/* Appointments */}
            <View style={styles.card}>

              <View style={styles.iconBoxPurple}>
                <CalendarDays
                  size={22}
                  color="#9333EA"
                />
              </View>

              <Text style={styles.cardTitle}>
                Appointments
              </Text>

              <Text style={styles.cardValue}>
                324
              </Text>

              <Text style={styles.cardDescription}>
                Today's appointments
              </Text>

            </View>

            {/* Active Users */}
            <View style={styles.card}>

              <View style={styles.iconBoxOrange}>
                <Activity
                  size={22}
                  color="#EA580C"
                />
              </View>

              <Text style={styles.cardTitle}>
                Active Users
              </Text>

              <Text style={styles.cardValue}>
                1,576
              </Text>

              <Text style={styles.cardDescription}>
                Currently active
              </Text>

            </View>

          </View>

          {/* ================================================= */}
          {/* ANALYTICS */}
          {/* ================================================= */}

          <Text style={styles.sectionTitle}>
            Analytics
          </Text>

          {/* ================================================= */}
          {/* WEEKLY APPOINTMENTS BAR CHART */}
          {/* ================================================= */}

          <View style={styles.chartCard}>

            <View style={styles.chartHeader}>

              <View style={styles.chartHeaderContent}>

                <Text style={styles.chartTitle}>
                  Weekly Appointments
                </Text>

                <Text style={styles.chartSubtitle}>
                  Appointment activity for this week
                </Text>

              </View>

              <View style={styles.chartBadge}>
                <CalendarDays
                  size={18}
                  color="#2563EB"
                />
              </View>

            </View>

            <BarChart
              data={{
                labels: [
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                  "Sun",
                ],
                datasets: [
                  {
                    data: [
                      42,
                      55,
                      38,
                      68,
                      74,
                      51,
                      63,
                    ],
                  },
                ],
              }}
              width={chartWidth}
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
                  strokeDasharray: "",
                },

                propsForLabels: {
                  fontSize: 11,
                },

                barPercentage: 0.55,
              }}
              style={styles.chart}
            />

          </View>

          {/* ================================================= */}
          {/* PATIENT GROWTH LINE CHART */}
          {/* ================================================= */}

          <View style={styles.chartCard}>

            <View style={styles.chartHeader}>

              <View style={styles.chartHeaderContent}>

                <Text style={styles.chartTitle}>
                  Patient Growth
                </Text>

                <Text style={styles.chartSubtitle}>
                  Total registered patients
                </Text>

              </View>

              <View style={styles.chartBadgeGreen}>
                <Users
                  size={18}
                  color="#16A34A"
                />
              </View>

            </View>

            <LineChart
              data={{
                labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                ],
                datasets: [
                  {
                    data: [
                      820,
                      910,
                      975,
                      1080,
                      1165,
                      1248,
                    ],
                  },
                ],
              }}
              width={chartWidth}
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
                  strokeDasharray: "",
                },

                propsForLabels: {
                  fontSize: 11,
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

          {/* ================================================= */}
          {/* QUICK ACTIONS */}
          {/* ================================================= */}

          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>

          {/* Patient Management */}
          <Pressable
            style={styles.actionCard}
            onPress={() =>
              router.push("/main/patient")
            }
          >

            <View style={styles.actionIcon}>
              <Users
                size={21}
                color="#2563EB"
              />
            </View>

            <View style={styles.actionContent}>

              <Text style={styles.actionTitle}>
                Patient Management
              </Text>

              <Text style={styles.actionDescription}>
                View and manage patient records
              </Text>

            </View>

            <Text style={styles.actionArrow}>
              →
            </Text>

          </Pressable>

          {/* Doctor Management */}
          <Pressable
            style={styles.actionCard}
            onPress={() =>
              router.push("/main/doctor")
            }
          >

            <View style={styles.actionIconGreen}>
              <UserRound
                size={21}
                color="#16A34A"
              />
            </View>

            <View style={styles.actionContent}>

              <Text style={styles.actionTitle}>
                Doctor Management
              </Text>

              <Text style={styles.actionDescription}>
                Manage doctors and their schedules
              </Text>

            </View>

            <Text style={styles.actionArrow}>
              →
            </Text>

          </Pressable>

          {/* Appointments */}
          <Pressable
            style={styles.actionCard}
          >

            <View style={styles.actionIconPurple}>
              <CalendarDays
                size={21}
                color="#9333EA"
              />
            </View>

            <View style={styles.actionContent}>

              <Text style={styles.actionTitle}>
                Appointments
              </Text>

              <Text style={styles.actionDescription}>
                Check today's appointments
              </Text>

            </View>

            <Text style={styles.actionArrow}>
              →
            </Text>

          </Pressable>

        </ScrollView>

      </View>

      {/* ================================================= */}
      {/* ANDROID / IOS BOTTOM NAVIGATION */}
      {/* ================================================= */}

      {!isWeb && (
        <View style={styles.mobileBottom}>
          <BottomNavbar />
        </View>
      )}

    </View>
  );
}

/* ========================================================= */
/* STYLES */
/* ========================================================= */

const styles = StyleSheet.create({

  /* ===================================================== */
  /* MAIN CONTAINER */
  /* ===================================================== */

  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
  },

  mainContent: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    padding: 24,

    /*
     * Extra bottom space so that the
     * mobile bottom navigation doesn't
     * cover the last content.
     */
    paddingBottom: 100,
  },

  /* ===================================================== */
  /* HEADER */
  /* ===================================================== */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },

  welcome: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },

  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  /* ===================================================== */
  /* SECTION */
  /* ===================================================== */

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },

  /* ===================================================== */
  /* STATISTICS */
  /* ===================================================== */

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  iconBoxGreen: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  iconBoxPurple: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FAF5FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  iconBoxOrange: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 5,
  },

  cardValue: {
    fontSize: 25,
    fontWeight: "700",
    color: "#0F172A",
  },

  cardDescription: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },

  /* ===================================================== */
  /* CHARTS */
  /* ===================================================== */

  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },

  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  chartHeaderContent: {
    flex: 1,
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  chartSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },

  chartBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  chartBadgeGreen: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
  },

  chart: {
    marginTop: 8,
    marginLeft: -10,
    borderRadius: 12,
  },

  /* ===================================================== */
  /* QUICK ACTIONS */
  /* ===================================================== */

  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
  },

  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  actionIconGreen: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  actionIconPurple: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FAF5FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  actionContent: {
    flex: 1,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 5,
  },

  actionDescription: {
    fontSize: 13,
    color: "#64748B",
  },

  actionArrow: {
    fontSize: 22,
    color: "#64748B",
    marginLeft: 10,
  },

  /* ===================================================== */
  /* MOBILE BOTTOM NAVIGATION */
  /* ===================================================== */

  mobileBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
  },
});