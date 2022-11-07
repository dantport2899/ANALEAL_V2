import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { reqqResapi } from "../api/reqRes";
import { useState } from "react";
import { Descuentos } from "../interfaces/Descuentos";
import { Pedido } from '../interfaces/Pedidos';
import { Reporte, Reportes } from '../interfaces/Reportes';

interface Props {
  setIsOpen: (ver: boolean) => void;
  document: any;
  update?: boolean;
  setUpdate: (estatus: boolean) => void;
}

export const EntradaReporteModal = ({
  document,
  setIsOpen,
  update,
  setUpdate,
}: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    data.id = Number(data.id);

    const Jsonsend = {
      action: "newreporte",
      data: data,
    };
    GenerarEntrada(Jsonsend);
  };

  const GenerarEntrada = async (Jsonsend: any) => {
    //llamado al api promesa y se le asigna la interfaz
    const resp = await reqqResapi.post<Reportes>("", Jsonsend).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      }else{
     console.log("si")

        setUpdate(!update);
        setIsOpen(false)
      }
    });
  };

  return (
    <div className="darkBG">
      <div className="centered">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Registrar Entrada/Salida
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="form-container-documentos">
                  Generar reporte de Entrada/Salidas para la prenda:{" "}
                  <strong> &nbsp;{document.nom_prenda}</strong>?
                  <input
                    type="hidden"
                    {...register("idprenda")}
                    value={document.idprenda}
                  />
                  <input
                    type="hidden"
                    {...register("idpedido")}
                    value={1}
                  />
                  <br />
                  <br />
                  <label htmlFor="dpto" className="formbuilder-select-label">
                    Cantidad
                  </label>
                  <br />
                  <br />
                  <input
                    className="form-control"
                    type="number"
                    {...register("cantidad")}
                    defaultValue={0}
                  />
                  <br />
                  <label htmlFor="dpto" className="formbuilder-select-label">
                    Accion
                  </label>
                  <br />
                  <br />
                  <select
                    className="form-control"
                    {...register("accion")}
                    id="dpto"
                    required={true}
                    aria-required="true"
                  >
                    <option disabled={true} selected={true}>
                      Seleccione una opci&oacute;n
                    </option>
                    <option value={1} id="dpto-0" selected>
                      Entrada
                    </option>
                    <option value={-1} id="dpto-1">
                      Salida
                    </option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setIsOpen(false)}
                >
                  Cerrar
                </button>
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
