<?php
class Verificar
{
    function __construct(){

    }
    
    function verificar ($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $data = $data->data;

        $total=0;
        $SID=$data->idusario;
        $correo=$data->payer->email_address;
        $clavetrnsaccion="Indefinida";
        $direccion=$data->direccion;
        $i=0;


        foreach ($data->carrito as $indice=>$producto) 
        {
            $total=$total+($producto->cantidad*$producto->precio);
            $i++;
        }

        settype($i,"string");
        $descripcion="El usuario: " .$correo. " compro " .$i. " productos";

        $sql="INSERT INTO `pedidos` (`idpedidos`, `clavetransaccion`, `paypaldatos`, `idusuario`, `correo`, `total`, `fecha`, `fechaentrega`, `descripcion`, `direccion`, `status`) VALUES (NULL, '$clavetrnsaccion', '', '$SID', '$correo', '$total', NOW(), NULL, '$descripcion', '$direccion', 'Pendiente');SELECT `idpedidos` AS LastID FROM `pedidos` WHERE `idpedidos` = @@Identity;" ;

        // $result=mysqli_query($conexion, $sql);
        $result = $conexion->consulta($sql);

        $ultimoID = $conexion->consulta('SELECT MAX(idpedidos) FROM pedidos;');
        $ultimoID = $ultimoID[0]['MAX(idpedidos)'];

        if($result)
        {

        }else
        {
            $response['message'] = mysqli_error($conexion);
        }

        foreach ($data->carrito as $indice=>$producto) 
        {
            $sql2="INSERT INTO `carrito` (`idcarrito`, `idpedido`, `idprenda`, `preciounitario`, `cantidad`, `vendido`) VALUES (NULL, '$ultimoID', '".$producto->idprenda."', '".$producto->precio."', '".$producto->cantidad."', '0')";
            $result2 = $conexion->consulta($sql2);

            if($result2)
            {
                // clavetransaccion($data,$ultimoID);
            
            }else
            {
                $response['message'] = mysqli_error($conexion);
            }
            
        }

        $response['message'] = $this->clavetransaccion($data,$ultimoID);
        
        // $response['message'] = $sql2;

        return $response;
    }

    function clavetransaccion($data,$ultimoID){
        global  $conexion, $seguridad;  

        define("KEY","analeal");
        define("COD","AES-128-ECB");

        $ClientID="ASPDmLQQH-Uod0VBYyp5n6dM_WWfnuF59F24M77ZzCV07LJMY37UsomtZFAYc5frw36EM2V8e8VkOTxH";
        $Secret="EAbAtRbh5IMTjY2cbPu0r0_LyRVrv3slzh7DSX3mg4opklitBNvUi6LpoA0gFxFsgCTR4He797igek_6";
        $paymentID= $data->orderID;

        $Login= curl_init("https://api.sandbox.paypal.com/v1/oauth2/token");


        curl_setopt($Login,CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($Login,CURLOPT_RETURNTRANSFER,TRUE);
        curl_setopt($Login,CURLOPT_USERPWD,$ClientID.":".$Secret);
        curl_setopt($Login,CURLOPT_POSTFIELDS,"grant_type=client_credentials");
        $Respuesta=curl_exec($Login);

        $objRespuesta = json_decode($Respuesta);

        $AccesToken = $objRespuesta->access_token;

        //print_r($AccesToken);

        $venta= curl_init("https://api.sandbox.paypal.com/v2/checkout/orders/".$paymentID);

        curl_setopt($venta,CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($venta,CURLOPT_HTTPHEADER,array("Content-Type: application/json","Authorization: Bearer ".$AccesToken));
        curl_setopt($venta,CURLOPT_RETURNTRANSFER,TRUE);

        $RespuestaVenta=curl_exec($venta);


        //print_r($RespuestaVenta);

        $objDatosTransaccion=json_decode($RespuestaVenta);

        $state=$objDatosTransaccion->status;
        $email=$objDatosTransaccion->payer->email_address;
        $total=$objDatosTransaccion->purchase_units[0]->amount->value;
        $currency=$objDatosTransaccion->purchase_units[0]->amount->currency_code;
        
        $claveventa=$ultimoID;


        if($state=="COMPLETED")
        {

            $sql3="UPDATE `pedidos` SET `paypaldatos` = '$RespuestaVenta', `clavetransaccion` = '$AccesToken' ,`status` = 'Aprovado' WHERE `pedidos`.`idpedidos` = '$claveventa';";

            $result3 = $conexion->consulta($sql3);

            if($result3)
            {
            }else
            {
                $response['message'] = mysqli_error($conexion);
            }

            foreach ($data->carrito as $key => $prenda) {
                $fechaactual = date('Y-m-d H:i:s');

                $sql4 = "Insert into reportes (idprenda,accion,cantidad,fecha,idpedido) values ('$prenda->idprenda','-1','$prenda->cantidad','$fechaactual','$claveventa')";
                $result = $conexion->consulta($sql4);
    
                $sql = "SELECT `existencias` FROM `prendas` WHERE `idprenda`=$prenda->idprenda";
                $prendas = $conexion->consulta($sql);
    
                $totalactual = $prendas[0]['existencias'] - $prenda->cantidad;
    
                $sql = "UPDATE prendas SET existencias='$totalactual' WHERE idprenda=$prenda->idprenda";
                $prendas = $conexion->consulta($sql);
    
            }


            $return = "Compra completada correctamente.";

        }else{
            $return = "Problema al completar el pago.";
            
        }

        


        return $return;

    }

}

?>