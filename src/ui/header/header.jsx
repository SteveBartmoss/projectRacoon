import logo from "../../assets/racoon.png"
import { Box } from "../containers/containers"
import { Menu, MenuLayout } from "../menu/menu"
import './header.css'

export function Header() {

    const options = [
        {
            title:'New',
        }
    ]

    return (
        <>
            <Box styles={{
                display: "flex",
                flexDirection: "row",
            }}>
                <div>
                    <img className="logo" src={logo} />
                </div>
                <MenuLayout>
                    <Menu title={'App'} elements={options} />
                </MenuLayout>
            </Box>
        </>
    )
}