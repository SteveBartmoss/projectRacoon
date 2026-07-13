
export function QPanel({children,display,direction,height,width}){

    return(
        <div style={{
            display: `${display}`,
            flexDirection: `${direction}`,
            height: `${height}`,
            width: `${width}`,
        }}>
            {children}
        </div>
    )
}