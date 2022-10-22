import React from 'react'
import {NavbarCliente} from '../componentes/navbarCliente';
import { reqqResapi } from '../api/reqRes';
import { useForm } from "react-hook-form";
import { User } from '../interfaces/Usuarios';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {

  const navigate = useNavigate();

  const { register, handleSubmit} = useForm();
  
  const onSubmit = (data: any) => {
    const Jsonsend = {
        action: "newuser",
        data: data
    }
    console.log(Jsonsend);
    registrarUsuario(Jsonsend);
  };

  const registrarUsuario = async(Jsonsend:any) => {
    //llamado al api promesa y se le asigna la interfaz
        const resp = await reqqResapi.post<User>('',Jsonsend).then(res => {

            if(res.data.error){
              alert(res.data.message);               
            }else{
              navigate('/login');
            }
            
        });    
  }

  return (
    <div style={{paddingTop:'160px'}}>
      <NavbarCliente/>

      <div className="contact">
            <div className="container-fluid">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4"></div>
                        <div className="col-md-8">
                            <div className="contact-form">
                                <div id="success"></div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="control-group">
                                        <input type="text" className="form-control" {...register("nom_usuario")} id="name" placeholder="Ingresa tu Nombre" required data-validation-required-message="Por favor ingresa tu Nombre" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <input type="text" className="form-control" {...register("username")} id="username" placeholder="Ingresa tu Nombre de Usuario" required data-validation-required-message="Por favor ingresa tu Nombre de ususario" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <input type="email" className="form-control" {...register("correo")} id="email" placeholder="Ingresa tu Correo" required data-validation-required-message="Por favor ingresa tu Correo" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    
                                    <div className="control-group">
                                        <input type="pass" className="form-control" {...register("contrasena")} id="pass" placeholder="Ingresa tu Contraseña" required data-validation-required-message="Por favor ingresa tu contrasena" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    
                                    <div className="control-group">
                                        <input type="text" className="form-control" {...register("telefono")} id="tel" placeholder="Ingresa tu Telefono" required data-validation-required-message="Por favor ingresa tu Telefono" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <input type="text" className="form-control" {...register("direccion")} id="address" placeholder="Ingresa tu nombre de Direccion" required data-validation-required-message="Por favor ingresa tu Direccion" />
                                        <input type="hidden" className="form-control" {...register("idrol")} id="rol" value="2" required/>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div>
                                        <input className="btn btn-outline-dark" type="submit" id="sendMessageButton" value="Registrarse"/>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
