import { useState } from "react"
import { Select } from "../ui/select/select"
import { BodyForm } from "../ui/bodyForm/bodyForm"
import { useDispatch, useSelector } from "react-redux"
import { setInfo } from "../store/requestSlice"
import { DataForm } from "../ui/dataForm/dataForm"


export function BodyLayout() {

    const dispatch = useDispatch()
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

        switch(request.typeContent){

            case "JSON":
                return <BodyForm body={request.body} setBody={handleBody} />
                
            case "FOMRDATA":
                return <DataForm />
            
            default: 
                return (<></>)

        }

    }

    const changeBody = (value) => {
        dispatch(setInfo({id: activeTab, field: "typeContent", value: value}))
    }

    return(
        <>
            <div>
                <div>
                    <Select
                        target={request.typeContent}
                        elements={bodyElements}
                        handleChange={(event) => changeBody(event.target.value)}
                    />
                </div>
                {
                    //todo: Someting render the content
                    renderBody()
                }
            </div>
        </>
    )
}