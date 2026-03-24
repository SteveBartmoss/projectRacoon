import { useSelector } from "react-redux"
import { Column, Row } from "../ui/containers/containers"
import { Header } from "../ui/header/header"
import { FrameTabs } from "../ui/frameTabs/frameTabs"
import { FooterLayout } from "./FooterLayout"

export function AppLayout(){

    const frameItems = useSelector((state) => state.frames.listFrames)

    return (
        <>
            <Column>
                <Row>
                    <Header />
                </Row>
                <Row>
                    <FrameTabs elements={frameItems} />
                </Row>
                <FooterLayout />
            </Column>
        </>
    )
}