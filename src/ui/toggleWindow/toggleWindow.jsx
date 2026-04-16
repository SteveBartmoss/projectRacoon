import { useDispatch, useSelector } from "react-redux"
import './toggleWindow.css'
import { useRef, useState } from "react"
import closeSvg from '../../assets/close.svg'
import { setShowErrorWindow } from "../../store/appSlice"

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

export function ResizeWindow({ children }) {

    const windowShow = useSelector((state) => state.appInfo.showErrorsWindow)

    const panelRef = useRef(null)

    const startResize = (e) => {

        e.preventDefault()

        const startY = e.clientY
        const startHeight = panelRef.current.offsetHeight

        document.body.style.userSelect = "none"

        const onMouseMove = (event) => {
            const delta = startY - event.clientY

            // Máximo 80% de la altura de la ventana
            const maxHeight = window.innerHeight * 0.89

            const newHeight = Math.min(maxHeight, Math.max(100, startHeight + delta))

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

export function ResizeTabs({ elements }) {

    const [currentTab, setCurrentTab] = useState(1)

    const dispatch = useDispatch()

    const handleCloseResize = () => {
        dispatch(setShowErrorWindow({ value: false }))
    }

    return (
        <>
            <div className="container-resize-head">
                {
                    elements.map(item =>
                        <div key={item.id} className="div-resize-tabs">
                            <p className="resize-tab" onClick={() => setCurrentTab(item.id)} >{item.title}</p>
                        </div>
                    )
                }
                <div className="btn-resize-close">
                    <img className="svg-close" onClick={handleCloseResize} src={closeSvg} />
                </div>
            </div>
            <div>
                {
                    elements.map(item =>
                        <div key={item.id} className={currentTab !== item.id ? 'tab-resize-close' : 'div-content-resize-tab'}>
                            {
                                item.content
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}