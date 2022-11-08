import React from "react";
import { NavbarCliente } from "../componentes/navbarCliente";
import "./../styles/estilos.css";

export const UserVerprenda = () => {
  return (
    <>
      <NavbarCliente />
      <body className="container-verprenda">
        
        <div className="container-imgverprenda">
          <img src={require("../src/prendas/amarillo.jpg/amarillo.jpg")} alt="" />
        </div>
        {/* div FORM */}
        <div className="divFormModificar verprenda-form">
          <div>
            <h2>Corte a escote redondo</h2>
          </div>
          <div style={{ paddingTop: "2px" }}>
            <a>Corte a escote redondo hasta el suelo dama de honor</a>
          </div>
          <div className="rendered-form" style={{ paddingTop: "20px" }}>
            <div className="formbuilder-text form-group field-nombre">
              <a style={{ color: "blue" }}>$1260 </a> <del>$1400</del>
              <a> Descuento de Invierno</a>
            </div>
            <div>
              <b>Stock: </b>
              <a>15</a>
            </div>
            <div>
              <a>Ropa de boda</a>
            </div>
            <div>
              <b>Talla: </b>
              <a>Large</a>
            </div>
            <div>
              <b>Material: </b>
              <a>Algodon</a>
            </div>
            <div>
              <b>Color: </b>
              <a>Rojo</a>
            </div>
            <div style={{ paddingTop: "15px" }}>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target=".add-new"
                className="btn btn-primary"
              >
                <i className="bx bx-plus me-1"></i> Agregar al carrito
              </a>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};
