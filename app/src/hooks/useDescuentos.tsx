import React, { useEffect } from 'react'
import { reqqResapi } from '../api/reqRes';
import { useState } from 'react';
import { Descuentos, Totaldescuentos } from '../interfaces/Descuentos';

export const useDescuentos = () => {
  
    const [TotalDescuentos, setTotalDescuentos] = useState<string>();
    const [DescuentoList, setDescuentoList] = useState<Descuentos>();
    const [DataSearch, setDataSearch] = useState<string>();
    const [orderby, setorderby] = useState<string>("iddescuento");
    const [asc, setasc] = useState<string>("ASC");
    const [pageno, setpageno] = useState<number>(1);
    const [total_pages, settotal_pages] = useState<number>(1)
    const [Error, setError] = useState<string>();

    const [update, setupdate] = useState<boolean>(false);
    

    useEffect(() => {
        getTotalDescuentos();
    }, [pageno,DataSearch,update,orderby,asc])

        
    const getTotalDescuentos = async() => {

        let Jsonsend = {}

        if(DataSearch){         
            Jsonsend = {
                action: "none",
                data:{
                    data_search:DataSearch
                }
            }
        }else{
            Jsonsend = {
                action: "gettotaldescuentos",
            }
        }
      
        const resp = await reqqResapi.post<Totaldescuentos>('',Jsonsend).then(res => {
            setTotalDescuentos(res.data.Totaldescuentos);
            getDescuentoList(Number(res.data.Totaldescuentos));
        });   
    }

    const getDescuentoList = async(Totaldescuentos:number) => {

        let valoresporpagina:number = 10;
        let offset:number = (pageno-1) * valoresporpagina;

        settotal_pages(Math.ceil(Totaldescuentos/valoresporpagina));
       
        let getDescuento = {
            action: "getdescuentos",
                data:{
                    idrol: sessionStorage.user_types_id,
                    inicio:offset,
                    limite:valoresporpagina,
                    orderby:orderby,
                    order:asc
                }
        }


        const res = await reqqResapi.post<Descuentos>('',getDescuento).then(res => {
            if(res.data.error){
                setError(res.data.message);
            }else{
                setDescuentoList(res.data);
            }

        });   
    }
    

  return{
    TotalDescuentos,
    DescuentoList,
    pageno,
    total_pages,
    setpageno,
    getDescuentoList,
    setDataSearch,
    DataSearch,
    Error,
    setError,
    update,
    setupdate,
    setorderby,
    asc,
    setasc
  } 
}
