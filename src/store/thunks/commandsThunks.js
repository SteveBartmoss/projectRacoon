import { open, save } from "@tauri-apps/plugin-dialog"
import { readFile, writeFile } from "@tauri-apps/plugin-fs"
import { setInfo } from "../requestSlice"
import { builJson2Donwload, loadEmptyRequest } from "../../utils/requestUtils"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { createNewTab,createTabFromJson } from "./tabsManagerThunks"


export const saveCurrentTab = () => async (dispatch, getState) => {

    const { tabs, requests, responses } = getState()
    const tabId = tabs.currentTab
    const request = requests.requestById[tabId]
    const response = responses.responsesById[tabId]

    if (!request) return

    const path = await save({ defaultPath: 'newrequest.json' })
    if (!path) return

    const objDonwload = builJson2Donwload(request,response)

    const encoder = new TextEncoder()
    await writeFile(path, encoder.encode(JSON.stringify(objDonwload, null, 2)))

    dispatch(setInfo({ id: tabId, field: 'path', value: path }))

}

export const openFileAsNewTab = () => async (dispatch, getState) => {

    const path = await open({
        multiple: false,
        filters: [{ name: 'JSON', extensions: ['json'] }]
    })

    if (!path) return

    const bytes = await readFile(path)
    const decoder = new TextDecoder()
    const json = JSON.parse(decoder.decode(bytes))

    await dispatch(createTabFromJson(json))

    // Todo: manejarlo dentro de la tab que se acaba de crear
    //dispatch(setInfo({ id: newCounter, field: 'path', value: path }));
}

export const newEmptyTab = () => async (dispatch, getState) => {

    await dispatch(createNewTab())

}

export const newWindow = () => () => {
    new WebviewWindow(`window-${Date.now()}`, {
        url: '/',
        title: 'Raccoon',
        width: 800,
        height: 600,
    })
}