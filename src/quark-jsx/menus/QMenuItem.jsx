import { useEffect, useRef } from "react";
import {useMenu} from './context/QMenuContext'
import './css/qmenu.css'

export function QMenuItem({title,options}) {

    const {open,handleOpen,handleClose} = useMenu()
    const menuRef = useRef(null)

    useEffect(() => {

        const handleClickOutside = (e) => {
            if(menuRef.current && !menuRef.current.contains(e.target)){
                handleClose()
            }
        }

        if(open) {
            document.addEventListener('mousedown',handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown',handleClickOutside)
        }

    },[open])

    return(
        <div className="display-menu" ref={menuRef}>
            <div onContextMenu={(e) => {
                e.preventDefault()
                handleOpen()
            }}>
                {children}
            </div>
            <div className={open ? 'display-menu-list' : 'display-menu-list-none'}>
                {

                }
            </div>
        </div>
    )
}