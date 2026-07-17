import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    codeLinesById: {},
    tabIndex: 0,
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

        },
        setTabIndex(state,action) = {
            
            const index = action.payload

            state.tabIndex = index

        }
    }
})

export const {
    addCodeLine,
    removeCodeLine,
    setTabIndex,
} = codeSlice.actions

export default codeSlice.reducer