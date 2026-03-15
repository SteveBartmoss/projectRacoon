import { Chip } from '../chip/chip'
import './responseFrame.css'

export function ResponseFrame({ objProps }) {


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
                </div>
                <div className='div-response'>
                    <pre>{JSON.stringify(objProps.body, null, 2)}</pre>
                </div>
            </div>
        </>
    )
}