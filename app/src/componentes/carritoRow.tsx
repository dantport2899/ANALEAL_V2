import React, { useEffect } from "react";
import { Descuento } from "../interfaces/Descuentos";
import { Talla } from '../interfaces/Tallas';
import { Estilo } from '../interfaces/Estilos';
import { useNavigate } from "react-router-dom";

interface Props {
    prenda: any;
    descuentos: any;
    talla: any;
    estilo: any;
    row:number;
    Total:number;
    setTotal:(total:number)=>void;
  }

 
  
export const CarritoRow = ({prenda,descuentos,talla,estilo,row,Total,setTotal}:Props) => {

    const navigate = useNavigate();


     // //mostrar Descuento
     let Descuento:string = "Descuento";
     let porcentaje:string = "0";

     if(descuentos){
        descuentos.descuentos.forEach((desc:Descuento)=> {
            if(desc.iddescuento===prenda.iddescuento){
                Descuento = desc.nom_descuento; 
                porcentaje =  desc.descuento;
            }
        });
     }
 
     // //mostrar Talla
     let Talla:string = "Talla";
     if(talla){
        talla.tallas.forEach((talla:Talla)=> {
            if(talla.idtalla===prenda.idtalla){
                Talla = talla.nom_talla;     
            }
        });
     } 
 
     // //mostrar Estilo
     let Estilo:string = "Estilo";
     if(estilo){
        estilo.estilos.forEach((estilo:Estilo)=> {
            if(estilo.idestilo===prenda.idestilo){
                Estilo = estilo.nom_estilo;     
            }
        });
     }
     
     const Delete = () =>{
        var carrito = JSON.parse(sessionStorage.getItem("carrito") || '{}');
        carrito.splice(row,1);
        sessionStorage.setItem('carrito',JSON.stringify(carrito));
        // navigate("/user/carrito");
        window.location.reload();
      }

  return (
    <tr>
      <td>
        {
          (prenda.img_archivo)
          ?
          (<><img
            src={require("../src/prendas/"+prenda.img_nombre)}
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
          {prenda.nom_prenda}
        </a>
      </td>
      <td>{prenda.color}</td>
      <td>{
        (prenda.iddepartamento=="1")
        ?(<>Ropa Boda</>)
        :(<>Ropa Ocasion</>)
        }
        </td>
      <td>{Talla}</td>
      <td>${(Number(prenda.precio))-(((Number(prenda.precio))*(Number(porcentaje)*.01)))}</td>
      <td>{prenda.cantidad}</td>
      <td>${((Number(prenda.precio))-(((Number(prenda.precio))*(Number(porcentaje)*.01))))*(Number(prenda.cantidad))}</td>
      <td>
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a
            onClick={()=>Delete()}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete"
              className="px-2 text-danger"
            >
              <i className="bx bx-trash-alt font-size-18"></i>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  );
};
