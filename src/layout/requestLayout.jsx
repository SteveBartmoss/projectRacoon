import { Btn } from "../ui/btn/btn";
import { Box, Row } from "../ui/containers/containers";
import { Select } from "../ui/select/select";
import { TextField } from "../ui/textField/textField";


export function RequesLayout(){

    const methodElements = [
        {
            value: "GET",
            title: "GET"
        },
        {
            value: "POST",
            title: "POST"
        },
        {
            value: "PUT", 
            title: "PUT"
        },
        {
            value: "PATCH",
            title: "PATCH"
        },
        {
            value: "DELETE",
            title: "DELETE"
        }
    ]

    return(
        <Row>
            <Box
                styles={{
                    padding: "1rem",
                    width: "4.5rem"
                }}
            >
                <Select elements={methodElements} />
            </Box>
            <Box
                styles={{
                    padding: "1rem",
                    width: "30rem"
                }}
            >
                <TextField />
            </Box>
            <Box
                styles={{
                    padding: "1rem",
                }}
            >
                <Btn title='Send'/>
            </Box>
        </Row>
    )

}