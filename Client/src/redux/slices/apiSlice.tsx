import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.EXPO_PUBLIC_API_URL,

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth?.userInfo?.accessToken;
            // console.log(token);

            console.log("url", process.env.EXPO_PUBLIC_API_URL);
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: () => ({}),
});