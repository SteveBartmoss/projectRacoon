import { useEffect } from "react";


export function useKeyboardInputs(){

    useEffect(() => {

        const handleKeyDown = (event) => {

            console.log(event.key)

        }

    },[])
    
}