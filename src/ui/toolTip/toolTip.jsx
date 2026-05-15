import { useState } from "react"

export function ToolTip({ children, tex }) {

    const [show, setShow] = useState(false)

    return (
        <div className="display-tool-tip">
            <div onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
                {children}
            </div>
            <div className={show ? 'display-tool-tip-text' : 'display-tool-tip-none' }>
                <p>{text}</p>
            </div>
        </div>
    )

}