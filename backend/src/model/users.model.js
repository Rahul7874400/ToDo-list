import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
        lowerCase : true,
        index : true,
        trim : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowerCase : true,
        index : true
    },
    fullName : {
        type : String,
        required : true,
        lowerCase : true,
        index : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    refreshToken : {
        type : String
    }
},{timestamps : true})




// encrypt the password just before store in database

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,10)

    return next()
})

//injecting the custom function to check whether the password is correct or not

userSchema.methods.ispasswordCorrect = async function (password){
    return await  bcrypt.compare(password,this.password)
}

// injecting the custom function to generate the refreshtoken

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRE
        }

    )
}

//injecting the custom function to generate the accesstoken

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SCERET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}

export const User = mongoose.model("User",userSchema)