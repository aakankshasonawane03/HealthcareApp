import React, { ReactNode } from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

interface AuthScreenProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

const BACKGROUND_IMAGE =
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=2000&q=85";

export default function AuthScreen({
    title,
    subtitle,
    children,
}: AuthScreenProps) {
    const { width } = useWindowDimensions();
    const isWide = width >= 850;

    return (
        <ImageBackground
            source={{ uri: BACKGROUND_IMAGE }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <ScrollView
                contentContainerStyle={[
                    styles.scroll,
                    isWide && styles.wideScroll,
                ]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {isWide && (
                    <View style={styles.hero}>
                        <View style={styles.brandRow}>
                            <View style={styles.brandIcon}>
                                <Text style={styles.brandIconText}>H+</Text>
                            </View>
                            <Text style={styles.brandName}>HealthCare</Text>
                        </View>

                        <Text style={styles.heroTitle}>
                            Your Health,{"\n"}Our Priority.
                        </Text>

                        <Text style={styles.heroDescription}>
                            Smart healthcare management for patients,
                            doctors and healthcare organizations.
                        </Text>

                        <View style={styles.heroLine} />

                        <Text style={styles.heroSmall}>
                            Care • Connect • Manage
                        </Text>
                    </View>
                )}

                <View style={styles.formSide}>
                    <View style={styles.card}>
                        <View style={styles.mobileBrand}>
                            <View style={styles.brandIcon}>
                                <Text style={styles.brandIconText}>H+</Text>
                            </View>
                            <Text style={styles.mobileBrandName}>
                                HealthCare
                            </Text>
                        </View>

                        <Text style={styles.heading}>{title}</Text>
                        <Text style={styles.subtitle}>{subtitle}</Text>

                        {children}

                        <Text style={styles.bottomNote}>
                            Secure Healthcare Management
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        minHeight: "100%",
        backgroundColor: "#0F2747",
    },
    overlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: "rgba(5, 24, 49, 0.72)",
    },
    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    wideScroll: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "7%",
        paddingVertical: 45,
        gap: 50,
    },
    hero: {
        flex: 1,
        maxWidth: 570,
        paddingVertical: 30,
    },
    brandRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 13,
        marginBottom: 65,
    },
    brandIcon: {
        height: 48,
        width: 48,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    brandIconText: {
        color: "#1765C1",
        fontSize: 21,
        fontWeight: "900",
    },
    brandName: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "800",
    },
    heroTitle: {
        color: "#FFFFFF",
        fontSize: 51,
        lineHeight: 61,
        fontWeight: "800",
    },
    heroDescription: {
        color: "#E1EAF5",
        fontSize: 17,
        lineHeight: 28,
        marginTop: 20,
        maxWidth: 470,
    },
    heroLine: {
        width: 65,
        height: 4,
        borderRadius: 5,
        backgroundColor: "#58A6FF",
        marginTop: 30,
        marginBottom: 17,
    },
    heroSmall: {
        color: "#DCEBFF",
        fontSize: 14,
        letterSpacing: 1,
    },
    formSide: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        width: "100%",
        maxWidth: 490,
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        padding: 30,
        borderWidth: 1,
        borderColor: "#E7EDF5",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 25,
        shadowOffset: { width: 0, height: 12 },
        elevation: 8,
    },
    mobileBrand: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 22,
    },
    mobileBrandName: {
        color: "#17365D",
        fontSize: 21,
        fontWeight: "800",
    },
    heading: {
        color: "#15345B",
        fontSize: 27,
        fontWeight: "800",
    },
    subtitle: {
        color: "#718096",
        fontSize: 14,
        lineHeight: 21,
        marginTop: 7,
        marginBottom: 18,
    },
    bottomNote: {
        color: "#94A3B8",
        textAlign: "center",
        fontSize: 11,
        marginTop: 23,
    },
});