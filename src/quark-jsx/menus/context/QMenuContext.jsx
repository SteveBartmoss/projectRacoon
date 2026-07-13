import {createContext, useContext, useState } from 'react'

export const MenuContext = createContext()

export const useMenu = () => {
    const context = useContext(MenuContext)

    if(!context){
        throw new Error("useMenu must be used within a MenuContextProvider")
    }

    return context

}

export const MenuContextProvider = ({children}) => {

    const [open, setOpen] = useState(false)

    const handleOpen =  () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <MenuContext.Provider value={{open, handleOpen, handleClose}}>
            {children}
        </MenuContext.Provider>
    )
    
}