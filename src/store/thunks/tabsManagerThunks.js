import { addRequest, removeRequest } from "../requestSlice"
import { addTab, removeTab } from "../tabSlice"
import { IDGenerator } from "../../utils/generateId"
import { loadEmptyRequest, loadRequest } from "../../utils/requestUtils"


export const createNewTab = () => (dispatch) => {

    const id = IDGenerator.generate()

    dispatch(addTab({id}))

    const request = loadEmptyRequest()

    dispatch(addRequest({id,...request}))
    
}

export const crerateTabFromJson = (json,path=null) => (dispatch) => {

    const id = IDGenerator.generate()

    dispatch(addTab({id}))

    const {title, url, method, body, paramsById, paramIds, headersById, headerIds, auth, authType, response, description} = loadRequest(json)

    dispatch(addRequest({id,title, url, method, body, paramsById, paramIds, headersById, headerIds, auth, authType, response, description}))

}

export const deleteTab = (id) => (dispatch) => {
    dispatch(removeTab(id))
    dispatch(removeRequest(id))
}