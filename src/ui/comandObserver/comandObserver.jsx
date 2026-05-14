import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { useEffect } from "react";


export function ComandObserver({ children }) {

    const handleNewWindow = () => {
        const webview = new WebviewWindow(`window-${Date.now()}`, {
            url: '/',
            title: 'Raccoon',
            width: 800,
            height: 600,
        })
    }

    useEffect(() => {

        const handleKeyDown = (event) => {

            const tag = event.target.tagName;

            const isTyping =
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                event.target.isContentEditable;

            if (isTyping) return;

            if (event.ctrlKey && event.code === "KeyS") {
                event.preventDefault();
                console.log("Guardar");
            }

            if(event.ctrlKey && event.code == "KeyN"){
                event.preventDefault();
                console.log("Nueva tab");
            }

            if(event.ctrlKey && event.shiftKey && event.code === "KeyN"){
                event.preventDefault();
                handleNewWindow()
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () =>
            window.removeEventListener("keydown", handleKeyDown);

    }, []);

    return children
}