import { useSelector } from "react-redux"
import { Box } from "../ui/containers/containers"
import { Header } from "../ui/header/header"
import { FrameTabs } from "../ui/frameTabs/frameTabs"
import { FooterLayout } from "./FooterLayout"

export function AppLayout() {
    
    const frames = useSelector((state) => 
        state.frames.frameIds.map(id => state.frames.framesById[id])
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
                <FrameTabs elements={frames} />
                <FooterLayout />
            </Box>
        </>
    )
}