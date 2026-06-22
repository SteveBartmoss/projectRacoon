import './responseFrame.css'

export function ResponseFrame({ typeBody, body }) {

    const renderResponse = () => {
        switch (typeBody) {
            case 'Json':
                return <pre>{JSON.stringify(body, null, 2)}</pre>

            case 'Html':
                return <iframe srcDoc={body} style={{ width: '100%', height: '100%', border: 'none' }} />

            case 'Text':
            case 'Binary':
                return body
        }
    }

    return (
        <>
            <div className='div-container'>
                <div className='div-response'>
                    {
                        renderResponse()
                    }
                </div>
            </div>
        </>
    )
}