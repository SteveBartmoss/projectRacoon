import { useDispatch, useSelector } from "react-redux";
import { Box } from "../ui/containers/containers";
import { Tab } from "../ui/tab/tab";
import { Chip } from "../ui/chip/chip";
import { ToolTip } from "../ui/toolTip/toolTip";

import copy from "../assets/copy.svg"
import download from "../assets/download.svg"
import clean from "../assets/delete.svg"
import { ResponseFrame } from "../ui/responseFrame/responseFrame";
import { removeResponse } from "../store/responseSlice";
import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";
import { ResponseHeaders } from "../ui/responseHeaders/responseHeaders";


export function ResponseLayout() {

    const activeTab = useSelector((state) => state.tabs.currentTab)
    const response = useSelector((state) => state.responses.responsesById[activeTab])

    const dispatch = useDispatch()

    const objProps = null

    const setStatusResponse = (status) => {

        if (!status) return 'main'

        if (status >= 200 && status < 300) return 'success'
        if (status >= 300 && status < 400) return 'main'
        if (status >= 400 && status < 500) return 'warning'
        if (status >= 500) return 'error'

        return 'main'
    }

    const handleClipBoard = async () => {
        try {

            await navigator.clipboard.writeText(JSON.stringify(response.body))

        } catch (error) {
            console.log(error)
        }
    }

    const handleDownload = async () => {

        const path = await save({
            defaultPath: "response.json"
        })

        if (!path) return

        const encoder = new TextEncoder()

        const bytes = encoder.encode(
            JSON.stringify(response.body, null, 2)
        )

        await writeFile(path, bytes)

    }

    const cleanResponse = async () => {

        dispatch(removeResponse(activeTab))

    }

    const tabsElements = [
        {
            id: 1,
            title: "Response",
            content: <ResponseFrame typeBody={response?.typeBody} body={response?.body} />
        },
        {
            id: 2,
            title: "Headers",
            content: <ResponseHeaders headers={response?.headers} />
        }
    ]

    const moreElements = <Box
        styles={{
            display: "flex",
            flexDirection: "row",
            padding: ".5rem",
            alignContent: "center",
        }}
    >
        <Box
            styles={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: ".3rem",
            }}
        >
            <Chip text={`status: ${response?.status ?? ""}`} type={setStatusResponse(response?.status)} />
        </Box>
        <Box
            styles={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: ".3rem",
            }}
        >
            <Chip text={`time: ${response?.time ?? ""}`} type={'main'} />
        </Box>
        <Box
            styles={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: ".3rem",
            }}
        >
            <Chip text={`size: ${response?.size ?? ""}`} type={'main'} />
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
    </Box>

    return (
        <>
            <Box
                styles={{
                    width: "60%",
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: "0",
                    flexGrow: "0"
                }}
            >
                <Tab elements={tabsElements} otherElments={moreElements} />
            </Box>
        </>
    )
}