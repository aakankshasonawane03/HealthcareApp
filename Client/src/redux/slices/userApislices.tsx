import { apiSlice } from "./apiSlice";

const USERS_URL = "/api";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth/login`,
                method: "POST",
                body: data,
            }),
        }),

        
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth/register`,
                method: "POST",
                body: data,
            }),
        }),

        
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/auth/logout`,
                method: "POST",
            }),
        }),

    
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth/forgotPassword`,
                method: "POST",
                body: data,
            }),
        }),

        
        passwordReset: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth/resetpassword`,
                method: "POST",
                body: data,
            }),
        }),

        
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth/profile`,
                method: "PUT",
                body: data,
            }),
        }),



    }),
});
const { useLoginMutation, useRegisterMutation, useLogoutMutation, useForgotPasswordMutation, usePasswordResetMutation, useUpdateUserMutation } = authApi;

export { useForgotPasswordMutation, useLoginMutation, useLogoutMutation, usePasswordResetMutation, useRegisterMutation, useUpdateUserMutation };
