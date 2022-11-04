import React, { useEffect } from 'react'
import { reqqResapi } from '../api/reqRes';
import { Prenda, Prendas, Totalprendas } from '../interfaces/Inventario';
import { useState } from 'react';
import { Descuentos } from '../interfaces/Descuentos';
import { Tallas } from '../interfaces/Tallas';
import { Estilos } from '../interfaces/Estilos';

export const useInventario = () => {
  
    const [Totalprendas, setTotalPrendas] = useState<string>();
    const [PrendaList, setPrendaList] = useState<Prendas>();
    const [DescuentoList, setDescuentoList] = useState<Descuentos>();
    const [TallaList, setTallaList] = useState<Tallas>();
    const [EstiloList, setEstiloList] = useState<Estilos>();
    const [DataSearch, setDataSearch] = useState<string>()
    const [orderby, setorderby] = useState<string>("existencias")
    const [asc, setasc] = useState<string>("ASC")
    const [pageno, setpageno] = useState<number>(1)
    const [total_pages, settotal_pages] = useState<number>(1)
    const [Error, setError] = useState<string>()

    const [update, setupdate] = useState<boolean>(false);
    

    useEffect(() => {
        getTotalPrendas();
    }, [pageno,DataSearch,update,orderby,asc])

        
    const getTotalPrendas = async() => {

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
                action: "gettotalprendas",
            }
        }
      
        const resp = await reqqResapi.post<Totalprendas>('',Jsonsend).then(res => {
            setTotalPrendas(res.data.Totalprendas);
            getPrendaList(Number(res.data.Totalprendas));
            getDescuentoList();
            getTallaList();
            getEstiloList();
        });   
    }

    const getPrendaList = async(Totalprendas:number) => {
       
        let valoresporpagina:number = 10;
        let offset:number = (pageno-1) * valoresporpagina;

        settotal_pages(Math.ceil(Totalprendas/valoresporpagina));

        let getPrenda = {}

        if(DataSearch){
            getPrenda = {
                action: "searchuser",
                data:{
                    id:sessionStorage.id,
                    data_search:DataSearch,
                    user_types_id: sessionStorage.user_types_id,
                    inflimit:offset,
                    suplimit:valoresporpagina
                }
            }
        }else{
            getPrenda = {
                action: "getprendas",
                data:{
                    idrol: sessionStorage.user_types_id,
                    inicio:offset,
                    limite:valoresporpagina,
                    orderby:orderby,
                    order:asc
                }
            }
        }

        const res = await reqqResapi.post<Prendas>('',getPrenda).then(res => {
            if(res.data.error){
                setError(res.data.message);
            }else{
                setPrendaList(res.data);
                
            }

        });   
    }


    const getDescuentoList = async() => {
       
        let getDescuento = {
            action: "getdescuentos",
                data:{
                    idrol: sessionStorage.user_types_id,
                    orderby:"descuento",
                    order:"ASC"
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

    const getTallaList = async() => {
       
        let getDescuento = {
            action: "gettallas",
                data:{
                    idrol: sessionStorage.user_types_id,
                    orderby:"idtalla",
                    order:"ASC"
                }
        }


        const res = await reqqResapi.post<Tallas>('',getDescuento).then(res => {
            if(res.data.error){
                setError(res.data.message);
            }else{
                setTallaList(res.data);
            }

        });   
    }

    const getEstiloList = async() => {
       
        let getDescuento = {
            action: "getstilos",
                data:{
                    idrol: sessionStorage.user_types_id,
                    orderby:"idestilo",
                    order:"ASC"
                }
        }


        const res = await reqqResapi.post<Estilos>('',getDescuento).then(res => {
            if(res.data.error){
                setError(res.data.message);
            }else{
                setEstiloList(res.data);
            }

        });   
    }

    

  return{
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
    EstiloList,
    setorderby,
    asc,
    setasc
  } 
}
