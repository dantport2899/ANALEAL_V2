<?php
class Ordenes
{
    function __construct(){

    }
    
    function newOrden ($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $dataorden = $data->data;

        if (empty($dataorden->nom_descuento)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nombre de descuento vacío.';
        } else if (empty($dataorden->descuento)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Descuento vacío.';
        }else{

            $sql = "Insert into descuentos (nom_descuento,descripcion,descuento) values ('$dataorden->nom_descuento','$dataorden->descripcion','$dataorden->descuento')";
            $result = $conexion->consulta($sql);


            $response['message'] = "Descuento agregado con exito";
        }

        return $response;
    }

    function totalOrdenes() {
        

        global  $conexion, $seguridad;      
    
        $response = array();
        
        $Totaldescuentos = $conexion->consulta("SELECT COUNT(*) FROM `descuentos`");

        $response['Totaldescuentos'] = reset($Totaldescuentos[0]);
        

        return $response;
    }

    function getOrdenes($data) {
        
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
                $response['message'] = 'Se requiere de el tipo de orden';
    
            }else{
                $inicio = $datalimite->inicio;
                $limite = $datalimite->limite;
    
                $sql = "SELECT * FROM `descuentos` ORDER BY ".$datalimite->orderby." ".$datalimite->order." LIMIT ".$inicio.",".$limite." ";
                $prendas = $conexion->consulta($sql);
                $response['descuentos'] = $prendas;
            }
        }else{
            $sql = "SELECT * FROM `descuentos`";

            $prendas = $conexion->consulta($sql);
            $response['descuentos'] = $prendas;
        }

        return $response;
    }

    function modifyOrden($data) {

        global  $conexion, $seguridad;      
    
        $response = array();
                
        $datadescuento = $data->data;

        if (empty($datadescuento->nom_descuento)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nombre de descuento vacío.';
        } else if (empty($datadescuento->iddescuento)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Id de descuento vacío.';
        } else if (empty($datadescuento->descuento)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Descuento vacío.';
        }else{

            $querty = "UPDATE descuentos SET nom_descuento='$datadescuento->nom_descuento', descripcion='$datadescuento->descripcion', descuento=$datadescuento->descuento WHERE iddescuento=$datadescuento->iddescuento";

            $conexion->consulta($querty);

            $response['message'] = 'Descuento modificada con éxito';
        }

        return $response;
    }

    function deleteOrden($data) {

        global  $conexion, $seguridad;      
    
        $response = array();
                
        $datadescuento = $data->data;

        if (empty($datadescuento->iddescuento)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Id vacío.';
        }else{
            $descuentoid = $conexion->consulta("SELECT * FROM `descuentos` WHERE `iddescuento` = $datadescuento->iddescuento");
            
            // verificar si el usuario esta registrado
            if (!empty($descuentoid)) {       
                $querty = "DELETE FROM `descuentos` WHERE `iddescuento` = $datadescuento->iddescuento";
                $conexion->consulta($querty);

                $response['message'] = 'Descuento borrado con éxito';
            }else{
                $response['code'] = 9;
                $response['error'] = true;
                $response['message'] = 'Este descuento no existe en la base de datos';
                $response['id'] = $datadescuento->idprenda;               
            }       
        }
        return $response;
    }
}

?>