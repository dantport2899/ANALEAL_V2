import React, { useEffect } from "react";
import { NavbarCliente } from "../componentes/navbarCliente";
import "./../styles/newtable.css";
import "./../styles/estilos.css";
import { useNavigate } from "react-router-dom";
import { CarritoRow } from "../componentes/carritoRow";
import { UseGaleria } from "../hooks/useGaleria";
import { useState } from "react";
import { Descuentos, Descuento } from "../interfaces/Descuentos";
import { Tallas } from "../interfaces/Tallas";
import { Estilos } from "../interfaces/Estilos";
import { reqqResapi } from "../api/reqRes";

export const UserCarrito = () => {
  const [DescuentoList, setDescuentoList] = useState<Descuentos>();
  const [TallaList, setTallaList] = useState<Tallas>();
  const [EstiloList, setEstiloList] = useState<Estilos>();
  const [Total, setTotal] = useState<number>(0);

  const navigate = useNavigate();

  var carrito = JSON.parse(sessionStorage.getItem("carrito") || "{}");

  useEffect(() => {
    getDescuentoList();
    getTallaList();
    getEstiloList();
  }, [0]);

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
          getTotal();
        }
      });
  };

  const getTallaList = async () => {
    let getDescuento = {
      action: "gettallas",
      data: {
        idrol: 1,
        orderby: "idtalla",
        order: "ASC",
      },
    };

    const res = await reqqResapi.post<Tallas>("", getDescuento).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      } else {
        setTallaList(res.data);
      }
    });
  };

  const getEstiloList = async () => {
    let getDescuento = {
      action: "getstilos",
      data: {
        idrol: 1,
        orderby: "idestilo",
        order: "ASC",
      },
    };

    const res = await reqqResapi.post<Estilos>("", getDescuento).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      } else {
        setEstiloList(res.data);
      }
    });
  };

  const getTotal = async () => {
    let total: number = 0;
    carrito.forEach((prenda: any) => {
      // //mostrar Descuento
      let Descuento: string = "Descuento";
      let porcentaje: string = "0";

      DescuentoList?.descuentos.forEach((desc: Descuento) => {
        if (desc.iddescuento === prenda.iddescuento) {
          Descuento = desc.nom_descuento;
          porcentaje = desc.descuento;
        }
      });

      total =
        total +
        (Number(prenda.precio) -
          Number(prenda.precio) * (Number(porcentaje) * 0.01)) *
          Number(prenda.cantidad);
    });
    console.log(total);
    setTotal(total);
  };

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
        <div>
          {/* div tabla */}

          {carrito.length == 0 ? (
            <div className="alert alert-primary" role="alert" style={{width:'90%', margin:'0px auto', height:'400px'}}>
            <h4>Lo sentimos, no hay productos cargados en el carrito</h4>
            </div>
          ) : (
          <>
          <div>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h5 className="card-title">
                        Carrito{" "}
                        <span className="text-muted fw-normal ms-2">
                          (#{carrito.length} de prendas en el carrito)
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                      <div>
                        <a
                          onClick={() => navigate("/user/galeria")}
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
                            {carrito &&
                            EstiloList &&
                            DescuentoList &&
                            TallaList ? (
                              carrito?.map((producto: any, index: number) => (
                                <CarritoRow
                                  key={producto.idprenda}
                                  row={index}
                                  prenda={producto}
                                  descuentos={DescuentoList}
                                  talla={TallaList}
                                  estilo={EstiloList}
                                  Total={Total}
                                  setTotal={setTotal}
                                />
                              ))
                            ) : (
                              <tr>
                                Lo sentimos no contamos con vestidos con esta
                                categoria
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-0 align-items-center pb-4">
                  <div className="col-sm-6">
                    <div>
                      <h3 style={{ color: "blue" }}>TOTAL: ${Total}</h3>
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
                <input type="text" className="form-control" />
              </div>
              <div className="formbuilder-text form-group field-descripcion">
                <label htmlFor="descripcion" className="formbuilder-text-label">
                  Direccion de entrega
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  id="descripcion"
                />
              </div>
              <div>
                <a>Los productos se enviaran a esta direccion</a>
              </div>
              <div style={{ paddingTop: "15px" }}>
                <button
                  onClick={() => navigate("/user/confirmar")}
                  type="reset"
                  className="btn-success btn"
                  name="modificarFecha"
                >
                  Proceder a pagar
                </button>
              </div>
            </div>
          </div>
          </>
            
          )}

          <br /><br />
        </div>
      </div>
    </>
  );
};
