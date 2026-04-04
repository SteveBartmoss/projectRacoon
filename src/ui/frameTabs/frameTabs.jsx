import { RequesLayout } from "../../layout/requestLayout";
import addImg from '../../assets/add.svg'
import closeImg from '../../assets/close.svg'
import { useDispatch, useSelector } from "react-redux";
import { addFrame, removeFrame, setCurrentTab } from "../../store/frameSlice";
import './frameTabs.css'
import { Chip } from "../chip/chip";

export function FrameTabs({ elements }) {

    const listFrames = useSelector((state) => state.frames.frameIds)
    const tabSelected = useSelector((state) => state.frames.currentTab)

    const dispatch = useDispatch()

    const handleChangeTab = (id) => {
        dispatch(setCurrentTab(id))
    }

    const handleAddTab = () => {
        if (listFrames.length <= 0) {
            dispatch(addFrame({
                id: 1,
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
                params: [
                    {
                        id: 1,
                        name: "",
                        value: "",
                    }
                ],
                auth: "",
                authType: "",
                response: {},
            }))
            return
        }

        let counter = listFrames[listFrames.length - 1]

        dispatch(addFrame({
            id: counter + 1,
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
            params: [
                {
                    id: 1,
                    name: "",
                    value: "",
                }
            ],
            auth: "",
            authType: "",
            response: {},
        }))

    }

    const handleRemoveTab = (id) => {
        dispatch(removeFrame(id))
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
                        <div key={item.id} className="div-tabs">
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