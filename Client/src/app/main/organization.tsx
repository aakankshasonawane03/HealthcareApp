
import React from "react";
import { StyleSheet, View } from "react-native";

import OrganizationDashboard from "../components/organization/OrganizationDashboard";

export default function OrganizationRoute() {
    return (
        <View style={styles.container}>
            <OrganizationDashboard />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },
});
