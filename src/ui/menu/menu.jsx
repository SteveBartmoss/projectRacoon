import { useEffect, useRef, useState } from "react"
import './menu.css'

export function Menu({ elements, title }) {

    const [show, setShow] = useState(false)
    const menuRef = useRef(null)

    const handleOpen = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    useEffect(()=> {
        const handleClickOutside =  (e) => {
            if(menuRef.current && !menuRef.current.contains(e.target)){
                handleClose()
            }
        }

        if(show){
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    },[show])

    return (
        <div className="display-menu" ref={menuRef}>
            <div onClick={handleOpen} className="display-menu-title">{title}</div>
            <div className={show ? 'display-menu-list' : 'display-menu-none'}>
                {
                    elements.map(item =>
                        <div key={item.id} className="display-menu-item" onClick={() => {
                            item.action()
                            handleClose()
                        }}>
                            <div>
                                {item.title}
                            </div>
                            <div className="item-comand">
                                {item.command}
                            </div>
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