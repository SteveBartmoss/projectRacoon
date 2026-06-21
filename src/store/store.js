import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "./tabSlice";
import requestSlice from "./requestSlice"
import errorSlice from "./errorsSlice"
import appSlice from "./appSlice"
import responseSlice from "./responseSlice"

export const store = configureStore({
    reducer: {
        tabs: tabSlice,
        requests: requestSlice,
        errors: errorSlice,
        appInfo: appSlice,
        responses: responseSlice,
    }
})