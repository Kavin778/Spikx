import React from "react";
import {Navigate} from "react-router-dom"
import {useAuth} from "../hooks/useAuth";


const ProtectedRoute = ({children}) =>{
    const {isAuthenticated,loading} = useAuth();

    if(loading){
        return(
            <div className="bg-black w-full h-screen flex justify-center items-center">
                <h1 className="text-3xl text-white font-bold">Loading...</h1>
            </div>
        )
    }

    return isAuthenticated?children: <Navigate to="/" replace/>
}

export default ProtectedRoute;
