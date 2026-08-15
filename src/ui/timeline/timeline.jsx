import './timeline.css'
import { useSelector } from "react-redux";
import { TimelineItem } from './timelineItem';



export function Timeline() {

    const activeTab = useSelector((state) => state.tabs.currentTab)
    const responseTimeline = useSelector((state) => state.historyResponse.historiesById[activeTab])


    return(
        <>
            <div className='div-timeline'>
                {
                    responseTimeline ? 
                    responseTimeline.map(element => 
                        <TimelineItem item={element} />
                    )
                    :
                    <>
                    </>
                }
            </div>
        </>
    )
}