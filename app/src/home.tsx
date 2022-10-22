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
                        <a className="btn btn-outline-dark btn-lg" href="registro.php" role="button" style={{textTransform:"uppercase"}}>Ver más</a>
                    </div>
            </div>       
        </div>

        <div className="boda" id="boda">
            <div className="hovereffect">
                <img src={require('./src/prendas/index-boda.jpg')} className="mx-auto d-block w-100" alt="image"/>
                    <div className="overlay">
                        <h2>Ropa de boda</h2>
                        <p>¿Tienes una boda o compromiso similar? Aquí encontrarás tu vestido ideal para la ocasión.</p>
                        <a className="btn btn-outline-dark btn-lg" href="ropaboda.php" role="button" style={{textTransform:"uppercase"}}>Ver más</a>
                    </div>
            </div>
        </div>

        <div className="ocasion" id="ocasion">
            <div className="hovereffect">
                <img src={require('./src/prendas/index-casual.jpeg')} className="mx-auto d-block w-100" alt="image"/>
                    <div className="overlay">
                        <h2>Ropa de ocasión</h2>
                        <p>¿Buscas algo casual? Explora nuestras prendas especiales para toda ocasión casual.</p>
                        <a className="btn btn-outline-dark btn-lg" href="ropaocasion.php" role="button" style={{textTransform:"uppercase"}}>Ver más</a>
                    </div>
            </div>
        </div>
        
        <div className="oferta" id="oferta">
            <div className="hovereffect">
                <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fabeautifulmess.typepad.com%2F.a%2F6a00d8358081ff69e2016301db4217970d-800wi&f=1&nofb=1" className="mx-auto d-block w-100" alt="image"/>
                    <div className="overlay">
                        <h2>Ropa en oferta</h2>
                        <p>¿Deseas ahorrar? Explora nuestro catálogo centrado en ofertas.</p>
                        <a className="btn btn-outline-dark btn-lg" href="ropaoferta.php" role="button" style={{textTransform:"uppercase"}}>Ver más</a>
                    </div>
            </div>
        </div>
    </div>
  )
}
