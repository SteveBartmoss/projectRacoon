import { useSelector } from "react-redux"
import { Box } from "../ui/containers/containers"
import { Header } from "../ui/header/header"
import { FrameTabs } from "../ui/frameTabs/frameTabs"
import { FooterLayout } from "./FooterLayout"
import { WidgetsLayout } from "./WidgetsLayout"

export function AppLayout() {

    const tabs = useSelector((state) => 
        state.tabs.tabIds.map(id => state.tabs.tabsById[id])
    )

    return (
        <>
            <Box styles={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100vw"
            }}>
                <Header />
                <FrameTabs elements={tabs} />
                <WidgetsLayout />
                <FooterLayout />
            </Box>
        </>
    )
}