import React , {useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

import { Link ,NavLink } from "react-router-dom"


export default function Home() {
    const [userName , setUserName] = useState('')
    const [fullName , setFullName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
            const response = await axios.post("http://localhost:8000/api/v1/users/register",{
                userName,
                fullName,
                email,
                password
            })
            .then( (res)=>{
                console.log(res)
                navigate("/login")
            } )
            .catch( (error)=>{
                console.log("something went wrong while login",error)
            } )
            
        
    }

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        <form onSubmit={handleSubmit} method="post">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input type="text" id="username" name="username" 
            className="mt-1 p-2 w-full border rounded-md" 
            onChange={(e)=>setUserName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-600">Fullname</label>
            <input type="text" id="fullname" name="fullname" 
            className="mt-1 p-2 w-full border rounded-md" 
            onChange={(e)=>setFullName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" id="email" name="email" 
            className="mt-1 p-2 w-full border rounded-md" 
            onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input type="password" id="password" name="password" 
            className="mt-1 p-2 w-full border rounded-md" 
            onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Register</button>
        </form>
      </div>
    </div>
    );
}
