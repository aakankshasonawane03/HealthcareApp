
import React from "react";
import { StyleSheet, View } from "react-native";
import BranchManagement from "../components/doctor/BranchManagement";

export default function BranchesRoute() {
    return (
        <View style={styles.container}>
            <BranchManagement />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },
});
