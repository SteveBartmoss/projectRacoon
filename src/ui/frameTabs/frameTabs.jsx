import { RequesLayout } from "../../layout/requestLayout";
import addImg from '../../assets/add.svg'
import closeImg from '../../assets/close.svg'
import { useDispatch, useSelector } from "react-redux";
import { addFrame, removeFrame, setCurrentTab } from "../../store/frameSlice";

export function FrameTabs({ elements }) {

    const listFrames = useSelector((state) => state.frames.listFrames)
    const tabSelected = useSelector((state) => state.frames.currentTab)

    const dispatch = useDispatch()

    const handleChangeTab = (id) => {
        dispatch(setCurrentTab(id))
    }

    const handleAddTab = () => {
        if(listFrames.length<=0){
            dispatch(addFrame({id:1, title: "New Request"}))
            return
        }

        let counter = listFrames[listFrames.length-1].id

        dispatch(addFrame({ id: counter+1, title: "New Request" }))

    }

    const handleRemoveTab=(id)=> {
        dispatch(removeFrame(id))
    }


    return (

        <div>
            <div className="container-head">
                {
                    elements.map(item =>
                        <div>
                            <div className="div-tabs">
                                <p onClick={()=>handleChangeTab(item.id)}>{item.title}</p>
                                <img onClick={()=>handleRemoveTab(item.id)} src={closeImg} />
                            </div>
                        </div>
                    )
                }
                <div>
                    <img onClick={handleAddTab} src={addImg} />
                </div>
            </div>
            <div>
                {
                    elements.map(item =>
                        <div className={tabSelected !== item.id && 'tab-close'}>
                            <RequesLayout />
                        </div>
                    )
                }
            </div>

        </div>
    )

}