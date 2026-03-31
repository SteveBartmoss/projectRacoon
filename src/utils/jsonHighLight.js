
function decoreToken(token){

    if(typeof(token) === 'string'){
        return 'string'
    }
    if(typeof(token) === 'number'){
        return 'number'
    }
}


export function readJson(json){

    const fielsd = Object.keys(json)

    let listTokens = []

    fielsd.forEach(element => 
        listTokens.push(`<p className="field">${element}<span className=${decoreToken(json[element])}>${json[element]}</span></p>`)
    )

    return listTokens
    
}