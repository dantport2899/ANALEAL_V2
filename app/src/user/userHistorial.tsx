import React from 'react'
import { NavbarCliente } from '../componentes/navbarCliente'
import "./../styles/newtable.css";
import "./../styles/estilos.css";
import { useNavigate } from 'react-router-dom';

export const UserHistorial = () => {
  const navigate = useNavigate();

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
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="mb-3">
                    <h5 className="card-title">
                      Historial de pedidos{" "}
                      <span className="text-muted fw-normal ms-2">
                        (# de pedidos realizados)
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
                            <th scope="col">Prenda</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Color</th>
                            <th scope="col">Precio Total</th>
                            <th scope="col">Fecha compra</th>
                            <th scope="col">Estado</th>
                            <th scope="col" style={{ width: "200px" }}>
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <img
                                src={require("../src/prendas/amarillo.jpg/amarillo.jpg")}
                                alt=""
                                className="avatar-sm rounded-circle me-2"
                              />
                            </td>
                            <td>
                              <a href="#" className="text-body">
                                Corte a escote redondo
                              </a>
                            </td>
                            <td>Verde</td>
                            <td>$2000 Productos:4</td>
                            <td>2021-11-21 00:00:00/ Entrega aprox: 2021-11-30</td>
                            <td>En transito</td>
                            <td>
                              <ul className="list-inline mb-0">
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
                          </tr>
                          <tr>
                            <td>
                              <img
                                src={require("../src/prendas/amarillo.jpg/amarillo.jpg")}
                                alt=""
                                className="avatar-sm rounded-circle me-2"
                              />
                            </td>
                            <td>
                              <a href="#" className="text-body">
                                Corte afuera del hombro
                              </a>
                            </td>
                            <td>Verde</td>
                            <td>$2000 Productos:2</td>
                            <td>2021-11-21 00:00:00</td>
                            <td>Cancelado</td>
                            <td>
                              <ul className="list-inline mb-0">
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
                          </tr>
                          <tr>
                            <td>
                              <img
                                src={require("../src/prendas/amarillo.jpg/amarillo.jpg")}
                                alt=""
                                className="avatar-sm rounded-circle me-2"
                              />
                            </td>
                            <td>
                              <a href="#" className="text-body">
                                Corte a escote en v
                              </a>
                            </td>
                            <td>Verde</td>
                            <td>$1000 Productos:1</td>
                            <td>2021-11-21 00:00:00</td>
                            <td>Pendiente</td>
                            <td>
                              <ul className="list-inline mb-0">
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
                          </tr>
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
                      Mostrando 3 de 3 #pedidos en el historial
                    </p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="float-sm-end">
                    <ul className="pagination mb-sm-0">
                      <li className="page-item disabled">
                        <a href="#" className="page-link">
                          <i className="mdi mdi-chevron-left"></i>
                        </a>
                      </li>
                      <li className="page-item active">
                        <a href="#" className="page-link">
                          1
                        </a>
                      </li>
                      
                      <li className="page-item">
                        <a href="#" className="page-link">
                          <i className="mdi mdi-chevron-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </body>
      </div>
    </>
  )
}
