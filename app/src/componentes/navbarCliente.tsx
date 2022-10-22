import React from 'react'
import { useNavigate } from 'react-router-dom';

export const NavbarCliente = () => {

    const navigate = useNavigate();

    
  return (
    <header>  
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand pr-3" href="#" style={{fontFamily:"Bodoni FS",fontSize: "45px"}} >ANA LEAL</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mx-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page"style={{textTransform:"uppercase"}} onClick={()=>navigate('/home')}>Inicio</a>
                            </li>
                        
                            <li className="nav-item px-4">
                                <a className="nav-link" href="#boda" style={{textTransform:"uppercase"}}>Ropa&nbsp;de&nbsp;boda</a>
                            </li>
                            <li className="nav-item px-4">
                                <a className="nav-link" href="#ocasion" style={{textTransform:"uppercase"}}>Ropa&nbsp;de&nbsp;ocasión</a>
                            </li>
                            <li className="nav-item px-4">
                                <a className="nav-link" href="#oferta" style={{textTransform:"uppercase"}}>Ropa&nbsp;en&nbsp;oferta</a>
                            </li>
                            <li className="nav-item px-4">
                                <a className="nav-link" href="#ELFOOTER" style={{textTransform:"uppercase"}}>Contáctanos</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto mb-2 mb-md-0">
                            <li className="nav-item px-2">
                                <a className="nav-link" style={{textTransform:"uppercase"}} onClick={()=>navigate('/login')}>Iniciar&nbsp;sesión</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

  
        </header>
  )
}
