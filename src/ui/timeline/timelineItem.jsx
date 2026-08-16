import './timeline.css'
import { QExpandBox } from "../../quark-jsx/expand/QExpandBox";
import { ResponseHeaders } from '../responseHeaders/responseHeaders';
import { ResponseFrame } from '../responseFrame/responseFrame';
import { Chip } from '../chip/chip';


export function TimelineItem({item}){

    //{JSON.stringify(item)}

    const setStatusResponse = (status) => {

        if (!status) return 'main'

        if (status >= 200 && status < 300) return 'success'
        if (status >= 300 && status < 400) return 'main'
        if (status >= 400 && status < 500) return 'warning'
        if (status >= 500) return 'error'

        return 'main'
    }

    return (
        <div className='div-timeline-item'>
            <div className="title-timeline-item">
                <Chip 
                    text={`status: ${item.response.status} ?? ""`}
                    type={setStatusResponse(item.response.status)}
                />

                <Chip
                    text={`time: ${item.response.time}`}
                    type={'main'} 
                />
                <Chip
                    text={`size: ${item.response.size}`}
                    type={'main'} 
                />
            </div>
            <div>
                <QExpandBox 
                    title="Headers"
                    content={
                        <ResponseHeaders headers={item.response.headers} />
                    }
                />
            </div>
            <div>
                <QExpandBox
                    title="Body"
                    content={
                        <ResponseFrame 
                            typeBody={item.response.body.type}
                            body={item.response.body.value}
                        />
                    }
                />
            </div>
        </div>
    )
}