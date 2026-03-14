import { invoke } from "@tauri-apps/api/core";
import { Btn } from "../ui/btn/btn";
import { Box, Row } from "../ui/containers/containers";
import { Select } from "../ui/select/select";
import { TextField } from "../ui/textField/textField";
import { useState } from "react";
import { BodyForm } from "../ui/bodyForm/bodyForm";
import { ResponseFrame } from "../ui/responseFrame/responseFrame";


export function RequesLayout(){

    const [method,setMethod] = useState('')
    const [url,setUrl] = useState('')
    const [body, setBody] = useState('')
    const [objResponse, setObjResponse] = useState({})

    const methodElements = [
        {
            value: "GET",
            title: "GET"
        },
        {
            value: "POST",
            title: "POST"
        },
        {
            value: "PUT", 
            title: "PUT"
        },
        {
            value: "PATCH",
            title: "PATCH"
        },
        {
            value: "DELETE",
            title: "DELETE"
        }
    ]

    const handleRequest = async () => {

        let objPeticion = {
            url: url,
            method: method,
            params: null,
            body: null,
        }

        console.log(objPeticion)

        let data = await invoke("fetch_data",{
            req: objPeticion
        })
        
        console.log(data)

        setObjResponse({
            status: data.status,
            time: data.time,
            size: data.size,
            body: data.body,
        })
        
    }

    return(
        <>
        <Row>
            <Box
                styles={{
                    padding: "1rem",
                    width: "4.5rem"
                }}
            >
                <Select target={method} handleChange={(event)=> setMethod(event.target.value) } elements={methodElements} />
            </Box>
            <Box
                styles={{
                    padding: "1rem",
                    width: "30rem"
                }}
            >
                <TextField  target={url} handleTarget={(event)=>setUrl(event.target.value)}/>
            </Box>
            <Box
                styles={{
                    padding: "1rem",
                }}
            >
                <Btn handle={handleRequest} title='Send'/>
            </Box>
        </Row>
        <Row>
            <Box styles={{
                width: "50%",
                height: "36rem",
            }}>
                <BodyForm  />
            </Box>
            <ResponseFrame objProps={objResponse}/>
        </Row>
        </>
    )

}