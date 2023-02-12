import mongoose from "mongoose";

const connMongoose = async () => {
    try {
    const { connection } =  await mongoose.connect(process.env.MONGO)

    if(connection.readyState == 1){
        console.log('connected')
    }else{
        console.log('not connected')
    }

    //return connection.readyState

    } catch (err) {
        console.log(err)
    }
}

export default connMongoose