import { useState } from 'react'
import './tab.css'

export function Tab({ elements }) {

    const [currentTab, setCurrentTab] = useState(1)



    return (
        <div>
            <div className="container-head">
                {
                    elements.map(item =>
                        <div key={item.id} className='div-tabs'>
                            <p className="tab" onClick={() => setCurrentTab(item.id)}>{item.title}</p>
                        </div>
                    )
                }
            </div>
            <div>
                {
                    elements.map(item =>
                        <div key={item.id} className={currentTab !== item.id ? 'tab-close' : 'div-content-tab'}>
                            {
                                item.content
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )

}