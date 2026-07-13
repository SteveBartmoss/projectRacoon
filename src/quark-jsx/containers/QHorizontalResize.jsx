import {useRef, useState} from "react"

export function QHorizontalResize({children}) {

    const panelRef = useRef(null)

    const startResize = (e) => {

        e.preventDefault()

        const startX = e.clientX
        const startWidth = panelRef.current.offsetWidth

        document.body.style.userSelect = "none"

        const onMouseMove = (evenet) => {

            const delta = startX - event.clientX

            const maxWidth = window.innerWidth * 0.89

            const newWidth = Math.min(maxWidth,Math.max(100,startWidth + delta))

            panelRef.current.style.width = `${newWidth}px`
        }

        const onMouseUp = () => {
            document.body.style.userSelect = ""
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)
    }

    return(
        <div className="">
            <div></div>
            <div ref={panelRef}>
                {children}
            </div>
        </div>
    )

}