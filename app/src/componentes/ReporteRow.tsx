import React from "react";
import { useNavigate } from "react-router-dom";
import { reqqResapi } from "../api/reqRes";
import { Reporte } from "../interfaces/Reportes";
import { useState } from "react";
import { DescuentosDeleteModal } from "../componentes/descuentoDeleteModal";
import { ReporteDeleteModal } from "./reportesDeleteModal";
import { VerImagenModal } from "./verImagenModal";
import { Descuento } from "../interfaces/Descuentos";
import { Talla } from '../interfaces/Tallas';
import { Estilo } from "../interfaces/Estilos";
import { Materiale } from "../interfaces/Materiales";

interface Props {
  prenda: any;
  reporte: any;
  update?: boolean;
  setUpdate: (estatus: boolean) => void;
  descuentos:any;
  talla: any;
  estilo: any;
  material:any;
}

export const ReporteRow = ({ prenda, reporte, update, setUpdate,descuentos,talla,estilo,material }: Props) => {
  let Reporte: Reporte = reporte;
  
  if(Reporte.pedido){
    var Pedido = Reporte.pedido[0]
  }
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // //mostrar Descuento
  let Descuento:string = "Descuento";
  let porcentaje:string = "0";

  if(descuentos){
     descuentos.descuentos.forEach((desc:Descuento)=> {
         if(desc.iddescuento===prenda[0].iddescuento){
             Descuento = desc.nom_descuento; 
             porcentaje =  desc.descuento;
         }

     });
  }

  // //mostrar Talla
 let Talla:string = "Talla";
 if(talla){
  talla.tallas.forEach((talla:Talla)=> {
      if(talla.idtalla===prenda[0].idtalla){
          Talla = talla.nom_talla;     
      }
  });
 }

 // //mostrar Estilo
 let Estilo:string = "Estilo";
 if(estilo){
   estilo.estilos.forEach((estilo:Estilo)=> {
       if(estilo.idestilo===prenda[0].idestilo){
           Estilo = estilo.nom_estilo;     
       }
   });
 }

 // //mostrar Estilo
 let Material:string = "Material";
 if(material){
   material.materiales.forEach((material:Materiale)=> {
       if(material.idmaterial===prenda[0].idmaterial){
         Material = material.nom_material;     
       }
   });
 }

 const CONFIG = () => {
  if(sessionStorage.getItem('user_types_id') == "1")
  {
    navigate("/user/prenda_detalles",{state:{Prenda:prenda[0],Talla:Talla,Descuento:Descuento,Estilo:Estilo,Porcentaje:Number(porcentaje),Material:Material,cantidad:reporte.cantidad}})
    window.location.reload();
  }else{
    navigate("/user/prenda_detalles",{state:{Prenda:prenda[0],Talla:Talla,Descuento:Descuento,Estilo:Estilo,Porcentaje:Number(porcentaje),Material:Material,cantidad:reporte.cantidad}})

  }    
}

  return (
    <>
      <tr>
        <td>
          <ul className="list-inline mb-0">
            
            <li className="list-inline-item">
              <a
                onClick={() => setIsOpenDelete(true)}
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
        <td>{Reporte.idreporte}</td>
        <td><a onClick={() => CONFIG()} style={{color:'blue',textDecoration:'underline'}}>{Reporte.idprenda}</a></td>
        <td>
        {
          (Reporte.prenda[0].img_archivo)
          ?
          (<a onClick={()=>setIsOpen(true)}><img
            src={require("../src/prendas/"+Reporte.prenda[0].img_nombre)}
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
        <td>{


          (Reporte.accion=="1")
          ?
          
          (<>
            <strong style={{ color: "green" }}>Entradas </strong>
          </>)          
          :
          
          (<>
            <strong style={{ color: "red" }}>Salidas </strong> 
            </>)
          }  
          
          </td>
        <td>{Reporte.cantidad}</td>
        <td>{Reporte.fecha}</td>
        <td>{
          (Reporte.idpedido=="1")
          ?
          (<a style={{color:'blue'}}>Registrado por el Administrador</a>)
          :
          (<a style={{color:'blue',textDecoration:'underline'}} onClick={() => navigate("/admin/pedidos/form", {
            state: { pedido: Pedido }})}>{Reporte.idpedido}</a>)
          
        }</td>
      </tr>
      {isOpenDelete && (
        <ReporteDeleteModal
          setIsOpen={setIsOpenDelete}
          document={Reporte}
          update={update}
          setUpdate={setUpdate}
        />
      )}
      {isOpen && (
        <VerImagenModal
          setIsOpen={setIsOpen}
          img={Reporte.prenda[0].img_nombre}
          nom_prenda={Reporte.prenda[0].nom_prenda}
        />
      )}
    </>
  );
};
