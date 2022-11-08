import React from 'react'
import { useNavigate } from 'react-router-dom';
import { NavbarCliente } from '../componentes/navbarCliente';
import './../styles/galeria.css'

export const Usergaleria = () => {
  const navigate = useNavigate();
  return (
    <>
    <script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.0/css/boxicons.min.css" integrity="sha512-pVCM5+SN2+qwj36KonHToF2p1oIvoU3bsqxphdOIWMYmgr4ZqD3t5DjKvvetKhXGc/ZG5REYTT6ltKfExEei/Q==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossOrigin="anonymous" />
    </script>
    <NavbarCliente/>
    <div style={{paddingTop:"80px"}}>
    <body className="galeria-container">

      {/* div lateral */}
      <div className='galeria-lateral' style={{paddingLeft:"120px"}}>
      <h2>Categorias</h2>

      <div style={{paddingTop:"40px"}}>
      <h4>Talla</h4>
      <input type="checkbox" id="cbox1" value="first_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Short</label>
      <br></br>
      <input type="checkbox" id="cbox2" value="second_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Medium</label>
      <br></br>
      <input type="checkbox" id="cbox3" value="third_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Short</label>
      </div>

      <div style={{paddingTop:"20px"}}>
      <h4>Departamento</h4>
      <input type="checkbox" id="cbox1" value="first_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Ropa de boda</label>
      <br></br>
      <input type="checkbox" id="cbox2" value="second_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Ropa de ocasión</label>
      
      </div>

      <div style={{paddingTop:"20px"}}>
      <h4>Estilo de corte</h4>
      <input type="checkbox" id="cbox1" value="first_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Vestidos de corte largo</label>
      <br></br>
      <input type="checkbox" id="cbox2" value="second_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Vestidos de corte en V</label>
      
      </div>

      <div style={{paddingTop:"20px"}}>
      <h4>Material</h4>
      <input type="checkbox" id="cbox1" value="first_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Algodón</label>
      <br></br>
      <input type="checkbox" id="cbox2" value="second_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Licra</label>
      <br></br>
      <input type="checkbox" id="cbox3" value="third_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Lana</label>
      <br></br>
      <input type="checkbox" id="cbox3" value="third_checkbox"/>
      <label htmlFor="checbox1" className="formbuilder-number-label">Seda</label>
      </div>

      </div>
    
      {/* div tabla */}
      <div className="container galeria-prendas">
      <div className="row align-items-center">
          <div className="col-md-6">
              <div className="mb-3">
                  <h5 className="card-title">Catalogo ropa de boda <span className="text-muted fw-normal ms-2">(# de prendas)</span></h5>
              </div>
          </div>
      </div>
      <div className="row">
          <div className="col-xl-3 col-sm-6">
              <div className="card">
                  <div className="card-body">
                      <div className="d-flex align-items-center">
                          <div><img src={require("../src/prendas/amarillo.jpg/amarillo.jpg")} alt="" className="avatar-md rounded-circle img-thumbnail" /></div>
                          <div className="flex-1 ms-3">
                              <h5 className="font-size-16 mb-1"><a href="#" className="text-dark">Corte a escote redondo</a></h5>
                          </div>
                      </div>
                      <div className="mt-3 pt-1">
                          <p > Corte a escote redondo hasta el suelo dama de honor</p>
                          <p > $1400</p>
                      </div>
                      <div className="d-flex gap-2 pt-4">
                          <button type="button" className="btn btn-soft-primary btn-sm w-50" onClick={() =>navigate("/user/prenda")}> Ver detalles</button>
                          <button type="button" className="btn btn-primary btn-sm w-50">+ Agregar al carrito</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-sm-6">
              <div className="card">
                  <div className="card-body">
                      <div className="d-flex align-items-center">
                          <div><img src={require("../src/prendas/amarillo.jpg/amarillo.jpg")} alt="" className="avatar-md rounded-circle img-thumbnail" /></div>
                          <div className="flex-1 ms-3">
                              <h5 className="font-size-16 mb-1"><a href="#" className="text-dark">Corte hasta el suelo</a></h5>
                          </div>
                      </div>
                      <div className="mt-3 pt-1">
                          <p >Corte hasta ek suelo dama de honor con volantes</p>
                          <p > $500</p>
                      </div>
                      <div className="d-flex gap-2 pt-4">
                          <button type="button" className="btn btn-soft-primary btn-sm w-50"> Ver detalles</button>
                          <button type="button" className="btn btn-primary btn-sm w-50">+ Agregar al carrito</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-sm-6">
              <div className="card">
                  <div className="card-body">
                      <div className="d-flex align-items-center">
                          <div><img src={require("../src/prendas/amarillo.jpg/amarillo.jpg")} alt="" className="avatar-md rounded-circle img-thumbnail" /></div>
                          <div className="flex-1 ms-3">
                              <h5 className="font-size-16 mb-1"><a href="#" className="text-dark">Corte en v hasta el suelo gasa</a></h5>
                          </div>
                      </div>
                      <div className="mt-3 pt-1">
                          <p > Corte en v hasta el cuelo gasa dama de honor con volantes apertura frontal</p>
                          <p > $1000</p>
                      </div>
                      <div className="d-flex gap-2 pt-4">
                          <button type="button" className="btn btn-soft-primary btn-sm w-50"> Ver detalles</button>
                          <button type="button" className="btn btn-primary btn-sm w-50">+ Agregar al carrito</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-sm-6">
              <div className="card">
                  <div className="card-body">
                      <div className="d-flex align-items-center">
                          <div><img src={require("../src/prendas/amarillo.jpg/amarillo.jpg")} alt="" className="avatar-md rounded-circle img-thumbnail" /></div>
                          <div className="flex-1 ms-3">
                              <h5 className="font-size-16 mb-1"><a href="#" className="text-dark">Corte a escote en v</a></h5>
                          </div>
                      </div>
                      <div className="mt-3 pt-1">
                          <p >Corte a escote en v</p>
                          <p > $1200</p>
                      </div>
                      <div className="d-flex gap-2 pt-4">
                          <button type="button" className="btn btn-soft-primary btn-sm w-50"> Ver detalles</button>
                          <button type="button" className="btn btn-primary btn-sm w-50">+ Agregar al carrito</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-sm-6">
              <div className="card">
                  <div className="card-body">
                      <div className="d-flex align-items-center">
                          <div><img src={require("../src/prendas/amarillo.jpg/amarillo.jpg")} alt="" className="avatar-md rounded-circle img-thumbnail" /></div>
                          <div className="flex-1 ms-3">
                              <h5 className="font-size-16 mb-1"><a href="#" className="text-dark">Corte a escote redondo</a></h5>
                          </div>
                      </div>
                      <div className="mt-3 pt-1">
                          <p >070 2860 5375</p>
                          <p > PhyllisGatlin@spy.com</p>
                          <p > 52 Ilchester MYBSTER 9WX</p>
                      </div>
                      <div className="d-flex gap-2 pt-4">
                          <button type="button" className="btn btn-soft-primary btn-sm w-50"> Ver detalles</button>
                          <button type="button" className="btn btn-primary btn-sm w-50">+ Agregar al carrito</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-sm-6">
              <div className="card">
                  <div className="card-body">
                      <div className="d-flex align-items-center">
                          <div><img src={require("../src/prendas/amarillo.jpg/amarillo.jpg")} alt="" className="avatar-md rounded-circle img-thumbnail" /></div>
                          <div className="flex-1 ms-3">
                          <h5 className="font-size-16 mb-1"><a href="#" className="text-dark">Corte en v hasta el suelo gasa</a></h5>
                          </div>
                      </div>
                      <div className="mt-3 pt-1">
                          <p > Corte en v hasta el cuelo gasa dama de honor con volantes apertura frontal</p>
                          <p > $1000</p>
                      </div>
                      <div className="d-flex gap-2 pt-4">
                          <button type="button" className="btn btn-soft-primary btn-sm w-50"> Ver detalles</button>
                          <button type="button" className="btn btn-primary btn-sm w-50">+ Agregar al carrito</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-sm-6">
              <div className="card">
                  <div className="card-body">
                      <div className="d-flex align-items-center">
                          <div><img src={require("../src/prendas/amarillo.jpg/amarillo.jpg")} alt="" className="avatar-md rounded-circle img-thumbnail" /></div>
                          <div className="flex-1 ms-3">
                          <h5 className="font-size-16 mb-1"><a href="#" className="text-dark">Corte hasta el suelo</a></h5>
                          </div>
                      </div>
                      <div className="mt-3 pt-1">
                          <p >Corte hasta ek suelo dama de honor con volantes</p>
                          <p > $500</p>
                      </div>
                      <div className="d-flex gap-2 pt-4">
                          <button type="button" className="btn btn-soft-primary btn-sm w-50"> Ver detalles</button>
                          <button type="button" className="btn btn-primary btn-sm w-50">+ Agregar al carrito</button>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-xl-3 col-sm-6">
              <div className="card">
                  <div className="card-body">
                      <div className="d-flex align-items-center">
                          <div><img src={require("../src/prendas/amarillo.jpg/amarillo.jpg")} alt="" className="avatar-md rounded-circle img-thumbnail" /></div>
                          <div className="flex-1 ms-3">
                          <h5 className="font-size-16 mb-1"><a href="#" className="text-dark">Corte a escote redondo</a></h5>
                          </div>
                      </div>
                      <div className="mt-3 pt-1">
                          <p > Corte a escote redondo hasta el suelo dama de honor</p>
                          <p > $1400</p>
                      </div>
                      <div className="d-flex gap-2 pt-4">
                          <button type="button" className="btn btn-soft-primary btn-sm w-50"> Ver detalles</button>
                          <button type="button" className="btn btn-primary btn-sm w-50">+ Agregar al carrito</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className="row g-0 align-items-center pb-4">
          <div className="col-sm-6">
              <div><p className="mb-sm-0">Mostrando 8 de #deprendas</p></div>
          </div>
          <div className="col-sm-6">
              <div className="float-sm-end">
                  <ul className="pagination mb-sm-0">
                      <li className="page-item disabled">
                          <a href="#" className="page-link"><i className="mdi mdi-chevron-left"></i></a>
                      </li>
                      <li className="page-item active"><a href="#" className="page-link">1</a></li>
                      <li className="page-item"><a href="#" className="page-link">2</a></li>
                      <li className="page-item"><a href="#" className="page-link">3</a></li>
                      <li className="page-item"><a href="#" className="page-link">4</a></li>
                      <li className="page-item"><a href="#" className="page-link">5</a></li>
                      <li className="page-item">
                          <a href="#" className="page-link"><i className="mdi mdi-chevron-right"></i></a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      </div>

    </body>
    </div >
    </>
  )
}
