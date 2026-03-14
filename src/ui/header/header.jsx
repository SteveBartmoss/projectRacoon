import logo from "../../assets/racoon.png"
import './header.css'

export function Header(){

    return(
        <>
            <div>
                <img className="logo" src={logo} />
            </div>
            <div>
                <h1>Racoon</h1>
            </div>
        </>
    )
}