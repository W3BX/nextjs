export default async function fetchapi(api: any, value: any) {

    const data = JSON.stringify({ ...value })
    const base = process.env.NODE_ENV === 'production' ? process.env.HOST : 'api'
    const res = await fetch(`${base}/${api}`, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": "application/json",
        },
        body: (data)
    })
    const dataFetched = await res.json()
    return dataFetched
}