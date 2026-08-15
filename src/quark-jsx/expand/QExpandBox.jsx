import './css/expand.css'
import { useState } from "react"
import expandImg from "../../assets/expand.svg"

export function QExpandBox({ title, content }) {

    const [expand, setExpand] = useState()

    const onChangeExpand=()=>{
        setExpand(!expand)
    }

    return (
        <div className='expand-panel'>
            <div className='expand-title' onClick={()=>onChangeExpand()}>
                <p>{title}</p>
                <img className={expand ? 'down-icon' : 'up-icon'} src={expandImg} />
            </div>
            <div className={expand ? 'expand-content' : 'close-content'} >
                {content}
            </div>
        </div>
    )

}