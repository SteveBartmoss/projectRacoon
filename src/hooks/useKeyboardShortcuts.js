import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as commands from '../store/thunks/commandsThunks';

const SHORTCUTS = {
    'ctrl+s': 'saveCurrentTab',
    'ctrl+n': 'newEmptyTab',
    'ctrl+shift+n': 'newWindow',
    'ctrl+o': 'openFileAsNewTab',
}

export function useKeyboardShortcuts(){
    
    const dispatch = useDispatch()

    const executeCommand = useCallback((commandName) => {
        const command = commands[commandName]

        if(command) {
            dispatch(command())
        } else {
            console.warn(`Command "${commandName}" not found`)
        }

    },[dispatch])

    useEffect(() => {

        const handleKeyDown = (event) => {

            const tag = event.target.tagName
            const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || event.target.isContentEditable
            if(isTyping) return

            const key = event.key.toLowerCase()
            const modifiers = []
            if(event.ctrlKey) modifiers.push('ctrl')
            if(event.shiftKey) modifiers.push('shift')
            if(event.altKey) modifiers.push('alt')
            if(event.metaKey) modifiers.push('meta')

            let combo = [...modifiers, key].join('+')

            const commandName = SHORTCUTS[combo]
            if(commandName){
                event.preventDefault()
                executeCommand(commandName)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        
        return () => window.removeEventListener('keydown', handleKeyDown)
    },[executeCommand])
}