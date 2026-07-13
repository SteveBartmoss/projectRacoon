

export function QLayout({top,left,rigth,buttom,center}){

    return(
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
            }}>
                {top}
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
            }}>
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
                    {rigth}
                </div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
            }}>
                {buttom}
            </div>
        </div>
    )
}