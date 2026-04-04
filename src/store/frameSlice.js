import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    framesById: {
        1: {
            id: 1,
            title: "New Request",
            url: "",
            method: "GET",
            body: "",
            paramsById: {
                1: {
                    id: 1,
                    name: "",
                    value: "",
                },
            },
            paramIds: [1],
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

    frameIds: [1],

    currentTab: 1,
}

const getFrame = (state,id) => {
    return state.framesById[id]
}

const getParam = (frame,id) => {
    return frame.paramsById[id]
}

const frameSlice = createSlice({
    name: 'frames',
    initialState,
    reducers: {
        addFrame(state, action) {
            const frame = action.payload

            state.framesById[frame.id] = frame
            state.frameIds.push(frame.id)
        },
        setCurrentTab(state, action) {
            state.currentTab = action.payload
        },
        removeFrame(state, action) {
            const id = action.payload

            delete state.framesById[id]
            state.frameIds =  state.frameIds.filter(element => element !== id)
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

            const frame = getFrame(state, action.payload.id)

            if(frame){
                frame.body = action.payload.body
            }

        },
        setResponse(state, action) {
            const frame = getFrame(state, action.payload.id)

            if(frame){
                frame.response = action.payload.response
            }

        },
        setAuth(state, action){
            const frame = getFrame(state, action.payload.id)

            if(frame){
                frame.auth = action.payload.auth
            }

        },
        setAuthType(state, action){
            const frame = getFrame(state, action.payload.id)

            if(frame){
                frame.authType = action.payload.authType
            }

        },
        setParamName(state,action){
            const frame = getFrame(state, action.payload.frameId)

            if(!frame) return

            const param = getParam(framem,action.payload.paramId)

            if(param){
                param.name = action.payload.paramName
            }

        },
        setParamValue(state,action){
            const frame = getFrame(state, action.payload.frameId)

            if(!frame) return

            const param = frame.params.find(
                element => element.id === action.payload.paramId
            )

            if(param){
                param.value = action.payload.paramValue
            }

        },
        addParam(state,action){
            const frame = getFrame(state, action.payload.id)

            if(frame){
                frame.params.push(action.payload.param)
            }

        },
        removeParam(state,action){
            const frame = getFrame(state,action.payload.id)

            if(frame){
                frame.params = frame.params.filter(
                    element => element.id !== action.payload.paramId
                )
            }

        },
        cleanParams(state,action){
            const frame = getFrame(state, action.payload.id)
            
            if(frame){
                frame.params = action.payload.params
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