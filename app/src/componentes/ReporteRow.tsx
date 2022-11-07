import React from "react";
import { useNavigate } from "react-router-dom";
import { reqqResapi } from "../api/reqRes";
import { Reporte } from "../interfaces/Reportes";
import { useState } from "react";
import { DescuentosDeleteModal } from "../componentes/descuentoDeleteModal";
import { ReporteDeleteModal } from "./reportesDeleteModal";

interface Props {
  reporte: any;
  update?: boolean;
  setUpdate: (estatus: boolean) => void;
}

export const ReporteRow = ({ reporte, update, setUpdate }: Props) => {
  let Reporte: Reporte = reporte;
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  // console.log(Descuento);
  const navigate = useNavigate();

  return (
    <>
      <tr>
        <td>
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <a
                onClick={() =>
                  navigate("/admin/descuentos/form", {
                    state: { reporte: Reporte },
                  })
                }
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit"
                className="px-2 text-primary"
              >
                <i className="bx bx-notepad font-size-18"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a
                onClick={() => setIsOpenDelete(true)}
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
        <td>{Reporte.idreporte}</td>
        <td>{Reporte.idprenda}</td>
        <td>{
          (Reporte.accion=="1")?
          "Salidas"          
          :
          "Entradas"
          }</td>
        <td>{Reporte.cantidad}</td>
        <td>{Reporte.fecha}</td>
        <td>{Reporte.idpedido}</td>
      </tr>
      {isOpenDelete && (
        <ReporteDeleteModal
          setIsOpen={setIsOpenDelete}
          document={Reporte}
          update={update}
          setUpdate={setUpdate}
        />
      )}
    </>
  );
};
