import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../textField/textField";
import { addParam, cleanParams, removeParam, setParamInfo } from "../../store/requestSlice";
import { Box } from "../containers/containers";
import './params.css'
import addImg from '../../assets/add.svg'
import deleteImg from '../../assets/delete.svg'
import { CheckInput } from "../checkbox/checkbox";

export function Params({ elements }) {

    const tabId = useSelector((state) => state.tabs.currentTab)
    const dispatch = useDispatch()
    const frame = useSelector((state) => state.requests.requestsById[tabId])

    const handleName = (value, paramId) => {
        dispatch(setParamInfo({ requestId: tabId, paramId: paramId, field: "name", paramValue: value }))
    }

    const handleValue = (value, paramId) => {
        dispatch(setParamInfo({ requestId: tabId, paramId: paramId, field: "value", paramValue: value }))
    }

    const handleAddParam = () => {

        if (frame.paramIds.length <= 0) {
            dispatch(addParam({ id: tabId, param: { id: 1, name: "", value: "", ative: true } }))
            return
        }

        let counter = frame.paramIds.length

        dispatch(addParam({ id: tabId, param: { id: counter + 1, name: "", value: "" } }))

    }

    const handelDeleteAll = () => {
        dispatch(cleanParams({ id: tabId, param: { id: 1, name: "", value: "", ative: true } }))
    }

    const handleDeleteParam = (paramId) => {
        dispatch(removeParam({ id: tabId, paramId: paramId }))
    }

    return (
        <div>
            <p>Query parameters</p>
            <Box styles={{
                display: "flex",
                flexDirection: "row"
            }}>
                <div onClick={() => handleAddParam()} className="div-add">
                    <p className="param-btn">Add</p>
                    <img src={addImg} />
                </div>
                <div onClick={() => handelDeleteAll()} className="div-add">
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
                                <CheckInput target={item.active} />
                            </Box>
                            <div onClick={() => handleDeleteParam(item.id)} className="div-delete">
                                <img className="img-delete" src={deleteImg} />
                            </div>
                        </Box>
                    )
                }
            </Box>
        </div>
    )
}