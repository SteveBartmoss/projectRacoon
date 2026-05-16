import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    showErrorsWindow: false,
    config: null,
}

const appSlice = createSlice({
    name: 'appInfo',
    initialState,
    reducers: {
        setShowErrorWindow(state, action){
            state.showErrorsWindow = action.payload.value
        },
        setConfig(state,action){
            state.config = action.payload.value
        }
    }
})

export const {
    setShowErrorWindow,
    setConfig,
} = appSlice.actions

export default appSlice.reducer