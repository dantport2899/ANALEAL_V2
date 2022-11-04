import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NavbarCliente } from '../componentes/navbarCliente';

export const Usergaleria = () => {
  const navigate = useNavigate();
  return (
    <>
    <NavbarCliente/>

    <br />
    <br />
    <br />
    <div onClick={()=>navigate('/user/prenda')}>usergaleria</div>
    </>
  )
}
