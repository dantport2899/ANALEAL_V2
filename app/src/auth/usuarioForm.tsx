import React from 'react'
import {NavbarCliente} from '../componentes/navbarCliente';
import { reqqResapi } from '../api/reqRes';
import { useForm } from "react-hook-form";
import { User } from '../interfaces/Usuarios';
import { useNavigate } from 'react-router-dom';
import { NavbarAdmin } from '../componentes/navbarAdmin';

export const UsuarioForm = () => {

  const navigate = useNavigate();

  const { register, handleSubmit} = useForm();
  
  const onSubmit = (data: any) => {
    const Jsonsend = {
        action: "modifyuser",
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
                sessionStorage.setItem('user',Jsonsend.data.correo,);
                sessionStorage.setItem('idusuario',Jsonsend.data.idusuario,);
                sessionStorage.setItem('user_types_id',Jsonsend.data.idrol,);
                sessionStorage.setItem('nom_usuario',Jsonsend.data.nom_usuario,);
                sessionStorage.setItem('username',Jsonsend.data.username,);
                sessionStorage.setItem('contrasena',Jsonsend.data.contrasena,);
                sessionStorage.setItem('direccion',Jsonsend.data.direccion,);
                sessionStorage.setItem('telefono',Jsonsend.data.telefono,);
                    navigate('/admin');
            }
            
        });    
  }

  return (
    <div style={{paddingTop:'160px'}}>
      <NavbarAdmin/>

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
                                        <input type="hidden" className="form-control" defaultValue={sessionStorage.idusuario} {...register("idusuario")} id="w" placeholder="Ingresa tu Nombre" required data-validation-required-message="Por favor ingresa tu Nombre" />

                                        <input type="text" className="form-control" defaultValue={sessionStorage.nom_usuario} {...register("nom_usuario")} id="name" placeholder="Ingresa tu Nombre" required data-validation-required-message="Por favor ingresa tu Nombre" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <input type="text" className="form-control" defaultValue={sessionStorage.username} {...register("username")} id="username" placeholder="Ingresa tu Nombre de Usuario" required data-validation-required-message="Por favor ingresa tu Nombre de ususario" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <input type="email" className="form-control" defaultValue={sessionStorage.user} {...register("correo")} id="email" placeholder="Ingresa tu Correo" required data-validation-required-message="Por favor ingresa tu Correo" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    
                                    <div className="control-group">
                                        <input type="pass" className="form-control" defaultValue={sessionStorage.contrasena} {...register("contrasena")} id="pass" placeholder="Ingresa tu Contraseña" required data-validation-required-message="Por favor ingresa tu contrasena" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    
                                    <div className="control-group">
                                        <input type="text" className="form-control" defaultValue={sessionStorage.telefono} {...register("telefono")} id="tel" placeholder="Ingresa tu Telefono" required data-validation-required-message="Por favor ingresa tu Telefono" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <input type="text" className="form-control" defaultValue={sessionStorage.direccion} {...register("direccion")} id="address" placeholder="Ingresa tu nombre de Direccion" required data-validation-required-message="Por favor ingresa tu Direccion" />
                                        <input type="hidden" className="form-control" defaultValue={sessionStorage.user_types_id}  {...register("idrol")} id="rol" required/>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div>
                                        <input className="btn btn-outline-dark" type="submit" id="sendMessageButton" value="Modificar"/>
                                        
                                    </div>
                                </form>
                                <br /><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
