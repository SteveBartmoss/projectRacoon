

export function Quantum() {

    const handleKeyDown = (event) => {

        event.preventDefault(); 

        const key = event.key

        console.log(key)

    }

    return(
        <>
            <div onKeyDown={handleKeyDown}>
                
            </div>
        </>
    )
}