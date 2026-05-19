import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    tabsById: {},
    tabIds: [],
    currentTab: null,
    contexTab: null,
}

const getTab = (state,id) => {
    return state.tabsById[id]
}

const tabSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        addTab(state,action){

            const tab = action.payload

            state.tabsById[tab.id] = tab
            state.tabIds.push(tab.id)
            state.currentTab = tab.id

        },
        setCurrentTab(state,action){
            state.currentTab = action.payload
        },
        setContextTab(state,action){
            state.contexTab = action.payload
        },
        removeTab(state,action){
            const id = action.payload
            const index = state.tabIds.indexOf(id)

            if(state.tabIds[index+1]){
                state.currentTab = state.tabIds[index+1]
            } else if( state.tabIds[index-1]){
                state.currentTab = state.tabIds[index-1]
            }

            delete state.tabsById[id]
            state.tabIds = state.tabIds.filter(element => element !== id)

            if(state.tabIds.length <=0){
                state.currentTab = 0
            }

        }
    }
})

export const {
    addTab,
    setCurrentTab,
    setContextTab,
    removeTab,
    setCounter,
} = tabSlice.actions

export default tabSlice.reducer