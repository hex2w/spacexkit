export default {

    get: (path, options = {}, query = {}) => {
        if (Object.keys(options).length === 0 && Object.keys(query).length === 0) {
            return fetch(`https://api.spacexdata.com/v4${path}`)
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else { return { error: res.status } }
                })
                .then(json => {
                    console.log(json)
                    return json
                })
                .catch( error => { return { error: error } } )
        } else return fetch(
            `https://api.spacexdata.com/v4${path}/query`,
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
                    console.log(json)
                    return json
                })
                .catch( error => { return error } )
    }

}