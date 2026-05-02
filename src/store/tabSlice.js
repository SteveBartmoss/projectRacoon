import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    counter: 1,
    tabsById: {
        1: {
            id: 1,
            title: "New Request",
            method: "GET",
            next: null,
            prev: null,
        }
    },
    tabIds: [1],
    currentTab: 1, 
    head: 1,
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

            if(state.tabIds.length > 0){
                state.tabsById[state.head].next = tab.id
                tab.prev = state.head
                state.tabsById[tab.id] = tab
                state.head = tab.id
                state.tabIds.push(tab.id)
                state.currentTab = tab.id
            } else {
                state.tabsById[tab.id] = tab
                state.head = tab.id
                state.tabIds.push(tab.id)
                state.currentTab = tab.id
            }
        },
        setCurrentTab(state,action){
            state.currentTab = action.payload
        },
        removeTab(state,action){
            const id = action.payload

            const next = state.tabsById[id].next
            const prev = state.tabsById[id].prev
            
            if(next && prev){
                state.head = next
                state.currentTab = prev
            }

            if(next){
                state.tabsById[next].prev = prev
                state.head = next
                state.currentTab = next
            }

            if(prev){
                state.head = prev
                state.currentTab = prev
                state.tabsById[prev].next = next
            }

            delete state.tabsById[id]
            state.tabIds = state.tabIds.filter(element => element !== id)

            if(state.tabIds.length <=0){
                state.currentTab = 0
                state.counter = 0
            }

        },
        setCounter(state,action){
            state.counter = action.payload
        },
        setMethod(state, action){
            const tab = getTab(state, action.payload.id)

            if(tab){
                tab.method = action.payload.value
            }
        }
    }
})

export const {
    addTab,
    setCurrentTab,
    removeTab,
    setCounter,
    setNext,
    setMethod,
} = tabSlice.actions

export default tabSlice.reducer