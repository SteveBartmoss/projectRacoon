import './appErrors.css'
import errorImg from '../../assets/dangerous.svg'
import warningImg from '../../assets/warning.svg'
import { useSelector } from 'react-redux'

export function AppErrors(){

    const errors = useSelector((state) => state.errors.errorCounter)
    const warnings = useSelector((state) => state.errors.warningCounter)

    return(
        <div className='div-errors'>
            <div className='div-element'>
                 <img className='icon' src={errorImg} />
                <p>{errors}</p>
            </div>
            <div className='div-element'>
                <img className='icon' src={warningImg} />
                <p>{warnings}</p>
            </div>
        </div>
    )
}