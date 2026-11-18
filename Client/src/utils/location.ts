import * as Location from "expo-location";

export interface UserLocation {
    latitude: number;
    longitude: number;
}

export async function getCurrentUserLocation(): Promise<UserLocation> {
    const permission =
        await Location.requestForegroundPermissionsAsync();

    if (permission.status !== "granted") {
        throw new Error(
            "Location permission denied. Please enable location access."
        );
    }

    const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
    });

    return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
}