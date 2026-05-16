import { RequesLayout } from "../../layout/requestLayout";
import addImg from '../../assets/add.svg'
import closeImg from '../../assets/close.svg'
import { useDispatch, useSelector } from "react-redux";
import './frameTabs.css'
import { Chip } from "../chip/chip";
import { addRequest, removeRequest } from "../../store/requestSlice";
import { addTab, removeTab, setContextTab, setCounter, setCurrentTab } from "../../store/tabSlice";
import { loadEmptyRequest, loadRequest } from "../../utils/requestUtils";
import { useEffect, useRef, useState } from "react";
import { MenuHelper } from "../menuHelper/menuHelper";
import { createNewTab, deleteTab } from "../../utils/tabsManagerThunks";

export function FrameTabs({ elements }) {

    const listFrames = useSelector((state) => state.tabs.tabIds)
    const tabSelected = useSelector((state) => state.tabs.currentTab)
    const tabCounter = useSelector((state) => state.tabs.counter)
    const tabContext = useSelector((state) => state.tabs.contexTab)

    const swapTab = useSelector((state) => state.tabs.tabsById[tabSelected])
    const swapRequest = useSelector((state) => state.requests.requestsById[tabSelected])

    const dispatch = useDispatch()

    const handleChangeTab = (id) => {
        dispatch(setCurrentTab(id))
    }

    const handleChangeContextTab = (id) => {
        dispatch(setContextTab(id))
    }

    const handleAddTab = () => {

        if (listFrames.length <= 0) {

            /*
            dispatch(addTab({
                id: 1,
                title: "New Request",
                method: "GET",
                next: null,
                prev: null,
            }))

            dispatch(addRequest(loadEmptyRequest(1)))
            */

            dispatch(createNewTab({
                tab: {
                    title: "New Request",
                    method: "GET",
                    next: null,
                    prev: null,
                },
                request: loadEmptyRequest(1)
            }))

            return
        }

        let counter = tabCounter + 1

        dispatch(createNewTab({
            tab: {
                title: "New Request",
                method: "GET",
                next: null,
                prev: null
            },
            request: loadEmptyRequest(counter)
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

    const handleRemoveTab = (id) => {
        dispatch(deleteTab(id))
        //dispatch(removeTab(id))
        //dispatch(removeRequest(id))
    }

    const handleRemoveTabMenu = () => {
        dispatch(deleteTab(tabContext))
        //dispatch(removeTab(tabContext))
        //dispatch(removeRequest(tabContext))
    }

    const handleDuplicateTab = () => {

        let counter = tabCounter + 1

        dispatch(createNewTab(
            {
                tab: {
                    title: swapTab.title,
                    method: swapTab.method,
                    next: null,
                    prev: null
                },
                request: loadRequest(counter, swapTab.title, swapRequest)
            }
        ))

        /*
        dispatch(addTab({
            id: counter,
            title: swapTab.title,
            method: swapTab.method,
            next: null,
            prev: null
        }))

        dispatch(addRequest(loadRequest(counter, swapTab.title, swapRequest)))
        */

    }

    const getColor = (method) => {

        switch (method) {

            case "GET":
                return "success"

            case "POST":
                return "redirect"

            case "PUT":
                return "warning"

            case "PATCH":
                return "alert"

            case "DELETE":
                return "error"
        }

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
                        <MenuHelper key={item.id} options={options} >
                            <div onContextMenu={(e) => {
                                e.preventDefault()
                                handleChangeContextTab(item.id)
                            }} className={tabSelected === item.id ? "tab-active" : "div-tabs"}>
                                <Chip text={item.method} type={getColor(item.method)} />
                                <p className="tab" onClick={() => handleChangeTab(item.id)} >{item.title}</p>
                                <img className="img-close" onClick={() => handleRemoveTab(item.id)} src={closeImg} />
                            </div>
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