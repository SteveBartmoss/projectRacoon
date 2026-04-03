import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    framesById: {
        1: {
            id: 1,
            title: "New Request",
            url: "",
            method: "GET",
            body: "",
            params: [
                {
                    id: 1,
                    name: "",
                    value: "",
                }
            ],
            auth: "",
            authType: "",
            response: {},
        }
    },

    framesIds: [1],
    
    listFrames: [
        {
            id: 1,
            title: "New Request",
            url: "",
            method: "GET",
            body: "",
            params: [
                {
                    id: 1,
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

const getFrame = (state,id) => {
    state.framesById[id]
}

const frameSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        addFrame(state, action) {
            const frame = action.payload

            state.framesById[frame.id] = frame
            state.framesIds.push(frame.id)
        },
        setCurrentTab(state, action) {
            state.currentTab = action.payload
        },
        removeFrame(state, action) {
            const id = action.payload

            delete state.framesById[id]
            state.framesIds =  state.framesIds.filter(element => element !== id)
        },
        setUrl(state, action) {
            const frame = getFrame(state, action.payload.id)

            if(frame){
                frame.url = action.payload.url
            }

        },
        setMethod(state, action) {
            const frame = getFrame(state, action.payload.id)

            if(frame){
                frame.method = action.payload.method
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
        },
        setAuth(state, action){
            const index = state.listFrames.findIndex(element => element.id === action.payload.id)

            if (index !== -1) {
                state.listFrames[index].auth = action.payload.auth
            }
        },
        setAuthType(state, action){
            const index = state.listFrames.findIndex(element => element.id === action.payload.id)

            if (index !== -1) {
                state.listFrames[index].authType = action.payload.authType
            }
        },
        setParamName(state,action){
            const index = state.listFrames.findIndex(element => element.id === action.payload.frameId)
            let paramIndex = null

            if(index !== -1){
                paramIndex = state.listFrames[index].params.findIndex(element => element.id === action.payload.paramId)
            }

            if(paramIndex !== -1){
                state.listFrames[index].params[paramIndex].name = action.payload.paramName
            }
        },
        setParamValue(state,action){
            const index = state.listFrames.findIndex(element => element.id === action.payload.frameId)
            let paramIndex = null

            if(index !== -1){
                paramIndex = state.listFrames[index].params.findIndex(element => element.id === action.payload.paramId)
            }

            if(paramIndex !== -1){
                state.listFrames[index].params[paramIndex].value = action.payload.paramValue
            }
        },
        addParam(state,action){
            const index = state.listFrames.findIndex(element => element.id === action.payload.id)

            if(index !== -1){
                state.listFrames[index].params.push(action.payload.param)
            }
        },
        removeParam(state,action){
            const index = state.listFrames.findIndex(element => element.id === action.payload.id)

            if(index !== -1){
                state.listFrames[index].params = state.listFrames[index].params.filter(element => element.id !== action.payload.paramId)
            }
        },
        cleanParams(state,action){
            const index = state.listFrames.findIndex(element => element.id === action.payload.id)

            if(index !== -1){
                state.listFrames[index].params = action.payload.params
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
    setResponse,
    setAuth,
    setAuthType,
    setParamName,
    setParamValue,
    addParam,
    removeParam,
    cleanParams
} = frameSlice.actions

export default frameSlice.reducer