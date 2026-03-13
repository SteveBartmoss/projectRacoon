

export function BodyForm(){
    return (
        <>
            <textarea className='text-area' placeholder='body' value={body} onChange={(event)=>setBody(event.target.value)}></textarea>
        </>
    )
}