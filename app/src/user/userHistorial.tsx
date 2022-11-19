import React from 'react'
import { NavbarCliente } from '../componentes/navbarCliente'
import "./../styles/newtable.css";
import "./../styles/estilos.css";
import { useNavigate } from 'react-router-dom';
import { usePedidosUsuario } from '../hooks/usePedidosUsuario';
import { Paginacion } from '../componentes/paginacion';
import { PedidosRowUser } from '../componentes/pedidosRowUser';

export const UserHistorial = () => {

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

  } = usePedidosUsuario();

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
    <>
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
      <NavbarCliente />
      <div style={{ paddingTop: "130px" }}>
        <body>
        
          {/* div tabla */}
          <div>
            {
              (PedidoList)
              ?(
                <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="mb-3">
                    <h5 className="card-title">
                      Historial de pedidos{" "}
                      <span className="text-muted fw-normal ms-2">
                        (#{TotalPedidos} de pedidos realizados)
                      </span>
                    </h5>
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
                            <th scope="col">Ver carrito</th>
                            <th scope="col"onClick={()=>changueOrder("idpedidos")}>Descripcion</th>
                            <th scope="col"onClick={()=>changueOrder("total")}>Total</th>
                            <th scope="col"onClick={()=>changueOrder("direccion")}>Direccion de entrega</th>
                            <th scope="col"onClick={()=>changueOrder("fechaentrega")}>Fecha de entrega</th>
                            <th scope="col"onClick={()=>changueOrder("status")}>Estatus</th>
                            <th scope="col"onClick={()=>changueOrder("clavetransaccion")} style={{ width: "200px" }}>
                              Clave transaccion
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {PedidoList?.pedidos.map((pedido) => (
                            <PedidosRowUser
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
                      Mostrando {PedidoList?.pedidos.length} de {TotalPedidos} #pedidos en el historial
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <Paginacion pageno={pageno} totalpages={total_pages} setpageno={setpageno}/>
                </div>
              </div>
            </div>
              )
              :(
                <div className="alert alert-primary" role="alert" style={{width:'90%', margin:'0px auto', height:'400px'}}>
                <h4>Lo sentimos, no hay productos cargados en el carrito</h4>
                </div>
              )
            }
            
          </div>

        </body>
      </div>
    </>
  )
}
