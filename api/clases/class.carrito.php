<?php
class Carrito
{
    function __construct(){

    }
    
    function getCarrito($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $data = $data->data;

            $sql = "SELECT * FROM `carrito` WHERE idpedido=$data->idpedido";

            $prendas = $conexion->consulta($sql);


            foreach ($prendas as $key => $prenda) {
                $sql2 = "SELECT * FROM `prendas` WHERE idprenda=".$prenda['idprenda']."";
                $prendainfo = $conexion->consulta($sql2);
                $prendas[$key]['prenda'] = $prendainfo;
            }



            $response['carrito'] = $prendas;
        
        return $response;
    } 
}

?>