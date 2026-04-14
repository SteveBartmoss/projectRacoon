import { useSelector } from "react-redux"
import './toggleWindow.css'
import { useRef } from "react"

export function ToggleWindow({ children }) {

    const windowShow = useSelector((state) => state.appInfo.showErrorsWindow)

    const panelRef = useRef(null)

    const startResize = (e) => {

        e.preventDefault()

        const startY = e.clientY
        const startHeight = panelRef.current.offsetHeight

        document.body.style.userSelect = "none"

        const onMouseMove = (event) => {
            const delta = startY - event.clientY

            const newHeight = Math.max(120, startHeight + delta)

            panelRef.current.style.height = `${newHeight}px`
        }

        const onMouseUp = () => {
            document.body.style.userSelect = ""
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }

    return (
        <div className={windowShow ? 'panel-container' : 'div-close'}>
            <div className="resize-handle" onMouseDown={startResize} />
            <div className="div-toggle" ref={panelRef}>
                {children}
            </div>
        </div>
    )
}

export function ResizeWindow({children}){

    const windowShow = useSelector((state) => state.appInfo.showErrorsWindow)

    const panelRef = useRef(null)

    const startResize = (e) => {

        e.preventDefault()

        const startY = e.clientY
        const startHeight = panelRef.current.offsetHeight

        document.body.style.userSelect = "none"

        const onMouseMove = (event) => {
            const delta = startY - event.clientY

            const newHeight = Math.max(100, startHeight + delta)

            panelRef.current.style.height = `${newHeight}px`
        }

        const onMouseUp = () => {
            document.body.style.userSelect = ""
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }

    return (
        <div className={windowShow ? 'panel-resize' : 'div-close'}>
            <div className="resize-handle" onMouseDown={startResize} />
            <div className="div-toggle" ref={panelRef}>
                {children}
            </div>
        </div>
    )
}