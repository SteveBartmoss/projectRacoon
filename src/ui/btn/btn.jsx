import './btn.css'

export function Btn({handle,title}){
    return(
        <button className="btn" onClick={handle}>{title}</button>
    )
}