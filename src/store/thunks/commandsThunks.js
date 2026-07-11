import { open, save } from "@tauri-apps/plugin-dialog"
import { readFile, writeFile } from "@tauri-apps/plugin-fs"
import { setInfo } from "../requestSlice"
import { builJson2Donwload, loadEmptyRequest } from "../../utils/requestUtils"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { createNewTab,createTabFromJson } from "./tabsManagerThunks"
import { basename } from "@tauri-apps/api/path"


export const saveCurrentTab = () => async (dispatch, getState) => {

    const { tabs, requests, responses } = getState()
    const tabId = tabs.currentTab
    const request = requests.requestsById[tabId]
    const response = responses.responsesById[tabId]
    

    if (!request) return

    let path = null

    if(!request.path){
        path = await save({ defaultPath: 'newrequest.json' })
    } else {
        path = request.path
    }
 
    if (!path) return

    const fileName = await basename(path)

    const encoder = new TextEncoder()

    const objDonwload = builJson2Donwload(request,response,fileName,path)

    await writeFile(path, encoder.encode(JSON.stringify(objDonwload, null, 2)))

    dispatch(setInfo({ id: tabId, field: 'path', value: path }))

    dispatch(setInfo({id: tabId, field: 'title', value: fileName}))

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