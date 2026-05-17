import { RequesLayout } from "../../layout/requestLayout";
import addImg from '../../assets/add.svg'
import { useDispatch, useSelector } from "react-redux";
import './frameTabs.css'
import { addRequest } from "../../store/requestSlice";
import { addTab } from "../../store/tabSlice";
import { loadEmptyRequest, loadRequest } from "../../utils/requestUtils";
import { MenuHelper } from "../menuHelper/menuHelper";
import { createNewTab, deleteTab } from "../../utils/tabsManagerThunks";
import { FrameTabHeader } from "./frameTabHeader";

export function FrameTabs({ elements }) {

    const tabSelected = useSelector((state) => state.tabs.currentTab)
    const tabContext = useSelector((state) => state.tabs.contexTab)

    const swapTab = useSelector((state) => state.tabs.tabsById[tabSelected])
    const swapRequest = useSelector((state) => state.requests.requestsById[tabSelected])

    const dispatch = useDispatch()

    const handleAddTab = () => {

        dispatch(createNewTab({
            tab: {},
            request: loadEmptyRequest(1)
        }))

        /*
        dispatch(addTab({
            id: counter,
            title: "New Request",
            method: "GET",
            next: null,
            prev: null
        }))

        dispatch(addRequest(loadEmptyRequest(counter)))
        */

    }

    const handleRemoveTabMenu = () => {
        dispatch(deleteTab(tabContext))
    }

    const handleDuplicateTab = () => {

        dispatch(createNewTab(
            {
                tab: {},
                request: loadRequest(1, swapRequest.title, swapRequest)
            }
        ))

    }

    const options = [
        {
            id: 1,
            title: 'close',
            action: handleRemoveTabMenu
        },
        {
            id: 2,
            title: 'duplicate request',
            action: handleDuplicateTab
        }
    ]

    return (

        <>
            <div className="container-head">
                {
                    elements.map(item =>
                        <MenuHelper key={item.id} options={options}>
                            <FrameTabHeader tabRequest={item} />
                        </MenuHelper>
                    )
                }
                <div className="btn-add">
                    <img className="img-add" onClick={handleAddTab} src={addImg} />
                </div>
            </div>
            {
                elements.map(item =>
                    <div key={item.id} className={tabSelected !== item.id ? 'tab-close' : 'div-content-tab-frame'}>
                        <RequesLayout id={item.id} />
                    </div>
                )
            }

        </>
    )

}