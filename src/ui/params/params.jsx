import { TextField } from "../textField/textField";


export function Params({elements,setElements}){
    return(
        <div>
            <p>Query parameters</p>
            <div>
                <p>Add</p>
                <p>Delete All</p>
            </div>
            <div>
                {
                    elements.map(item => 
                        <div>
                            <TextField target={item.name} />
                            <TextField target={item.value} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}