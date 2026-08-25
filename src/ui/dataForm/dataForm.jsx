import { useSelector } from "react-redux"
import { Box } from "../containers/containers"
import { TextField } from "../textField/textField"
import { setParamInfo } from "../../store/requestSlice"
import { CheckInput } from "../checkbox/checkbox"


export function DataForm() {

    const tabId = useSelector((state) => state.tabs.currentTab)
    const request = useSelector((state) => state.request.requestsById[id])

    const dataForm = request.dataFormIds.map(id => request.dataFormById[id])

    const handleName = (value, dataFormId) => {
        dispatch(setParamInfo({ 
            requestId: tabId, 
            paramId: dataFormId,
            field: "name",
            paramValue: value,
        }))
    }

    const handleValue = (value,dataFormId) => {
        dispatch(setParamInfo({
            requestId: tabId,
            paramId: dataFormId,
            field: "value",
            paramValue: value,
        }))
    }

    const handleActiveParam = (value, dataFormId) => {
        dispatch(setParaInf)
    }


    return (
        <div>
            <Box styles={{
                display: "flex",
                flexDirection: "row"
            }}>
                <div>
                    <p>Add</p>
                </div>
            </Box>
            <Box styles={{
                display: "flex",
                flexDirection: "column"
            }}>
                {
                    dataForm.map(item => 
                        <Box key={item.id} styles0={{
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <Box styles={{
                                width: "40%",
                                margin: "1rem"
                            }}>
                                <TextField textHolder={"name"} target={item.name} handleTarget={(event) => handleName(event.target.value, item.id) } />
                            </Box>
                            <Box>
                                <TextField textHolder={"value"} target={item.value} handleTarget={(event) => handleName(event.target.value, item.id)} />
                            </Box>
                            <Box tyles={{
                                width: "5%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "1rem"
                            }}>
                                <CheckInput target={itemt.active} handleTarget={}  
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </div>

    )
}