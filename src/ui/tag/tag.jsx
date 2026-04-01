import github from "../../assets/github.svg";
import './tag.css'

export function GitTag() {

    return (
        <div className="div-tag">
            <a
                href='https://github.com/SteveBartmoss/projectRacoon'
                target="_blank"
                rel="noreferrer"
            >
                Star
            </a>
            <img className="logo-git" src={github} />
            <a
                href='https://github.com/SteveBartmoss/projectRacoon/releases/tag/v0.13.2'
                target="_blank"
                rel="noreferrer"
            >
                0.13.2
            </a>
        </div>
    )

}