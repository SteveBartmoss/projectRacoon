import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    showErrorsWindow: false,
}

const appSlice = createSlice({
    name: 'appInfo',
    initialState,
    reducers: {
        setShowErrorWindow(state, action){
            state.showErrorsWindow = action.payload.value
        }
    }
})

export const {
    setShowErrorWindow,
} = appSlice.actions

export default appSlice.reducer