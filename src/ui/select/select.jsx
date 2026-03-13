import './select.css'

export function Select({elements,target,handleChange}){
    return(
        <select className='select-method' value={target} onChange={handleChange}>
            {
                elements.map(item => 
                    <option key={item.value} value={item.value}>{item.title}</option>
                )
            }
        </select>
    )
}