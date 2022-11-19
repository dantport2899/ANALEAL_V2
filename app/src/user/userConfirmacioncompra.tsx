import React, { useState, useEffect } from "react";
import { NavbarCliente } from "../componentes/navbarCliente";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useLocation } from "react-router-dom";
import { reqqResapi } from "../api/reqRes";
import { User } from "../interfaces/Usuarios";

export const UserConfirmacioncompra = () => {

  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
    }
  },
  [success]
);

  var carrito = JSON.parse(sessionStorage.getItem("carrito") || "{}");
  var descripcion = "";

  carrito.forEach((prenda:any) => {
    descripcion = descripcion+" "+prenda.nom_prenda+" $"+prenda.precio+" x "+prenda.cantidad+": $"+((Number(prenda.precio)*(Number(prenda.cantidad))))+";\n";
  });

  console.log(descripcion);

  // creates a paypal order
  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: descripcion,
            amount: {
              // currency_code: "MXN",
              value: Number(state.total),
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID: boolean) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = async(data: any, actions: any) => {
    return await actions.order.capture().then(function (details: any) {
      const { payer } = details;
      console.log(payer);

      const Jsonsend = {
        action: "verificar",
        data: {
          payer:payer,
          carrito:carrito,
          idusario:sessionStorage.getItem('idusuario'),
          direccion:state.direccion,
          orderID:data.orderID
        }
    }
    console.log(data);
    console.log(actions);

      verificarCompra(Jsonsend);
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data: any, actions: any) => {
    setErrorMessage("An Error occured with your payment ");
  };

  const verificarCompra = async(Jsonsend:any) => {
    //llamado al api promesa y se le asigna la interfaz
        const resp = await reqqResapi.post<User>('',Jsonsend).then(res => {

            if(res.data.message){
                
                alert(res.data.message);
            }
            
        });    
  }

  const initialOptions = {
    "client-id": "ASPDmLQQH-Uod0VBYyp5n6dM_WWfnuF59F24M77ZzCV07LJMY37UsomtZFAYc5frw36EM2V8e8VkOTxH",
    "currency": "MXN",
    intent: "capture",
};

  return (
    <>
      <NavbarCliente />
      <div style={{ paddingTop: "130px" }}>
        <div>
          <h1 className="textoCentrado" data-mce-style="text-align: center;">
            Paso Final!
          </h1>
          <p className="textoCentrado" data-mce-style="text-align: center;">
            Carrito de compras:
          </p>
          <p className="textoCentrado" data-mce-style="text-align: center;">
            {descripcion}
          </p>
          <p className="textoCentrado" data-mce-style="text-align: center;">
            ${state.total}
          </p>

          <div className="textoCentrado">
            {/* <iframe className='paypalbtn' src="http://localhost/ANALEAL_V2/ANALEAL_V2/app/src/componentes/paypalbtn.html" />                               */}

            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons style={{ layout: "horizontal" }}  
              createOrder={createOrder}
              onApprove={onApprove}/>
            </PayPalScriptProvider>
          </div>

          <p className="textoCentrado" data-mce-style="text-align: center;">
            <br data-mce-bogus="1" />
          </p>
          <p className="textoCentrado" data-mce-style="text-align: center;">
            Los productos seran enviados una vez se procese el pago
          </p>
          <p className="textoCentrado" data-mce-style="text-align: center;">
            <strong>
              (Para aclaraciones contactarnos por nuestros correos o redes
              sociales)
            </strong>
          </p>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};
