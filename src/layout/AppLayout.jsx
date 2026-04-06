import { useSelector } from "react-redux"
import { Box } from "../ui/containers/containers"
import { Header } from "../ui/header/header"
import { FrameTabs } from "../ui/frameTabs/frameTabs"
import { FooterLayout } from "./FooterLayout"

export function AppLayout() {

    const tabs = useSelector((state) => 
        state.tabs.tabIds.map(id => state.tabs.tabsById[id])
    )

    return (
        <>
            <Box styles={{
                display: "flex",
                flexDirection: "column",
                height: "98vh",
                width: "99vw"
            }}>
                <Header />
                <FrameTabs elements={tabs} />
                <FooterLayout />
            </Box>
        </>
    )
}