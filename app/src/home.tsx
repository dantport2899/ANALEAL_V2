import React from 'react'
import { useNavigate } from 'react-router-dom';

import {NavbarCliente} from './componentes/navbarCliente';

export const Home = () => {

    const navigate = useNavigate();

  return (
    <div>
      <NavbarCliente/>
      

      {/* body */}
      <div className="novedades" id="novedades">
           <div className="hovereffect">
                <img src="https://c.pxhere.com/photos/3d/e4/bride_marriage_wedding_dress_woman_girl_model_dress_fashion-979555.jpg!d" className="mx-auto d-block w-full" alt="image"/>
                    <div className="overlay">
                        <h2>Registrate</h2>
                        <p>Explora con totalidad todo nuestro catalogo.</p>
                        <a className="btn btn-outline-dark btn-lg" onClick={()=>navigate('/user/galeria')} role="button" style={{textTransform:"uppercase"}}>Ver más</a>
                    </div>
            </div>       
        </div>

        
    </div>
  )
}
