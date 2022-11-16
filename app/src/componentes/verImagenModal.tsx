import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { reqqResapi } from "../api/reqRes";
import { useState } from "react";
import { Descuentos } from "../interfaces/Descuentos";
import { Pedido } from '../interfaces/Pedidos';
import { Reporte, Reportes } from '../interfaces/Reportes';

interface Props {
  setIsOpen: (ver: boolean) => void;
  img: string;
  nom_prenda: string;
}

export const VerImagenModal = ({
  setIsOpen,
  img,
  nom_prenda
}: Props) => {
  

  return (
    <div className="darkBG">
      <div className="centered">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {nom_prenda}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              ></button>
            </div>
              <div className="modal-body">
                <img src={require("../src/prendas/"+img)} style={{width:'40vh'}}/>
              </div>
              
          </div>
        </div>
      </div>
    </div>
  );
};
