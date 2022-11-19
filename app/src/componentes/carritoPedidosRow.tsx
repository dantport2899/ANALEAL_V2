import React, { useEffect } from "react";
import { Descuento } from "../interfaces/Descuentos";
import { Talla } from '../interfaces/Tallas';
import { Estilo } from '../interfaces/Estilos';
import { useNavigate } from "react-router-dom";

interface Props {
    prenda: any;
    Total:number;
    setTotal:(total:number)=>void;
    descuentos:any;
  }
  
export const CarritoPedidosRow = ({prenda,Total,setTotal,descuentos}:Props) => {

    const navigate = useNavigate();


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
 

  return (
    <tr>
      <td>
        {
          (prenda.prenda[0].img_archivo)
          ?
          (<><img
            src={require("../src/prendas/"+prenda.prenda[0].img_nombre)}
            style={{height:'40px'}}
            className="avatar-sm rounded-circle me-2"
          /></>)
          :
          (<><img
            src={require("../src/prendas/corteafuera.jpeg")}
            style={{height:'40px'}}
            className="avatar-sm rounded-circle me-2"
          /></>)
        }
      </td>
      <td>
        <a href="#" className="text-body">
          {prenda.prenda[0].nom_prenda}
        </a>
      </td>
      
      <td>${(Number(prenda.prenda[0].precio))-(((Number(prenda.prenda[0].precio))*(Number(porcentaje)*.01)))}</td>
      <td>{prenda.cantidad}</td>
      <td>${((Number(prenda.prenda[0].precio))-(((Number(prenda.prenda[0].precio))*(Number(porcentaje)*.01))))*(Number(prenda.cantidad))}</td>
      
    </tr>
  );
};
