
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import {
    persistReducer,
    persistStore,
} from "redux-persist";

import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";

// ============================================
// WEB-SAFE STORAGE
// ============================================

const createWebSafeStorage = () => ({
    getItem: async (key: string): Promise<string | null> => {
        if (typeof window === "undefined") {
            return null;
        }

        return window.localStorage.getItem(key);
    },

    setItem: async (key: string, value: string): Promise<string> => {
        if (typeof window === "undefined") {
            return value;
        }

        window.localStorage.setItem(key, value);
        return value;
    },

    removeItem: async (key: string): Promise<void> => {
        if (typeof window === "undefined") {
            return;
        }

        window.localStorage.removeItem(key);
    },
});

// ============================================
// STORAGE SELECTION
// ============================================

const storage =
    Platform.OS === "web"
        ? createWebSafeStorage()
        : AsyncStorage;

// ============================================
// ROOT REDUCER
// ============================================

const rootReducer = combineReducers({
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

// ============================================
// REDUX PERSIST CONFIG
// ============================================

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

// ============================================
// PERSISTED REDUCER
// ============================================

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

// ============================================
// STORE
// ============================================

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/REGISTER",
                    "persist/FLUSH",
                    "persist/PAUSE",
                    "persist/PURGE",
                ],
            },
        }).concat(apiSlice.middleware),
});

// ============================================
// PERSISTOR
// ============================================

export const persistor = persistStore(store);

// ============================================
// TYPES
// ============================================

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
