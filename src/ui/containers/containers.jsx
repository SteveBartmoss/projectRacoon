import "./container.css";

export function Row({children}){

    return(
        <div className="div-row">
            {children}
        </div>
    )
}

export function Column({children}){

    return(
        <div className="div-col">
            {children}
        </div>
    )
}