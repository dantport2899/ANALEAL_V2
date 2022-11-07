import React, { useEffect } from 'react'
import { reqqResapi } from '../api/reqRes';
import { useState } from 'react';
import { Reportes, Totalreportes } from '../interfaces/Reportes';

export const useReportes = () => {
  
    const [TotalReportes, setTotalReportes] = useState<string>();
    const [ReporteList, setReporteList] = useState<Reportes>();
    const [DataSearch, setDataSearch] = useState<string>();
    const [orderby, setorderby] = useState<string>("idreporte");
    const [asc, setasc] = useState<string>("DESC");
    const [pageno, setpageno] = useState<number>(1);
    const [total_pages, settotal_pages] = useState<number>(1)
    const [Error, setError] = useState<string>();

    const [update, setupdate] = useState<boolean>(false);
    

    useEffect(() => {
        getTotalReportes();
    }, [pageno,DataSearch,update,orderby,asc])

        
    const getTotalReportes = async() => {

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
                action: "gettotalreportes",
            }
        }
      
        const resp = await reqqResapi.post<Totalreportes>('',Jsonsend).then(res => {
            setTotalReportes(res.data.Totalreportes);
            getReporteList(Number(res.data.Totalreportes));
        });   
    }

    const getReporteList = async(Totaldescuentos:number) => {

        let valoresporpagina:number = 10;
        let offset:number = (pageno-1) * valoresporpagina;

        settotal_pages(Math.ceil(Totaldescuentos/valoresporpagina));
       
        let getDescuento = {
            action: "getreportes",
                data:{
                    idrol: sessionStorage.user_types_id,
                    inicio:offset,
                    limite:valoresporpagina,
                    orderby:orderby,
                    order:asc
                }
        }


        const res = await reqqResapi.post<Reportes>('',getDescuento).then(res => {
            if(res.data.error){
                setError(res.data.message);
            }else{
                setReporteList(res.data);
            }

        });   
    }
    

  return{
    TotalReportes,
    ReporteList,
    pageno,
    total_pages,
    setpageno,
    getReporteList,
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
