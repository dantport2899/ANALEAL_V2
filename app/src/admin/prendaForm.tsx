import React from "react";
import { NavbarAdmin } from "../componentes/navbarAdmin";
import { Navigation, Route } from 'react-router-dom';

import "./../styles/estilos.css";

interface Props {
  idprenda?: number;
}

export const PrendaForm = () => {


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
            <h1 style={{ textAlign: "center" }}>Modificar prenda</h1>
          </div>

          <div className="divFormModificar">
            <form>
              <div className="rendered-form">
                <div className="formbuilder-text form-group field-nombre">
                  <label htmlFor="nombre" className="formbuilder-text-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    id="nombre"
                    required
                    aria-required="true"
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
                    id="desc"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="formbuilder-file form-group field-img">
                  <label htmlFor="img" className="formbuilder-file-label">
                    Imagen
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="img"
                    id="img"
                    required={true}
                    aria-required="true"
                  />
                </div>
                <div className="formbuilder-select form-group field-dpto">
                  <label htmlFor="dpto" className="formbuilder-select-label">
                    Departamento
                  </label>
                  <select
                    className="form-control"
                    name="dpto"
                    id="dpto"
                    required={true}
                    aria-required="true"
                  >
                    <option disabled={true} selected={true}>
                      Seleccione una opci&oacute;n
                    </option>
                    <option value="option-1" id="dpto-0">
                      Option 1
                    </option>
                    <option value="option-3" id="dpto-1">
                      Option 3
                    </option>
                  </select>
                </div>
                <div className="formbuilder-select form-group field-talla">
                  <label htmlFor="talla" className="formbuilder-select-label">
                    Talla
                  </label>
                  <select
                    className="form-control"
                    name="talla"
                    id="talla"
                    required={true}
                    aria-required="true"
                  >
                    <option disabled={true} selected={true}>
                      Seleccione una opci&oacute;n
                    </option>
                    <option value="grande" id="talla-0">
                      Grande
                    </option>
                    <option value="mediana" id="talla-1">
                      Mediana
                    </option>
                    <option value="chica" id="talla-2">
                      Chica
                    </option>
                  </select>
                </div>
                <div className="formbuilder-text form-group field-color">
                  <label htmlFor="color" className="formbuilder-text-label">
                    Color
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="color"
                    id="color"
                    required={true}
                    aria-required="true"
                  />
                </div>
                <div className="formbuilder-select form-group field-estilo">
                  <label htmlFor="estilo" className="formbuilder-select-label">
                    Estilo
                  </label>
                  <select
                    className="form-control"
                    name="estilo"
                    id="estilo"
                    required={true}
                    aria-required="true"
                  >
                    <option disabled={true} selected={true}>
                      Seleccione una opci&oacute;n
                    </option>
                    <option value="option-1" id="estilo-0">
                      Option 1
                    </option>
                    <option value="option-3" id="estilo-1">
                      Option 3
                    </option>
                  </select>
                </div>
                <div className="formbuilder-select form-group field-material">
                  <label
                    htmlFor="material"
                    className="formbuilder-select-label"
                  >
                    Material
                  </label>
                  <select
                    className="form-control"
                    name="material"
                    id="material"
                    required={true}
                    aria-required="true"
                  >
                    <option disabled={true} selected={true}>
                      Seleccione una opci&oacute;n
                    </option>
                    <option value="option-1" id="material-0">
                      Option 1
                    </option>
                    <option value="option-2" id="material-1">
                      Option 2
                    </option>
                  </select>
                </div>
                <div className="formbuilder-select form-group field-descuento">
                  <label
                    htmlFor="descuento"
                    className="formbuilder-select-label"
                  >
                    Descuento
                  </label>
                  <select
                    className="form-control"
                    name="descuento"
                    id="descuento"
                    required={true}
                    aria-required="true"
                  >
                    <option disabled={true} selected={true}>
                      Seleccione una opci&oacute;n
                    </option>
                    <option value="option-1" id="descuento-0">
                      Option 1
                    </option>
                    <option value="option-3" id="descuento-1">
                      Option 3
                    </option>
                  </select>
                </div>
                <div className="formbuilder-number form-group field-existencias">
                  <label
                    htmlFor="existencias"
                    className="formbuilder-number-label"
                  >
                    Existencias
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="existencias"
                    min="0"
                    max="10000"
                    step="0"
                    id="existencias"
                    required={true}
                    aria-required="true"
                  />
                </div>
                <div className="formbuilder-number form-group field-precio">
                  <label htmlFor="precio" className="formbuilder-number-label">
                    Precio
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    min="0"
                    id="precio"
                    required={true}
                    aria-required="true"
                  />
                </div>

                <br />
                <div
                  className="formbuilder-button form-group field-guardar"
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
                    type="submit"
                    className="btn-success btn"
                    name="guardar"
                    id="guardar"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </body>
      </div>
    </div>
  );
};
