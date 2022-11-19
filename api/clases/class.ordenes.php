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
        
        $Totalpedidos = $conexion->consulta("SELECT COUNT(*) FROM `pedidos`");

        $response['Totalpedidos'] = reset($Totalpedidos[0]);
        

        return $response;
    }

    function getOrdenes($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $dataorden = $data->data;

        if($dataorden->idrol != 1){
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nivel de usuario no valido';

        }else if(isset($dataorden->inicio)){

            if(!isset($dataorden->orderby)){
                $response['code'] = 2;
                $response['error'] = true;
                $response['message'] = 'Se requiere de el tipo de orden';
    
            }else{
                $inicio = $dataorden->inicio;
                $limite = $dataorden->limite;
    
                $sql = "SELECT * FROM `pedidos` ORDER BY ".$dataorden->orderby." ".$dataorden->order." LIMIT ".$inicio.",".$limite." ";
                $pedidos = $conexion->consulta($sql);
                $response['pedidos'] = $pedidos;
            }
        }else{
            $sql = "SELECT * FROM `pedidos`";

            $pedidos = $conexion->consulta($sql);
            $response['pedidos'] = $pedidos;
        }

        return $response;
    }

    function modifyOrden($data) {

        global  $conexion, $seguridad;      
    
        $response = array();
                
        $dataorden = $data->data;

        if (empty($dataorden->idusuario)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Usuario de la orden vacío.';
        } else if (empty($dataorden->idpedidos)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Id de orden vacío.';
        } else if (empty($dataorden->fecha)) {
            $response['code'] = 3;
            $response['error'] = true;
            $response['message'] = 'Fecha vacía.';
        } else if (empty($dataorden->fechaentrega)) {
            $response['code'] = 4;
            $response['error'] = true;
            $response['message'] = 'Fecha de entrega vacía.';
        } else if (empty($dataorden->correo)) {
            $response['code'] = 4;
            $response['error'] = true;
            $response['message'] = 'Correo de entrega vacío.';
        }else{

            $querty = "UPDATE pedidos SET idusuario=$dataorden->idusuario, correo='$dataorden->correo', total=$dataorden->total, fecha='$dataorden->fecha', fechaentrega='$dataorden->fechaentrega', descripcion='$dataorden->descripcion', direccion='$dataorden->direccion', status='$dataorden->status' WHERE idpedidos=$dataorden->idpedidos";

            $conexion->consulta($querty);

            $response['message'] = 'Pedido modificado con éxito';
        }

        return $response;
    }

    function deleteOrden($data) {

        global  $conexion, $seguridad;      
    
        $response = array();
                
        $dataorden = $data->data;

        if (empty($dataorden->idpedidos)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Id vacío.';
        }else{
            $descuentoid = $conexion->consulta("SELECT * FROM `pedidos` WHERE `idpedidos` = $dataorden->idpedidos");
            
            // verificar si el usuario esta registrado
            if (!empty($descuentoid)) {       
                $querty = "DELETE FROM `pedidos` WHERE `idpedidos` = $dataorden->idpedidos";
                $conexion->consulta($querty);

                $response['message'] = 'Descuento borrado con éxito';
            }else{
                $response['code'] = 9;
                $response['error'] = true;
                $response['message'] = 'Este pedido no existe en la base de datos';
                $response['id'] = $dataorden->idpedidos;               
            }       
        }
        return $response;
    }

    function totalOrdenesUser($data) {
        
        global  $conexion, $seguridad;      

        $dataorden = $data->data;
    
        $response = array();
        
        $Totalpedidos = $conexion->consulta("SELECT COUNT(*) FROM `pedidos` WHERE idusuario=$dataorden->idusuario");

        $response['Totalpedidos'] = reset($Totalpedidos[0]);
        // $response['Totalpedidos'] = $Totalpedidos;
        

        return $response;
    }

    function getOrdenesUser($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $dataorden = $data->data;

        if(isset($dataorden->inicio)){

            if(!isset($dataorden->orderby)){
                $response['code'] = 2;
                $response['error'] = true;
                $response['message'] = 'Se requiere de el tipo de orden';
    
            }else{
                $inicio = $dataorden->inicio;
                $limite = $dataorden->limite;
    
                $sql = "SELECT * FROM `pedidos` WHERE idusuario=$dataorden->idusuario ORDER BY ".$dataorden->orderby." ".$dataorden->order." LIMIT ".$inicio.",".$limite." ";
                $pedidos = $conexion->consulta($sql);
                $response['pedidos'] = $pedidos;
            }
        }else{
            $sql = "SELECT * FROM `pedidos`";

            $pedidos = $conexion->consulta($sql);
            $response['pedidos'] = $pedidos;
        }

        return $response;
    }
}

?>