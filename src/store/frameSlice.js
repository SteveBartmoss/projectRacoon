import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listFrames: [
        {
            id: 1,
            title: "New Request"
        }
    ],
    currentTab: 1,
}

const frameSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        addFrame(state, action){
            state.listFrames.push(action.payload)
        },
        setCurrentTab(state,action){
            state.currentTab = action.payload
        },
        removeFrame(state,action){
            state.listFrames = state.listFrames.filter(element => element.id !== action.payload)
        }
    }
})

export const {
    addFrame,
    setCurrentTab,
    removeFrame
} = frameSlice.actions

export default frameSlice.reducer