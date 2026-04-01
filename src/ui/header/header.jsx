import logo from "../../assets/racoon.png"
import { Box } from "../containers/containers"
import './header.css'

export function Header() {

    return (
        <>
            <Box styles={{
                display: "flex",
                flexDirection: "row",
            }}>
                <div>
                    <img className="logo" src={logo} />
                </div>
            </Box>
        </>
    )
}