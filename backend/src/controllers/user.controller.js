import { asyncHandler } from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { apiResponse } from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"
import { User } from "../model/users.model.js"
import mongoose from "mongoose"


const generateAccessTokenAndRefreshToken = async (userId) =>{

    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken , refreshToken}

        
    } catch (error) {
        throw new apiError(500, error.message || "Something went wrong while generating referesh and access token")
    }

}


const userRegister = asyncHandler( async (req,res)=>{
    // get data

    const {userName , fullName , password , email} = req.body

    // validate
    if ([userName,email,password,fullName].some ((feild) => feild?.trim() == "")) {
        
        throw new apiError(400,"All feild are required");
    }

    // check for existing user

    const existedUser = await User.findOne({
        $or : [{email} , {userName}]
    })

    if(existedUser){
        throw new apiError(404 , "User with email and username is already exist")
    }

    // console.log("fullName : ",fullName )
    // console.log("userName : ",userName )
    // console.log("email : ",email )
    // console.log("password : ",password )

    // create db and insert
    const user = await  User.create({
        fullName : fullName,
        userName : userName,
        password : password,
        email : email
    })
    await user.save()

    const createdUser = await  User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new apiError(404 , "Something went worng while registering the user")
    }

    // return response

    return res
    .status(201)
    .json(
        new apiResponse(
            201,
            createdUser,
            "user registered"
        )
    )
} )


const userLogin = asyncHandler( async (req,res)=>{
    // get data from user

    const {userName,email,password} = req.body
    
    // validate email or username

    if(!email && !userName){
        throw new apiError(404,"email or username is required")
    }

    // find in database

    const user = await User.findOne({
        $or : [{email},{userName}]
    })

    if(!user){
        throw new apiError(404 , "user does not exist")
    }

    //console.log("password",password)

    // check for password
    const ispassword = await user.ispasswordCorrect(password)

    if(!ispassword){
        throw new apiError(404 , "Incorrect pasword")
    }

    // generate token

    const {accessToken , refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const loginUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    // return response

    return res
    .status(201)
    .cookie("accessToken" , accessToken, options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(
            201,
            {
                user: loginUser, accessToken, refreshToken
            },
            "user loged in"
        )
    )

} )

const userLogout = asyncHandler( async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user?._id,
       {
        $unset : {
            refreshToken : 1 /// remove this field from db
        }
       },
        {
            new : true
        }
    )

    const options  = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new apiResponse(
        404,{},"user logged out"
        )
        )
} )



export { userRegister,
         userLogin,
         userLogout

        }