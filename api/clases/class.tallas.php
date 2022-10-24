<?php
class Tallas
{
    function __construct(){

    }

    function getTallas($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $datalimite = $data->data;

        if($datalimite->idrol != 1){
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nivel de usuario no valido';

        }else if(isset($datalimite->inicio)){

            if(!isset($datalimite->orderby)){
                $response['code'] = 2;
                $response['error'] = true;
                $response['message'] = 'Se requiere de el tipo de talla';
    
            }else{
                $inicio = $datalimite->inicio;
                $limite = $datalimite->limite;
    
                $sql = "SELECT * FROM `talla` ORDER BY ".$datalimite->orderby." ".$datalimite->order." LIMIT ".$inicio.",".$limite." ";
                $prendas = $conexion->consulta($sql);
                $response['tallas'] = $prendas;
            }
        }else{
            $sql = "SELECT * FROM `talla`";

            $prendas = $conexion->consulta($sql);
            $response['tallas'] = $prendas;
        }

        return $response;
    }

 
}
?>