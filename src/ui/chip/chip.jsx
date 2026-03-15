import './chip.css'

export function Chip({text,type}){

    return(
        <span className={`chip ${type}`}>{text}</span>
    )

}