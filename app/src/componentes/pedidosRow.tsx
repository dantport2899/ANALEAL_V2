import React from "react";
import { useNavigate } from "react-router-dom";
import { Descuento } from "../interfaces/Descuentos";
import { Pedido } from "../interfaces/Pedidos";

interface Props {
  pedido: any;
  update?: boolean;
  setUpdate: (estatus: boolean) => void;
}

export const PedidosRow = ({ pedido, update, setUpdate }: Props) => {
  let Pedido: Pedido = pedido;
  const navigate = useNavigate();

  // console.log(Descuento);

  return (
    <tr>
      <td>
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a
              onClick={() => navigate("/admin/pedidos/form")}
              
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
      <td>{Pedido.idpedidos}</td>
      <td>{Pedido.correo}</td>
      <td>{Pedido.descripcion}</td>
      <td>{Pedido.status}</td>
      <td>{Pedido.fecha}</td>
      <td>{Pedido.fechaentrega}</td>
      <td>${Pedido.total}</td>
      <td>{Pedido.clavetransaccion}</td>

    </tr>
  );
};
