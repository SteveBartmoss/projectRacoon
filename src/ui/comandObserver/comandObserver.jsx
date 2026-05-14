import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../../store/requestSlice";


export function ComandObserver({ children }) {

    const tabSelected = useSelector((state) => state.tabs.currentTab)
    const request = useSelector((state) => state.requests.requestsById[tabSelected])
    const listFrames = useSelector((state) => state.tabs.tabIds)
    const tabCounter = useSelector((state) => state.tabs.counter)

    const dispatch = useDispatch()

    const handleNewWindow = () => {
        const webview = new WebviewWindow(`window-${Date.now()}`, {
            url: '/',
            title: 'Raccoon',
            width: 800,
            height: 600,
        })
    }

    const handleSaveTab = async () => {

        const path = await save({
            defaultPath: "newrequest.json"
        })

        if(!path) return

        const encoder = new TextEncoder()

        const bytes = encoder.encode(
            JSON.stringify(request, null, 2)
        )

        await writeFile(path, bytes)

        dispatch(setInfo({
            id: tabSelected,
            field: "path",
            value: path
        }))
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
                handleSaveTab()
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