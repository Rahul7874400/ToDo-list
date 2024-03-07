import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { List } from "../model/lists.model.js"
import { User } from "../model/users.model.js";
import mongoose from "mongoose";



const createToDo = asyncHandler( async(req,res)=>{
    // create To Do list

    const {userId} = req.params
    const { toDo } = req.body

    const user = await User.findById(userId)
    if(!user){
        throw new apiError(404,"User does not exist")
    }

   const list = await List.create({
        userId : userId,
        toDo : toDo
    })

   await list.save()

   return res
   .status(200)
   .json(
    new apiResponse(
        201,
        list,
        "list created successfully"
    )
   )

} )

const updateToDo = asyncHandler( async(req,res)=>{
    // update To Do list
    const { listId } = req.params
    const { toDo } = req.body

    const list = await List.findByIdAndUpdate(
        listId,
        {
            $set : {
                toDo : toDo
            }
        },
        {
            new : true
        }
    )

    if(!list){
        throw new apiError(404,"To Do does not exist")
    }

    return res
    .status(200)
    .json(
        new apiResponse(
            201,
            list,
            "Updated successfully"
        )
    )


} )

const deleteToDO = asyncHandler( async(req,res)=>{
    // delete the To Do list
    const { listId } = req.params

    const list = await List.findByIdAndDelete(listId)

    if(!list){
        throw new apiError(404,"To do does not exist")
    }

    return res
    .status(202)
    .json(
        new apiResponse(
            201,
            list,
            "To do deleted successfully"
        )
    )
} )


const getToDoById = asyncHandler( async(req,res)=>{

    const user = await User.findById(req.user?._id)

    if(!user){
        throw new apiError(404,"user does not exist")
    }

    const list = await List.aggregate([
        {
            $match : {
                userId : new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $project : {
                toDo : 1
            }
        }
    ])

    if(!list){

    }

    return res
    .status(200)
    .json(
        new apiResponse(
            201,
            list,
            "To do list fetched"
        )
    )
} )


export {
    createToDo,
    updateToDo,
    deleteToDO,
    getToDoById
}