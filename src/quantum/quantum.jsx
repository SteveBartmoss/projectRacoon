
import { store } from "./store/store"
import { Provider } from "react-reduxt";

export function Quantum() {

    const handleKeyDown = (event) => {

        event.preventDefault(); 

        const key = event.key

        console.log(key)

    }

    return(
        <Provider store={store}>
            <div onKeyDown={handleKeyDown}>
            </div>
        </Provider>
    )
}