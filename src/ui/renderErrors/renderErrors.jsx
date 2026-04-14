import { useSelector } from "react-redux";
import { Box } from "../containers/containers";
import './renderErrors.css'

export function RenderErrors() {

    const messsages = useSelector((state) => state.errors.errorMessages)

    return (
        <Box styles={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "100%",
            overflowY: "scroll",            
        }}
        >
            {
                messsages.map(item =>
                    <pre className="pre-error">
                        {JSON.stringify(item, null, 2)}
                    </pre>
                )
            }
        </Box>
    )

}