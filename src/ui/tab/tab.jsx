import { useState } from 'react'
import './tab.css'

export function Tab({ elements }) {

    const [currentTab, setCurrentTab] = useState(1)



    return (
        <div>
            <div className="container-head">
                {
                    elements.map(item =>
                        <div className='div-tabs'>
                            <p onClick={() => setCurrentTab(item.id)}>{item.title}</p>
                        </div>
                    )
                }
            </div>
            <div>
                {
                    elements.map(item =>
                        <div className={currentTab !== item.id ? 'tab-close' : ''}>
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