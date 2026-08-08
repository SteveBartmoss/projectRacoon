import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setShowAlerts } from "../../store/appSlice"
import "./css/snackbar.css"


export function Snackbar(){

    const show = useSelector((state) => state.appInfo.showAlerts)
    const content = useSelector((state) => state.appInfo.alertContent)
    const dispatch = useDispatch()

    useEffect(() =>{
        if(show){
            console.log('entro')
            const close = setTimeout(()=>{
                dispatch(setShowAlerts(false))
            },2000)
            return () => clearTimeout(close)
        }
    },[show])

    return (

        <div className={ show ? "container-snackbar" : "div-close"}>
            <div className="snackbar-content">
                <h1>{content?.title}</h1>
                <p>{content?.message}</p>
            </div>
        </div>
    )

}