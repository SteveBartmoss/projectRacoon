import './responseFrame.css'

export function ResponseFrame({ objProps }) {


    return (
        <>
            <div className='div-container'>
                <div className='div-status-bar'>
                    <div>
                        <p>status: {objProps.status}</p>
                    </div>
                    <div>
                        <p>time: {objProps.time}</p>
                    </div>
                    <div>
                        <p>size: {objProps.size} B</p>
                    </div>
                </div>
                <div className='div-response'>
                    <pre>{JSON.stringify(objProps.body, null, 2)}</pre>
                </div>
            </div>
        </>
    )
}