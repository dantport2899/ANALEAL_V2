import React from "react";
import { NavbarAdmin } from "../componentes/navbarAdmin";
import { Navigation, Route, useLocation, useNavigate } from 'react-router-dom';

import "./../styles/estilos.css";
import { Prenda, Prendas } from '../interfaces/Inventario';
import { useForm } from "react-hook-form";
import { reqqResapi } from "../api/reqRes";
import { useInventario } from "../hooks/useInventario";
import { Tallas } from '../interfaces/Tallas';
import { useState } from 'react';

interface Props {
  idprenda?: number;
}

export const PrendaForm = () => {
  const navigate = useNavigate();
  const {
    DescuentoList,
    TallaList,
    EstiloList,
    MaterialList

  } = useInventario();

  const { state } = useLocation();
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
    prenda = {
      idprenda:"",
      nom_prenda:"",
      idtalla:prenda.idtalla,
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
  }
  

  if (state) {
    prenda = state.prenda;
    console.log(prenda);
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    let action = "";
    if (state) {
      action = "modifyprenda";
    } else {
      action = "newprenda";
    }

    if(data.img_nombre[0]){
      var reader = new FileReader();
      let base64:string | ArrayBuffer | null = "";
      reader.readAsDataURL(data.img_nombre[0]);
  
      reader.onload = function () {
        base64 = reader.result;
        // console.log(base64);
        data.img_data = base64;
        data.img_nombre = data.img_nombre[0].name;
        data.img_archivo = "../src/prendas/"+data.img_nombre;
    
        const Jsonsend = {
          action: action,
          data: data,
        };
        savePrenda(Jsonsend);
  
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }else{

      delete data.img_nombre

      const Jsonsend = {
        action: action,
        data: data,
      };

      console.log(Jsonsend);
      savePrenda(Jsonsend);
    }
    
    
   
  };

  const savePrenda = async (Jsonsend: any) => {
    //llamado al api promesa y se le asigna la interfaz
    const resp = await reqqResapi.post<Prendas>("", Jsonsend).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      } else {
        navigate("/admin/inventario");
        // console.log(res.data.message);
      }
    });
  };


  const convert2base64 = (file:any) => {
    var reader = new FileReader();
    let base64:string | ArrayBuffer | null = "";
   reader.readAsDataURL(file);
   reader.onload = function () {
    //  console.log(reader.result);
     base64 = reader.result;
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
   console.log(base64);

   return base64;
  }


  return (
    <div>
      <script>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        {/* <link href="./../styles/estilos.css" rel="stylesheet"/> */}
      </script>
      <NavbarAdmin />

      {/* <ModificarDescuento/> */}
      <div style={{ paddingTop: "55px" }}>
        <body>
          {/* div titulo */}
          
          {
            (state)
            ?
            (<div className="badge page-header">
            <h1 style={{ textAlign: "center" }}>Modificar prenda</h1>
          </div>)
            :(<div className="badge page-header">
            <h1 style={{ textAlign: "center" }}>Nueva Prenda</h1>
          </div>)
          }

          <div className="divFormModificar">
            <form  onSubmit={handleSubmit(onSubmit)}>
              <div className="rendered-form">
                <div className="formbuilder-text form-group field-nombre">
                  <label htmlFor="nombre" className="formbuilder-text-label">
                    Nombre
                  </label>
                  {
                    (state)
                    ?
                    (<input
                      type="hidden"
                      className="form-control"
                      {...register("idprenda")}
                      defaultValue={prenda.idprenda}
                      id="nombre"
                      required
                      aria-required="true"
                    />)
                    :(<></>)

                  }
                  <input
                    type="text"
                    className="form-control"
                    {...register("nom_prenda")}
                    defaultValue={prenda.nom_prenda}
                    id="nombre"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="formbuilder-text form-group field-desc">
                  <label htmlFor="desc" className="formbuilder-text-label">
                    Descripci&oacute;n
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("descripcion")}
                    defaultValue={prenda.descripcion}
                    id="desc"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="formbuilder-file form-group field-img">
                  <label htmlFor="img" className="formbuilder-file-label">
                    Imagen
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    {...register("img_nombre")}
                    id="img"
                    required={(state)? false : true}
                  />
                </div>
                <div className="formbuilder-select form-group field-dpto">
                  <label htmlFor="dpto" className="formbuilder-select-label">
                    Departamento
                  </label>
                  <select
                    className="form-control"
                    {...register("iddepartamento")}
                    id="dpto"
                    required={true}
                    aria-required="true"
                  >
                  
                    <option value={1} id="dpto-0" selected={prenda.iddepartamento=="1"}>
                      Ropa Boda
                    </option>
                    <option value={2} id="dpto-1" selected={prenda.iddepartamento=="2"}>
                      Ropa de ocasion
                    </option>
                  </select>
                </div>
                <div className="formbuilder-select form-group field-talla">
                  <label htmlFor="talla" className="formbuilder-select-label">
                    Talla
                  </label>
                  <select
                    className="form-control"
                    {...register("idtalla")}
                    id="talla"
                    required={true}
                    aria-required="true"
                  >
                    {
                      TallaList?.tallas.map((talla: any) => 
                      (
                        
                        <>
                        {
                          (prenda.idtalla==talla.idtalla)
                          ?
                          (<option key={talla.idtalla} value={talla.idtalla} selected={prenda.idtalla==talla.idtalla}>{talla.nom_talla}</option>)
                          
                          :
                          (<option key={talla.idtalla} value={talla.idtalla}>{talla.nom_talla}</option>)
                        }
                        </>
                    ))
                    }
                  </select>
                </div>
                <div className="formbuilder-text form-group field-color">
                  <label htmlFor="color" className="formbuilder-text-label">
                    Color
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("color")}
                    defaultValue={prenda.color}
                    id="color"
                    required={true}
                    aria-required="true"
                  />
                </div>
                <div className="formbuilder-select form-group field-estilo">
                  <label htmlFor="estilo" className="formbuilder-select-label">
                    Estilo
                  </label>
                  <select
                    className="form-control"
                    {...register("idestilo")}
                    id="estilo"
                    required={true}
                    aria-required="true"
                  >
                    {
                      EstiloList?.estilos.map((estilo: any) => (
                        <option key={estilo.idestilo} value={estilo.idestilo} selected={(prenda.idestilo===estilo.idestilo) ? true : false}>{estilo.nom_estilo}</option>
                    ))
                    }
                  </select>
                </div>
                <div className="formbuilder-select form-group field-material">
                  <label
                    htmlFor="material"
                    className="formbuilder-select-label"
                  >
                    Material
                  </label>
                  <select
                    className="form-control"
                    {...register("idmaterial")}
                    id="material"
                    required={true}
                    aria-required="true"
                  >
                    {
                      MaterialList?.materiales.map((material: any) => (
                        <option key={material.idmaterial} value={material.idmaterial} selected={(prenda.idmaterial===material.idmaterial) ? true : false}>{material.nom_material}</option>
                    ))
                    }
                  </select>
                </div>
                <div className="formbuilder-select form-group field-descuento">
                  <label
                    htmlFor="descuento"
                    className="formbuilder-select-label"
                  >
                    Descuento
                  </label>
                  <select
                    className="form-control"
                    {...register("iddescuento")}
                    id="descuento"
                    required={true}
                    aria-required="true"
                  >
                    {
                      DescuentoList?.descuentos.map((descuento: any) => (
                        <option key={descuento.iddescuento} value={descuento.iddescuento} selected={(prenda.iddescuento===descuento.iddescuento) ? true : false}>{descuento.nom_descuento}</option>
                    ))
                    }
                  </select>
                </div>
                <div className="formbuilder-number form-group field-existencias">
                  <label
                    htmlFor="existencias"
                    className="formbuilder-number-label"
                  >
                    Existencias
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("existencias")}
                    defaultValue={prenda.existencias}
                    min="0"
                    max="10000"
                    step="0"
                    id="existencias"
                    required={true}
                    aria-required="true"
                  />
                </div>
                <div className="formbuilder-number form-group field-precio">
                  <label htmlFor="precio" className="formbuilder-number-label">
                    Precio
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    {...register("precio")}
                    defaultValue={prenda.precio}
                    min="0"
                    id="precio"
                    required={true}
                    aria-required="true"
                  />
                </div>

                <br />
                <div
                  className="formbuilder-button form-group field-guardar"
                  id="div-guardar"
                >
                  <button
                  onClick={()=>navigate("/admin/inventario")}
                  className="btn-danger btn"
                  name="modificarFecha"
                  id="modificarFecha"
                >
                  Cancelar
                </button>
                &nbsp;
                &nbsp;
                  <button
                    type="submit"
                    className="btn-success btn"
                    name="guardar"
                    id="guardar"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </body>
      </div>
    </div>
  );
};
