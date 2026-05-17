import { useDispatch, useSelector } from "react-redux"
import { Box } from "../ui/containers/containers"
import { Header } from "../ui/header/header"
import { FrameTabs } from "../ui/frameTabs/frameTabs"
import { FooterLayout } from "./FooterLayout"
import { ResizeLayout, WidgetsLayout } from "./WidgetsLayout"
import { invoke } from "@tauri-apps/api/core"
import { useEffect } from "react"
import { setConfig } from "../store/appSlice"
import { ComandObserver } from "../ui/comandObserver/comandObserver"
import { createNewTab } from "../utils/tabsManagerThunks"
import { loadEmptyRequest } from "../utils/requestUtils"

export function AppLayout() {

    const tabs = useSelector((state) =>
        state.tabs.tabIds.map(id => state.tabs.tabsById[id])
    )

    const dispatch = useDispatch()

    const initConfig = async () => {
        const config = await invoke("load_config");

        console.log(config)

        dispatch(setConfig(config))

        return
    }

    const initTabs = () => {

        dispatch(createNewTab({
            tab: {},
            request: loadEmptyRequest(1)
        }))

    }

    useEffect(() => {
        initConfig(),
        initTabs()
    }, []);

    return (
        <>
            <ComandObserver>
                <Box styles={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    width: "100vw"
                }}>
                    <Header />
                    <FrameTabs elements={tabs} />
                    <ResizeLayout />
                    <FooterLayout />
                </Box>
            </ComandObserver>
        </>
    )
}