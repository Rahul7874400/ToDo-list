import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"

const connectDb = async () => {
    try {
        const connectionIntance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("Mongondb connect at" , connectionIntance.connection.host)
        
    } catch (error) {
        console.log("Mongodb connection error",error)
        process.exit(1)
    }
}

export default connectDb