import {configureStore} from "@reduxjs/toolkit"
import codeSlice from "./codeSlice"

export const store = configureStore({
    reducer: {
        codes: codeSlice,
    }
})