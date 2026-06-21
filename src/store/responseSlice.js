import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    responsesById: {},
    responsesIds: [],
}

const responseSlice = createSlice({
    name: 'responses',
    initialState,
    reducers: {
        addResponse(state,action) {
            const response = action.payload

            state.responsesById[response.id] = response
            state.responsesIds.push(response.id)
        },
        removeResponse(state,action){
            const id = action.payload

            delete state.responsesById[id]
            state.responsesIds = state.responsesIds.filter(element => element !== id)
        }
    }
})

export const {
    addResponse,
    removeResponse,
} = responseSlice.actions

export default responseSlice.reducer