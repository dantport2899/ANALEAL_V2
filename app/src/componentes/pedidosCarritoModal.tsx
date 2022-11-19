import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { reqqResapi } from "../api/reqRes";
import { useState } from "react";
import { Descuento, Descuentos } from "../interfaces/Descuentos";
import { Carrito } from '../interfaces/Carrito';
import { useNavigate } from "react-router-dom";
import { CarritoPedidosRow } from './carritoPedidosRow';

interface Props {
  setIsOpen: (ver: boolean) => void;
  IsOpen:boolean;
  idpedido: string;
}

export const PedidosCarritoModal = ({
  idpedido,
  setIsOpen,
  IsOpen
}: Props) => {
  const [CarritoList, setCarritoList] = useState<Carrito>();
  const [Error, setError] = useState<string>();
  const [DescuentoList, setDescuentoList] = useState<Descuentos>();
  const [Total, setTotal] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    getCarritoList();
    getDescuentoList();

}, [])

useEffect(() => {
  getDescuentoList();

}, [CarritoList])

  const getCarritoList = async() => {

    let getPedido = {
        action: "carrito",
            data:{
              idpedido:idpedido
            }
    }

    const res = await reqqResapi.post<Carrito>('',getPedido).then(res => {
      if(res.data.error){
        setError(res.data.message);
      }else{
        setCarritoList(res.data);
      }

    });     
  }

  const getDescuentoList = async () => {
    let getDescuento = {
      action: "getdescuentos",
      data: {
        idrol: 1,
        orderby: "descuento",
        order: "ASC",
      },
    };

    const res = await reqqResapi
      .post<Descuentos>("", getDescuento)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.message);
        } else {
          setDescuentoList(res.data);
          let total: number = 0;

          CarritoList?.carrito.forEach((prenda: any) => {
            // //mostrar Descuento
            let Descuento: string = "Descuento";
            let porcentaje: string = "0";
      
            res.data?.descuentos.forEach((desc: Descuento) => {
              if (desc.iddescuento === prenda.prenda[0].iddescuento) {
                Descuento = desc.nom_descuento;
                porcentaje = desc.descuento;
              }
            });
            total = total + ((Number(prenda.prenda[0].precio))-(((Number(prenda.prenda[0].precio))*(Number(porcentaje)*.01))))*(Number(prenda.cantidad));
          });
          setTotal(total);
        }
      });
  };


  return (
    <div className="darkBG">
      <div className="centered">
        <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-body">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h5 className="card-title">
                        Carrito{" "}
                        <span className="text-muted fw-normal ms-2">
                          (#{CarritoList?.carrito.length} de prendas en el carrito)
                        </span>
                      </h5>
                    </div>
                  </div>
                  
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="">
                      <div className="table-responsive">
                        <table className="table project-list-table table-nowrap align-middle table-borderless">
                          <thead>
                            <tr>
                              <th scope="col">Prenda</th>
                              <th scope="col">Descripcion</th>
                              <th scope="col">Precio</th>
                              <th scope="col">Cantidad</th>
                              <th scope="col">Total</th>
                              
                            </tr>
                          </thead>
                          <tbody>
                            {
                              (CarritoList) && (
                                CarritoList.carrito?.map((producto: any, index: number) => (
                                  <CarritoPedidosRow
                                    key={producto.idprenda}
                                    prenda={producto}
                                    descuentos={DescuentoList}
                                    Total={Total}
                                    setTotal={setTotal}
                                  />
                                ))
                              )
                              
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-0 align-items-center pb-4">
                  <div className="col-sm-6">
                    <div>
                      <h3 style={{ color: "blue" }}>TOTAL: ${Total}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div>
              
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
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
