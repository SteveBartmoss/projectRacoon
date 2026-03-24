import { Chip } from '../chip/chip'
import './responseFrame.css'
import copy from "../../assets/copy.svg"
import { Box } from '../containers/containers'

export function ResponseFrame({ objProps }) {

    const handleClipBoard = async () => {
        try{

            await navigator.clipboard.writeText(JSON.stringify(objProps.body))

        }catch(error){
            console.log(error)
        }
    }

    const setStatusResponse = (status) => {

        if(!status ) return 'main'

        if(status >= 200 && status < 300) return 'success'
        if(status >= 300 && status < 400) return 'main'
        if(status >= 400 && status < 500) return 'warning'
        if(status >= 500) return 'error'

        return 'main'
    }

    return (
        <>
            <div className='div-container'>
                <div className='div-status-bar'>
                    <Box
                        styles={{
                            margin: ".3rem",
                        }}
                    >
                        <Chip text={`status: ${objProps?.status ?? ""}`} type={setStatusResponse(objProps?.status)}/>
                    </Box>
                    <Box
                        styles={{
                            margin: ".3rem",
                        }}
                    >
                        <Chip text={`time: ${objProps?.time ?? ""}`} type={'main'}/>
                    </Box>
                    <Box
                        styles={{
                            margin: ".3rem",
                        }}
                    >
                        <Chip text={`size: ${objProps?.size ?? ""}`} type={'main'} />
                    </Box>
                    <Box
                        styles={{
                            margin: ".3rem",
                        }}
                    >
                        <img className="btn-clipboard" onClick={handleClipBoard} src={copy} />
                    </Box>
                </div>
                <div className='div-response'>
                    <pre>{JSON.stringify(objProps.body, null, 2)}</pre>
                </div>
            </div>
        </>
    )
}