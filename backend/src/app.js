import express from "express"
import cors from "cors"
import CookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    Credential : true
}))

app.use(express.json({
    limit : "20kb"
}))

app.use(express.urlencoded({
    extended : true,
    limit : "20kb"
}))

app.use(express.static("public"))

app.use(CookieParser())

// import router
import userRouter from "./routes/user.route.js"
import listRouter from "./routes/lists.route.js"

app.use("/api/v1/users",userRouter)
app.use("/api/v1/todo",listRouter)




export { app }
