import React, { useContext } from 'react'

import { reqqResapi } from '../api/reqRes';
import { useForm } from "react-hook-form";
import { User } from '../interfaces/Usuarios';
import { useNavigate } from 'react-router-dom';
import {NavbarCliente} from '../componentes/navbarCliente';



export const LoginPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit} = useForm();
  
  const onSubmit = (data: any) => {
    const Jsonsend = {
        action: "login",
        data: data
    }
    validarUsuario(Jsonsend);
  };

  const validarUsuario = async(Jsonsend:any) => {
    //llamado al api promesa y se le asigna la interfaz
        const resp = await reqqResapi.post<User>('',Jsonsend).then(res => {

            if(res.data.user){

                sessionStorage.setItem('user',res.data.user.correo,);
                sessionStorage.setItem('user_types_id',res.data.user.idrol,);
                sessionStorage.setItem('id',res.data.user.idusuario,);

                if(res.data.user.idrol==="1"){
                    alert("Bienvenido "+res.data.user.username);
                    navigate('/admin');
                }else if(res.data.user.idrol==="2"){
                    alert("Bienvenido "+res.data.user.username);
                    navigate('/user');
                }else{
                    alert("Rango de usuario no especificado");
                    navigate('/login');
                }
                
            }else{
               alert(res.data.message);
            }
            
        });    
  }
  
  return (
    <div style={{paddingTop:'160px'}}>
      <NavbarCliente/>

      {/* body */}

      <div className="container bg-dark w-100">
      </div>

      <div className="container-fluid mt-auto">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-4">

                </div>
                  <div className="col-md-8">
                      <div className="contact-form">
                          <div id="success">
                          </div>
                          <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="control-group">
                                    <input type="email" className="form-control" id="email" {...register("usuario")} placeholder="Ingresa tu Correo" required data-validation-required-message="Por favor ingresa tu Correo" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div className="control-group">
                                    <input type="password" className="form-control" id="pass" {...register("password")} placeholder="Ingresa tu Contraseña" required data-validation-required-message="Por favor ingresa tu contrasena" />
                                    <p className="help-block text-danger"></p>
                                </div>
                                <div>
                                    <input className="btn btn-outline-secondary" type="submit" id="sendMessageButton"  value="Iniciar Sesion"/>
                                    <a className="btn btn-outline-dark" id="sendMessageButton" onClick={()=>navigate('/register')}>Registrarse aqui</a>
                                </div>
                          </form>
                      </div>
                  </div>
            </div>
        </div>
      </div>

      <br /><br /><br />
    </div> 
  )
}