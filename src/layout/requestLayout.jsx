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
import { setAuth, setAuthType, setBody, setMethod, setUrl } from "../store/requestSlice";



export function RequesLayout({ id }) {

    const request = useSelector((state) => state.requests.requestsById[id])
    const dispatch = useDispatch()

    const { url, method, body, paramsById, paramIds, auth, authType, response } = request

    const params = paramIds.map(id => paramsById[id])

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
        dispatch(setUrl({ id: id, url: value }))
    }

    const handleMethod = (value) => {
        dispatch(setMethod({ id: id, method: value }))
    }

    const handleBody = (value) => {
        dispatch(setBody({ id: id, body: value }))
    }

    const handleAuth = (value) => {
        dispatch(setAuth({ id: id, auth: value }))
    }

    const handleAuthType = (value) => {
        dispatch(setAuthType({ id: id, authType: value }))
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
        }
    ]

    const buildParams = (paramsArray) => {
        return paramsArray.filter(p => p.name && p.value)
            .reduce((acc, curr) => {
                acc[curr.name] = curr.value
                return acc
            }, {})
    }

    const handleRequest = async () => {

        const paramsObject = buildParams(params)

        let objPeticion = {
            url: url,
            method: method,
            params: Object.keys(paramsObject).length ? paramsObject : null,
            body: body ? JSON.parse(body) : null,
            headers: {
                Authorization: `${authType} ${auth}`
            }
        }

        let data = await invoke("fetch_data", {
            req: objPeticion
        })

        dispatch(setResponse({
            id: id, response: {
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