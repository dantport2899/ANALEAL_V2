import React from "react";
import { NavbarAdmin } from "../componentes/navbarAdmin";
import "./../styles/newtable.css";
import {useDescuentos} from "../hooks/useDescuentos"
import { DescuentoRow } from '../componentes/descuentoRow';
import { useNavigate } from "react-router-dom";
import { Paginacion } from '../componentes/paginacion';


export const Descuentos = () => {

  const {
    TotalDescuentos,
    pageno,
    total_pages,
    setpageno,
    setDataSearch,
    DataSearch,
    Error,
    setError,
    update,
    setupdate,
    DescuentoList,
    setorderby,
    asc,
    setasc
  } = useDescuentos();

  const navigate = useNavigate();
  
  const changueOrder = (col:string) => {
    setorderby(col)

    if (asc=="ASC") {
      setasc("DESC");
    }else{
      setasc("ASC")
    }
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
            <h1 style={{ textAlign: "center" }}>Descuentos</h1>
          </div>

          {/* div tabla */}
          <div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="mb-3">
                    <h5 className="card-title">
                      Descuentos{" "}
                      <span className="text-muted fw-normal ms-2">
                        (# {TotalDescuentos} descuentos)
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                    <div>
                      <a
                        onClick={()=>navigate('/admin/descuentos/form')}
                        data-bs-toggle="modal"
                        data-bs-target=".add-new"
                        className="btn btn-primary"
                      >
                        <i className="bx bx-plus me-1"></i> Agregar descuento
                      </a>
                    </div>
                  </div>
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
                            <th scope="col" onClick={()=>changueOrder("iddescuento")}>Id</th>
                            <th scope="col" onClick={()=>changueOrder("nom_descuento")}>Nombre</th>
                            <th scope="col" onClick={()=>changueOrder("descuento")}>Porcentaje</th>
                            <th scope="col" onClick={()=>changueOrder("descripcion")}>Descripcion</th>
                          </tr>
                        </thead>
                        <tbody>
                                {
                                    DescuentoList?.descuentos.map(descuento => (
                                        <DescuentoRow key={descuento.iddescuento} descuento={descuento} update={update} setUpdate={setupdate}/>
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
                    <p className="mb-sm-0">Mostrando {DescuentoList?.descuentos.length} de {TotalDescuentos} #descuentos</p>
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
