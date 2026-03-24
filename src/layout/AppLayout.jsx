import { useSelector } from "react-redux"
import { Box, Column, Row } from "../ui/containers/containers"
import { Header } from "../ui/header/header"
import { FrameTabs } from "../ui/frameTabs/frameTabs"
import { FooterLayout } from "./FooterLayout"

export function AppLayout() {

    const frameItems = useSelector((state) => state.frames.listFrames)

    return (
        <>
            <Box styles={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100vw"
            }}>
                <Row>
                    <Header />
                </Row>
                <FrameTabs elements={frameItems} />
                <FooterLayout />
            </Box>
        </>
    )
}