import { useSelector } from "react-redux";
import { Box } from "../containers/containers";


export function RenderErrors() {

    const messsages = useSelector((state) => state.errors.errorMessages)

    return (
        <Box>
            {
                messsages.map(item =>
                    <pre>
                        {JSON.stringify(item, null, 2)}
                    </pre>
                )
            }
        </Box>
    )

}