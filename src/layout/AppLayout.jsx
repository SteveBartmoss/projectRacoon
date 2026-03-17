import { useSelector } from "react-redux"
import logo from "../assets/racoon.png"
import { Column, Row } from "../ui/containers/containers"
import { Header } from "../ui/header/header"
import { Tab } from "../ui/tab/tab"
import { RequesLayout } from "./requestLayout"
import { FrameTabs } from "../ui/frameTabs/frameTabs"

export function AppLayout(){

    const frameItems = useSelector((state) => state.frames.listFrames)
    
    return (
        <>
            <Column>
                <Row>
                    <Header />
                </Row>
                <Row>
                    <div>
                        <FrameTabs elements={frameItems} />
                    </div>
                </Row>
                <Row>
                    <p>
                        Cliente http ligero
                    </p>
                    <p className="read-the-docs">
                        Descubre mas sobre el proyecto aqui
                    </p>
                </Row>
            </Column>
        </>
    )
}