import './textfield.css'

export function TextField({textHolder,target,handleTarget}){
    
    return(
        <input type="text"  className='text-field' placeholder={textHolder} value={target} onChange={handleTarget} />
    )

}