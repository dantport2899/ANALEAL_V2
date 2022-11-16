import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Descuento } from "../interfaces/Descuentos";
import { Estilo } from "../interfaces/Estilos";
import { Prenda } from '../interfaces/Inventario';
import { Talla } from "../interfaces/Tallas";
import { Materiale } from '../interfaces/Materiales';
import { VerImagenModal } from './verImagenModal';

interface Props {
    prenda: any;
    descuentos: any;
    talla: any;
    estilo: any;
    material:any;
    update?: boolean;
    setUpdate: (estatus: boolean) => void;
  }
export const Prendatargeta = ({ prenda,descuentos,talla,estilo, material, update, setUpdate }: Props) => {
  const navigate = useNavigate();

  let Prendas:Prenda = prenda;  
  const [isOpen, setIsOpen] = useState(false);

    // //mostrar Descuento
    let Descuento:string = "Descuento";
    let porcentaje:string = "0";
    descuentos.forEach((desc:Descuento)=> {
        if(desc.iddescuento===Prendas.iddescuento){
            Descuento = desc.nom_descuento; 
            porcentaje =  desc.descuento;
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

    // //mostrar Estilo
    let Material:string = "Material";
    material.forEach((material:Materiale)=> {
        if(material.idmaterial===Prendas.idmaterial){
          Material = material.nom_material;     
        }
    });



  return (
    <div className="col-xl-3 col-sm-6">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div>
            {
          (Prendas.img_archivo)
          ?
          (<a 
            onClick={()=>setIsOpen(true)}
          >
          <img
            
            src={require("../src/prendas/"+Prendas.img_nombre)}
            alt=""
            className="avatar-md rounded-circle img-thumbnail"
          /></a>)
          :
          (<><img
            src={require("../src/prendas/corteafuera.jpeg")}
            alt=""
            className="avatar-md rounded-circle img-thumbnail"
          /></>)
        }
            
                
            
              
            </div>
            <div className="flex-1 ms-3">
              <h5 className="font-size-16 mb-1">
                <a href="#" className="text-dark">
                    {Prendas.nom_prenda}
                </a>
              </h5>
            </div>
          </div>
          <div className="mt-3 pt-1">
            <p> {Prendas.descripcion}</p>

            {
              (Prendas.iddescuento=="1")
              ?
              (
              <>
                 <p> $<strong>{Prendas.precio}</strong></p>
              </>
              )
              :
              (
                <>
                <p><strong style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'red'}}>$ {Prendas.precio}</strong> $<strong style={{color: 'blue'}}>{(Number(Prendas.precio))-(((Number(Prendas.precio))*(Number(porcentaje)*.01)))}</strong></p>
                </>
              )
            }
           
          </div>
          <div className="d-flex gap-2 pt-4">
            <button
              type="button"
              className="btn btn-soft-primary btn-sm w-50"
            >
              {" "}
            </button>
            <button type="button" className="btn btn-primary btn-sm w-50"
              onClick={() => navigate("/user/prenda",{state:{Prenda:Prendas,Talla:Talla,Descuento:Descuento,Estilo:Estilo,Porcentaje:Number(porcentaje),Material:Material}})}
              >
              + Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <VerImagenModal
          setIsOpen={setIsOpen}
          img={Prendas.img_nombre}
          nom_prenda={Prendas.nom_prenda}
        />
      )}
    </div>
  );
};
