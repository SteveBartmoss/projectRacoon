import { useState } from "react"
import { Select } from "../ui/select/select"
import { BodyForm } from "../ui/bodyForm/bodyForm"
import { useSelector } from "react-redux"


export function BodyLayout() {

    const activeTab = useSelector((state) => state.tabs.currentTab)
    const request = useSelector((state) => state.requests.requestsById[activeTab])

    const [typeBody, setTypeBody] = useState('')

    const bodyElements = [
        {
            value: "JSON",
            title: "JSON"
        },
        {
            value: "FOMRDATA",
            title: "Multypart Form",
        }
    ]

    const handleBody = (value) => {
        dispatch(setInfo({id: activeTab, field: "body", value: value}))
    }

    const renderBody = () => {
        switch(typeBody){

            case "JSON":
                return (<BodyForm body={request.body} setBody={handleBody} />)
                
            
            default: 
                return (<></>)

        }
    }

    return(
        <>
            <div>
                <div>
                    <Select
                        target={typeBody}
                        elements={bodyElements}
                        handleChange={(event) => setTypeBody(event.target.value)}
                    />
                </div>
                {
                    //todo: Someting render the content
                }
            </div>
        </>
    )
}