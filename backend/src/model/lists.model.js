import mongoose from "mongoose";




const listSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    toDo : {
        type : String,
        required : true
    }
},{timestamps : true})



export const List = mongoose.model("List",listSchema)