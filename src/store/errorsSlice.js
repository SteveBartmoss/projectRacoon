import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    errorMessages: [],
    errorCounter: 0,
    warningMessages: [],
    warningCounter: 0
}

const errorSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        addMessage(state, action){
            if(action.payload.error){
                state.errorMessages.push(action.payload.message)
            }
            if(action.payload.warning){
                state.warningMessages.push(action.payload.message)
            }
        },
        setErrorCounter(state, action){
            if(action.payload.error){
                state.errorCounter = action.payload.counter
            }
            if(action.payload.warning){
                state.warningCounter = action.payload.counter
            }
        }
    }
})

export const {
    addMessage,
    setErrorCounter,
} = errorSlice.actions

export default errorSlice.reducer