import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import logo from "../../assets/racoon.png"
import { Box } from "../containers/containers"
import { Menu, MenuLayout } from "../menu/menu"
import './header.css'
import { useDispatch, useSelector } from "react-redux"
import { open, save } from "@tauri-apps/plugin-dialog"
import { readFile, writeFile } from "@tauri-apps/plugin-fs"
import { addTab, setCounter } from "../../store/tabSlice"
import { addRequest } from "../../store/requestSlice"

export function Header() {

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

        if (!path) return

        const encoder = new TextEncoder()

        const bytes = encoder.encode(
            JSON.stringify(request, null, 2)
        )

        await writeFile(path, bytes)

    }

    const handleOpenFile = async () => {

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

        console.log(json)

        if (listFrames.length <= 0) {
            dispatch(setCounter(1))

            dispatch(addTab({
                id: tabCounter,
                title: "New Request",
                method: json.method,
                next: null,
                prev: null,
            }))

            dispatch(addRequest({
                id: tabCounter,
                title: "New Request",
                url: json.url,
                method: json.method,
                body: json.body,
                paramsById: json.paramsById,
                paramIds: json.paramIds,
                headersById: json.headersById,
                headerIds: json.headerIds,
                auth: json.auth,
                authType: json.authType,
                response: json.response,
                description: json.description
            }))
            return
        }

        let counter = tabCounter + 1

        dispatch(addTab({
            id: counter,
            title: "New Request",
            method: json.method,
            next: null,
            prev: null
        }))

        dispatch(addRequest({
            id: counter,
            title: "New Request",
            url: json.url,
            method: json.method,
            body: json.body,
            paramsById: json.paramsById,
            paramIds: json.paramIds,
            headersById: json.headersById,
            headerIds: json.headerIds,
            auth: json.auth,
            authType: json.authType,
            response: json.response,
            description: json.description
        }))

        dispatch(setCounter(counter))

    }

    const options = [
        {
            title: 'New',
            action: handleNewWindow
        },
        {
            title: 'Save',
            action: handleSaveTab
        },
        {
            title: 'Open',
            action: handleOpenFile
        }
    ]

    return (
        <>
            <Box styles={{
                display: "flex",
                flexDirection: "row",
            }}>
                <div>
                    <img className="logo" src={logo} />
                </div>
                <MenuLayout>
                    <Menu title={'App'} elements={options} />
                </MenuLayout>
            </Box>
        </>
    )
}