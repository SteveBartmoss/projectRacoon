import { useState } from "react"


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
            <div>{title}</div>
            <div onMouseLeave={handleClose}  className={show ? 'display-menu-list' : 'display-menu-none'}>
                {
                    elements.map(item =>
                        <div>
                            {item}
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