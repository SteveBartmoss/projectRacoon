import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    showErrorsWindow: false,
    showAlerts: false,
    alertContent: null,
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
        },
        setShowAlerts(state, action){
            console.log('I am here')
            console.log(action.payload)
            state.showAlerts = action.payload
            console.log(state.showAlerts)
        },
        setAlertContent(state, action){
            state.alertContent = action.payload
        }
    }
})

export const {
    setShowErrorWindow,
    setConfig,
    setShowAlerts,
    setAlertContent,
} = appSlice.actions

export default appSlice.reducer