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
                },
            },
            paramIds: [1],
            auth: "",
            authType: "",
            response: {},
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
        setUrl(state, action) {
            const request = getRequest(state, action.payload.id)

            if (request) {
                request.url = action.payload.url
            }
        },
        setMethod(state, action) {
            const request = getRequest(state, action.payload.id)

            if (request) {
                request.method = action.payload.method
            }
        },
        setBody(state, action) {
            const request = getRequest(state, action.payload.id)

            if (request) {
                request.body = action.payload.body
            }
        },
        setResponse(state, action) {
            const request = getRequest(state, action.payload.id)

            if (request) {
                request.response = action.payload.response
            }
        },
        setAuth(state, action) {
            const request = getRequest(state, action.payload.id)

            if (request) {
                request.auth = action.payload.auth
            }
        },
        setAuthType(state, action) {
            const request = getRequest(state, action.payload.id)

            if (request) {
                request.authType = action.payload.authType
            }
        },
        setParamName(state, action) {

            const request = getRequest(state, action.payload.requestId)
            if (!request) return

            const param = getParam(request, action.payload.paramId)

            if (param) {
                param.name = action.payload.paramName
            }
        },
        setParamValue(state, action) {

            const request = getRequest(state, action.payload.requestId)

            if (!request) return

            const param = getParam(request, action.payload.paramId)

            if (param) {
                param.value = action.payload.paramValue
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
} = requestSlice.actions

export default requestSlice.reducer