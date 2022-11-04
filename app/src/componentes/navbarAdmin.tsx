import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


export const NavbarAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const cerrarsesion = () => {
        sessionStorage.clear();
        navigate('/home');
        window.location.reload();
    }

  return (

    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand pr-3" href="#"  style={{fontFamily:"Bodoni FS",fontSize:'45px'}} >ANA LEAL</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mx-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname == '/admin' ? 'active' : ''}`} onClick={()=>navigate('/admin')} aria-current="page" style={{textTransform:"uppercase"}}>Inicio</a>
                            </li>
                            <li className="nav-item px-4">
                                <a className={`nav-link ${location.pathname == '/admin/inventario' ? 'active' : ''}`} onClick={()=>navigate('/admin/inventario')} style={{textTransform:"uppercase"}}>Inventario</a>
                            </li>
                            <li className="nav-item px-4">
                                <a className={`nav-link ${location.pathname == '/admin/pedidos' ? 'active' : ''}`} onClick={()=>navigate('/admin/pedidos')} style={{textTransform:"uppercase"}}>Pedidos</a>
                            </li>
                            <li className="nav-item px-4">
                                <a className={`nav-link ${location.pathname == '/admin/descuentos' ? 'active' : ''}`} onClick={()=>navigate('/admin/descuentos')} style={{textTransform:"uppercase"}}>Descuentos</a>
                            </li>
                            <li className="nav-item px-4">
                                <a className={`nav-link ${location.pathname == '/admin/formulario' ? 'active' : ''}`} onClick={()=>navigate('/admin/formulario')} style={{textTransform:"uppercase"}}>Ayuda</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto mb-2 mb-md-0">
                            <li className="nav-item px-2">
                                <a className="nav-link" href="usuarioadmin.php" style={{textTransform:"uppercase"}}>Usuario</a>
                            </li>
                            <li className="nav-item px-2">
                                <a className="nav-link" style={{textTransform:"uppercase"}} onClick={()=>cerrarsesion()}>Cerrar Sesion</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
  )
}
