import { IDGenerator } from "./generateId"


export const secureFieldsRequest = [
    "title",
    "url",
    "method",
    "body",
    "auth",
    "authType",
    "response",
    "description",
    "path"
]

export const secureFieldsParams = [
    "name",
    "value",
    "active",
]

export const secureFieldsHeaders = [
    "name",
    "value",
    "active",
]

export function buildParams(){

    const id = IDGenerator.generate()

    return {
        id,
        paramsObjd: {
            id,
            name: "",
            value: "",
            active: true
        },
        idArray: [id]
    }

}

export function buildHeaders(){

    const id = IDGenerator.generate()

    return {
        id,
        headersObj: {
            id,
            name: "",
            value: "",
            active: true
        },
        idArray: [id]
    }
}

export function loadEmptyRequest() {

    const buildedParams = buildParams()
    const buildedHeaders = buildHeaders()

    return {
        title: "New Request",
        url: "",
        method: "GET",
        body: "",
        paramsById: {
            [buildedParams.id]: buildedParams.paramsObjd
        },
        paramIds: [buildedParams.id],
        headersById: {
            [buildedHeaders.id]: buildedHeaders.headersObj
        },
        headerIds: [buildedHeaders.id],
        auth: "",
        authType: "",
        description: "",
        path: ""
    }

}

export function getRequestColor(method) {
    switch (method) {

        case "GET":
            return "success"

        case "POST":
            return "redirect"

        case "PUT":
            return "warning"

        case "PATCH":
            return "alert"

        case "DELETE":
            return "error"
    }
}

export function buildOptions(arrayOptions) {
    return arrayOptions.reduce((acc, op) => {
        if (!op.active) return acc
        if (!op.name || !op.value) return acc

        acc.push([op.name.trim(), op.value])

        return acc
    }, [])
}

export function builJson2Donwload(request,response){
    return {
        title: request.title,
        url: request.url,
        method: request.method,
        body: request.body,
        paramsById: request.paramsById,
        paramIds: request.paramIds,
        headersById: request.headersById,
        headerIds: request.headerIds,
        auth: request.auth,
        authType: request.authType,
        response: {
            status: response.status,
            time: response.time,
            size: response.size,
            headers: response.headers,
            typeBody: response.typeBody,
            body: response.body,
        },
        description: request.description
    }
    
}

export function loadResponseAndRequest(json){

    return{
        request: {
            title: json.title,
            url: json.url,
            method: json.method,
            body: json.body,
            paramsById: json.paramsById,
            paramIds: json.paramIds,
            headersById: json.headersById,
            headerIds: json.headerIds,
            auth: json.auth,
            authType: json.authType,
            description: json.description
        },
        response:{
            status: json.response.status,
            time: json.response.time,
            size: json.response.size,
            headers: json.response.headers,
            typeBody: json.response.typeBody,
            body: json.response.body,
        }
    }
}