import './responseFrame.css'

export function ResponseFrame({objProps}){


    return(
        <>
        <div className='div-container'>
            <div className='div-response'>
                <pre>{JSON.stringify(objProps.body, null, 2)}</pre>
            </div>
        </div>
        </>
    )
}