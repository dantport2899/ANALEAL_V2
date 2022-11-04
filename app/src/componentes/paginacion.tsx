import React, { useEffect } from "react";
import { useState } from "react";

interface Props {
  pageno: number;
  totalpages: number;
  setpageno: (page: number) => void;
}

export const Paginacion = ({ pageno, totalpages, setpageno }: Props) => {
  let paginf: number = 1;
  let pagsup: number = totalpages;

  //calcular el numero de secciones
  if (totalpages < 10) {
    paginf = 1;
    pagsup = totalpages;
  } else {
    paginf = 1;
    pagsup = 10;

    if (pageno > 5 && pageno < totalpages - 4) {
      paginf = pageno - 4;
      pagsup = pageno + 4;
    }

    if (pageno >= totalpages - 4) {
      paginf = totalpages - 9;
      pagsup = totalpages;
    }
  }

  const paginacion = () => {
    const paginas = [];

    for (let index = paginf; index <= pagsup; index++) {
      paginas.push(
        <li key={index} className={`page-item ${index===pageno ? 'active' : ''}`}>
            <a onClick={()=>paginaIndicada(index)} className="page-link">
                {index}
            </a>
        </li>
      );
    }

    return paginas;
  };

  const siguientepagina = () => {
    if (pageno < totalpages) {
      setpageno(pageno + 1);
    }
  };

  const anteriorpagina = () => {
    if (pageno > 1) {
      setpageno(pageno - 1);
    }
  };

  const paginaIndicada = (indice: number) => {
    setpageno(indice);
  };

  return (
    <div className="float-sm-end">
      <ul className="pagination mb-sm-0">
        <li className="page-item">
          <a onClick={anteriorpagina} className="page-link">
            <i className="mdi mdi-chevron-left"></i>
          </a>
        </li>
        { 
            (pageno>6)
            ?(
            <li className="page-item">
                <a onClick={()=>paginaIndicada(1)} className="page-link">
                    1
                </a>
            </li>
            )
            :(<></>)
        }
        { 
            (pageno>6)
            ?(
            <li className="page-item">
                <a onClick={()=>paginaIndicada(pageno-5)} className="page-link">
                    ...
                </a>
            </li>
            )
            :(<></>)
        }

        {paginacion()}

        { 
            (totalpages>10 && pageno<=(totalpages-5))
            ?(<>
                {
                    pageno<(totalpages) &&
                    <li className="page-item">
                        <a onClick={()=>paginaIndicada(pageno+5)} className="page-link">
                            ...
                        </a>
                    </li>
                }
                
                <li className="page-item">
                    <a onClick={()=>paginaIndicada(totalpages)} className="page-link">
                        {totalpages}
                    </a>
                </li>
            </>
            )
            :(<></>)
        }
        <li className="page-item">
          <a onClick={siguientepagina} className="page-link">
            <i className="mdi mdi-chevron-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};
