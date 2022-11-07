import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavbarAdmin } from "../componentes/navbarAdmin";

import "./../styles/estilos.css";
import { Descuentos, Descuento } from "../interfaces/Descuentos";
import { useForm } from "react-hook-form";
import { reqqResapi } from "../api/reqRes";

export const DescuentoForms = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  let descuento: Descuento = {
    iddescuento: "",
    nom_descuento: "",
    descripcion: "",
    descuento: "",
  };

  if (state) {
    descuento = state.descuento;
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    let action = "";
    if (state) {
      action = "modifydescuento";
    } else {
      action = "newdescuento";
    }

    const Jsonsend = {
      action: action,
      data: data,
    };
    saveDesc(Jsonsend);
  };

  const saveDesc = async (Jsonsend: any) => {
    //llamado al api promesa y se le asigna la interfaz
    const resp = await reqqResapi.post<Descuentos>("", Jsonsend).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      } else {
        navigate("/admin/descuentos");
      }
    });
  };

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
            <h1 style={{ textAlign: "center" }}>
              {state
                ? "Modificar descuento: " + descuento.nom_descuento
                : "Agregar descuento"}
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="divFormModificar">
              <div className="rendered-form">
                <div className="formbuilder-text form-group field-descuento">
                  <input
                    type="hidden"
                    className="form-control"
                    {...register("iddescuento")}
                    defaultValue={descuento.iddescuento}
                    id="iddescuento"
                  />
                  <label htmlFor="descuento" className="formbuilder-text-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("nom_descuento")}
                    id="descuento"
                    defaultValue={descuento.nom_descuento}
                  />
                </div>
                <div className="formbuilder-text form-group field-descripcion">
                  <label
                    htmlFor="descripcion"
                    className="formbuilder-text-label"
                  >
                    Descripci&oacute;n
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("descripcion")}
                    defaultValue={descuento.descripcion}
                    id="descripcion"
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
                    {...register("descuento")}
                    defaultValue={descuento.descuento}
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
                    id="modificarFecha"
                    onClick={() => navigate("/admin/descuentos")}
                  >
                    Cancelar
                  </button>
                  &nbsp; &nbsp;
                  <button
                    type="submit"
                    className="btn-success btn"
                    name="modificarFecha"
                    id="modificarFecha"
                  >
                    {state ? "Modificar" : "Agregar"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </body>
      </div>
    </div>
  );
};
