<?php
class Material
{
    function __construct(){

    }

    function getMaterial($data) {
        
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
                $response['message'] = 'Se requiere del limite de maetiales';
    
            }else{
                $inicio = $datalimite->inicio;
                $limite = $datalimite->limite;
    
                $sql = "SELECT * FROM `material` ORDER BY ".$datalimite->orderby." ".$datalimite->order." LIMIT ".$inicio.",".$limite." ";
                $prendas = $conexion->consulta($sql);
                $response['materiales'] = $prendas;
            }
        }else{
            $sql = "SELECT * FROM `material`";

            $prendas = $conexion->consulta($sql);
            $response['materiales'] = $prendas;
        }

        return $response;
    }

 
}
?>