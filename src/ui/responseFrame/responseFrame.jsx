import './responseFrame.css'

export function ResponseFrame({ typeBody, body }) {

    const renderResponse = () => {
        switch (typeBody) {
            case 'Json':
                return <pre>{JSON.stringify(body, null, 2)}</pre>

            case 'Html':
                return <iframe srcDoc={body} style={{ width: '100%', height: '100%', border: 'none' }} />

            case 'Image':
                const imageUrl = `data:${body.mime};base64,${body.data}`
                return <img src={imageUrl} alt='Image response' style={{maxWidth: '100%'}} />

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