import React from "react";
import { NavbarAdmin } from "../componentes/navbarAdmin";

import "./../styles/estilos.css";

export const DescuentoForms = () => {
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
          <div className="badge page-header">
            <h1 style={{ textAlign: "center" }}>Agregar descuento</h1>
          </div>

          <div className="divFormModificar">
            <div className="rendered-form">
              <div className="formbuilder-text form-group field-descuento">
                <label htmlFor="descuento" className="formbuilder-text-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="descuento"
                  id="descuento"
                  disabled
                />
              </div>
              <div className="formbuilder-text form-group field-descripcion">
                <label htmlFor="descripcion" className="formbuilder-text-label">
                  Descripci&oacute;n
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  id="descripcion"
                  disabled
                />
              </div>
              <div className="formbuilder-number form-group field-porcentaje">
                <label
                  htmlFor="porcentaje"
                  className="formbuilder-number-label"
                >
                  Porcentaje
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="porcentaje"
                  min="0"
                  id="porcentaje"
                />
              </div>
              <div
                className="formbuilder-button form-group field-modificarFecha"
                id="div-guardar"
              >
                <button
                  type="reset"
                  className="btn-danger btn"
                  name="modificarFecha"
                  id="modificarFecha"
                >
                  Cancelar
                </button>
                &nbsp; &nbsp;
                <button
                  type="reset"
                  className="btn-success btn"
                  name="modificarFecha"
                  id="modificarFecha"
                >
                  Modificar
                </button>
              </div>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
};
