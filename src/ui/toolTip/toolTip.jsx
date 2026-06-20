import { useState } from "react"
import './toolTip.css'

export function ToolTip({ children, text }) {

    const [show, setShow] = useState(false)

    return (
        <div className="display-tool-tip">
            <div className="display-children" onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
                {children}
            </div>
            <div className={show ? 'display-tool-tip-text' : 'display-tool-tip-none' }>
                <p>{text}</p>
            </div>
        </div>
    )

}