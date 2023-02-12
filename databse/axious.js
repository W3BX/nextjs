import axios from "axios"

const client = new axios.create({
    baseURL: `${process.env.HOST}/api`,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

export default client

//use if connRefused else localhost:3000