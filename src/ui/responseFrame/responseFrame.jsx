
export function ResponseFrame({objProps}){


    return(
        <>
        <div>
            <div>
                <pre>{JSON.stringify(objProps.objResponse, null, 2)}</pre>
            </div>
        </div>
        </>
    )
}