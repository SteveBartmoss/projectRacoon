import { useEffect, useRef, useState } from 'react'
import './menuHelper.css'

export function MenuHelper({ options, children }) {

    const [show, setShow] = useState(false)
    const menuRef = useRef(null)

    const handleOpen = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    useEffect(() => {

        const handleClickOutside = (e) => {
            if(menuRef.current && !menuRef.current.contains(e.target)){
                handleClose()
            }
        }

        if(show) {
            document.addEventListener('mousedown',handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown',handleClickOutside)
        }

    },[show])

    return (
        <div className="display-menu-helper" ref={menuRef}>
            <div onContextMenu={(e) => {
                e.preventDefault()
                handleOpen()
            }}>
                {children}
            </div>
            <div className={show ? 'display-menu-helper-list' : 'display-menu-helper-none' }>
                {
                    options.map( element => 
                        <div key={element.id} className="display-menu-helper-item" onClick={element.action}>
                            {element.title}
                        </div>
                    )
                }
            </div>
        </div>
    )

}