import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    codeLinesById: {}
}

const codeSlice = createSlice({
    name: 'code',
    initialState,
    reducers: {
        addCodeLine(state, action){

            const codeLine = action.payload

            state.codeLinesById[codeLine.id] = codeLine

        },
        removeCodeLine(state,action) = {
            const id = action.payload

            delete state.codeLinesById[id]

        }
    }
})

export const {
    addCodeLine,
    removeCodeLine,
} = codeSlice.actions

export default codeSlice.reducer