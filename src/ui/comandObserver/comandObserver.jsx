import { useEffect } from "react";


export function ComandObserver({ children }) {

    useEffect(() => {

        const handleKeyDown = (event) => {

            const tag = event.target.tagName;

            const isTyping =
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                event.target.isContentEditable;

            if (isTyping) return;

            //console.log(event.key, event.code);

            if (event.ctrlKey && event.code === "KeyS") {
                event.preventDefault();
                console.log("Guardar");
            }

            if(event.ctrlKey && event.code == "KeyN"){
                event.preventDefault();
                console.log("Nueva tab");
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () =>
            window.removeEventListener("keydown", handleKeyDown);

    }, []);

    return children
}