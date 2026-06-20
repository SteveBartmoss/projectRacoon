import { createSlice } from "@reduxjs/toolkit"
import { secureFieldsHeaders, secureFieldsParams, secureFieldsRequest } from "../utils/requestUtils"

const initialState = {
    requestsById: {},
    requestIds: [],
}

const getRequest = (state, id) => {
    return state.requestsById[id]
}

const getParam = (request, id) => {
    return request.paramsById[id]
}

const getHeader = (request, id) => {
    return request.headersById[id]
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

            if(!secureFieldsRequest.includes(action.payload.field)){
                throw new Error('Acceso a una propiedad sensible')
            }

            const request = getRequest(state, action.payload.id)

            if(request){
                request[action.payload.field] = action.payload.value
            }
        },
        setParamInfo(state,action){


            if(!secureFieldsParams.includes(action.payload.field)){
                throw new Error('Acceso a una propiedad sensible')
            }
            
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
                    [action.payload.params.id]: action.payload.params.paramsObjd
                }
                request.paramIds = action.payload.params.idArray
            }

        },
        setHeaderInfo(state,action){

            if(!secureFieldsHeaders.includes(action.payload.field)){
                throw new Error('Acceso a una propiedad sensible')
            }

            const request = getRequest(state, action.payload.requestId)

            if(!request) return

            const header = getHeader(request, action.payload.headerId)

            if(header){
                header[action.payload.field] = action.payload.headerValue
            }
        },
        addHeader(state,action){

            const request = getRequest(state, action.payload.id)

            if(request) {
                request.headersById[action.payload.header.id] = action.payload.header
                request.headerIds.push(action.payload.header.id)
            }
        },
        removeHeader(state,action){
            const request = getRequest(state, action.payload.id)

            if(request){
                delete request.headersById[action.payload.headerId]
                request.headerIds = request.headerIds.filter(element => element !== action.payload.headerId)
            }
        },
        cleanHeaders(state,action){
            const request = getRequest(state, action.payload.id)

            if(request){
                request.headersById = {
                    [action.payload.headers.id]: action.payload.headers.headersObj
                }
                request.headerIds = action.payload.headers.idArray
            }

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
    cleanParams,
    setHeaderInfo,
    addHeader,
    removeHeader,
    cleanHeaders,
} = requestSlice.actions

export default requestSlice.reducer