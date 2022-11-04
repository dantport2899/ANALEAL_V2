import React from "react";
import { NavbarAdmin } from "../componentes/navbarAdmin";
import "./../styles/newtable.css";
import { usePedidos } from "../hooks/usePedidos";
import { PedidosRow } from "../componentes/pedidosRow";
import { useNavigate } from "react-router-dom";
import { Paginacion } from '../componentes/paginacion';

export const Pedidos = () => {
  const {
    TotalPedidos,
    pageno,
    total_pages,
    setpageno,
    setDataSearch,
    DataSearch,
    Error,
    setError,
    update,
    setupdate,
    PedidoList,
    setorderby,
    asc,
    setasc

  } = usePedidos();

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
            <h1 style={{ textAlign: "center" }}>Lista de pedidos</h1>
          </div>

          {/* div tabla */}
          <div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="mb-3">
                    <h5 className="card-title">
                      Pedidos{" "}
                      <span className="text-muted fw-normal ms-2">
                        (#{TotalPedidos} de pedidos)
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
                            <th scope="col" onClick={()=>changueOrder("idpedidos")}>Id pedido</th>
                            <th scope="col" onClick={()=>changueOrder("correo")}>Correo</th>
                            <th scope="col" onClick={()=>changueOrder("descripcion")}>Descripcion</th>
                            <th scope="col" onClick={()=>changueOrder("status")}>Estado</th>
                            <th scope="col" onClick={()=>changueOrder("fecha")}>Fecha</th>
                            <th scope="col" onClick={()=>changueOrder("fechaentrega")}>Fecha de entrega</th>
                            <th scope="col" onClick={()=>changueOrder("total")}>Total</th>
                            <th scope="col" onClick={()=>changueOrder("clavetransaccion")}>Clave transaccion</th>
                          </tr>
                        </thead>
                        <tbody>
                          {PedidoList?.pedidos.map((pedido) => (
                            <PedidosRow
                              key={pedido.idpedidos}
                              pedido={pedido}
                              update={update}
                              setUpdate={setupdate}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-0 align-items-center pb-4">
                <div className="col-sm-6">
                  <div>
                    <p className="mb-sm-0">
                      Mostrando {PedidoList?.pedidos.length} de {TotalPedidos}{" "}
                      #pedidos
                    </p>
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
