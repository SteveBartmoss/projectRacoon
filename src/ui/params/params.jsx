import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../textField/textField";
import { addParam, cleanParams, removeParam, setParamName, setParamValue } from "../../store/frameSlice";
import { Box } from "../containers/containers";
import './params.css'
import addImg from '../../assets/add.svg'
import deleteImg from '../../assets/delete.svg'

export function Params({elements}){

    const frameId = useSelector((state) => state.frames.currentTab)
    const dispatch = useDispatch()
    const frame = useSelector((state) => state.frames.framesById[frameId])

    const handleName=(value,paramId) => {
        dispatch(setParamName({frameId: frameId, paramId: paramId, paramName: value  }))
    }

    const handleValue=(value, paramId) => {
        dispatch(setParamValue({frameId: frameId, paramId: paramId, paramValue: value}))
    }

    const handleAddParam=() => {

        if(frame.paramIds.length <= 0){
            dispatch(addParam({id: frameId,param: {id: 1, name: "", value: ""}}))
            return
        }

        let counter = frame.paramIds.length

        dispatch(addParam({id: frameId, param: {id: counter + 1, name: "", value: ""}}))
        
    }

    const handelDeleteAll=()=>{
        dispatch(cleanParams({id: frameId, param: {id: 1, name: "", value: ""}}))
    }

    const handleDeleteParam=(paramId)=>{
        dispatch(removeParam({id: frameId, paramId: paramId}))
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
                        <Box key={item.id} styles={{
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