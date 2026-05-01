

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