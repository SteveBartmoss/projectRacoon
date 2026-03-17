import { RequesLayout } from "../../layout/requestLayout";


export function FrameTabs({elements}){

    return(
        <div>
            {
                elements.map(item => 
                    <>
                        <div className="container-head">
                            <div className="div-tabs">
                                <p>{item.title}</p>
                            </div>
                        </div>
                        <div>
                            <RequesLayout />
                        </div>
                    </>
                )
            }
        </div>
    )

}