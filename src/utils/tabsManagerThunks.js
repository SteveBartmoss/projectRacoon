import { addRequest } from "../store/requestSlice"
import { addTab } from "../store/tabSlice"
import { IDGenerator } from "./generateId"


export const createNewTab = ({tab, request}) => (dispatch) => {

    const id = IDGenerator.generate()

    dispatch(addTab({id,...tab}))
    dispatch(addRequest({id,...request}))

}