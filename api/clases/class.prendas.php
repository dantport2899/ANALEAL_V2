<?php
class Prendas
{
    function __construct(){

    }
    
    function newPrenda ($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $dataprenda = $data->data;

        if (empty($dataprenda->nom_prenda)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nombre de prenda vacío.';
        } else if (empty($dataprenda->precio)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Precio vacío.';
        }else if (empty($dataprenda->existencias)) {
            $response['code'] = 3;
            $response['error'] = true;
            $response['message'] = 'Existencias vacías.';
        }else{

            $sql = "Insert into prendas (nom_prenda,descripcion,img_nombre,img_archivo,iddepartamento,idtalla,existencias,color,idestilo,idmaterial,iddescuento,precio) values ('$dataprenda->nom_prenda','$dataprenda->descripcion','$dataprenda->img_nombre','$dataprenda->img_archivo',$dataprenda->iddepartamento,$dataprenda->idtalla,$dataprenda->existencias,'$dataprenda->color',$dataprenda->idestilo,$dataprenda->idmaterial,$dataprenda->iddescuento,$dataprenda->precio)";
            $result = $conexion->consulta($sql);


            $response['message'] = "Usuario agregado con exito";
        }

        return $response;
    }

    function totalPrendas() {
        

        global  $conexion, $seguridad;      
    
        $response = array();
        
        $Totalprendas = $conexion->consulta("SELECT COUNT(*) FROM `prendas`");

        $response['Totalprendas'] = reset($Totalprendas[0]);
        

        return $response;
    }

    function getPrendas($data) {
        
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
    
                $sql = "SELECT * FROM `prendas` ORDER BY ".$datalimite->orderby." ".$datalimite->order." LIMIT ".$inicio.",".$limite." ";
                $prendas = $conexion->consulta($sql);
                $response['prendas'] = $prendas;
            }
        }else{
            $sql = "SELECT * FROM `prendas`";

            $prendas = $conexion->consulta($sql);
            $response['prendas'] = $prendas;
        }

        return $response;
    }

    function modifyPrenda($data) {

        global  $conexion, $seguridad;      
    
        $response = array();
                
        $dataprenda = $data->data;

        if (empty($dataprenda->nom_prenda)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nombre de prenda vacío.';
        } else if (empty($dataprenda->idprenda)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Id de prenda vacío.';
        } else if (empty($dataprenda->precio)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Precio vacío.';
        }else if (empty($dataprenda->existencias)) {
            $response['code'] = 3;
            $response['error'] = true;
            $response['message'] = 'Existencias vacías.';
        }else{

            $querty = "UPDATE prendas SET nom_prenda='$dataprenda->nom_prenda', idtalla='$dataprenda->idtalla', precio='$dataprenda->precio', iddepartamento='$dataprenda->iddepartamento', color='$dataprenda->color', idmaterial='$dataprenda->idmaterial', idestilo='$dataprenda->idestilo', descripcion='$dataprenda->descripcion', existencias='$dataprenda->existencias', iddescuento='$dataprenda->iddescuento' WHERE idprenda='$dataprenda->idprenda'";

            $conexion->consulta($querty);

            $response['message'] = 'Prenda modificada con éxito';
        }

        return $response;
    }

    function deletePrenda($data) {

        global  $conexion, $seguridad;      
    
        $response = array();
                
        $datauser = $data->data;

        if (empty($datauser->idprenda)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Id vacío.';
        }else{
            $prendaid = $conexion->consulta("SELECT * FROM `prendas` WHERE `idprenda` = $datauser->idprenda");
            
            // verificar si el usuario esta registrado
            if (!empty($prendaid)) {       
                $querty = "DELETE FROM `prendas` WHERE `idprenda` = $datauser->idprenda";
                $conexion->consulta($querty);

                $response['message'] = 'Prenda borrada con éxito';
            }else{
                $response['code'] = 9;
                $response['error'] = true;
                $response['message'] = 'Esta prenda no existe en la base de datos';
                $response['id'] = $datauser->idprenda;               
            }       
        }
        return $response;
    }
}

?>