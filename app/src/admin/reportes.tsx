import React, { useEffect } from "react";
import { NavbarAdmin } from "../componentes/navbarAdmin";
import "./../styles/newtable.css";
import {useDescuentos} from "../hooks/useDescuentos"
import { DescuentoRow } from '../componentes/descuentoRow';
import { useNavigate } from "react-router-dom";
import { Paginacion } from '../componentes/paginacion';
import { useReportes } from '../hooks/useReportes';
import { ReporteRow } from "../componentes/ReporteRow";
import { useState } from 'react';
import { Tallas } from "../interfaces/Tallas";
import { Estilos } from "../interfaces/Estilos";
import { Materiales } from "../interfaces/Materiales";
import { Descuentos } from "../interfaces/Descuentos";
import { reqqResapi } from "../api/reqRes";


export const Reportes = () => {

  const {
    TotalReportes,
    pageno,
    total_pages,
    setpageno,
    setDataSearch,
    DataSearch,
    Error,
    setError,
    update,
    setupdate,
    ReporteList,
    setorderby,
    asc,
    setasc
  } = useReportes();

  const navigate = useNavigate();
  const [TallaList, setTallaList] = useState<Tallas>();
  const [EstiloList, setEstiloList] = useState<Estilos>();
  const [MaterialList, setMaterialList] = useState<Materiales>();
  const [DescuentoList, setDescuentoList] = useState<Descuentos>();

  const changueOrder = (col:string) => {
    setorderby(col)

    if (asc=="ASC") {
      setasc("DESC");
    }else{
      setasc("ASC")
    }
  }

  useEffect(() => {
    getDescuentoList();
    getTallaList();
    getEstiloList();
    getMaterialList();
}, [])

  const getDescuentoList = async () => {
    let getDescuento = {
      action: "getdescuentos",
      data: {
        idrol: 1,
        orderby: "descuento",
        order: "ASC",
      },
    };

    const res = await reqqResapi
      .post<Descuentos>("", getDescuento)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          setDescuentoList(res.data);
        }
      });
  };

  const getTallaList = async() => {
    let getDescuento = {
        action: "gettallas",
            data:{
                idrol: 1,
                orderby:"idtalla",
                order:"ASC"
            }
    }
    const res = await reqqResapi.post<Tallas>('',getDescuento).then(res => {
        if(res.data.error){
            setError(res.data.message);
        }else{
            setTallaList(res.data);
        }

    });   
  }

  const getEstiloList = async() => {
    
      let getDescuento = {
          action: "getstilos",
              data:{
                  idrol: 1,
                  orderby:"idestilo",
                  order:"ASC"
              }
      }
      const res = await reqqResapi.post<Estilos>('',getDescuento).then(res => {
          if(res.data.error){
              setError(res.data.message);
          }else{
              setEstiloList(res.data);
          }

      });   
  }

  const getMaterialList = async() => {
    
      let getDescuento = {
          action: "getmateriales",
              data:{
                  idrol: 1,
                  orderby:"idmaterial",
                  order:"ASC"
              }
      }


      const res = await reqqResapi.post<Materiales>('',getDescuento).then(res => {
          if(res.data.error){
              setError(res.data.message);
          }else{
              setMaterialList(res.data);
          }

      });   
  }


  return (
    <div>
      <script>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.0/css/boxicons.min.css"
          integrity="sha512-pVCM5+SN2+qwj36KonHToF2p1oIvoU3bsqxphdOIWMYmgr4ZqD3t5DjKvvetKhXGc/ZG5REYTT6ltKfExEei/Q=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css"
          integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc="
          crossOrigin="anonymous"
        />
      </script>
      <NavbarAdmin />
      <div style={{ paddingTop: "55px" }}>
        <body>
          {/* div titulo */}
          <div className="badge page-header">
            <h1 style={{ textAlign: "center" }}>Reportes</h1>
          </div>

          {/* div tabla */}
          <div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="mb-3">
                    <h5 className="card-title">
                    Reportes{" "}
                      <span className="text-muted fw-normal ms-2">
                        (# {TotalReportes} Reportes)
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="col-md-6">
                  
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="">
                    <div className="table-responsive">
                      <table className="table project-list-table table-nowrap align-middle table-borderless">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: "200px" }}>
                              Acciones
                            </th>
                            <th scope="col" onClick={()=>changueOrder("idreporte")}>Id</th>
                            <th scope="col" onClick={()=>changueOrder("idprenda")}>Prenda ID</th>
                            <th scope="col">Prenda</th>
                            <th scope="col" onClick={()=>changueOrder("accion")}>Accion</th>
                            <th scope="col" onClick={()=>changueOrder("cantidad")}>Cantidad</th>
                            <th scope="col" onClick={()=>changueOrder("fecha")}>Fecha</th>
                            <th scope="col" onClick={()=>changueOrder("idpedido")}>ID Pedido</th>
                          </tr>
                        </thead>
                        <tbody>
                                {
                                    ReporteList?.reportes.map(reporte => (
                                        <ReporteRow key={reporte.idreporte} reporte={reporte} update={update} setUpdate={setupdate} descuentos={DescuentoList}
                                        material={MaterialList}
                                        estilo={EstiloList}
                                        talla={TallaList}
                                        prenda={reporte.prenda}
                                        />
                                    ))                     
                                }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-0 align-items-center pb-4">
                <div className="col-sm-6">
                  <div>
                    <p className="mb-sm-0">Mostrando {ReporteList?.reportes.length} de {TotalReportes} #descuentos</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <Paginacion pageno={pageno} totalpages={total_pages} setpageno={setpageno}/>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
};
