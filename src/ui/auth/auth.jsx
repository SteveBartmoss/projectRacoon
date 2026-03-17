import { Select } from "../select/select"
import { TextField } from "../textField/textField"


export function Auth({auth,authType,setAuth, setAuthType}){

    const authElements = [
        {
            value: "bearer",
            title: "Bearer Token"
        }
    ]

    return (
        <div>
            <div>
                <Select target={authType} elements={authElements} handleChange={(event) => setAuthType(event.target.value)} />
            </div>
            <div>
                <TextField target={auth} handleTarget={(event) => setAuth(event.target.value)} />
            </div>
        </div>
    )
}