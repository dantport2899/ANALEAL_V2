import React, { useEffect } from "react";
import { Descuento } from "../interfaces/Descuentos";
import { Talla } from '../interfaces/Tallas';
import { Estilo } from '../interfaces/Estilos';
import { useNavigate } from "react-router-dom";
import { Materiale } from "../interfaces/Materiales";
import { VerImagenModal } from "./verImagenModal";
import { useState } from 'react';

interface Props {
    prenda: any;
    Total:number;
    setTotal:(total:number)=>void;
    descuentos:any;
    talla: any;
    estilo: any;
    material:any;
  }
  
export const CarritoPedidosRow = ({prenda,Total,setTotal,descuentos,talla,estilo,material}:Props) => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    console.log(prenda);

     // //mostrar Descuento
     let Descuento:string = "Descuento";
     let porcentaje:string = "0";

     if(descuentos){
        descuentos.descuentos.forEach((desc:Descuento)=> {
            if(desc.iddescuento===prenda.prenda[0].iddescuento){
                Descuento = desc.nom_descuento; 
                porcentaje =  desc.descuento;
            }
        });
     }

     // //mostrar Talla
    let Talla:string = "Talla";
    if(talla){
    talla.tallas.forEach((talla:Talla)=> {
        if(talla.idtalla===prenda.prenda[0].idtalla){
            Talla = talla.nom_talla;     
        }
    });
    }

    // //mostrar Estilo
    let Estilo:string = "Estilo";
    if(estilo){
      estilo.estilos.forEach((estilo:Estilo)=> {
          if(estilo.idestilo===prenda.prenda[0].idestilo){
              Estilo = estilo.nom_estilo;     
          }
      });
    }

    // //mostrar Estilo
    let Material:string = "Material";
    if(material){
      material.materiales.forEach((material:Materiale)=> {
          if(material.idmaterial===prenda.prenda[0].idmaterial){
            Material = material.nom_material;     
          }
      });
    }

    const CONFIG = () => {
      if(sessionStorage.getItem('user_types_id') == "1")
      {
        navigate("/user/prenda_detalles",{state:{Prenda:prenda.prenda[0],Talla:Talla,Descuento:Descuento,Estilo:Estilo,Porcentaje:Number(porcentaje),Material:Material,cantidad:prenda.cantidad}})
        window.location.reload();
      }else{
        navigate("/user/prenda_detalles",{state:{Prenda:prenda.prenda[0],Talla:Talla,Descuento:Descuento,Estilo:Estilo,Porcentaje:Number(porcentaje),Material:Material,cantidad:prenda.cantidad}})

      }    
    }
 

  return (
    <tr>
      <td>
        {
          (prenda.prenda[0].img_archivo)
          ?
          (<a onClick={()=>setIsOpen(true)}><img
            src={require("../src/prendas/"+prenda.prenda[0].img_nombre)}
            style={{height:'40px'}}
            className="avatar-sm rounded-circle me-2"
          /></a>)
          :
          (<><img
            src={require("../src/prendas/corteafuera.jpeg")}
            style={{height:'40px'}}
            className="avatar-sm rounded-circle me-2"
          /></>)
        }
      </td>
      <td>
        <a 
            onClick={() => CONFIG()}
        
        className="text-body">
          {prenda.prenda[0].nom_prenda}
        </a>
      </td>
      
      <td>${(Number(prenda.prenda[0].precio))-(((Number(prenda.prenda[0].precio))*(Number(porcentaje)*.01)))}</td>
      <td>{prenda.cantidad}</td>
      <td>${((Number(prenda.prenda[0].precio))-(((Number(prenda.prenda[0].precio))*(Number(porcentaje)*.01))))*(Number(prenda.cantidad))}</td>
      {isOpen && (
        <VerImagenModal
          setIsOpen={setIsOpen}
          img={prenda.prenda[0].img_nombre}
          nom_prenda={prenda.prenda[0].nom_prenda}
        />
      )}
    </tr>
  );
};
