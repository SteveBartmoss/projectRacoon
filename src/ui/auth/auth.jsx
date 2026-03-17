import { Box } from "../containers/containers"
import { Select } from "../select/select"
import { TextField } from "../textField/textField"


export function Auth({ auth, authType, setAuth, setAuthType }) {

    const authElements = [
        {
            value: "bearer",
            title: "Bearer Token"
        }
    ]

    return (
        <Box styles={{
            display: "flex",
            flexDirection: "row",
        }}>
            <Box styles={{
                width: "20%",
                margin: ".2rem"
            }}>
                <Select 
                    target={authType} 
                    elements={authElements} 
                    handleChange={(event) => setAuthType(event.target.value)} 
                />
            </Box>
            <Box styles={{
                width: "50%",
                margin: ".2rem"
            }}>
                <TextField 
                    target={auth} 
                    handleTarget={(event) => setAuth(event.target.value)} 
                />
            </Box>
        </Box>
    )
}