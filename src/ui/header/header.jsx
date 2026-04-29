import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import logo from "../../assets/racoon.png"
import { Box } from "../containers/containers"
import { Menu, MenuLayout } from "../menu/menu"
import './header.css'

export function Header() {

    const handleNewWindow = () => {
        const webview = new WebviewWindow(`window-${Date.now()}`,{
            url: '/',
            title: 'Raccoon',
            width: 800,
            height: 600,
        })

    }

    const options = [
        {
            title:'New',
            action: handleNewWindow
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