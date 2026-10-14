// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//     persistReducer,
//     persistStore,
// } from "redux-persist";
// import { apiSlice } from "./slices/apiSlice";
// import authReducer from "./slices/authSlice";

// // ============================================
// // ROOT REDUCER
// // ============================================

// const rootReducer = combineReducers({
//     // Add your slices here later.
//     // Example:
//     //
//     auth: authReducer,
//     // user: userReducer,
//     // patient: patientReducer,
//     // doctor: doctorReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer,
// });

// // ============================================
// // REDUX PERSIST CONFIG
// // ============================================

// const persistConfig = {
//     key: "root",
//     storage: AsyncStorage,
//     version: 1,
// };

// // ============================================
// // PERSISTED REDUCER
// // ============================================

// const persistedReducer = persistReducer(
//     persistConfig,
//     rootReducer
// );

// // ============================================
// // STORE
// // ============================================

// export const store = configureStore({
//     reducer: persistedReducer,

//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [
//                     "persist/PERSIST",
//                     "persist/REHYDRATE",
//                     "persist/REGISTER",
//                     "persist/FLUSH",
//                     "persist/PAUSE",
//                     "persist/PURGE",
//                 ],
//             },
//         }),
// });

// // ============================================
// // PERSISTOR
// // ============================================

// export const persistor = persistStore(store);

// // ============================================
// // TYPES
// // ============================================

// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;


import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    persistStore,
} from "redux-persist";

import { apiSlice } from "./slices/apiSlice";
import authReducer from "./slices/authSlice";

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
    storage: AsyncStorage,
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