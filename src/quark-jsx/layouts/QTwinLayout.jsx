import './css/qlayout.css'

export function QTwinLayout({left,right}){

    return(
        <div className="div-root">
            <div className="panel-left">
                {left}
            </div>
            <div className="panel-right">
                {right}
            </div>
        </div>
    )

}