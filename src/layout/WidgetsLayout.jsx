import { ToggleWindow } from "../ui/toggleWindow/toggleWindow";
import { Tab } from "../ui/tab/tab";
import { RenderErrors } from "../ui/renderErrors/renderErrors";


export function WidgetsLayout(){

    const tabElements = [
        {
            id: 1,
            title: "Problems",
            content: <RenderErrors />
        }
    ]

    return(
        <ToggleWindow>
            <Tab elements={tabElements} />
        </ToggleWindow>
    )
}