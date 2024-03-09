import React , { useState } from "react";
import { Link ,NavLink } from "react-router-dom"
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Login(){
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const navgator = useNavigate()
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // try {
          //   const response = axios.post("http://localhost:8000/api/v1/users/login",{
          //     email,
          //     password
          //   })
          //   console.log(respons)
          // } catch (error) {
          //   console.log("something went worng while sending the data from frontend",error)
          // }

           axios.post("http://localhost:8000/api/v1/users/login",{
                email,
                password
              })
              .then( (response) =>{
                console.log(response.data.data.user._id)
                localStorage.setItem("accessToken",response.data.data.accessToken)
                localStorage.setItem("userId" , response.data.data.user._id)
                navgator("/todo")
              })
              .catch( (error)=>{
                console.log(error)
              } )
        };
      
        return (
          <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
              <h2 className="text-2xl font-semibold mb-6">Login</h2>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        );
}