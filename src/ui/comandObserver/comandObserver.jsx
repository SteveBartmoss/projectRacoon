import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readFile, writeFile } from "@tauri-apps/plugin-fs";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, setInfo } from "../../store/requestSlice";
import { addTab, setCounter } from "../../store/tabSlice";
import { loadEmptyRequest, loadRequest } from "../../utils/requestUtils";
import { createNewTab } from "../../utils/tabsManagerThunks";


export function ComandObserver({ children }) {

    const tabSelected = useSelector((state) => state.tabs.currentTab)
    const request = useSelector((state) => state.requests.requestsById[tabSelected])
    const listFrames = useSelector((state) => state.tabs.tabIds)
    const tabCounter = useSelector((state) => state.tabs.counter)

    const tabCounterRef = useRef(tabCounter)
    const listFramesRef = useRef(listFrames)
    const requestRef = useRef(request)
    const tabSelectedRef = useRef(tabSelected)


    const dispatch = useDispatch()

    const handleNewWindow = () => {
        const webview = new WebviewWindow(`window-${Date.now()}`, {
            url: '/',
            title: 'Raccoon',
            width: 800,
            height: 600,
        })
    }

    const handleSaveTab = async (request, tabSelected) => {

        const path = await save({
            defaultPath: "newrequest.json"
        })

        if (!path) return

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

    const handleOpenFile = async (counter, frames) => {

        const path = await open({
            multiple: false,
            filters: [{
                name: 'JSON',
                extensions: ['json']
            }]
        })

        if (!path) return

        const bytes = await readFile(path)
        const decoder = new TextDecoder()
        const json = JSON.parse(decoder.decode(bytes))

        if (frames.length <= 0) {

            dispatch(createNewTab({
                tab: {
                    title: "New Request",
                    method: json.method,
                    next: null,
                    prev: null,
                },
                request: loadRequest(1, 'New Request', json)
            }))

            /*
            dispatch(addTab({
                id: 1,
                title: "New Request",
                method: json.method,
                next: null,
                prev: null,
            }))

            dispatch(addRequest(loadRequest(1, 'New Request', json)))
            */

            dispatch(setInfo({
                id: 1,
                field: "path",
                value: path
            }))

            return
        }

        let newCounter = counter + 1

        dispatch(createNewTab({
            tab: {
                title: "New Request",
                method: json.method,
                next: null,
                prev: null
            },
            request: loadRequest(newCounter, 'New Request', json)
        }))

        /*
        dispatch(addTab({
            id: newCounter,
            title: "New Request",
            method: json.method,
            next: null,
            prev: null
        }))

        dispatch(addRequest(loadRequest(newCounter, 'New Request', json)))
        */

        dispatch(setInfo({
            id: newCounter,
            field: "path",
            value: path
        }))

    }

    const handleAddTab = (counter, frames) => {

        if (frames.length <= 0) {

            dispatch(createNewTab({
                tab: {
                    title: "New Request",
                    method: "GET",
                    next: null,
                    prev: null,
                },
                request: loadEmptyRequest(1)
            }))

            /*
            dispatch(addTab({
                id: 1,
                title: "New Request",
                method: "GET",
                next: null,
                prev: null,
            }))

            dispatch(addRequest(loadEmptyRequest(1)))
            */

            return

        }

        let newCounter = counter + 1

        dispatch(createNewTab({
            tab: {
                title: "New Request",
                method: "GET",
                next: null,
                prev: null
            },
            request: loadEmptyRequest(newCounter)
        }))

        /*
        dispatch(addTab({
            id: newCounter,
            title: "New Request",
            method: "GET",
            next: null,
            prev: null
        }))

        dispatch(addRequest(loadEmptyRequest(newCounter)))
        */

    }

    useEffect(() => {
        tabCounterRef.current = tabCounter;
        listFramesRef.current = listFrames;
        requestRef.current = request;
        tabSelectedRef.current = tabSelected;
    }, [tabCounter, listFrames, request, tabSelected])

    useEffect(() => {

        const handleKeyDown = (event) => {

            const tag = event.target.tagName;

            const isTyping =
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                event.target.isContentEditable;

            if (isTyping) return;

            console.log({
                key: event.key,
                code: event.code,
                ctrl: event.ctrlKey,
                shift: event.shiftKey,
                alt: event.altKey,
                meta: event.metaKey
            });

            if (event.ctrlKey && event.code === "KeyS") {
                event.preventDefault();
                handleSaveTab(requestRef, tabSelectedRef)
            }

            if (event.ctrlKey && event.code == "KeyN") {
                event.preventDefault();
                console.log("Nueva tab");
                handleAddTab(tabCounterRef.current, listFramesRef.current)
            }

            if (event.ctrlKey && event.shiftKey && event.code === "KeyN") {
                event.preventDefault();
                handleNewWindow()
            }

            if (event.ctrlKey && event.code == "KeyO") {
                console.log('Nuevo archivo')
                event.preventDefault();
                handleOpenFile(tabCounterRef.current, listFramesRef.current)
            }

        }

        window.addEventListener("keydown", handleKeyDown, {
            capture: true
        });

        return () =>
            window.removeEventListener("keydown", handleKeyDown, {
                capture: true
            });


    }, []);

    return children
}