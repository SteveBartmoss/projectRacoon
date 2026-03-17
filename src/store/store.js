import { configureStore } from "@reduxjs/toolkit";
import frameReducer from "./frameSlice"

export const store = configureStore({
    reducer: {
        frames: frameReducer,
    }
})