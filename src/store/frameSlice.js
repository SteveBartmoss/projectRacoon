import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listFrames: [
        {
            title: "New Request"
        }
    ]
}

const frameSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        addFrame(state, action){
            state.listFrames.push(action.payload)
        }
    }
})

export const {
    addFrame,
} = frameSlice.actions

export default frameSlice.reducer