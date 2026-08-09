import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    historiesById: {},
    historiesIds: [],
}


const historyResponseSlice = createSlice({
    name: 'responses',
    initialState,
    reducers: {
        addEntry(state,action) {

            const entry = action.payload

            if(state.historiesById[entry.id] && state.historiesById[entry.id].length>0){
                state.historiesById[entry.id].push(entry)
            } else {
                state.historiesById[entry.id] = [entry]
            }
            
            state.historiesIds.push(entry.id)

        },
        removeEntry(state,action){
            const id = action.payload

            delete state.historiesById[id]
            state.historiesIds = state.historiesIds.filter(element => element !== id)
        }
    }
})

export const {
    addEntry,
    removeEntry,
} = historyResponseSlice.actions

export default historyResponseSlice.reducer
