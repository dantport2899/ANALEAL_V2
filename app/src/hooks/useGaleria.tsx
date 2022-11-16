import React, { useEffect } from 'react'
import { reqqResapi } from '../api/reqRes';
import { Prenda, Prendas, Totalprendas } from '../interfaces/Inventario';
import { useState } from 'react';
import { Descuentos } from '../interfaces/Descuentos';
import { Tallas } from '../interfaces/Tallas';
import { Estilos } from '../interfaces/Estilos';
import { Materiales } from '../interfaces/Materiales';

export const UseGaleria = () => {
  
    const [Peticion, setPeticion] = useState<any>({
        action:"gettotalgaleria",
        data:{
            departamentos:[],
            tallas:[],
            estilos:[],
            materiales:[],
        }
    });
    const [Totalprendas, setTotalPrendas] = useState<string>();
    const [PrendaList, setPrendaList] = useState<Prendas>();
    const [Consulta, setConsulta] = useState<string>("SELECT * FROM `prendas`");
    const [DescuentoList, setDescuentoList] = useState<Descuentos>();
    const [TallaList, setTallaList] = useState<Tallas>();
    const [EstiloList, setEstiloList] = useState<Estilos>();
    const [MaterialList, setMaterialList] = useState<Materiales>();
    const [DataSearch, setDataSearch] = useState<string>()
    const [orderby, setorderby] = useState<string>("idprenda")
    const [asc, setasc] = useState<string>("ASC")
    const [pageno, setpageno] = useState<number>(1)
    const [total_pages, settotal_pages] = useState<number>(1)
    const [Error, setError] = useState<string>()

    const [update, setupdate] = useState<boolean>(false);
    
    useEffect(() => {
        getTotalPrendas();
        getDescuentoList();
        getTallaList();
        getEstiloList();
        getMaterialList();
    }, [pageno,DataSearch,update,orderby,asc,Peticion])

    // useEffect(() => {
        
    // },[0])
        
    const getTotalPrendas = async() => {

        const resp = await reqqResapi.post<Totalprendas>('',Peticion).then(res => {
            setTotalPrendas(res.data.Totalprendas);
            setConsulta(res.data.Consulta);
            console.log(res.data.Consulta);       
            getPrendaList(Number(res.data.Totalprendas));
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
                action: "getgaleria",
                data:{
                    idrol: 1,
                    inicio:offset,
                    limite:valoresporpagina,
                    consulta:Consulta,
                    orderby:orderby,
                    order:asc
                }
            }

            // console.log(getPrenda);
        }

        const res = await reqqResapi.post<Prendas>('',getPrenda).then(res => {
            if(res.data.error){
                setError(res.data.message);
            }else{
                setPrendaList(res.data);
                console.log(res.data)
                
            }

        });   
    }


    const getDescuentoList = async() => {
       
        let getDescuento = {
            action: "getdescuentos",
                data:{
                    idrol: 1,
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
                    idrol: 1,
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
                    idrol: 1,
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

    const getMaterialList = async() => {
       
        let getDescuento = {
            action: "getmateriales",
                data:{
                    idrol: 1,
                    orderby:"idmaterial",
                    order:"ASC"
                }
        }


        const res = await reqqResapi.post<Materiales>('',getDescuento).then(res => {
            if(res.data.error){
                setError(res.data.message);
            }else{
                setMaterialList(res.data);
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
    MaterialList,
    setorderby,
    asc,
    setasc,
    setPeticion
  } 
}
