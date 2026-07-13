
import './css/qlayout.css'

export function QLayout({top,left,right,bottom,center}){

    return(
        <div className="div-root">
            <div className="div-top">
                {top}
            </div>
            <div style={{
                    display:"flex",
                    flexDirection: "column",
                }}>
                    {left}
            </div>
            <div style={{
                    display:"flex",
                    flexDirection: "column",
                }}>
                    {center}
            </div>
            <div style={{
                    display:"flex",
                    flexDirection: "column",
                }}>
                    {right}
            </div>
            <div className="div-bottom">
                {bottom}
            </div>
        </div>
    )
}