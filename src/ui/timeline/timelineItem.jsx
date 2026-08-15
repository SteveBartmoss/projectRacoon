import './timeline.css'
import { QExpandBox } from "../../quark-jsx/expand/QExpandBox";


export function TimelineItem({item}){

    //{JSON.stringify(item)}

    return (
        <div className='div-timeline-item'>
            <div className="title-timeline-item">
                <h1>{item.response.status}</h1>
                <h1>{item.response.time}</h1>
                <h1>{item.response.size}</h1>
            </div>
            <div>
                <QExpandBox 
                    title="Headers"
                    content={JSON.stringify(item.response.headers)}
                />
            </div>
            <div>
                <QExpandBox
                    title="Body"
                    content={JSON.stringify(item.response.body)}
                />
            </div>
        </div>
    )
}