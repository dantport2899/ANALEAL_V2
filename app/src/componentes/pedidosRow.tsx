import React from "react";
import { useNavigate } from "react-router-dom";
import { Descuento } from "../interfaces/Descuentos";
import { Pedido } from "../interfaces/Pedidos";
import { useState } from 'react';
import { PedidosDeleteModal } from "./pedidosDeleteModal";
import { PedidosCarritoModal } from "./pedidosCarritoModal";

interface Props {
  pedido: any;
  update?: boolean;
  setUpdate: (estatus: boolean) => void;
}

export const PedidosRow = ({ pedido, update, setUpdate }: Props) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenCarrito, setIsOpenCarrito] = useState(false);

  let Pedido: Pedido = pedido;
  const navigate = useNavigate();

  // console.log(Descuento);

  return (
    <tr>
      <td>
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a
              onClick={() => navigate("/admin/pedidos/form", {
                state: { pedido: Pedido }})}
              
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
          <li className="list-inline-item">
            <a
              onClick={() => setIsOpenCarrito(true)}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete"
              className="px-2 text-success"
            >
              <i className="bx bx-notepad font-size-18"></i>
            </a>
          </li>
        </ul>
      </td>
      <td>{Pedido.idpedidos}</td>
      <td>{Pedido.correo}</td>
      <td>{Pedido.descripcion}</td>
      <td>{
        Pedido.status=="Cancelado" && (<strong style={{color:'red'}}>Cancelado</strong>) 
      }{
        Pedido.status=="Pendiente" && (<strong style={{color:'olive'}}>Pendiente</strong>) 
      }{
        Pedido.status=="Aprovado" && (<strong style={{color:'lime'}}>Aprovado</strong>) 
      }{
        Pedido.status=="En transito" && (<strong style={{color:'green'}}>En transito</strong>) 
      }{
        Pedido.status=="Entregado" && (<strong style={{color:'blue'}}>Entregado</strong>) 
      }</td>
      <td>{Pedido.fecha}</td>
      <td>{(Pedido.fechaentrega)
        ?
        (<strong style={{color:'green'}}>{Pedido.fechaentrega}</strong>)
        :
        (<strong style={{color:'orange'}}>Por definirse</strong>)}</td>
      <td>$<strong>{Pedido.total}</strong></td>
      <td>{Pedido.clavetransaccion}</td>
      {isOpenDelete && (
        <PedidosDeleteModal
          setIsOpen={setIsOpenDelete}
          document={Pedido}
          update={update}
          setUpdate={setUpdate}
        />
      )}
      {isOpenCarrito && (
        <PedidosCarritoModal
          setIsOpen={setIsOpenCarrito}
          idpedido={Pedido.idpedidos}
          IsOpen={isOpenDelete}
        />
      )}
    </tr>
    
  );
};
