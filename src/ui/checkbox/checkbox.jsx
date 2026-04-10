import './checkbox.css'

export function CheckInput(target,handleTarget){

    return(
        <input type="checkbox" className="" value={target} onChange={handleTarget} />
    )

}