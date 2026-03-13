import reactLogo from "../assets/react.svg"
import { Column, Row } from "../ui/containers/containers"
import { Tab } from "../ui/tab/tab"
import { RequesLayout } from "./requestLayout"

export function AppLayout(){

    const frameItems = [
        {
            title: "Prueba",
            content: <RequesLayout />
        },
    ]
    
    return (
        <>
            <Column>
                <Row>
                    <div>
                        <img src={reactLogo} />
                    </div>
                    <div>
                        <h1>Racoon</h1>
                    </div>
                </Row>
                <Row>
                    <div>
                        <Tab elements={frameItems} />
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