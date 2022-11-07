import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavbarAdmin } from "../componentes/navbarAdmin";

import "./../styles/estilos.css";
import { Pedido, Pedidos } from '../interfaces/Pedidos';
import { useForm } from "react-hook-form";
import { reqqResapi } from "../api/reqRes";

export const PedidosForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();


  let pedido: Pedido = {
    idpedidos: "",
    clavetransaccion: "",
    idusuario: "",
    correo: "",
    total: "",
    fecha: "",
    paypaldatos: "",
    fechaentrega: "",
    descripcion: "",
    direccion: "",
    status: ""
  };

  if (state) {
    pedido = state.pedido;
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    
    let action = "modifyorden";
    
    const Jsonsend = {
      action: action,
      data: data,
    };
    savePedido(Jsonsend);
  };

  const savePedido = async (Jsonsend: any) => {
    //llamado al api promesa y se le asigna la interfaz
    const resp = await reqqResapi.post<Pedidos>("", Jsonsend).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      } else {
        navigate("/admin/pedidos");
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
            <h1 style={{ textAlign: "center" }}>Modificar Pedido ID: "{pedido.idpedidos}"</h1>
          </div>
          <div className="divFormModificar">
            <div className="rendered-form">
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="formbuilder-date form-group field-fechaEntrega">
                <label
                  htmlFor="fechaEntrega"
                  className="formbuilder-date-label"
                >
                  Fecha de entrega
                </label>
                <input
                  type="hidden"
                  {...register("idpedidos")}
                  defaultValue={pedido.idpedidos}
                />
                <input
                  type="hidden"
                  {...register("idusuario")}
                  defaultValue={pedido.idusuario}
                />
                <input
                  type="hidden"
                  {...register("fecha")}
                  defaultValue={pedido.fecha}
                />
                <input
                  type="hidden"
                  {...register("correo")}
                  defaultValue={pedido.correo}
                />
                <input
                  type="date"
                  className="form-control"
                  {...register("fechaentrega")}
                  defaultValue={pedido.fechaentrega}
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
                  {...register("descripcion")}
                  defaultValue={pedido.descripcion}
                  id="desc"
                />
              </div>
              <div className="formbuilder-text form-group field-desc">
                <label htmlFor="desc" className="formbuilder-text-label">
                Direccion
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("direccion")}
                  defaultValue={pedido.direccion}
                  id="direccion"
                />
              </div>
              <div className="formbuilder-number form-group field-total">
                <label htmlFor="total" className="formbuilder-number-label">
                  Total
                </label>
                <input
                  type="number"
                  className="form-control"
                  {...register("total")}
                  defaultValue={pedido.total}
                  id="total"
                />
              </div>
              <div className="formbuilder-select form-group field-estatus">
                <label htmlFor="estatus" className="formbuilder-select-label">
                  Estatus
                </label>
                <select
                  className="form-control"
                  {...register("status")}
                  id="estatus"
                  required
                  aria-required="true"
                >
                  <option disabled selected={false}>
                    Seleccione una opci&oacute;n
                  </option>
                  <option value="Cancelado" id="estatus-0" selected={pedido.status=="Cancelado"}>
                    Cancelado
                  </option>
                  <option value="Pendiente" id="estatus-1" selected={pedido.status=="Pendiente"}>
                    Pendiente
                  </option>
                  <option value="Aprovado" id="estatus-2" selected={pedido.status=="Aprovado"}>
                    Aprobado
                  </option>
                  <option value="En transito" id="estatus-3" selected={pedido.status=="En transito"}>
                    En transito
                  </option>
                  <option value="Entregado" id="estatus-4" selected={pedido.status=="Entregado"}>
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
                  onClick={() => navigate("/admin/pedidos")}
                  id="modificarFecha"
                >
                  Cancelar
                </button>
                &nbsp;
                &nbsp;
                <button
                  type="submit"
                  className="btn-success btn"
                  id="modificarFecha"
                >
                  Modificar
                </button>
              </div>
              </form>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
};
