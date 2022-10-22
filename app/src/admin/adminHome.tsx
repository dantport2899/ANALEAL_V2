import React from 'react'

import {NavbarAdmin} from '../componentes/navbarAdmin';

export const AdminHome = () => {

  //se importa esta libreria si eres admin
  if(sessionStorage.getItem('user_types_id') == '1'){
    require('./../styles/style.css');
  }

  return (
    <div>
      <script>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
      </script>
      <NavbarAdmin/>
      <div className="hero">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="hero-text">
                            <h1>Ana Leal prendas y vestidos</h1>
                            <p>
                                Bienvenido Administrador
                            </p>
                            <a className="btn" href="inventario.php">Comencemos</a>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 d-none d-md-block">
                        
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}
