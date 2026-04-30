import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import logo from "../../assets/racoon.png"
import { Box } from "../containers/containers"
import { Menu, MenuLayout } from "../menu/menu"
import './header.css'
import { useSelector } from "react-redux"
import { save } from "@tauri-apps/plugin-dialog"
import { writeFile } from "@tauri-apps/plugin-fs"

export function Header() {

    const tabSelected = useSelector((state) => state.tabs.currentTab)
    const request = useSelector((state) => state.requests.requestsById[tabSelected])

    const handleNewWindow = () => {
        const webview = new WebviewWindow(`window-${Date.now()}`,{
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

        await writeFile(path,bytes)        
        
    }

    const options = [
        {
            title:'New',
            action: handleNewWindow
        },
        {
            title: 'Save',
            action: handleSaveTab
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