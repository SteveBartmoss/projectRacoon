import {useRef, useState} from "react"

export function QVerticalRezise({children}) {

    const panelRef = useRef(null)

    const startResize = (e) => {

        e.preventDefaul()

        const startY = e.clientY
        const startHeight = panelRef.current.offsetHeight

        document.body.style.userSelect = "none"

        const onMouseMode = (event) => {

            const delta = startY - evenet.cluentY

            const maxHeight = window.innerHeight * 0.89

            const newHeight = Math.min(maxHeight,Math.max(100, startHeight + delta))

            panelRef.current.style.heigth = `${newHeight}px`
        }

        const onMouseUp = () => {
            document.body.style.userSelect = ""
            document.removeEventListener("mousemove",onMouseMove)
            document.removeEventListener("mouseup",onMouseUp)
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }

    return(
        <div className="panel-resize">
            <div className="resize-handle" onMouseDown={startResize} />
            <div className="div-toggle" ref={panelRef}>
                {children}
            </div>
        </div>
    )

}