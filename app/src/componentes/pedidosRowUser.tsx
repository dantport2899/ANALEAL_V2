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

export const PedidosRowUser = ({ pedido, update, setUpdate }: Props) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  let Pedido: Pedido = pedido;
  const navigate = useNavigate();

  // console.log(Descuento);

  
  return (
    <tr>
      <td>
        <ul className="list-inline mb-0">
          <li className="list-inline-item">
            <a
              onClick={() => setIsOpenDelete(true)}
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
      <td>{Pedido.descripcion}</td>
      <td>$<strong>{Pedido.total}</strong></td>
      <td>{Pedido.direccion}</td>
      <td>{
        (Pedido.fechaentrega)
        ?
        (<strong style={{color:'green'}}>{Pedido.fechaentrega}</strong>)
        :
        (<strong style={{color:'orange'}}>Por definirse</strong>)
      }</td>
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
      <td>{Pedido.clavetransaccion}</td>
      {isOpenDelete && (
        <PedidosCarritoModal
          setIsOpen={setIsOpenDelete}
          idpedido={Pedido.idpedidos}
          IsOpen={isOpenDelete}
        />
      )}
    </tr>
    
  );
};
