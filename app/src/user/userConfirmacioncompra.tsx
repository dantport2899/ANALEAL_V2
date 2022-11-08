import React from 'react'
import { NavbarCliente } from '../componentes/navbarCliente'

export const UserConfirmacioncompra = () => {
  return (
    <>
      <NavbarCliente />
      <div style={{ paddingTop: "130px" }}>
      <div>
                            <h1 className="textoCentrado" data-mce-style="text-align: center;">Paso Final!</h1>
                            <p className="textoCentrado" data-mce-style="text-align: center;">Estas a punto de pagar con paypal la cantidad de:</p>
                            <p className="textoCentrado" data-mce-style="text-align: center;">$500.00</p>

                            <div className='textoCentrado'>
                              <iframe className='paypalbtn' src="http://localhost/ANALEAL_V2/ANALEAL_V2/app/src/componentes/paypalbtn.html" />                              
                            </div>

                            <p className="textoCentrado" data-mce-style="text-align: center;">
                                <br data-mce-bogus="1"/></p>
                            <p className="textoCentrado" data-mce-style="text-align: center;">Los productos seran enviados una vez se procese el pago</p>
                            <p className="textoCentrado" data-mce-style="text-align: center;">
                                    <strong>(Para aclaraciones contactarnos por nuestros correos o redes sociales)</strong>
                            </p>
        </div>
      </div>
      <br /><br />
    </>
  )
}
