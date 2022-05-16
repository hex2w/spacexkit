export async function apiGet (path, options = {}, query = {}){
    if (Object.keys(options).length === 0 && Object.keys(query).length === 0) {
        return fetch(`${api}${path}`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else { return { error: res.status } }
            })
            .then(json => {
                return json
            })
            .catch( error => { return { error: error } } )
    } else return fetch(
        `${api}${path}/query`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query, options: options })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else { return new Error(res.status) }
            })
            .then(json => {
                return json
            })
            .catch( error => { return error } )
}
