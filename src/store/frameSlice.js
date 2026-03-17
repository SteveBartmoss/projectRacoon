import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listFrames: [
        {
            id: 1,
            title: "New Request",
            url: "",
            method: "GET",
            body: "",
            params: [
                {
                    name: "",
                    value: "",
                }
            ],
            auth: "",
            authType: "",
            response: {},
        }
    ],
    currentTab: 1,
}

const frameSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        addFrame(state, action) {
            state.listFrames.push(action.payload)
        },
        setCurrentTab(state, action) {
            state.currentTab = action.payload
        },
        removeFrame(state, action) {
            state.listFrames = state.listFrames.filter(element => element.id !== action.payload)
        },
        setUrl(state, action) {
            const index = state.listFrames.findIndex(element => element.id === action.payload.id)

            if (index !== -1) {
                state.listFrames[index].url = action.payload.url
            }
        },
        setMethod(state, action) {
            const index = state.listFrames.findIndex(element => element.id === action.payload.id)

            if (index !== -1) {
                state.listFrames[index].method = action.payload.method
            }
        },
        setBody(state, action) {
            const index = state.listFrames.findIndex(element => element.id === action.payload.id)

            if (index !== -1) {
                state.listFrames[index].body = action.payload.body
            }
        },
        setResponse(state, action) {
            const index = state.listFrames.findIndex(element => element.id === action.payload.id)

            if (index !== -1) {
                state.listFrames[index].response = action.payload.response
            }
        }
    }
})

export const {
    addFrame,
    setCurrentTab,
    removeFrame,
    setUrl,
    setMethod,
    setBody,
    setResponse
} = frameSlice.actions

export default frameSlice.reducer