<?php
class Reportes
{
    function __construct(){

    }
    
    function newReporte($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $datareporte = $data->data;

        if (empty($datareporte->idprenda)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Prenda vacía.';
        } else if (empty($datareporte->accion)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Accion vacía.';
        }else{

            $fechaactual = date('Y-m-d H:i:s');


            $sql = "Insert into reportes (idprenda,accion,cantidad,fecha,idpedido) values ('$datareporte->idprenda','$datareporte->accion','$datareporte->cantidad','$fechaactual','$datareporte->idpedido')";
            $result = $conexion->consulta($sql);

            $sql = "SELECT `existencias` FROM `prendas` WHERE `idprenda`=$datareporte->idprenda";
            $prendas = $conexion->consulta($sql);

            if($datareporte->accion==1){
                $totalactual = $prendas[0]['existencias'] + $datareporte->cantidad;
            }else{
                $totalactual = $prendas[0]['existencias'] - $datareporte->cantidad;
            }

            $sql = "UPDATE prendas SET existencias='$totalactual' WHERE idprenda=$datareporte->idprenda";
            $prendas = $conexion->consulta($sql);

            $response['message'] = "Reporte guardado con exito";
        }

        return $response;
    }

    function totalReportes() {
        

        global  $conexion, $seguridad;      
    
        $response = array();
        
        $Totaldescuentos = $conexion->consulta("SELECT COUNT(*) FROM `reportes`");

        $response['Totalreportes'] = reset($Totaldescuentos[0]);
        

        return $response;
    }

    function getReportes($data) {
        
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
    
                $sql = "SELECT * FROM `reportes` ORDER BY ".$datalimite->orderby." ".$datalimite->order." LIMIT ".$inicio.",".$limite." ";
                $prendas = $conexion->consulta($sql);

                foreach ($prendas as $key => $prenda) {
                    $sql2 = "SELECT * FROM `prendas` WHERE idprenda=".$prenda['idprenda']."";
                    $prendainfo = $conexion->consulta($sql2);
                    $prendas[$key]['prenda'] = $prendainfo;
                }
                
                foreach ($prendas as $key => $prenda) {
                    if($prenda['idpedido']!=="1"){
                        $sql2 = "SELECT * FROM `pedidos` WHERE idpedidos=".$prenda['idpedido']."";
                        $pedidoinfo = $conexion->consulta($sql2);
                        $prendas[$key]['pedido'] = $pedidoinfo;
                    }
                }

                $response['reportes'] = $prendas;
            }
        }else{
            $sql = "SELECT * FROM `reportes`";

            $prendas = $conexion->consulta($sql);
            $response['reportes'] = $prendas;
        }

        return $response;
    }


    function deleteReporte($data) {

        global  $conexion, $seguridad;      
    
        $response = array();
                
        $datadescuento = $data->data;

        if (empty($datadescuento->idreporte)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Id vacío.';
        }else{
            $descuentoid = $conexion->consulta("SELECT * FROM `reportes` WHERE `idreporte` = $datadescuento->idreporte");
            
            // verificar si el usuario esta registrado
            if (!empty($descuentoid)) {       
                $querty = "DELETE FROM `reportes` WHERE `idreporte` = $datadescuento->idreporte";
                $conexion->consulta($querty);

                $response['message'] = 'Reporte borrado con éxito';
            }else{
                $response['code'] = 9;
                $response['error'] = true;
                $response['message'] = 'Este descuento no existe en la base de datos';
                $response['id'] = $datadescuento->idreporte;               
            }       
        }
        return $response;
    }
}

?>