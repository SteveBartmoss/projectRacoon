

export function QMenuBar({children}){

    return(
        <div style={{
            display: "flex",
            flexDirection: "row",
        }}>
            {children}
        </div>
    )
}