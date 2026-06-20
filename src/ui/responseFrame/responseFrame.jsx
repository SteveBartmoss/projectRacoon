import { Chip } from '../chip/chip'
import './responseFrame.css'
import copy from "../../assets/copy.svg"
import download from "../../assets/download.svg"
import clean from "../../assets/delete.svg"
import { Box } from '../containers/containers'
import { save } from "@tauri-apps/plugin-dialog"
import { writeFile } from '@tauri-apps/plugin-fs'
import { useDispatch, useSelector } from 'react-redux'
import { setInfo } from '../../store/requestSlice'
import { ToolTip } from '../toolTip/toolTip'

export function ResponseFrame({ objProps }) {

    const activeTab = useSelector((state) => state.tabs.currentTab)

    const dispatch = useDispatch()

    const handleClipBoard = async () => {
        try {

            await navigator.clipboard.writeText(JSON.stringify(objProps.body))

        } catch (error) {
            console.log(error)
        }
    }

    const setStatusResponse = (status) => {

        if (!status) return 'main'

        if (status >= 200 && status < 300) return 'success'
        if (status >= 300 && status < 400) return 'main'
        if (status >= 400 && status < 500) return 'warning'
        if (status >= 500) return 'error'

        return 'main'
    }

    const handleDownload = async () => {

        const path = await save({
            defaultPath: "response.json"
        })

        if (!path) return

        const encoder = new TextEncoder()

        const bytes = encoder.encode(
            JSON.stringify(objProps.body, null, 2)
        )

        await writeFile(path, bytes)

    }

    const cleanResponse = async () => {

        dispatch(setInfo({
            id: activeTab,
            field: "response",
            value: {}
        }))

    }

    const renderResponse = () => {
        switch (objProps.typeBody) {
            case 'Json':
                return <pre>{JSON.stringify(objProps.body, null, 2)}</pre>
            
            case 'Html': 
                return <iframe srcDoc={objProps.body} style={{ width: '100%', height: '100%', border: 'none' }} />
            
            case 'Text':
            case 'Binary':
                return objProps.body
        }
    }

    return (
        <>
            <div className='div-container'>
                <div className='div-status-bar'>
                    <Box
                        styles={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: ".3rem",
                        }}
                    >
                        <Chip text={`status: ${objProps?.status ?? ""}`} type={setStatusResponse(objProps?.status)} />
                    </Box>
                    <Box
                        styles={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: ".3rem",
                        }}
                    >
                        <Chip text={`time: ${objProps?.time ?? ""}`} type={'main'} />
                    </Box>
                    <Box
                        styles={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: ".3rem",
                        }}
                    >
                        <Chip text={`size: ${objProps?.size ?? ""}`} type={'main'} />
                    </Box>
                    <Box
                        styles={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: ".3rem",
                        }}
                    >
                        <ToolTip text={'Copiar respuesta'}>
                            <img className="btn-clipboard" onClick={handleClipBoard} src={copy} />
                        </ToolTip>
                    </Box>
                    <Box
                        styles={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            margin: ".3rem",
                        }}
                    >
                        <ToolTip text={'Descargar respuesta'}>
                            <img className="btn-clipboard" onClick={handleDownload} src={download} />
                        </ToolTip>
                    </Box>
                    <Box
                        styles={{
                            margin: ".3rem",
                        }}
                    >
                        <ToolTip text={'Limpiar respuesta'}>
                            <img className="btn-clipboard" onClick={cleanResponse} src={clean} />
                        </ToolTip>
                    </Box>
                </div>
                <div className='div-response'>
                    {
                        renderResponse()
                    }
                </div>
            </div>
        </>
    )
}