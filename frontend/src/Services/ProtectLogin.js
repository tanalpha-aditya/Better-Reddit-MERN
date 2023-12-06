import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export const ProtectLogin = () => {

    const auth = localStorage.getItem("token")
    return auth ? <Navigate to={"/profile"}/> : <Outlet/>

}
