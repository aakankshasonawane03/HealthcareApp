
import {
    Building2,
    CalendarPlus,
    ChevronRight,
    MapPin,
    Phone,
    Star,
} from "lucide-react-native";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export interface PatientClinic {
    id: string | number;
    name: string;
    location?: string;
    distance?: string;
    rating?: number;
    address?: string;
    phone?: string;
    openNow?: boolean;
    image?: string;
    onPress?: () => void;
    onBookPress?: () => void;
}

interface ClinicCardProps extends PatientClinic { }

export default function ClinicCard({
    name,
    location,
    distance,
    rating,
    address,
    phone,
    openNow = true,
    image,
    onPress,
    onBookPress,
}: ClinicCardProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
            ]}
        >
            {/* Clinic Image / Icon */}
            <View style={styles.imageWrapper}>
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.clinicImage}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Building2 size={28} color="#2563EB" />
                    </View>
                )}
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <View style={styles.titleRow}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.name} numberOfLines={1}>
                            {name}
                        </Text>

                        {location ? (
                            <View style={styles.locationRow}>
                                <MapPin size={13} color="#64748B" />

                                <Text
                                    style={styles.location}
                                    numberOfLines={1}
                                >
                                    {location}
                                </Text>
                            </View>
                        ) : null}
                    </View>

                    <ChevronRight size={20} color="#94A3B8" />
                </View>

                {/* Details */}
                <View style={styles.detailsRow}>
                    {rating !== undefined ? (
                        <View style={styles.ratingContainer}>
                            <Star
                                size={14}
                                color="#EA580C"
                                fill="#EA580C"
                            />

                            <Text style={styles.ratingText}>
                                {rating.toFixed(1)}
                            </Text>
                        </View>
                    ) : null}

                    {distance ? (
                        <View style={styles.distanceContainer}>
                            <MapPin size={13} color="#64748B" />

                            <Text style={styles.distanceText}>
                                {distance}
                            </Text>
                        </View>
                    ) : null}

                    {openNow !== undefined ? (
                        <View style={styles.statusContainer}>
                            <View
                                style={[
                                    styles.statusDot,
                                    {
                                        backgroundColor: openNow
                                            ? "#16A34A"
                                            : "#94A3B8",
                                    },
                                ]}
                            />

                            <Text
                                style={[
                                    styles.statusText,
                                    {
                                        color: openNow
                                            ? "#16A34A"
                                            : "#64748B",
                                    },
                                ]}
                            >
                                {openNow ? "Open now" : "Closed"}
                            </Text>
                        </View>
                    ) : null}
                </View>

                {address ? (
                    <Text style={styles.address} numberOfLines={1}>
                        {address}
                    </Text>
                ) : null}

                {/* Actions */}
                {(phone || onBookPress) && (
                    <View style={styles.actionsRow}>
                        {phone ? (
                            <Pressable
                                style={styles.phoneButton}
                                onPress={(event) => {
                                    event.stopPropagation();
                                }}
                            >
                                <Phone size={15} color="#2563EB" />

                                <Text style={styles.phoneText}>
                                    Contact
                                </Text>
                            </Pressable>
                        ) : null}

                        {onBookPress ? (
                            <Pressable
                                style={styles.bookButton}
                                onPress={(event) => {
                                    event.stopPropagation();
                                    onBookPress();
                                }}
                            >
                                <CalendarPlus
                                    size={15}
                                    color="#FFFFFF"
                                />

                                <Text style={styles.bookText}>
                                    Book Appointment
                                </Text>
                            </Pressable>
                        ) : null}
                    </View>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 18,
        padding: 14,
        marginBottom: 12,
    },

    cardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.99 }],
    },

    imageWrapper: {
        width: 72,
        height: 72,
        borderRadius: 16,
        overflow: "hidden",
        marginRight: 13,
    },

    clinicImage: {
        width: "100%",
        height: "100%",
    },

    imagePlaceholder: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    content: {
        flex: 1,
        minWidth: 0,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },

    titleContainer: {
        flex: 1,
        marginRight: 8,
    },

    name: {
        color: "#0F172A",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 5,
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    location: {
        flex: 1,
        color: "#64748B",
        fontSize: 12,
    },

    detailsRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 10,
    },

    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    ratingText: {
        color: "#475569",
        fontSize: 12,
        fontWeight: "600",
    },

    distanceContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },

    distanceText: {
        color: "#64748B",
        fontSize: 12,
    },

    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },

    statusText: {
        fontSize: 11,
        fontWeight: "600",
    },

    address: {
        color: "#64748B",
        fontSize: 11,
        marginTop: 8,
    },

    actionsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 12,
    },

    phoneButton: {
        minHeight: 34,
        paddingHorizontal: 10,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#BFDBFE",
        backgroundColor: "#EFF6FF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },

    phoneText: {
        color: "#2563EB",
        fontSize: 11,
        fontWeight: "600",
    },

    bookButton: {
        flex: 1,
        minHeight: 34,
        paddingHorizontal: 10,
        borderRadius: 9,
        backgroundColor: "#2563EB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },

    bookText: {
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: "700",
    },
});
