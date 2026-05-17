import { useDispatch, useSelector } from "react-redux";
import './frameTabs.css'
import { setContextTab, setCurrentTab } from "../../store/tabSlice";
import { Chip } from "../chip/chip";
import { getRequestColor } from "../../utils/requestUtils";
import closeImg from '../../assets/close.svg'
import { deleteTab } from "../../utils/tabsManagerThunks";

export function FrameTabHeader({tabRequest}){

    const tabSelected = useSelector((state) => state.tabs.currentTab)
    const tabContex = useSelector((state) => state.tabs.contexTab)
    const request = useSelector((state) => state.requests.requestsById[tabRequest.id])

    const dispatch = useDispatch()

    const handleChangeContextTab = (id) => {
        dispatch(setContextTab(id))
    }

    const handleChangeTab = (id) => {
        dispatch(setCurrentTab(id))
    }

    const handleRemoveTab = (id) => {
        dispatch(deleteTab(id))
    }

    return(
        <div onContextMenu={(e) => {
            e.preventDefault()
            handleChangeContextTab(tabRequest.id)
        }} className={tabSelected === tabRequest.id ? "tab-active" : "div-tabs"}>
            <Chip text={request.method} type={getRequestColor(request.method)} />
            <p className="tab" onClick={() => handleChangeTab(request.id)}>{request.title}</p>
            <img className="img-close" onClick={() => handleRemoveTab(tabRequest.id)} src={closeImg} />
        </div>
    )
}