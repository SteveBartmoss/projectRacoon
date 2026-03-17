import { invoke } from "@tauri-apps/api/core";
import { Btn } from "../ui/btn/btn";
import { Box, Row } from "../ui/containers/containers";
import { Select } from "../ui/select/select";
import { TextField } from "../ui/textField/textField";
import { useState } from "react";
import { BodyForm } from "../ui/bodyForm/bodyForm";
import { ResponseFrame } from "../ui/responseFrame/responseFrame";


export function RequesLayout(){

    const [method,setMethod] = useState('GET')
    const [url,setUrl] = useState('')
    const [requestBody, setRequestBody] = useState('')
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
        <Box
            styles={{
                display: "flex",
                flexDirection: "row",
                width: "100vw",
                border: "1px solid rgba(255, 255, 255, 0.05)"
            }} 
        >
            <Box
                styles={{
                    padding: "0.1rem .5rem",
                    width: "4.5rem"
                }}
            >
                <Select target={method} handleChange={(event)=> setMethod(event.target.value) } elements={methodElements} />
            </Box>
            <Box
                styles={{
                    padding: "0.1rem .5rem",
                    width: "30rem"
                }}
            >
                <TextField  target={url} handleTarget={(event)=>setUrl(event.target.value)}/>
            </Box>
            <Box
                styles={{
                    padding: "0.1rem 2rem",
                }}
            >
                <Btn handle={handleRequest} title='Send'/>
            </Box>
        </Box>
        <Row>
            <Box styles={{
                width: "50%",
                height: "36rem",
            }}>
                <BodyForm body={requestBody} setBody={setRequestBody} />
            </Box>
            <ResponseFrame objProps={objResponse}/>
        </Row>
        </>
    )

}