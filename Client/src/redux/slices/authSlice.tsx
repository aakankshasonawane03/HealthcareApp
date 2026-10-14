import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
        },

        setLogout: (state) => {
            state.userInfo = null;
        },
    },
});

export const {
    setCredentials,
    setLogout,
} = authSlice.actions;

export default authSlice.reducer;