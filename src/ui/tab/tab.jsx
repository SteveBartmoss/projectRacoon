import './tab.css'

export function Tab({elements}){

    return(
        <div>
            {
                elements.map(item => 
                    <>
                    <div className="container-head">
                        <div className='div-tabs'>
                            <p>{item.title}</p>
                        </div>
                    </div>
                    <div>
                        {
                            item.content
                        }
                    </div>
                    </>
                )
            }
        </div>
    )

}