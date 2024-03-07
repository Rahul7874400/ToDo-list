import dotenv from "dotenv"
import  connectDb  from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path : './.evn'
})


connectDb()
.then( ()=>{
    app.on("errror", (error) => {
        console.log("ERRR: ", error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
} )
.catch( (error)=>{
    console.log("Connection failed",error)
} )