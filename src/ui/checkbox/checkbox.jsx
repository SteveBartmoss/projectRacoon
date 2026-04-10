import './checkbox.css'

export function CheckInput({target,handleTarget}){

    return(
        <input 
            type="checkbox" 
            className="check-field" 
            checked={target} 
            onChange={handleTarget} 
        />
    )

}