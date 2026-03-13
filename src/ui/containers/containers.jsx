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

export function Box({styles,children}){

    return(
        <div style={styles}>
            {children}
        </div>
    )
}