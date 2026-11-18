
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Platform } from "react-native";

// ============================================
// PLATFORM-SPECIFIC API URL
// ============================================

const getApiBaseUrl = () => {
    if (Platform.OS === "web") {
        return "http://localhost:8080";
    }

    if (Platform.OS === "android") {
        return "http://10.0.2.2:8080";
    }

    // iOS simulator
    return "http://localhost:8080";
};

const API_BASE_URL = getApiBaseUrl();

// ============================================
// API SLICE
// ============================================

export const apiSlice = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth?.userInfo?.accessToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),

    endpoints: () => ({}),
});
