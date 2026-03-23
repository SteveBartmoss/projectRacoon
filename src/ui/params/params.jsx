import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../textField/textField";
import { setParamName, setParamValue } from "../../store/frameSlice";
import { Box } from "../containers/containers";
import './params.css'
import addImg from '../../assets/add.svg'

export function Params({elements}){

    const frameId = useSelector((state) => state.frames.currentTab)
    const dispatch = useDispatch()

    const handleName=(value,paramId) => {
        dispatch(setParamName({frameId: frameId, paramId: paramId, paramName: value  }))
    }

    const handleValue=(value, paramId) => {
        dispatch(setParamValue({frameId: frameId, paramId: paramId, paramValue: value}))
    }

    return(
        <div>
            <p>Query parameters</p>
            <Box styles={{
                display: "flex",
                flexDirection: "row"
            }}>
                <div className="div-add">
                    <p className="param-btn">Add</p>
                    <img src={addImg} />
                </div>
                <div className="div-add">
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
                                <TextField target={item.name} handleTarget={(event) => handleName(event.target.value, item.id)}  />
                            </Box>
                            <Box styles={{
                                width: "40%",
                                margin: "1rem"
                            }}>
                                <TextField target={item.value} handleTarget={(event) => handleValue(event.target.value, item.id)} />
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </div>
    )
}