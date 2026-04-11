import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    requestsById: {
        1: {
            id: 1,
            url: "",
            method: "GET",
            body: "",
            paramsById: {
                1: {
                    id: 1,
                    name: "",
                    value: "",
                    active: true,
                },
            },
            paramIds: [1],
            auth: "",
            authType: "",
            response: {},
            description: ""
        }
    },
    requestIds: [1],
    counter: 1,
}

const getRequest = (state, id) => {
    return state.requestsById[id]
}

const getParam = (request, id) => {
    return request.paramsById[id]
}

const requestSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        addRequest(state, action) {
            const request = action.payload

            state.requestsById[request.id] = request
            state.requestIds.push(request.id)
        },
        removeRequest(state, action) {
            const id = action.payload

            delete state.requestsById[id]
            state.requestIds = state.requestIds.filter(element => element !== id)
        },
        setInfo(state, action){
            const request = getRequest(state, action.payload.id)

            if(request){
                request[action.payload.field] = action.payload.value
            }
        },
        setParamInfo(state,action){
            
            const request = getRequest(state, action.payload.requestId)

            if(!request) return

            const param = getParam(request, action.payload.paramId)

            if(param){
                param[action.payload.field] = action.payload.paramValue
            }
        },
        addParam(state, action) {

            const request = getRequest(state, action.payload.id)

            if (request) {
                request.paramsById[action.payload.param.id] = action.payload.param
                request.paramIds.push(action.payload.param.id)
            }
        },
        removeParam(state, action) {
            const request = getRequest(state, action.payload.id)

            if (request) {
                delete request.paramsById[action.payload.paramId]
                request.paramIds = request.paramIds.filter(element => element !== action.payload.paramId)
            }
        },
        cleanParams(state, action) {
            const request = getRequest(state, action.payload.id)

            if (request) {
                request.paramsById = {
                    1: {
                        id: 1,
                        name: "",
                        value: "",
                        ative: true
                    }
                }
                request.paramIds = [1]
            }

            state.counter = 1
        }
    }
})

export const {
    addRequest,
    removeRequest,
    setInfo,
    setParamInfo,
    addParam,
    removeParam,
    cleanParams
} = requestSlice.actions

export default requestSlice.reducer