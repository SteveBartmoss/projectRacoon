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

export function loadRequest(json) {

    return {
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
        response: json.response,
        description: json.description
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
        response: {},
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
    return arrayOptions.reduce((acc, p) => {
        if (!p.active) return acc
        if (!p.name || !p.value) return acc

        acc[p.name] = p.value

        return acc
    }, {})
}