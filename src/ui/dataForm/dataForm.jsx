import { useDispatch, useSelector } from "react-redux"
import { Box } from "../containers/containers"
import { TextField } from "../textField/textField"
import { addDataFormItem, removeDataFormInfo, setDataFormInfo, setParamInfo } from "../../store/requestSlice"
import { CheckInput } from "../checkbox/checkbox"
import addImg from '../../assets/add.svg'
import deleteImg from '../../assets/delete.svg'
import { buildDataForm } from "../../utils/requestUtils"
import './dataForm.css'

export function DataForm() {

    const dispatch = useDispatch()
    const tabId = useSelector((state) => state.tabs.currentTab)

    const request = useSelector((state) => state.requests.requestsById[tabId])

    const dataForm = request.dataFormIds.map(id => request.dataFormById[id])

    const handleName = (value, dataFormId) => {
        dispatch(setDataFormInfo({ 
            requestId: tabId, 
            itemFormId: dataFormId,
            field: "name",
            itemFormValue: value,
        }))
    }

    const handleValue = (value,dataFormId) => {
        dispatch(setParamInfo({
            requestId: tabId,
            itemFormId: dataFormId,
            field: "value",
            itemFormValue: value,
        }))
    }

    const handleAddDataItem = () => {

        let buildedItem = buildDataForm()

        dispatch(addDataFormItem({id: tabId, itemForm: buildedItem.itemFormObj}))

    }

    const handleActiveItem = (value, dataFormId) => {
        dispatch(setParaInf)
    }

    const handleDeleteItem = (itemFormId) => {
        dispatch(removeDataFormInfo({id: tabId, itemFormId: itemFormId}))
    }

    return (
        <div>
            <Box styles={{
                display: "flex",
                flexDirection: "row"
            }}>
                <div onClick={() => handleAddDataItem()} className="div-add">
                    <p className="item-btn">Add</p>
                    <img src={addImg} />
                </div>
            </Box>
            <Box styles={{
                display: "flex",
                flexDirection: "column"
            }}>
                {
                    dataForm.map(item => 
                        <Box key={item.id} styles={{
                            display: "flex",
                            flexDirection: "row"
                        }}>
                            <Box styles={{
                                width: "40%",
                                margin: "1rem"
                            }}>
                                <TextField textHolder={"name"} target={item.name} handleTarget={(event) => handleName(event.target.value, item.id) } />
                            </Box>
                            <Box styles={{
                                width: "40%",
                                margin: "1rem"
                            }}>
                                <TextField textHolder={"value"} target={item.value} handleTarget={(event) => handleName(event.target.value, item.id)} />
                            </Box>
                            <Box styles={{
                                width: "5%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "1rem"
                            }}>
                                <CheckInput target={item.active} handleTarget={(event) => handleActiveParam(event.target.checked, item.id)} />  
                            </Box>
                            <div onClick={() => handleDeleteItem(item.id)} className="div-delete">
                                <img className="img-delete" src={deleteImg} />
                            </div>
                        </Box>
                    )
                }
            </Box>
        </div>

    )
}