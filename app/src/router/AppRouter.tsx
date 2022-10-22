import React from 'react'

import { Route, Navigate, Routes} from "react-router-dom"
import { LoginPage } from "../auth/loginPage";
import { RegisterPage } from "../auth/registerPage";
import { AdminHome } from "../admin/adminHome";
import { UserHome } from "../user/UserHome";
import { Home } from "../home";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/user" element={<UserHome/>}/>
        <Route path="/*" element={<Navigate to="/home"/>}/>
    </Routes>
  )
}
