import React from 'react'

import { Route, Navigate, Routes} from "react-router-dom"
import { LoginPage } from "../auth/loginPage";
import { RegisterPage } from "../auth/registerPage";

import { AdminHome } from "../admin/adminHome";
import { Inventario } from "../admin/inventario";
import { PrendaForm } from "../admin/prendaForm";
import { Pedidos } from "../admin/pedidos";
import { PedidosForm } from "../admin/pedidosForm";
import { Descuentos } from "../admin/descuentos";
import { DescuentoForms } from "../admin/descuentoForm";
import { PruebaForms } from "../admin/pruebaFormss";

import { UserHome } from "../user/UserHome";
import { Usergaleria } from "../user/usergaleria";
import { UserVerprenda } from "../user/userVerprenda";
import { UserCarrito } from "../user/userCarrito";
import { UserConfirmacioncompra } from "../user/userConfirmacioncompra";
import { UserHistorial } from "../user/userHistorial";
import { UserDetalles } from "../user/userDetalles";
import { UserConfig } from "../user/userConfig";
import { Home } from "../home";
import { UsuarioForm } from '../auth/usuarioForm';
import { Reportes } from '../admin/reportes';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        
        <Route path="/admin" element={<AdminHome/>}/>
        <Route path="/admin/inventario" element={<Inventario/>}/>
        <Route path="/admin/inventario/form" element={<PrendaForm/>}/>
        <Route path="/admin/pedidos" element={<Pedidos/>}/>
        <Route path="/admin/pedidos/form" element={<PedidosForm/>}/>
        <Route path="/admin/descuentos" element={<Descuentos/>}/>
        <Route path="/admin/descuentos/form" element={<DescuentoForms/>}/>
        <Route path="/admin/reportes" element={<Reportes/>}/>

        <Route path="/config" element={<UsuarioForm/>}/>

        
        <Route path="/user" element={<UserHome/>}/>
        <Route path="/user/galeria" element={<Usergaleria/>}/>
        <Route path="/user/prenda" element={<UserVerprenda/>}/>
        <Route path="/user/carrito" element={<UserCarrito/>}/>
        <Route path="/user/confirmar" element={<UserConfirmacioncompra/>}/>
        <Route path="/user/historial" element={<UserHistorial/>}/>
        <Route path="/user/detalles" element={<UserDetalles/>}/>
        <Route path="/user/config" element={<UserConfig/>}/>
        
        <Route path="/*" element={<Navigate to="/home"/>}/>
    </Routes>
  )
}
