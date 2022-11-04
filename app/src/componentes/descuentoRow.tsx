import React from "react";
import { useNavigate } from "react-router-dom";
import { reqqResapi } from "../api/reqRes";
import { Descuento, Descuentos } from "../interfaces/Descuentos";
import { useState } from "react";
import { DescuentosDeleteModal } from "../componentes/descuentoDeleteModal";

interface Props {
  descuento: any;
  update?: boolean;
  setUpdate: (estatus: boolean) => void;
}

export const DescuentoRow = ({ descuento, update, setUpdate }: Props) => {
  let Descuento: Descuento = descuento;
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
                    state: { descuento: Descuento },
                  })
                }
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit"
                className="px-2 text-primary"
              >
                <i className="bx bx-pencil font-size-18"></i>
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
        <td>{Descuento.iddescuento}</td>
        <td>{Descuento.nom_descuento}</td>
        <td>{Descuento.descuento}%</td>
        <td>{Descuento.descripcion}</td>
      </tr>
      {isOpenDelete && (
        <DescuentosDeleteModal
          setIsOpen={setIsOpenDelete}
          document={Descuento}
          update={update}
          setUpdate={setUpdate}
        />
      )}
    </>
  );
};
