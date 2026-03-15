import { Chip } from '../chip/chip'
import './responseFrame.css'
import copy from "../../assets/copy.svg"

export function ResponseFrame({ objProps }) {

    const handleClipBoard = async () => {
        try{

            await navigator.clipboard.writeText(JSON.stringify(objProps.body))

        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <div className='div-container'>
                <div className='div-status-bar'>
                    <div>
                        <Chip text={`status: ${objProps?.status}`} type={'main'}/>
                    </div>
                    <div>
                        <Chip text={`time: ${objProps?.time}`} type={'main'}/>
                    </div>
                    <div>
                        <Chip text={`size: ${objProps?.size}`} type={'main'} />
                    </div>
                    <div>
                        <img className="copy" onClick={handleClipBoard} src={copy} />
                    </div>
                </div>
                <div className='div-response'>
                    <pre>{JSON.stringify(objProps.body, null, 2)}</pre>
                </div>
            </div>
        </>
    )
}