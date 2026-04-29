import { useState } from "react"
import './menu.css'

export function Menu({ elements, title }) {

    const [show, setShow] = useState(false)

    const handleOpen = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    return (
        <div className="display-menu" onMouseEnter={handleOpen}>
            <div className="display-menu-title">{title}</div>
            <div onMouseLeave={handleClose}  className={show ? 'display-menu-list' : 'display-menu-none'}>
                {
                    elements.map(item =>
                        <div>
                            {item.title}
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export function MenuLayout({children}){

    return(
        <div className="menu-layout">
            {children}
        </div>    
    )

}