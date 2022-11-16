<?php
class Galeria
{
    function __construct(){

    }
    
    function totalPrendasGaleria($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $sql = "SELECT COUNT(*) FROM `prendas`";

        if(!empty($data->data->departamentos) || !empty($data->data->tallas) || !empty($data->data->estilos) || !empty($data->data->materiales) || !empty($data->data->descuentos)){
            $sql = "$sql WHERE";

        }

        if(!empty($data->data->departamentos)){
            $limite = 1;
            $sql = "$sql (";

            foreach ($data->data->departamentos as $key => $departamento) {
                
                $sql = "$sql `iddepartamento` ='".$departamento."'";

                if(count($data->data->departamentos)!=$limite){
                    $sql = "$sql OR";
                }

                $limite++;
            }

            if (!empty($data->data->tallas) || !empty($data->data->estilos) || !empty($data->data->materiales) || !empty($data->data->descuentos)) {
                $sql = "$sql) AND";
            }else{
                $sql = "$sql) ";
            }
        }

        if(!empty($data->data->tallas)){
            $limite = 1;
            $sql = "$sql (";

            foreach ($data->data->tallas as $key => $talla) {
                
                $sql = "$sql `idtalla` ='".$talla."'";

                if(count($data->data->tallas)!=$limite){
                    $sql = "$sql OR";
                }

                $limite++;
            }

            if (!empty($data->data->estilos) || !empty($data->data->materiales) || !empty($data->data->descuentos)) {
                $sql = "$sql) AND";
            }else{
                $sql = "$sql) ";
            }
        }

        if(!empty($data->data->estilos)){
            $limite = 1;
            $sql = "$sql (";

            foreach ($data->data->estilos as $key => $estilo) {
                
                $sql = "$sql `idestilo` ='".$estilo."'";

                if(count($data->data->estilos)!=$limite){
                    $sql = "$sql OR";
                }

                $limite++;
            }

            if (!empty($data->data->materiales) || !empty($data->data->descuentos)) {
                $sql = "$sql) AND";
            }else{
                $sql = "$sql) ";
            }
        }

        if(!empty($data->data->materiales)){
            $limite = 1;
            $sql = "$sql (";

            foreach ($data->data->materiales as $key => $material) {
                
                $sql = "$sql `idmaterial` ='".$material."'";

                if(count($data->data->materiales)!=$limite){
                    $sql = "$sql OR";
                }

                $limite++;
            }

            if (!empty($data->data->descuentos)) {
                $sql = "$sql) AND";
            }else{
                $sql = "$sql) ";
            }
        }

        if(!empty($data->data->descuentos)){
            $limite = 1;
            $sql = "$sql (";

            foreach ($data->data->descuentos as $key => $descuento) {
                
                $sql = "$sql `iddescuento` ='".$descuento."'";

                if(count($data->data->descuentos)!=$limite){
                    $sql = "$sql OR";
                }

                $limite++;
            }

            $sql = "$sql)";

        }


        $Totalprendas = $conexion->consulta($sql);

        $response['Totalprendas'] = reset($Totalprendas[0]);
        $response['Consulta'] = $sql;

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
    
                $cadena= substr($datalimite->consulta, 31);
                $sql = "SELECT * FROM `prendas` ".$cadena." ORDER BY ".$datalimite->orderby." ".$datalimite->order." LIMIT ".$inicio.",".$limite." ";

                $prendas = $conexion->consulta($sql);
                $response['prendas'] = $prendas;
                // $response['prendas'] = $sql;
            }
        }else{
            $sql = "SELECT * FROM `prendas`";

            $prendas = $conexion->consulta($sql);
            $response['prendas'] = $prendas;
        }

        return $response;
    }
}

?>