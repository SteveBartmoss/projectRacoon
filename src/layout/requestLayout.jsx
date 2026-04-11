import { invoke } from "@tauri-apps/api/core";
import { Btn } from "../ui/btn/btn";
import { Box } from "../ui/containers/containers";
import { Select } from "../ui/select/select";
import { TextField } from "../ui/textField/textField";
import { BodyForm } from "../ui/bodyForm/bodyForm";
import { ResponseFrame } from "../ui/responseFrame/responseFrame";
import { Tab } from "../ui/tab/tab";
import { Params } from "../ui/params/params";
import { Auth } from "../ui/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../store/requestSlice";
import { setMethod } from "../store/tabSlice";
import { Headers } from "../ui/headers/headers";



export function RequesLayout({ id }) {

    const request = useSelector((state) => state.requests.requestsById[id])
    const dispatch = useDispatch()

    const { url, method, body, paramsById, paramIds, headersById, headerIds, auth, authType, response, description } = request

    const params = paramIds.map(id => paramsById[id])

    const headers = headerIds.map(id => headersById[id])

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

    const handleUrl = (value) => {
        dispatch(setInfo({id: id, field: "url", value: value }))
    }

    const handleMethod = (value) => {
        dispatch(setInfo({id: id, field: "method", value: value}))
        dispatch(setMethod({id: id, value: value}))
    }

    const handleBody = (value) => {
        dispatch(setInfo({id: id, field: "body", value: value}))
    }

    const handleAuth = (value) => {
        dispatch(setInfo({id: id, field: "auth", value: value}))
    }

    const handleAuthType = (value) => {
        dispatch(setInfo({id: id, field: "authType", value: value}))
    }
    
    const handleDescription = (value) => {
        dispatch(setInfo({id: id, field: 'description', value: value}))
    }

    const tabsElements = [
        {
            id: 1,
            title: "Params",
            content: <Params elements={params} />
        },
        {
            id: 2,
            title: "Body",
            content: <Box styles={{
                width: "100%",
                height: "50vh",
            }}>
                <BodyForm body={body} setBody={handleBody} />
            </Box>
        },
        {
            id: 3,
            title: "Auth",
            content: <Auth auth={auth} authType={authType} setAuth={handleAuth} setAuthType={handleAuthType} />
        },
        {
            id: 4,
            title: "Headers",
            content: <Headers elements={headers} />
        },
        {
            id: 5,
            title: "Docs",
            content: <Box styles={{
                width: "100%",
                height: "50vh",
            }}>
                <BodyForm body={description} setBody={handleDescription} />
            </Box>
        }
    ]

    const buildParams = (paramsArray) => {
        return paramsArray.reduce((acc, p) => {
            if(!p.active) return acc
            if(!p.name || !p.value) return acc

            acc[p.name] = p.value

            return acc
        },{})

    }

    const buildHeaders = (headersArray) => {
        return headersArray.reduce((acc, h) => {
            if(!h.active) return acc
            if(!h.name || !h.value) return acc

            acc[h.name.trim()] = h.value

            return acc
        },{})
    }

    const handleRequest = async () => {

        const paramsObject = buildParams(params)
        const headersObject = buildHeaders(headers)

        const finalHeaders = {...headersObject}

        if(auth && authType){
            finalHeaders.Authorization = `${authType} ${auth}`
        }

        let parsedBody = null

        if(body){
            try{
                parsedBody = JSON.parse(body)
            }catch{
                alert("Invalid JSON body")
                return
            }
        }

        let objPeticion = {
            url: url,
            method: method,
            params: Object.keys(paramsObject).length ? paramsObject : null,
            body: parsedBody,
            headers: finalHeaders
        }

        let data = await invoke("fetch_data", {
            req: objPeticion
        })

        dispatch(setInfo({
            id: id, 
            field: "response",
            value: {
                status: data.status,
                time: data.time,
                size: data.size,
                body: data.body,
            }
        }))

    }

    return (
        <>
            <Box styles={{
                display: "flex",
                flexDirection: "row",
            }}>
                <Box
                    styles={{
                        display: "flex",
                        flexDirection: "column",
                        width: "40%"
                    }}
                >
                    <Box
                        styles={{
                            display: "flex",
                            flexDirection: "row",
                            border: "1px solid rgba(255, 255, 255, 0.05)"
                        }}
                    >
                        <Box
                            styles={{
                                padding: "0.1rem .5rem",
                                width: "5 rem"
                            }}
                        >
                            <Select target={method} handleChange={(event) => handleMethod(event.target.value)} elements={methodElements} />
                        </Box>
                        <Box
                            styles={{
                                padding: "0.1rem .5rem",
                                width: "30rem"
                            }}
                        >
                            <TextField target={url} handleTarget={(event) => handleUrl(event.target.value)} />
                        </Box>
                        <Box
                            styles={{
                                padding: "0.1rem 2rem",
                            }}
                        >
                            <Btn handle={handleRequest} title='Send' />
                        </Box>
                    </Box>
                    <Tab elements={tabsElements} />
                </Box>
                <ResponseFrame objProps={response} />
            </Box>
        </>
    )

}