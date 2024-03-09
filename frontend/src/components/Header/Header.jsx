import React from "react";
import { Link , NavLink , useNavigate } from "react-router-dom"
import axios from "axios";


export default function Header() {
    const navigate = useNavigate()
    const handleSumit  = (e)=>{
        const userId = localStorage.getItem('userId')
        console.log(userId)
        try {
            const response = axios.get("http://localhost:8000/api/v1/users/logout",{
                params : {userId}
            })
            localStorage.removeItem('userId')
            localStorage.removeItem('accessToken')
            console.log(response)
            navigate("/login")
            
        } catch (error) {
            console.log("something went wrong while logout",error)
        }
    }
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://images.pexels.com/photos/4057737/pexels-photo-4057737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            className="mr-3 h-20 w-100"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/login"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            
                            onClick={handleSumit}
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log out
                        </Link>
                        <Link
                            to="/register"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            sing up
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                    </div>
                </div>
            </nav>
        </header>
    );
}