import mongoose from "mongoose";

const conn = {}

const connMongoose = async () => {
    try {

        if (conn.isConnected) return

        const { connection } = await mongoose.connect(process.env.MONGO)

        if (connection.readyState == 1) {
            console.log('connected')
            conn.isConnected = connection.readyState
        } else {
            console.log('not connected')
        }

        //return connection.readyState

    } catch (err) {
        console.log(err)
    }
}

export default connMongoose