import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

/// we can do nesting use <Outlet/>
function Layout() {
    return (
        <>
        <Header/> 
        <Outlet/>
        <Footer/>
        </>
    )
}

export default Layout