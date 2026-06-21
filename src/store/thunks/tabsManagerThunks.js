import { addRequest, cleanHeaders, cleanParams, removeRequest } from "../requestSlice"
import { addTab, removeTab } from "../tabSlice"
import { IDGenerator } from "../../utils/generateId"
import { buildHeaders, buildParams, loadEmptyRequest, loadResponseAndRequest } from "../../utils/requestUtils"
import { addResponse } from "../responseSlice"


export const createNewTab = () => (dispatch) => {

    const id = IDGenerator.generate()

    dispatch(addTab({id}))

    const request = loadEmptyRequest()

    dispatch(addRequest({id,...request}))
    
}

export const createTabFromJson = (json,path=null) => (dispatch) => {

    const id = IDGenerator.generate()

    dispatch(addTab({id}))
    
    const {request,response} = loadResponseAndRequest(json)

    dispatch(addRequest({id,...request}))
    dispatch(addResponse({id,...response}))

}

export const deleteTab = (id) => (dispatch) => {
    dispatch(removeTab(id))
    dispatch(removeRequest(id))
}

export const destroyParams = (id) => (dispatch) => {
    const params = buildParams()

    dispatch(cleanParams({id,params}))

}

export const destroyHeaders = (id) => (dispatch) => {
    const headers = buildHeaders()

    dispatch(cleanHeaders({id,headers}))

}