

const initialState = {
    counter: 1,
    tabsById: {
        1: {
            id: 1,
            next: null,
            prev: null,
        }
    },
    tabIds: [1],
    currentTab: 1, 
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
        },
        setCurrentTab(state,action){
            state.currentTab = action.payload
        },
        removeTab(state,action){
            const id = action.payload

            delete state.tabsById[id]
            state.tabIds = state.tabIds.filter(element => element !== id)
        }
    }
})

export const {
    addTab,
    setCurrentTab,
    removeTab
} = tabSlice.actions

export default tabSlice.reducer