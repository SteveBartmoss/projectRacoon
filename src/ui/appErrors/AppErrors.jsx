import './appErrors.css'
import errorImg from '../../assets/dangerous.svg'
import warningImg from '../../assets/warning.svg'

export function AppErrors(){

    return(
        <div className='div-errors'>
            <div className='div-element'>
                 <img className='icon' src={errorImg} />
                <p>0</p>
            </div>
            <div className='div-element'>
                <img className='icon' src={warningImg} />
                <p>0</p>
            </div>
        </div>
    )
}