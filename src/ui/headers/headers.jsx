import { useDispatch, useSelector } from "react-redux";
import addImg from '../../assets/add.svg'
import deleteImg from '../../assets/delete.svg'
import { Box } from "../containers/containers";
import { TextField } from "../textField/textField";
import { addHeader, cleanHeaders, removeHeader, setHeaderInfo } from "../../store/requestSlice";
import { CheckInput } from "../checkbox/checkbox";
import './headers.css'

export function Headers({elements}){

    const tabId = useSelector((state) => state.tabs.currentTab)
    const dispatch = useDispatch()
    const frame = useSelector((state) => state.requests.requestsById[tabId])

    const handleName = (value, headerId) => {
        dispatch(setHeaderInfo({requestId: tabId, headerId: headerId, field: "name", headerValue: value}))
    }

    const handleValue = (value, headerId) => {
        dispatch(setHeaderInfo({requestId: tabId, headerId: headerId, field: "value", headerValue: value}))
    }

    const handleActiveHeader = (value, headerId) => {
        dispatch(setHeaderInfo({requestId: tabId, headerId: headerId, field: "active", headerValue: value }))
    }

    const handleAddHeader = () => {

        if(frame.headerIds.length <=0){
            dispatch(addHeader({id: tabId, header: {id: 1, name: "", value: "", active: true}}))
            return
        }

        let counter = frame.headerIds.length

        dispatch(addHeader({id: tabId, header: {id: counter+1, name:"", value: "", active: true}}))
    }

    const handleDeleteAll = () => {
        dispatch(cleanHeaders({id: tabId, header: {id: 1, name: "", value: "", active: true} }))
    }

    const handleDeleteHeader = (headerId) => {
        dispatch(removeHeader({ id: tabId, headerId: headerId}))
    }

    return (
        <div>
            <p>Headers</p>
            <Box styles={{
                display: "flex",
                flexDirection: "row"
            }}>
                <div onClick={()=> handleAddHeader()} className="div-add">
                    <p className="param-btn">Add</p>
                    <img src={addImg} />
                </div>
                <div onClick={() => handleDeleteAll()} className="div-add">
                    <p className="param-btn">Delete All</p>
                </div>
            </Box>
            <Box styles={{
                display: "flex",
                flexDirection: "column"
            }}>
                {
                    elements.map(item => 
                        <Box key={item.id} styles={{
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <Box styles={{
                                width: "40%",
                                margin: "1rem"
                            }}>
                                <TextField textHolder={"name"} target={item.name} handleTarget={(event) => handleName(event.target.value, item.id)} />
                            </Box>
                            <Box styles={{
                                width: "40%",
                                margin: "1rem"
                            }}>
                                <TextField textHolder={"value"} target={item.value} handleTarget={(event) => handleValue(event.target.value, item.id)} />
                            </Box>
                            <Box styles={{
                                width: "5%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "1rem"
                            }}>
                                <CheckInput target={item.active} handleTarget={(event) => handleActiveHeader(event.target.checked, item.id)} />
                            </Box>
                            <div onClick={() => handleDeleteHeader(item.id)} className="div-delete">
                                <img className="img-delete" src={deleteImg} />
                            </div>
                        </Box>
                    )
                }
            </Box>
        </div>
    )
}