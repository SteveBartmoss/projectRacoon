

export function loadRequest(id, title, json) {

    return {
        id: id,
        title: title,
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

export function loadEmptyRequest(id) {
    return {
        id: id,
        title: "New Request",
        url: "",
        method: "GET",
        body: "",
        paramsById: {
            1: {
                id: 1,
                name: "",
                value: "",
                active: true,
            },
        },
        paramIds: [1],
        headersById: {
            1: {
                id: 1,
                name: "",
                value: "",
                active: true,
            }
        },
        headerIds: [1],
        auth: "",
        authType: "",
        response: {},
        description: ""
    }
}