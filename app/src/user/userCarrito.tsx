import React from "react";
import { NavbarCliente } from "../componentes/navbarCliente";
import "./../styles/newtable.css";
import "./../styles/estilos.css";
import { useNavigate } from "react-router-dom";

export const UserCarrito = () => {
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
                      Carrito{" "}
                      <span className="text-muted fw-normal ms-2">
                        (# de prendas en el carrito)
                      </span>
                    </h5>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                    <div>
                      <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target=".add-new"
                        className="btn btn-primary"
                      >
                        <i className="bx bx-plus me-1"></i> Seguir comprando
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
                            <th scope="col">Prenda</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Color</th>
                            <th scope="col">Departamento</th>
                            <th scope="col">Talla</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Total</th>
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
                            <td>Rojo</td>
                            <td>Ropa de boda</td>
                            <td>Large</td>
                            <td>$1400</td>
                            <td>1</td>
                            <td>$1400</td>
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
                            <td>Ropa de boda</td>
                            <td>Short</td>
                            <td>$2000</td>
                            <td>2</td>
                            <td>$4000</td>
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
                            <td>Gris y blanco</td>
                            <td>Ropa de ocacion</td>
                            <td>Medium</td>
                            <td>$2600</td>
                            <td>1</td>
                            <td>$2600</td>
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
                      Mostrando 3 a 3 de #de prendas en el carrito
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

          {/* div correo */}
          <div className="divFormModificar">
            <div className="rendered-form">
              <div>
                <label className="formbuilder-text-label">Correo</label>
                <input type="text" className="form-control" disabled />
              </div>
              <div className="formbuilder-text form-group field-descripcion">
                <label htmlFor="descripcion" className="formbuilder-text-label">
                  Confirmar correo
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  id="descripcion"
                  disabled
                />
              </div>
              <div>
                <a>Los productos se enviaran a esta direccion</a>
              </div>
              <div style={{ paddingTop: "15px" }}>
                <button
                onClick={()=>navigate('/user/confirmar')}
                  type="reset"
                  className="btn-success btn"
                  name="modificarFecha"
                >
                  Proceder a pagar
                </button>
              </div>
            </div>
          </div>
        </body>
      </div>
    </>
  );
};
