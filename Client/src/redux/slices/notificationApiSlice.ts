import { apiSlice } from "./apiSlice";



const NOTIFICATION_URL = "/api/notification";



export interface Notification {
    _id?: string;
    id?: string;

    [key: string]: any;
}

export interface CreateNotificationRequest {
    [key: string]: any;
}

export interface RegisterDeviceTokenRequest {
    [key: string]: any;
}



export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // Create notification
        createNotification: builder.mutation<
            Notification,
            CreateNotificationRequest
        >({
            query: (data) => ({
                url: `${NOTIFICATION_URL}/createnotification`,
                method: "POST",
                body: data,
            }),
        }),

        // Get all notifications
        getNotifications: builder.query<Notification[], void>({
            query: () => ({
                url: `${NOTIFICATION_URL}/getnotifications`,
                method: "GET",
            }),
        }),

        // Get unread notifications
        getUnreadNotifications: builder.query<Notification[], void>({
            query: () => ({
                url: `${NOTIFICATION_URL}/unread`,
                method: "GET",
            }),
        }),

        // Register device token
        registerDeviceToken: builder.mutation<
            any,
            RegisterDeviceTokenRequest
        >({
            query: (data) => ({
                url: `${NOTIFICATION_URL}/device-token`,
                method: "POST",
                body: data,
            }),
        }),

        // Mark notification as read
        markNotificationAsRead: builder.mutation<
            any,
            string
        >({
            query: (id) => ({
                url: `${NOTIFICATION_URL}/${id}/read`,
                method: "PUT",
            }),
        }),

        // Mark all notifications as read
        markAllNotificationsAsRead: builder.mutation<
            any,
            void
        >({
            query: () => ({
                url: `${NOTIFICATION_URL}/read-all`,
                method: "PUT",
            }),
        }),

        // Delete notification
        deleteNotification: builder.mutation<
            any,
            string
        >({
            query: (id) => ({
                url: `${NOTIFICATION_URL}/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
*/

const {
    useCreateNotificationMutation,
    useGetNotificationsQuery,
    useGetUnreadNotificationsQuery,
    useRegisterDeviceTokenMutation,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,
    useDeleteNotificationMutation,
} = notificationApi;

export {
    useCreateNotificationMutation,
    useGetNotificationsQuery,
    useGetUnreadNotificationsQuery,
    useRegisterDeviceTokenMutation,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,
    useDeleteNotificationMutation,
};