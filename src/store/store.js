import { configureStore } from "@reduxjs/toolkit";
import frameReducer from "./frameSlice"
import tabSlice from "./tabSlice";
import requestSlice from "./requestSlice"
import errorSlice from "./errorsSlice"
import appSlice from "./appSlice"

export const store = configureStore({
    reducer: {
        frames: frameReducer,
        tabs: tabSlice,
        requests: requestSlice,
        errors: errorSlice,
        appInfo: appSlice
    }
})