import axios from "axios"

const base = process.env.NODE_ENV === 'production' ? process.env.HOST : 'http://localhost:3000/api'

const client = new axios.create({
    baseURL: `${base}`,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

export default client

//use if connRefused else localhost:3000