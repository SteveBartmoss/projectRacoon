
import './css/qlayout.css'

export function QLayout({top,left,right,bottom,center}){

    return(
        <div className="div-root">
            <div className="div-top">
                {top}
            </div>
            <div className="div-left">
                    {left}
            </div>
            <div className="div-center">
                    {center}
            </div>
            <div className="div-right">
                    {right}
            </div>
            <div className="div-bottom">
                {bottom}
            </div>
        </div>
    )
}