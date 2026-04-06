import "./container.css";

export function Box({styles,children}){

    return(
        <div style={styles}>
            {children}
        </div>
    )
}

export function HBox({styles, children}){

    return (
        <div className="h-box" style={styles}>
            {children}
        </div>
    )
}

export function VBox({styles, children}){

    return(
        <div className="v-box" style={styles}>
            {children}
        </div>
    )
}