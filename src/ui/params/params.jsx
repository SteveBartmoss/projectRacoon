import { useDispatch, useSelector } from "react-redux";
import { TextField } from "../textField/textField";
import { setParamName, setParamValue } from "../../store/frameSlice";
import { Box } from "../containers/containers";


export function Params({elements,setElements}){

    const frameId = useSelector((state) => state.frames.currentTab)
    const dispatch = useDispatch()

    const handleName=(value,paramIndex) => {
        dispatch(setParamName({frameId: frameId, paramIndex: paramIndex, paramName: value  }))
    }

    const handleValue=(value, paramIndex) => {
        dispatch(setParamValue({frameId: frameId, paramIndex: paramIndex, paramValue: value}))
    }

    return(
        <div>
            <p>Query parameters</p>
            <Box styles={{
                display: "flex",
                flexDirection: "row"
            }}>
                <p>Add</p>
                <p>Delete All</p>
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
                                <TextField target={item.value} handleTarget={(event) => handleValue(event.target.vaslue, item.id)} />
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </div>
    )
}