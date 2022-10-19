<?php
class GetUsers
{
    function __construct(){

    }

    function modifyUser($data) {

        global  $conexion, $seguridad;      
    
        $response = array();
                
        $datauser = $data->data;

        if (empty($datauser->nom_usuario)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nombre de usuario vacío.';
        } else if (empty($datauser->contrasena)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Contraseña vacía.';
        }else if (empty($datauser->correo)) {
            $response['code'] = 3;
            $response['error'] = true;
            $response['message'] = 'Correo vacío.';
        }else if (empty($datauser->telefono)) {
            $response['code'] = 4;
            $response['error'] = true;
            $response['message'] = 'Teléfono vacío.';
        }else if (empty($datauser->username)) {
            $response['code'] = 5;
            $response['error'] = true;
            $response['message'] = 'Username vacío.';
        }else if (empty($datauser->direccion)) {
            $response['code'] = 6;
            $response['error'] = true;
            $response['message'] = 'Direccion vacía.';
        }else if (empty($datauser->idrol)) {
            $response['code'] = 8;
            $response['error'] = true;
            $response['message'] = 'No hay rol asignado.';

        }else{

            $user = $conexion->consulta("SELECT * FROM `usuarios` WHERE correo = '".$datauser->correo."' ");

            $userid = $conexion->consulta("SELECT * FROM `usuarios` WHERE `idusuario` = $datauser->idusuario");
            $userid = $userid[0];
                        
            // verificar si el correo ya está siendo utilizado por un usuario
            if (empty($user)) {

                $querty = "UPDATE `usuarios` SET `nom_usuario` = '".$datauser->nom_usuario."',  `correo` = '".$datauser->correo."',  `username` = '".$datauser->username."', `contrasena` = '".$datauser->contrasena."', `idrol` = ".$datauser->idrol.", `direccion` = '".$datauser->direccion."', `telefono` = '".$datauser->telefono."' WHERE `usuarios`.`idusuario` = $datauser->idusuario";

                $conexion->consulta($querty);

                $response['Old mail'] = $userid['correo'];
                $response['New mail'] = $datauser->correo;
                $response['message'] = 'Correo e informacion modificados con éxito';
            }else{

                //verificar si el correo está siendo usado por este usuario 
                if((string)$userid['correo']===($datauser->correo)){

                    $querty = "UPDATE `usuarios` SET `nom_usuario` = '".$datauser->nom_usuario."',  `username` = '".$datauser->username."', `contrasena` = '".$datauser->contrasena."', `idrol` = ".$datauser->idrol.", `direccion` = '".$datauser->direccion."', `telefono` = '".$datauser->telefono."' WHERE `usuarios`.`idusuario` = $datauser->idusuario";

                    $conexion->consulta($querty);

                    $response['message'] = 'Usuario modificado con éxito';
                }else{
                    $response['code'] = 9;
                    $response['error'] = true;
                    $response['message'] = 'Este correo ya está siendo usado por un usuario';
                    // $response['message'] = $userid;
                }
            }       
        }
        return $response;
    }


    function deleteUser($data) {

        global  $conexion, $seguridad;      
    
        $response = array();
                
        $datauser = $data->data;

        if (empty($datauser->id)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Id vacío.';
        }else{
            $userid = $conexion->consulta("SELECT * FROM `usuarios` WHERE `idusuario` = $datauser->id ");
            
            // verificar si el usuario esta registrado
            if (!empty($userid)) {       
                $querty = "DELETE FROM `usuarios` WHERE `idusuario` = $datauser->id";
                $conexion->consulta($querty);

                $response['message'] = 'Usuario borrado con éxito';
            }else{
                $response['code'] = 9;
                $response['error'] = true;
                $response['message'] = 'Este perfil no existe en la base de datos';
                $response['id'] = $datauser->id;               
            }       
        }
        return $response;
    }
}

?>