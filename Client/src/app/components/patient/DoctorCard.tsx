
import {
    CalendarPlus,
    ChevronRight,
    MapPin,
    Star,
} from "lucide-react-native";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export interface DoctorCardProps {
    id: string | number;
    name: string;
    specialty?: string;
    experience?: string;
    rating?: number;
    clinicName?: string;
    location?: string;
    image?: string;
    consultationFee?: string | number;
    available?: boolean;
    onPress?: () => void;
    onBookPress?: () => void;
}

export default function DoctorCard({
    name,
    specialty = "General Physician",
    experience,
    rating = 0,
    clinicName,
    location,
    image,
    consultationFee,
    available = true,
    onPress,
    onBookPress,
}: DoctorCardProps) {
    return (
        <View style={styles.card}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.mainContent}
            >
                <View style={styles.imageContainer}>
                    {image ? (
                        <Image
                            source={{ uri: image }}
                            style={styles.doctorImage}
                        />
                    ) : (
                        <View style={styles.imageFallback}>
                            <Text style={styles.initial}>
                                {name.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}

                    <View
                        style={[
                            styles.statusDot,
                            {
                                backgroundColor: available
                                    ? "#16A34A"
                                    : "#94A3B8",
                            },
                        ]}
                    />
                </View>

                <View style={styles.info}>
                    <View style={styles.nameRow}>
                        <Text
                            style={styles.name}
                            numberOfLines={1}
                        >
                            {name}
                        </Text>

                        <ChevronRight
                            size={17}
                            color="#94A3B8"
                        />
                    </View>

                    <Text
                        style={styles.specialty}
                        numberOfLines={1}
                    >
                        {specialty}
                    </Text>

                    {experience ? (
                        <Text style={styles.experience}>
                            {experience} experience
                        </Text>
                    ) : null}

                    <View style={styles.ratingRow}>
                        <Star
                            size={13}
                            color="#EA580C"
                            fill="#EA580C"
                        />

                        <Text style={styles.rating}>
                            {rating.toFixed(1)}
                        </Text>

                        {clinicName ? (
                            <>
                                <View style={styles.separator} />

                                <Text
                                    style={styles.clinic}
                                    numberOfLines={1}
                                >
                                    {clinicName}
                                </Text>
                            </>
                        ) : null}
                    </View>

                    {location ? (
                        <View style={styles.locationRow}>
                            <MapPin
                                size={12}
                                color="#64748B"
                                strokeWidth={1.8}
                            />

                            <Text
                                style={styles.location}
                                numberOfLines={1}
                            >
                                {location}
                            </Text>
                        </View>
                    ) : null}
                </View>
            </TouchableOpacity>

            <View style={styles.bottomRow}>
                {consultationFee !== undefined ? (
                    <View>
                        <Text style={styles.feeLabel}>
                            Consultation
                        </Text>

                        <Text style={styles.fee}>
                            ₹{consultationFee}
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.availableLabel}>
                            {available
                                ? "Available for booking"
                                : "Currently unavailable"}
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={!available}
                    onPress={onBookPress}
                    style={[
                        styles.bookButton,
                        !available && styles.disabledButton,
                    ]}
                >
                    <CalendarPlus
                        size={15}
                        color={available ? "#FFFFFF" : "#94A3B8"}
                        strokeWidth={2}
                    />

                    <Text
                        style={[
                            styles.bookText,
                            !available && styles.disabledText,
                        ]}
                    >
                        Book
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginBottom: 13,
        overflow: "hidden",
    },

    mainContent: {
        flexDirection: "row",
        padding: 15,
    },

    imageContainer: {
        width: 68,
        height: 68,
        position: "relative",
        marginRight: 13,
    },

    doctorImage: {
        width: "100%",
        height: "100%",
        borderRadius: 18,
    },

    imageFallback: {
        width: "100%",
        height: "100%",
        borderRadius: 18,
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
    },

    initial: {
        color: "#2563EB",
        fontSize: 25,
        fontWeight: "700",
    },

    statusDot: {
        position: "absolute",
        width: 11,
        height: 11,
        borderRadius: 6,
        right: -2,
        bottom: -2,
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },

    info: {
        flex: 1,
        minWidth: 0,
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    name: {
        flex: 1,
        color: "#0F172A",
        fontSize: 15,
        fontWeight: "700",
        marginRight: 4,
    },

    specialty: {
        color: "#2563EB",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 3,
    },

    experience: {
        color: "#64748B",
        fontSize: 10,
        marginTop: 3,
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 7,
    },

    rating: {
        color: "#475569",
        fontSize: 11,
        fontWeight: "600",
        marginLeft: 4,
    },

    separator: {
        width: 3,
        height: 3,
        borderRadius: 2,
        backgroundColor: "#CBD5E1",
        marginHorizontal: 7,
    },

    clinic: {
        flex: 1,
        color: "#64748B",
        fontSize: 10,
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    location: {
        flex: 1,
        color: "#64748B",
        fontSize: 10,
        marginLeft: 4,
    },

    bottomRow: {
        minHeight: 55,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        paddingHorizontal: 15,
        paddingVertical: 9,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    feeLabel: {
        color: "#94A3B8",
        fontSize: 9,
        marginBottom: 2,
    },

    fee: {
        color: "#0F172A",
        fontSize: 13,
        fontWeight: "700",
    },

    availableLabel: {
        color: "#64748B",
        fontSize: 10,
    },

    bookButton: {
        minWidth: 82,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#2563EB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
        gap: 6,
    },

    bookText: {
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: "700",
    },

    disabledButton: {
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    disabledText: {
        color: "#94A3B8",
    },
});
