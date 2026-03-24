import { Box } from "../containers/containers";
import tauri from "../../assets/32x32.png";
import './footer.css'

export function Footer() {

    return (
        <>
            <Box
                styles={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 .5rem"
                }}
            >
                <p className="read-the-docs">
                    Power by 
                </p>
                <img className="logo-tauri" src={tauri} />
            </Box>
            <Box>
                <p className="read-the-docs">
                    Made with 🤍 by Steve
                </p>
            </Box>
        </>
    )
}