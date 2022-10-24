import { url } from "inspector";
import React from "react";
import { Prenda } from '../interfaces/Inventario';
import { Descuentos, Descuento } from '../interfaces/Descuentos';
import { Tallas, Talla } from '../interfaces/Tallas';
import { Estilos, Estilo } from '../interfaces/Estilos';


interface Props {
  prenda: any;
  descuentos: any;
  talla: any;
  estilo: any;
  update?: boolean;
  setUpdate: (estatus: boolean) => void;
}

export const PrendaRow = ({ prenda,descuentos,talla,estilo, update, setUpdate }: Props) => {

    let Prendas:Prenda = prenda;  
    
    // //mostrar Descuento
    let Descuento:string = "Descuento";
    descuentos.forEach((desc:Descuento)=> {
        if(desc.iddescuento===Prendas.iddescuento){
            Descuento = desc.nom_descuento;     
        }
    });

    // //mostrar Talla
    let Talla:string = "Talla";
    talla.forEach((talla:Talla)=> {
        if(talla.idtalla===Prendas.idtalla){
            Talla = talla.nom_talla;     
        }
    });

    // //mostrar Estilo
    let Estilo:string = "Estilo";
    estilo.forEach((estilo:Estilo)=> {
        if(estilo.idestilo===Prendas.idestilo){
            Estilo = estilo.nom_estilo;     
        }
    });


    // console.log(Estilo);


  return (
    <tr>
      <td>
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a
              href="javascript:void(0);"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit"
              className="px-2 text-primary"
            >
              <i className="bx bx-pencil font-size-18"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="javascript:void(0);"
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
      <td>{Prendas.idprenda}</td>
      <td>
        <img
          src={require("../src/prendas/amarillo.jpg/amarillo.jpg")}
          style={{height:'40px'}}
          className="avatar-sm rounded-circle me-2"
        />
      </td>
      <td>{Prendas.nom_prenda}</td>
      <td>{Talla}</td>
      <td>{Prendas.color}</td>
      <td>${Prendas.precio}</td>
      <td>{Prendas.existencias}</td>
      <td>{Estilo}</td>
      <td>{Descuento}</td>
      <td>{Prendas.descripcion}</td>
    </tr>
  );
};
