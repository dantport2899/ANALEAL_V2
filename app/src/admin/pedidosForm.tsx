import React from "react";
import { NavbarAdmin } from "../componentes/navbarAdmin";

import "./../styles/estilos.css";

export const PedidosForm = () => {
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
            <h1 style={{ textAlign: "center" }}>Modificar Pedido</h1>
          </div>
          <div className="divFormModificar">
            <div className="rendered-form">
              <div className="formbuilder-text form-group field-fechasoli">
                <label htmlFor="fechasoli" className="formbuilder-text-label">
                  Fecha de solicitud
                </label>
                <input
                  type="text"
                  placeholder="Fecha"
                  className="form-control"
                  name="fechasoli"
                  id="fechasoli"
                />
              </div>
              <div className="formbuilder-date form-group field-fechaEntrega">
                <label
                  htmlFor="fechaEntrega"
                  className="formbuilder-date-label"
                >
                  Fecha de entrega
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fechaEntrega"
                  id="fechaEntrega"
                />
              </div>
              <div className="formbuilder-text form-group field-desc">
                <label htmlFor="desc" className="formbuilder-text-label">
                  Descripci&oacute;n
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="desc"
                  disabled
                  value="Descripci&oacute;n"
                  id="desc"
                />
              </div>
              <div className="formbuilder-number form-group field-total">
                <label htmlFor="total" className="formbuilder-number-label">
                  Total
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="total"
                  disabled
                  value="3000"
                  id="total"
                />
              </div>
              <div className="formbuilder-select form-group field-estatus">
                <label htmlFor="estatus" className="formbuilder-select-label">
                  Estatus
                </label>
                <select
                  className="form-control"
                  name="estatus"
                  id="estatus"
                  required
                  aria-required="true"
                >
                  <option disabled selected={false}>
                    Seleccione una opci&oacute;n
                  </option>
                  <option value="cancelado" id="estatus-0">
                    Cancelado
                  </option>
                  <option value="pendiente" id="estatus-1">
                    Pendiente
                  </option>
                  <option value="aprobado" id="estatus-2">
                    Aprobado
                  </option>
                  <option value="transito" id="estatus-3">
                    En transito
                  </option>
                  <option value="entregado" id="estatus-4">
                    Entregado
                  </option>
                </select>
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
                &nbsp;
                &nbsp;
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
