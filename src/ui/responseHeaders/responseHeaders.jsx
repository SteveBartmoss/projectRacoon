import './responseHeaders.css'

export function ResponseHeaders({headers}){

    const fields = headers ? Object.keys(headers) : []

    return(
        <div className="div-table">
            <table className='data-table'>
                <thead>
                    <tr>
                        <th className="table-titles">Name</th>
                        <th className="table-titles">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        fields.map(item => 
                            <tr>
                                <td className="table-content">{item}</td>
                                <td className="table-content">{headers[item]}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )

}