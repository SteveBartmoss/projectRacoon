

export function QMenu({children}){

    return (
        <MenuContextProvider>
            {children}
        </MenuContextProvider>
    )

}