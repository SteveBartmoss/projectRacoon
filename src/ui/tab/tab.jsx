
export function Tab({elements}){



    return(
        <div>
            {
                elements.map(item => 
                    <>
                    <div>
                        <div>
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