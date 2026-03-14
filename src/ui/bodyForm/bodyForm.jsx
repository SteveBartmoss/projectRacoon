import './bodyform.css'

export function BodyForm({body,setBody}){
    return (
        <>
            <textarea className='text-area' placeholder='body' value={body} onChange={(event)=>setBody(event.target.value)}></textarea>
        </>
    )
}