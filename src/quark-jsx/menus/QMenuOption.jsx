import {useMenu} from './context/QMenuContext'
import './css/qmenu.css'

export function QMenuOption({element}){

    const {handleClose} = useMenu()
    
    return(

        <div 
            className="diplay-menu-list-item"
            onClick={()=> {
                element.action()
                handleClose()
            }}
        >
            {element.title}
        </div>
    )
}