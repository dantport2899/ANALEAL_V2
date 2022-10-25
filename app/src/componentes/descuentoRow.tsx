import React from "react";
import { Descuento } from '../interfaces/Descuentos';

interface Props {
  descuento: any;
  update?: boolean;
  setUpdate: (estatus: boolean) => void;
}

export const DescuentoRow = ({
  descuento,
  update,
  setUpdate,
}: Props) => {
  let Descuento:Descuento = descuento;

  // console.log(Descuento);

  return (
    <tr>
      <td>
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a
              href="javascript:void(0);"
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
              href="javascript:void(0);"
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
      <td>
        {Descuento.nom_descuento}
      </td>
      <td>{Descuento.descuento}%</td>
      <td>{Descuento.descripcion}</td>

    </tr>
  );
};
