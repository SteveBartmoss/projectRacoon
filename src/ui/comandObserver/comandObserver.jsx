

export function ComandObserver({children}){

    const handleKeyDown = (event) => {

        const key = event.key;

        console.log(key)
    }

    return(
        <div>
            {children}
        </div>
    )
}