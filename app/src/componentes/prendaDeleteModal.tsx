import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { reqqResapi } from "../api/reqRes";
import { useState } from "react";
import { Descuentos } from "../interfaces/Descuentos";

interface Props {
  setIsOpen: (ver: boolean) => void;
  document: any;
  update?: boolean;
  setUpdate: (estatus: boolean) => void;
}

export const PrendaDeleteModal = ({
  document,
  setIsOpen,
  update,
  setUpdate,
}: Props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    data.id = Number(data.id);

    const Jsonsend = {
      action: "deleteprenda",
      data: data,
    };
    ElimianrDocumento(Jsonsend);
  };

  const ElimianrDocumento = async (Jsonsend: any) => {
    //llamado al api promesa y se le asigna la interfaz
    const resp = await reqqResapi.post<Descuentos>("", Jsonsend).then((res) => {
      if (res.data.error) {
        alert(res.data.message);
      }else{
        setUpdate(!update);
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
                Eliminar Descuento
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
                  ¿Estas seguro de que quieres eliminar la prenda:{" "}
                  <strong> &nbsp;{document.nom_prenda}</strong>?
                  <input
                    type="hidden"
                    {...register("idprenda")}
                    value={document.idprenda}
                  />
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
                  Eliminar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
