import React, { useEffect } from 'react'
import { reqqResapi } from '../api/reqRes';
import { useState } from 'react';
import { Totalpedidos, Pedidos } from '../interfaces/Pedidos';

export const usePedidos = () => {
  
    const [TotalPedidos, setTotalPedidos] = useState<string>();
    const [PedidoList, setPedidoList] = useState<Pedidos>();
    const [DataSearch, setDataSearch] = useState<string>()
    const [pageno, setpageno] = useState<number>(1)
    const [total_pages, settotal_pages] = useState<number>(1)
    const [Error, setError] = useState<string>()

    const [update, setupdate] = useState<boolean>(false);
    

    useEffect(() => {
        getTotalPedidos();
    }, [pageno,DataSearch,update])

        
    const getTotalPedidos = async() => {

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
                action: "gettotalordenes",
            }
        }
      
        const resp = await reqqResapi.post<Totalpedidos>('',Jsonsend).then(res => {
            setTotalPedidos(res.data.Totalpedidos);
            getPedidoList(Number(res.data.Totalpedidos));
        });   
    }

    const getPedidoList = async(Totalpedidos:number) => {

        let valoresporpagina:number = 10;
        let offset:number = (pageno-1) * valoresporpagina;

        settotal_pages(Math.ceil(Totalpedidos/valoresporpagina));

        let getPedido = {
            action: "getordenes",
                data:{
                    idrol: sessionStorage.user_types_id,
                    orderby:"fecha",
                    order:"ASC"
                }
        }


        const res = await reqqResapi.post<Pedidos>('',getPedido).then(res => {
            if(res.data.error){
                setError(res.data.message);
            }else{
                setPedidoList(res.data);
            }

        });   
    }
    

  return{
    TotalPedidos,
    PedidoList,
    pageno,
    total_pages,
    setpageno,
    getPedidoList,
    setDataSearch,
    DataSearch,
    Error,
    setError,
    update,
    setupdate
  } 
}
