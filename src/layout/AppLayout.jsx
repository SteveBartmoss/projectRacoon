import reactLogo from "../assets/react.svg"
import { Column, Row } from "../ui/containers/containers"

export function AppLayout(){
    
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
            </Column>
        </>
    )
}