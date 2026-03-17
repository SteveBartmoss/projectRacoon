import { RequesLayout } from "../../layout/requestLayout";
import addImg from '../../assets/add.svg'
import closeImg from '../../assets/close.svg'
import { useDispatch, useSelector } from "react-redux";
import { addFrame, removeFrame, setCurrentTab } from "../../store/frameSlice";
import './frameTabs.css'

export function FrameTabs({ elements }) {

    const listFrames = useSelector((state) => state.frames.listFrames)
    const tabSelected = useSelector((state) => state.frames.currentTab)

    const dispatch = useDispatch()

    const handleChangeTab = (id) => {
        dispatch(setCurrentTab(id))
    }

    const handleAddTab = () => {
        if (listFrames.length <= 0) {
            dispatch(addFrame({ id: 1, title: "New Request" }))
            return
        }

        let counter = listFrames[listFrames.length - 1].id

        dispatch(addFrame({ id: counter + 1, title: "New Request" }))

    }

    const handleRemoveTab = (id) => {
        dispatch(removeFrame(id))
    }


    return (

        <div>
            <div className="container-head">
                {
                    elements.map(item =>
                        <div className="div-tabs">
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
                    <div className={tabSelected !== item.id ? 'tab-close' : 'div-content-tab'}>
                        <RequesLayout id={item.id} />
                    </div>
                )
            }

        </div>
    )

}