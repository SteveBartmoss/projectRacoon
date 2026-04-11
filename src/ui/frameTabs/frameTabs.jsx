import { RequesLayout } from "../../layout/requestLayout";
import addImg from '../../assets/add.svg'
import closeImg from '../../assets/close.svg'
import { useDispatch, useSelector } from "react-redux";
import './frameTabs.css'
import { Chip } from "../chip/chip";
import { addRequest, removeRequest } from "../../store/requestSlice";
import { addTab, removeTab, setCounter, setCurrentTab } from "../../store/tabSlice";

export function FrameTabs({ elements }) {

    const listFrames = useSelector((state) => state.tabs.tabIds)
    const tabSelected = useSelector((state) => state.tabs.currentTab)
    const tabCounter = useSelector((state) => state.tabs.counter)

    const dispatch = useDispatch()

    const handleChangeTab = (id) => {
        dispatch(setCurrentTab(id))
    }

    const handleAddTab = () => {
        if (listFrames.length <= 0) {
            dispatch(setCounter(1))

            dispatch(addTab({
                id: tabCounter,
                title: "New Request",
                method: "GET",
                next: null,
                prev: null,
            }))

            dispatch(addRequest({
                id: tabCounter,
                title: "New Request",
                url: "",
                method: "GET",
                body: "",
                paramsById: {
                    1: {
                        id: 1,
                        name: "",
                        value: "",
                    },
                },
                paramIds: [1],
                auth: "",
                authType: "",
                response: {},
                description: ""
            }))
            return
        }

        let counter = tabCounter + 1

        dispatch(addTab({
            id: counter,
            title: "New Request",
            method: "GET",
            next: null,
            prev: null
        }))

        dispatch(addRequest({
            id: counter,
            title: "New Request",
            url: "",
            method: "GET",
            body: "",
            paramsById: {
                1: {
                    id: 1,
                    name: "",
                    value: "",
                },
            },
            paramIds: [1],
            auth: "",
            authType: "",
            response: {},
            description: ""
        }))

        dispatch(setCounter(counter))

    }

    const handleRemoveTab = (id) => {
        dispatch(removeTab(id))
        dispatch(removeRequest(id))
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

    return (

        <>
            <div className="container-head">
                {
                    elements.map(item =>
                        <div key={item.id} className={tabSelected === item.id ? "tab-active":"div-tabs"}>
                            <Chip text={item.method} type={getColor(item.method)} />
                            <p className="tab" onClick={() => handleChangeTab(item.id)}>{item.title}</p>
                            <img className="img-close" onClick={() => handleRemoveTab(item.id)} src={closeImg} />
                        </div>
                    )
                }
                <div className="btn-add">
                    <img className="img-add" onClick={handleAddTab} src={addImg} />
                </div>
            </div>
            {
                elements.map(item =>
                    <div key={item.id} className={tabSelected !== item.id ? 'tab-close' : 'div-content-tab'}>
                        <RequesLayout id={item.id} />
                    </div>
                )
            }

        </>
    )

}