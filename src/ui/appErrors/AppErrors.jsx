import './appErrors.css'
import errorImg from '../../assets/dangerous.svg'
import warningImg from '../../assets/warning.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setShowErrorWindow } from '../../store/appSlice'

export function AppErrors(){

    const errors = useSelector((state) => state.errors.errorCounter)
    const warnings = useSelector((state) => state.errors.warningCounter)
    const dispatch = useDispatch()
    const showError = useSelector((state)=> state.appInfo.showErrorsWindow)

    const handleShowErrors = () => {
        dispatch(setShowErrorWindow({value: !showError}))
        console.log(showError)
    }

    return(
        <div onClick={handleShowErrors} className='div-errors'>
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