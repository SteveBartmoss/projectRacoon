import { Btn } from "../ui/btn/btn";
import { Row } from "../ui/containers/containers";
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
            <div>
                <Select elements={methodElements} />
            </div>
            <div>
                <TextField />
            </div>
            <div>
                <Btn title='Send'/>
            </div>
        </Row>
    )

}