<?php
class NewUser
{
    function __construct(){

    }
    
    function newUser ($data) {
        
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

            // verificar si el correo ya está siendo utilizado por otro usuario
            if (empty($user)) {

                $username = $conexion->consulta("SELECT * FROM `usuarios` WHERE correo = '".$datauser->correo."' ");    
                    // encriptar contrasena
                    // $pass_encrypt = password_hash($datauser->password,PASSWORD_DEFAULT);                    
    
                    $querty = "INSERT INTO `usuarios` (nom_usuario,correo,username,contrasena,idrol,direccion,telefono) VALUES ('".$datauser->nom_usuario."','".$datauser->correo."','".$datauser->username."','".$datauser->contrasena."',".$datauser->idrol.",'".$datauser->direccion."','".$datauser->telefono."')";
    
                    $conexion->consulta($querty);
    
                    $response['message'] = 'Usuario agregado con éxito';
                  
            }else{
                $response['code'] = 9;
                $response['error'] = true;
                $response['message'] = 'Este correo ya está siendo usado por un usuario';
            }       
        }

        return $response;
    }
}

?>