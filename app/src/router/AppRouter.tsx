import React from 'react'

import { Route, Navigate, Routes} from "react-router-dom"
import { LoginPage } from "../auth/loginPage";
import { RegisterPage } from "../auth/registerPage";

import { AdminHome } from "../admin/adminHome";
import { Inventario } from "../admin/inventario";
import { Pedidos } from "../admin/pedidos";
import { Descuentos } from "../admin/descuentos";

import { UserHome } from "../user/UserHome";
import { Home } from "../home";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        
        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/admin/inventario" element={<Inventario/>}/>
        <Route path="/admin/pedidos" element={<Pedidos/>}/>
        <Route path="/admin/descuentos" element={<Descuentos/>}/>
        
        <Route path="/user" element={<UserHome/>}/>
        
        <Route path="/*" element={<Navigate to="/home"/>}/>
    </Routes>
  )
}
