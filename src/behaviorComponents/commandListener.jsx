import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";


export function CommandListener({children}){

    useKeyboardShortcuts()
    return children
}