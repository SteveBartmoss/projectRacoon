import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../textField/textField";
import { addParam, cleanParams, setParamName, setParamValue } from "../../store/frameSlice";
import { Box } from "../containers/containers";
import './params.css'
import addImg from '../../assets/add.svg'

export function Params({elements}){

    const frameId = useSelector((state) => state.frames.currentTab)
    const dispatch = useDispatch()
    const listFrames = useSelector((state) => state.frames.listFrames)

    const handleName=(value,paramId) => {
        dispatch(setParamName({frameId: frameId, paramId: paramId, paramName: value  }))
    }

    const handleValue=(value, paramId) => {
        dispatch(setParamValue({frameId: frameId, paramId: paramId, paramValue: value}))
    }

    const handleAddParam=() => {
        const frame = listFrames.find((element) => element.id == frameId)

        if(frame.params.length <= 0){
            dispatch(addParam({id: frameId,param: {id: 1, name: "", value: ""}}))
            return
        }

        let counter = frame.params[frame.params.length - 1].id

        dispatch(addParam({id: frameId, param: {id: counter + 1, name: "", value: ""}}))
        
    }

    const handelDeleteAll=()=>{
        dispatch(cleanParams({id: frameId, params: [{id: 1, name: "", value: ""}]}))
    }

    return(
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
                        <Box styles={{
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <Box styles={{
                                width: "40%",
                                margin: "1rem"
                            }}>
                                <TextField textHolder={"name"} target={item.name} handleTarget={(event) => handleName(event.target.value, item.id)}  />
                            </Box>
                            <Box styles={{
                                width: "40%",
                                margin: "1rem"
                            }}>
                                <TextField textHolder={"value"} target={item.value} handleTarget={(event) => handleValue(event.target.value, item.id)} />
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </div>
    )
}