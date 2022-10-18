<?php
class NewUser
{
    function __construct(){

    }
    
    function newUser ($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $datauser = $data->data;

        if (empty($datauser->usuario)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nombre de usuario vacío.';
        } else if (empty($datauser->password)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Contraseña vacía.';
        }else if (empty($datauser->email)) {
            $response['code'] = 3;
            $response['error'] = true;
            $response['message'] = 'Correo vacío.';
        }else if (empty($datauser->telefono)) {
            $response['code'] = 4;
            $response['error'] = true;
            $response['message'] = 'Teléfono vacío.';
        }else if (empty($datauser->first_name)) {
            $response['code'] = 5;
            $response['error'] = true;
            $response['message'] = 'Nombre vacío.';
        }else if (empty($datauser->last_name)) {
            $response['code'] = 6;
            $response['error'] = true;
            $response['message'] = 'Apellido vacío.';
        }else if (empty($datauser->ualta)) {
            $response['code'] = 7;
            $response['error'] = true;
            $response['message'] = 'No eres un perfil registrado.';
        }else if (empty($datauser->user_types_id)) {
            $response['code'] = 8;
            $response['error'] = true;
            $response['message'] = 'No hay rol asignado.';

        }else{

            $user = $conexion->consulta("SELECT * FROM `users` WHERE email = '".$datauser->email."' ");

            // verificar si el correo ya está siendo utilizado por otro usuario
            if (empty($user)) {

                $username = $conexion->consulta("SELECT * FROM `users` WHERE name_user = '".$datauser->usuario."' ");

                // verificar si el usuario ya está siendo utilizado por otro usuario
                if (empty($username)) {
                    $fechaActual = date('Y-m-d H:i:s');
                    $status=0;
    
                    // encriptar contrasena
                    $pass_encrypt = password_hash($datauser->password,PASSWORD_DEFAULT);                    
    
                    $querty = "INSERT INTO `users` (`name_user`,`password`,`email`,`telefono`,`first_name`,`estatus`,`last_name`,`ualta`,`falta`,`umod`,`fmod`,`user_types_id`) VALUES ('".$datauser->usuario."','".$pass_encrypt."','".$datauser->email."','".$datauser->telefono."','".$datauser->first_name."',".$status.",'".$datauser->last_name."',".$datauser->ualta.",'".$fechaActual."',".$datauser->ualta.",'".$fechaActual."',".$datauser->user_types_id.");";
    
                    $conexion->consulta($querty);
    
                    $response['message'] = 'Usuario agregado con éxito';
                    // $response['querty'] = $querty;
                    // print_r($user);
                }else{
                    $response['code'] = 9;
                    $response['error'] = true;
                    $response['message'] = 'Este nombre de usuario ya está siendo usado por un usuario';
                }       
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