import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { NavbarCliente } from '../componentes/navbarCliente';
import { Paginacion } from '../componentes/paginacion';
import { UseGaleria } from '../hooks/useGaleria';
import './../styles/galeria.css'
import { Prendatargeta } from '../componentes/prendatargeta';

export const Usergaleria = () => {
  const navigate = useNavigate();

  const {
    Totalprendas,
    PrendaList,
    pageno,
    total_pages,
    setpageno,
    getPrendaList,
    setDataSearch,
    DataSearch,
    Error,
    setError,
    update,
    setupdate,
    DescuentoList,
    TallaList,
    MaterialList,
    EstiloList,
    setorderby,
    asc,
    setasc,
    setPeticion

  } = UseGaleria();

  const { register, handleSubmit} = useForm();

  const onSubmit = (data: any) => {
    const Jsonsend = {
        action: "gettotalgaleria",
        data: data
    }

    setPeticion(Jsonsend);
  };

  return (
    <>
    <script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.1.0/css/boxicons.min.css" integrity="sha512-pVCM5+SN2+qwj36KonHToF2p1oIvoU3bsqxphdOIWMYmgr4ZqD3t5DjKvvetKhXGc/ZG5REYTT6ltKfExEei/Q==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css" integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc=" crossOrigin="anonymous" />
    </script>
    <NavbarCliente/>
    <div style={{paddingTop:"100px"}}>
    <div className="galeria-container">

      {/* div lateral */}
      <div className='galeria-lateral' style={{paddingLeft:"120px"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          
        <h2>Categorías</h2>
        <br />
        <div>
                      <input
                        data-bs-toggle="modal"
                        data-bs-target=".add-new"
                        className="btn btn-primary"
                        type={"submit"}
                        value={"Buscar"}
                      />
                    </div>

            <div style={{paddingTop:"20px"}}>
            <h4>Talla</h4>
                {
                    (TallaList)
                    ?
                    TallaList?.tallas.map(talla => (
                        <div key={talla.idtalla}>
                        <input type="checkbox" id={talla.idtalla} {...register("tallas")} value={talla.idtalla} />
                        <label htmlFor="checbox1" className="formbuilder-number-label">{talla.nom_talla}</label>
                        <br></br>
                        </div>
                    ))
                    :
                    <></>
                }
            </div>

            <div style={{paddingTop:"40px"}}>
            <h4>Descuento</h4>
                {
                    (DescuentoList)
                    ?
                    DescuentoList?.descuentos.map(descuento => (
                        <div key={descuento.iddescuento}>
                        <input type="checkbox" id={descuento.iddescuento} {...register("descuentos")} value={descuento.iddescuento} />
                        <label htmlFor="checbox1" className="formbuilder-number-label">{descuento.nom_descuento}</label>
                        <br></br>
                        </div>
                    ))
                    :
                    <></>
                }
            </div>

            <div style={{paddingTop:"20px"}}>
            <h4>Departamento</h4>
            <input type="checkbox" id="cbox1" {...register("departamentos")} value={1} />
            <label htmlFor="checbox1" className="formbuilder-number-label">Ropa de boda</label>
            <br></br>
            <input type="checkbox" id="cbox2" {...register("departamentos")} value={2} />
            <label htmlFor="checbox1" className="formbuilder-number-label">Ropa de ocasión</label>
            
            </div>

            <div style={{paddingTop:"20px"}}>
            <h4>Estilo de corte</h4>
            {
                    (EstiloList)
                    ?
                    EstiloList?.estilos.map(estilo => (
                        <div key={estilo.idestilo}>
                        <input type="checkbox" id={estilo.idestilo} {...register("estilos")} value={estilo.idestilo}/>
                        <label htmlFor="checbox1" className="formbuilder-number-label">{estilo.nom_estilo}</label>
                        <br></br>
                        </div>
                    ))
                    :
                    <></>
                }
            
            </div>

            <div style={{paddingTop:"20px"}}>
            <h4>Material</h4>
            
            </div>
            {
                    (MaterialList)
                    ?
                    MaterialList?.materiales.map(material => (
                        <div key={material.idmaterial}>
                        <input type="checkbox" id={material.idmaterial} {...register("materiales")} value={material.idmaterial}/>
                        <label htmlFor="checbox1" className="formbuilder-number-label">{material.nom_material}</label>
                        <br></br>
                        </div>
                    ))
                    :
                    <></>
            }
        </form>
      
      </div>
    
      {/* div tabla */}
      <div className="container galeria-prendas">
      <div className="row align-items-center">
          <div className="col-md-6">
              <div className="mb-3">
                  <h5 className="card-title">Catalogo ropa de boda <span className="text-muted fw-normal ms-2">(#{Totalprendas} prendas)</span></h5>
              </div>
          </div>
      </div>
      <div className="row">
          {
            PrendaList?.prendas.length == 0 ? (
              <div className="alert alert-primary" role="alert" style={{width:'90%', margin:'0px auto', height:'400px'}}>
              <h4>Lo sentimos, de momento no contamos con productos con estas características</h4>
              </div>
            ) : (
              PrendaList?.prendas.map(prenda => (
              <Prendatargeta key={prenda.idprenda} prenda={prenda} update={update} setUpdate={setupdate} descuentos={DescuentoList?.descuentos} talla={TallaList?.tallas} estilo={EstiloList?.estilos} material={MaterialList?.materiales}/>
            )))
            
          }
      </div>
      <div className="row g-0 align-items-center pb-4">
          <div className="col-sm-6">
              <div><p className="mb-sm-0">Mostrando  de #{Totalprendas} deprendas</p></div>
          </div>
          <div className="col-sm-6">
            <Paginacion pageno={pageno} totalpages={total_pages} setpageno={setpageno}/>
          </div>
      </div>
      </div>

    </div>
    </div >
    </>
  )
}
