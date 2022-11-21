import React from 'react'


export const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light bg-dark text-white">
            
            <div className="container">
                <p style={{textAlign:'center'}}>Descripción breve del negocio y sobre qué detalles tiene.</p>
                <hr/>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto" id="ELFOOTER">
                <h6 className="text-uppercase fw-bold mb-4">
                    Contacto
                </h6>
                <p><i className="fas fa-home me-3"></i> Dirección del negocio</p>
                <p><i className="fas fa-envelope me-3">&nbsp;analeal@example.com</i></p>
                <p><i className="fas fa-phone me-3"></i> Numero de teléfono</p>
                <p><i className="fab fa-facebook me-3"></i> Página de Facebook</p>
            </div>
    </footer>
  )
}
