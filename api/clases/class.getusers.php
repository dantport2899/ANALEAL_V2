<?php
class GetUsers
{
    function __construct(){

    }
    
    function getUsers ($data) {
        
        global  $conexion, $seguridad;      
    
        $response = array();

        $datauser = $data->data;
        
        if (empty($datauser->id)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Usuario no registrado en el sistema';
        } else if (((int)$datauser->user_types_id) !== 1 ) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'El usuario no tiene nivel para realizar esta accion.';
        } else if (((int)$datauser->estatus) >= 90 ) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'El usuario ya fue dado de baja del sistema.';
        }else{

            // varifica si existe un limite de paginacion
            if(isset($datauser->inflimit)){
                $inflimit = $datauser->inflimit;
                $suplimit = $datauser->suplimit;

                $users = $conexion->consulta("SELECT * FROM `users` WHERE estatus <90 LIMIT ".$inflimit.",".$suplimit."");
                $response['users'] = $users;

            }else{
                $users = $conexion->consulta("SELECT * FROM `users` WHERE estatus <90 ");
                $response['users'] = $users;
            }

            
        }

        return $response;
    }

    function totalUsers() {

        global  $conexion, $seguridad;      
    
        $response = array();
        
        $Totalusers = $conexion->consulta("SELECT COUNT(*) FROM `users` WHERE estatus <90 ");
        // $total_rows = mysqli_fetch_array($Totalusers)[0];



        $response['totalusers'] = reset($Totalusers[0]);
        

        return $response;
    }

    function modifyUser($data) {

        global  $conexion, $seguridad;      
    
        $response = array();
                
        $datauser = $data->data;

        if (empty($datauser->usuario)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nombre de usuario vacío.';
        }else if (empty($datauser->email)) {
            $response['code'] = 3;
            $response['error'] = true;
            $response['message'] = 'Correo vacío.';
        }else if (empty($datauser->telefono)) {
            $response['code'] = 4;
            $response['error'] = true;
            $response['message'] = 'Telefono vacío.';
        }else if (empty($datauser->first_name)) {
            $response['code'] = 5;
            $response['error'] = true;
            $response['message'] = 'Nombre vacío.';
        }else if (empty($datauser->last_name)) {
            $response['code'] = 6;
            $response['error'] = true;
            $response['message'] = 'Apellido vacío.';
        }else if (empty($datauser->umod)) {
            $response['code'] = 7;
            $response['error'] = true;
            $response['message'] = 'No eres un perfil registrado.';
        }else if (empty($datauser->user_types_id)) {
            $response['code'] = 8;
            $response['error'] = true;
            $response['message'] = 'No hay rol asignado.';

        }else{

            $user = $conexion->consulta("SELECT * FROM `users` WHERE email = '".$datauser->email."' ");

            $userid = $conexion->consulta("SELECT * FROM `users` WHERE `id` = $datauser->id ");
            $userid = $userid[0];

            $fechaActual = date('Y-m-d H:i:s');

                        
            // verificar si el correo ya está siendo utilizado por un usuario
            if (empty($user)) {

                $username = $conexion->consulta("SELECT * FROM `users` WHERE name_user = '".$datauser->usuario."' ");

                // verificar si el usuario ya está siendo utilizado por otro usuario
                if (empty($username)) {
                    $querty = "UPDATE `users` SET `name_user` = '".$datauser->usuario."',  `email` = '".$datauser->email."', `telefono` = '".$datauser->telefono."', `first_name` = '".$datauser->first_name."', `last_name` = '".$datauser->last_name."', `umod` = $datauser->umod, `fmod` = '".$fechaActual."', `user_types_id` = $datauser->user_types_id WHERE `users`.`id` = $datauser->id;";

                    $conexion->consulta($querty);

                    //modificar contrasena
                    if(!empty($datauser->password)){
                        // encriptar contrasena
                        $pass_encrypt = password_hash($datauser->password,PASSWORD_DEFAULT);
                        $quertypass = "UPDATE `users` SET  `password` = '".$pass_encrypt."' WHERE `users`.`id` = $datauser->id;";
                        $conexion->consulta($quertypass);
                    }
    
                    $response['Old mail'] = $userid['email'];
                    $response['New mail'] = $datauser->email;
                    $response['message'] = 'Username y correo modificados con éxito';
                    // $response['querty'] = $querty;
                    // print_r($user);
                }else{
                    //verificar si el username está siendo usado por este usuario 
                    if((string)$userid['name_user']===($datauser->usuario)){
                        $querty = "UPDATE `users` SET `email` = '".$datauser->email."', `telefono` = '".$datauser->telefono."', `first_name` = '".$datauser->first_name."', `last_name` = '".$datauser->last_name."', `umod` = $datauser->umod, `fmod` = '".$fechaActual."', `user_types_id` = $datauser->user_types_id WHERE `users`.`id` = $datauser->id;";
                        $conexion->consulta($querty);

                        //modificar contrasena
                        if(!empty($datauser->password)){
                            // encriptar contrasena
                            $pass_encrypt = password_hash($datauser->password,PASSWORD_DEFAULT);
                            $quertypass = "UPDATE `users` SET  `password` = '".$pass_encrypt."' WHERE `users`.`id` = $datauser->id;";
                            $conexion->consulta($quertypass);
                        }

                        $response['message'] = 'Usuario modificado con éxito';

                    }else{
                        $response['code'] = 9;
                        $response['error'] = true;
                        $response['message'] = 'Este Username ya está siendo usado por un usuario';
                    }
                }

            }else{

                //verificar si el correo está siendo usado por este usuario 
                if((string)$userid['email']===($datauser->email)){

                    $username = $conexion->consulta("SELECT * FROM `users` WHERE name_user = '".$datauser->usuario."' ");

                    // verificar si el usuario ya está siendo utilizado por otro usuario
                    if(empty($username)){
                        $querty = "UPDATE `users` SET `name_user` = '".$datauser->usuario."', `telefono` = '".$datauser->telefono."', `first_name` = '".$datauser->first_name."', `last_name` = '".$datauser->last_name."', `umod` = $datauser->umod, `fmod` = '".$fechaActual."', `user_types_id` = $datauser->user_types_id WHERE `users`.`id` = $datauser->id;";
                        $conexion->consulta($querty);

                        //modificar contrasena
                        if(!empty($datauser->password)){
                            // encriptar contrasena
                            $pass_encrypt = password_hash($datauser->password,PASSWORD_DEFAULT);
                            $quertypass = "UPDATE `users` SET  `password` = '".$pass_encrypt."' WHERE `users`.`id` = $datauser->id;";
                            $conexion->consulta($quertypass);
                        }

                        $response['message'] = 'Usuario modificado con éxito';

                    }else{
                        //verificar si el username está siendo usado por este usuario 
                        if((string)$userid['name_user']===($datauser->usuario)){
                            $querty = "UPDATE `users` SET `name_user` = '".$datauser->usuario."', `email` = '".$datauser->email."', `telefono` = '".$datauser->telefono."', `first_name` = '".$datauser->first_name."', `last_name` = '".$datauser->last_name."', `umod` = $datauser->umod, `fmod` = '".$fechaActual."', `user_types_id` = $datauser->user_types_id WHERE `users`.`id` = $datauser->id;";
                            $conexion->consulta($querty);

                            //modificar contrasena
                            if(!empty($datauser->password)){
                                // encriptar contrasena
                                $pass_encrypt = password_hash($datauser->password,PASSWORD_DEFAULT);
                                $quertypass = "UPDATE `users` SET  `password` = '".$pass_encrypt."' WHERE `users`.`id` = $datauser->id;";
                                $conexion->consulta($quertypass);
                            }
                            $response['message'] = 'Usuario modificado con éxito';

                        }else{
                            $response['code'] = 9;
                            $response['error'] = true;
                            $response['message'] = 'Este Username ya está siendo usado por un usuario';
                        }
                    }

                }else{
                    $response['code'] = 9;
                    $response['error'] = true;
                    $response['message'] = 'Este correo ya está siendo usado por un usuario';
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
        }else if (empty($datauser->umod)) {
            $response['code'] = 7;
            $response['error'] = true;
            $response['message'] = 'Error: usuario no registrado';
        }else{
            //el usuario desea borrar los documentos asociados
            if($datauser->documentdelete===true){
                $userid = $conexion->consulta("SELECT * FROM `users` WHERE `id` = $datauser->id ");
                $fechaActual = date('Y-m-d H:i:s');
                
                // verificar si el usuario esta registrado
                if (!empty($userid)) {       
                    $querty = "UPDATE `users` SET `estatus` = 90 ,`umod` = $datauser->umod, `fmod` = '".$fechaActual."' WHERE `users`.`id` = $datauser->id;";
                    $conexion->consulta($querty);

                    $quertydocdelete = "UPDATE `documentos` SET `estatus` = 90 ,`umod` = $datauser->umod, `fmod` = '".$fechaActual."' WHERE `documentos`.`users_id` = $datauser->id;";
                    $conexion->consulta($quertydocdelete);

                    $response['message'] = 'Usuario y documentos asignados borrados con éxito';
                }else{
                    $response['code'] = 9;
                    $response['error'] = true;
                    $response['message'] = 'Este perfil no existe en la base de datos';
                    $response['id'] = $datauser->id;               
                }       
            }else{
                $userid = $conexion->consulta("SELECT * FROM `users` WHERE `id` = $datauser->id ");
                $fechaActual = date('Y-m-d H:i:s');
                
                // verificar si el usuario esta registrado
                if (!empty($userid)) {       
                    $querty = "UPDATE `users` SET `estatus` = 90 ,`umod` = $datauser->umod, `fmod` = '".$fechaActual."' WHERE `users`.`id` = $datauser->id;";
                    $conexion->consulta($querty);
                    $response['message'] = 'Usuario borrado con éxito';
                }else{
                    $response['code'] = 9;
                    $response['error'] = true;
                    $response['message'] = 'Este perfil no existe en la base de datos';
                    $response['id'] = $datauser->id;               
                }       
            }    
        }

        return $response;

    }

    function searchUser($data){
        global  $conexion, $seguridad;      

        $response = array();

        $datauser = $data->data;
        
        if (empty($datauser->id)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Usuario no registrado';
        }else if (empty($datauser->data_search)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'No se ingresó ningún parámetro de búsqueda.';
        } else if (($datauser->estatus) >= 90 ) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'El usuario ya fue dado de baja del sistema.';
        }else{

            $inflimit = $datauser->inflimit;
            $suplimit = $datauser->suplimit;
            
            if(is_numeric($datauser->data_search)){
                $datauser->data_search = (string)$datauser->data_search; 
            }

            $name_user = "SELECT * FROM `users` WHERE estatus <90 AND (`telefono` LIKE '%".$datauser->data_search."%' OR `name_user` LIKE  '%".$datauser->data_search."%' OR  `email` LIKE '%".$datauser->data_search."%' OR `first_name` LIKE '%".$datauser->data_search."%' OR `last_name` LIKE '%".$datauser->data_search."%') LIMIT ".$inflimit.",".$suplimit."";
            $name_userresp = $conexion->consulta($name_user);
    
            if (!empty($name_userresp)) {
                $response['users'] = $name_userresp;
                        
            }else{
                $response['error'] = true;
                $response['message'] = 'No se han encontrado resultados';
            }
                           
            
        }
        
        return $response;
    }

    function totalsearchUsers($data) {

        global  $conexion, $seguridad;      
    
        $response = array();

        $datauser = $data->data;

        if(empty($datauser->data_search)){
            $response['code'] = 2;
            $response['error'] = true;
            $Totaldocuments = $conexion->consulta("SELECT COUNT(*) FROM `users` WHERE estatus <90");
            $response['totalusers'] = reset($Totaldocuments[0]);
            $response['message'] = 'No se ingresó ningún parámetro de búsqueda.';
        }else{
            // $Totalusers = $conexion->consulta("SELECT COUNT(*) FROM `users` WHERE estatus <90 AND ()");
            // $total_rows = mysqli_fetch_array($Totalusers)[0];

            // $response['totalusers'] = reset($Totalusers[0]);

            if(is_numeric($datauser->data_search)){
                $datauser->data_search = (string)$datauser->data_search; 
            }
                
            $name_user = "SELECT COUNT(*) FROM `users` WHERE estatus <90 AND (`telefono` LIKE '%".$datauser->data_search."%' OR `name_user` LIKE  '%".$datauser->data_search."%' OR  `email` LIKE '%".$datauser->data_search."%' OR `first_name` LIKE '%".$datauser->data_search."%' OR `last_name` LIKE '%".$datauser->data_search."%');";
            $name_userresp = $conexion->consulta($name_user);

            if (!empty($name_userresp)) {
                $response['totalusers'] = reset($name_userresp[0]);
                    
            }else{     
                $response['totalusers'] = reset($name_userresp[0]);
            }
                  
        }
        
        
        

        return $response;
    }

}

?>