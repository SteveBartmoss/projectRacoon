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

export function ResponseFrame({ typeBody, body }) {

    const renderResponse = () => {
        switch (typeBody) {
            case 'Json':
                return <pre>{JSON.stringify(body, null, 2)}</pre>

            case 'Html':
                return <iframe srcDoc={body} style={{ width: '100%', height: '100%', border: 'none' }} />

            case 'Text':
            case 'Binary':
                return body
        }
    }

    return (
        <>
            <div className='div-container'>
                <div className='div-response'>
                    {
                        renderResponse()
                    }
                </div>
            </div>
        </>
    )
}