import React from "react";
import { NavbarAdmin } from "../componentes/navbarAdmin";
import "./../styles/newtable.css";
import {useInventario} from "../hooks/useInventario"
import { PrendaRow } from '../componentes/prendaRow';
import { Paginacion } from '../componentes/paginacion';
import { useNavigate } from "react-router-dom";

export const Inventario = () => {

  const {
    Totalprendas,
    PrendaList,
    pageno,
    total_pages,
    setpageno,
    getPrendaList,
    setDataSearch,
    DataSearch,
    Error,
    setError,
    update,
    setupdate,
    DescuentoList,
    TallaList,
    EstiloList,
    setorderby,
    asc,
    setasc

  } = useInventario();

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
            <h1 style={{ textAlign: "center" }}>Inventario</h1>
          </div>

          {/* div tabla */}
          <div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="mb-3">
                    <h5 className="card-title">
                      Inventario{" "}
                      <span className="text-muted fw-normal ms-2">
                        (# {Totalprendas} Prendas)
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                    <div>
                      <a
                        onClick={()=>navigate('/admin/inventario/form')}
                        data-bs-toggle="modal"
                        data-bs-target=".add-new"
                        className="btn btn-primary"
                      >
                        <i className="bx bx-plus me-1"></i> Agregar prenda
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
                            <th scope="col" onClick={()=>changueOrder("idprenda")}>Id</th>
                            <th scope="col">Imagen</th>
                            <th scope="col" onClick={()=>changueOrder("nom_prenda")}>Prenda</th>
                            <th scope="col" onClick={()=>changueOrder("idtalla")}>Talla</th>
                            <th scope="col" onClick={()=>changueOrder("color")}>Color</th>
                            <th scope="col" onClick={()=>changueOrder("precio")}>Precio</th>
                            <th scope="col" onClick={()=>changueOrder("existencias")}>Existencias</th>
                            <th scope="col" onClick={()=>changueOrder("iddepartamento")}>Departamento</th>
                            <th scope="col" onClick={()=>changueOrder("iddescuento")}>Descuento aplicado</th>
                            <th scope="col" onClick={()=>changueOrder("descripcion")}>Descripcion</th>

                          </tr>
                        </thead>
                        <tbody>
                                {
                                  (PrendaList && DescuentoList && TallaList)
                                  ?
                                    PrendaList?.prendas.map(prenda => (
                                        <PrendaRow key={prenda.idprenda} prenda={prenda} update={update} setUpdate={setupdate} descuentos={DescuentoList?.descuentos} talla={TallaList?.tallas} estilo={EstiloList?.estilos}/>
                                    ))
                                  :
                                  <></>
                                }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row g-0 align-items-center pb-4">
                <div className="col-sm-6">
                  <div>
                    <p className="mb-sm-0">Mostrando {PrendaList?.prendas.length} de {Totalprendas} #devestidos</p>
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
