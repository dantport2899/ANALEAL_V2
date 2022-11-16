import React from "react";
import { NavbarCliente } from "../componentes/navbarCliente";
import "./../styles/estilos.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { Prenda } from '../interfaces/Inventario';
import { useForm } from "react-hook-form";

export const UserVerprenda = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit} = useForm();


  let prenda: Prenda = {
    idprenda:"",
    nom_prenda:"",
    idtalla:"",
    precio:"",
    iddepartamento:"",
    color:"",
    idmaterial:"",
    idestilo:"",
    img_nombre:"",
    img_archivo:"",
    descripcion:"",
    existencias:"",
    iddescuento:""
};
  

  if(state){
    prenda = state.Prenda;
    console.log(prenda);
  }else{
    navigate('/user/galeria');
  }

  function jsonConcat(o1:any, o2:any) {
    for (var key in o2) {
     o1[key] = o2[key];
    }
    return o1;
   }

  const onSubmit = (data: any) => {
    const prendacarrito = jsonConcat(data, prenda);
    // console.log(prendacarrito);

    if (sessionStorage.getItem("user")) {
      var carrito = JSON.parse(sessionStorage.getItem("carrito") || '{}');

      let existe:boolean = false
      carrito.forEach((prendaa:any) => {
        if(prendaa.idprenda==prenda.idprenda){
          existe=true;
        }
      });

      if(existe){
        alert("Esta prenda ya esta incluida en el carrito");

      }else{
        carrito.push(prendacarrito);

      }
      sessionStorage.setItem('carrito',JSON.stringify(carrito));
      navigate('/user/galeria');

    }else{
      alert("Es necesario iniciar sesion para poder proceder");
      navigate('/login');

    }
    
    
  };

  
  return (
    <>
      <NavbarCliente />
      <div className="container-verprenda">
        
        <div className="container-imgverprenda">
          {
          (prenda.img_archivo)
          ?
          (<>
          <img src={require("../src/prendas/"+prenda.img_nombre)} alt="" />
          </>
          )
          :
          (
            <>
          <img src={require("../src/prendas/corteafuera.jpeg")} alt="" />
            
            </>
          )
        }
        </div>
        {/* div FORM */}
        <div className="divFormModificar verprenda-form">
          <br /><br /><br /><br />
          <div>
            <h2>{prenda.nom_prenda}</h2>
          </div>
          <div style={{ paddingTop: "2px" }}>
            <a>{prenda.descripcion}</a>
          </div>
          <div className="rendered-form" style={{ paddingTop: "20px" }}>
            <div className="formbuilder-text form-group field-nombre">
              {
                (prenda.iddescuento=="1")
                ?
                (<>
                  <a style={{ color: "blue" }}>$1260 </a>
                </>)
                :
                (<>
                <a style={{ color: "blue" }}>${(Number(prenda.precio))-(((Number(prenda.precio))*(Number(state.Porcentaje)*.01)))} </a> <del>${prenda.precio}</del>
                <a> {state.Descuento}</a>
                </>)
              }
              
            </div>
            <div>
              <b>Stock: </b>
              <a>{prenda.existencias}</a>
            </div>
            <div>
              <a>
                {
                  (prenda.iddepartamento=="1")
                  ?(
                    <>
                      Ropa Boda  
                    </>
                  )
                  :(<>
                      Ropa Ocasion
                  </>)
                }
              </a>
            </div>
            <div>
              <b>Talla: </b>
              <a>{state.Talla}</a>
            </div>
            <div>
              <b>Material: </b>
              <a>{state.Material}</a>
            </div>
            <div>
              <b>Color: </b>
              <a>Rojo</a>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>

              <input type="number" {...register("cantidad")} defaultValue={1} min="1" max={prenda.existencias}/>
            <div style={{ paddingTop: "15px" }}>
              <button
              type="submit"
                data-bs-toggle="modal"
                data-bs-target=".add-new"
                className="btn btn-primary"
              >
                 Agregar al carrito
              </button>
            </div>
            </form>
            
          </div>
        </div>
      </div>
    </>
  );
};
