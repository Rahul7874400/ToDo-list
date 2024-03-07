import jwt  from "jsonwebtoken";
import { User } from "../model/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";


export const verifyjwt = asyncHandler( async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if(!token){
            throw new apiError(404,"Unauthorized user")
        }

        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SCERET)
        const user = await User.findById(decoded?._id).select(
            "-password -rerefreshToken"
        )

        if(!user){
            throw new apiError(404,"Invalid User")
        }

        req.user = user
        next()
        
    } catch (error) {
        throw new apiError(404,"Invalid Token")
    }
} )

