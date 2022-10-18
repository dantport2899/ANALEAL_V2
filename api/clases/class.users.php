<?php

class Usuarios {

    function __construct(){

    }
    
    function get_tecnicos_cuenta ( $cuenta_ID ) {

        global $conexion;
        $response = array();

        $usuarios = $conexion->consulta("SELECT u.* FROM users AS u INNER JOIN usermeta AS m ON u.users_perfiles_id = 2 AND m.users_ID = u.id AND m.meta_key = 'cuenta_id' WHERE u.users_perfiles_id = 2 AND m.meta_value = ".$cuenta_ID);

        $i = 1;
        foreach ($usuarios as $key => $value) {

            $data = $this->get_perfil_metas($value['ID']);

            $response[] = array(
            	'id' => (int) $value['ID'],
                'no' => (int) $i,
            	'nombre' => $data['first_name'].' '.$data['last_name'],
            	'email' => '<a class="text-truncate" href="mailto:'.$value['user_email'].'">'.$value['user_email'].'</a>',
            	'telefono' => isset($data['phone'])?$data['phone']:'',

            );

            $i++;
           
        }

        return $response;
       
    }

    function get_perfil_metas ( $id_usuario ) {

        global $conexion, $conf_host_images;

        $response = array();

        $query = "SELECT * FROM `metadata_usuarios` WHERE usuarios_id = ".$id_usuario;
        
        $usermeta = $conexion->consulta($query);

        if(count($usermeta)>0){
            $response['image']='assets/images/placeholder.png';
        }

        foreach ($usermeta as $key => $value) {
            
            if ($value['meta_key'] == 'cuenta_id') {
                $response['cuenta_id'] = $value['meta_value'];
            }

            if ($value['meta_key'] == 'first_name') {
                $response['first_name'] = $value['meta_value'];
            }

            if ($value['meta_key'] == 'last_name') {
                $response['last_name'] = $value['meta_value'];
            }

            if ($value['meta_key'] == 'calle') {
                $response['calle'] = $value['meta_value'];
            }

            if ($value['meta_key'] == 'colonia') {
                $response['colonia'] = $value['meta_value'];
            }

            if ($value['meta_key'] == 'zip') {
                $response['zip'] = $value['meta_value'];
            }

            if ($value['meta_key'] == 'estado') {
                $response['estado'] = $value['meta_value'];
            }

            if ($value['meta_key'] == 'ciudad') {
                $response['ciudad'] = $value['meta_value'];
            }

            if ($value['meta_key'] == 'phone') {
                $response['phone'] = $value['meta_value'];
            }

            if ($value['meta_key'] == 'user_level') {
                $response['user_level'] = $value['meta_value'];
            }


            if ($value['meta_key'] == 'image') {

                $filename="";
                if(empty($value['meta_value'])){
                    $filename = $this->generarAvatar($id_usuario, $response['first_name']." ".$response['last_name'], 'image');
                }

                $response['image'] = !empty($value['meta_value'])? $conf_host_images.$value['meta_value'] : $conf_host_images.$filename;
                $response['imagename'] = !empty($value['meta_value'])? $value['meta_value'] : $filename;
            }



            if ($value['meta_key'] == 'image_thumb') {
                $response['image_thumb'] = !empty($value['meta_value'])? $conf_host_images.$value['meta_value']: $conf_host_images.$this->generarAvatar($id_usuario, $response['first_name']." ".$response['last_name'], 'image_thumb');
            }

            if ($value['meta_key'] == 'user_level') {
                $response['user_level'] = (int) $value['meta_value'];
            }

            if ($value['meta_key'] == 'idinterno') {
                $response['idinterno'] = (int) $value['meta_value'];
            }

        }

        return $response;
    
    }

    function get_byemail( $email ) {

        global $conexion;

        $data = $conexion->consulta("SELECT * FROM `usuarios` WHERE email = '".$email."'")[0];
        $user = $data;

        $data = $this->get_perfil_metas($user['id']);


        $response = array(
            'ID' => (int) $user['id'],
            'status' => (int) $user['estatus'],
            'nombre' => $user['nombres'],
            'apellidos' => $user['appat']." ".$user['apmat'],
            'nameuser' => $user['nameuser'],
            'telefono' => $user['telefono'],
            'movil' => $user['movil'],
            'email' => $user['email'],
            'RFC' => $user['RFC'],
            
            'estado' => $data['estado'],
            'ciudad' => $data['ciudad'],
            'zip' => $data['zip'],
            'calle' => $data['calle'],
            'colonia' => $data['colonia'],
            //'query' => "SELECT * FROM `usuarios` WHERE email = ".$email,
        );

        return (object) $response;

    }

    function get_user ( $id_usuario ) {

        global $conexion;

        $data = $conexion->consulta("SELECT u.*, d.nombre as nombre_departamento FROM `usuarios` u INNER JOIN departamentos d ON d.id=u.departamentos_id  WHERE u.id = ".$id_usuario)[0];
        $user = $data;

        $data = $this->get_perfil_metas($user['id']);


        $response = array(
            'ID' => (int) $user['id'],
            'status' => (int) $user['estatus'],
            'nombre' => $user['nombres'],
            'apellidos' => $user['appat']." ".$user['apmat'],
            'nameuser' => $user['nameuser'],
            'telefono' => $user['telefono'],
            'movil' => $user['movil'],
            'email' => $user['email'],
            'RFC' => $user['RFC'],
            
            'estado' => $user['estado'],
            'ciudad' => $user['ciudad'],
            'zip' => $user['zip'],
            'calle' => $user['calle'],
            'colonia' => $user['colonia'],
            'departamentos_id' => $user['departamentos_id'],
            'departamento' => $user['nombre_departamento'],
            
        );

        return (object) $response;

    }

    function get_perfil ( $id_usuario ) {

        global $conexion;

        $data = $conexion->consulta("SELECT * FROM `users` WHERE ID = ".$id_usuario)[0];
        $user = $data;

        $data = $this->get_perfil_metas($user['ID']);

        $response = array(
            'ID' => (int) $user['ID'],
            'status' => (int) $user['user_status'],
            'nombre' => $data['first_name'],
            'apellidos' => $data['last_name'],
            'calle' => $data['calle'],
            'colonia' => $data['colonia'],
            'zip' => $data['zip'],
            'estado' => $data['estado'],
            'ciudad' => $data['ciudad'],
            'phone' => $data['phone'],
            'email' => $user['user_email'],
            'image' => $data['image'],
            'image_thumb' => $data['image_thumb'],
            'user_nicename' => $user['user_nicename'],
            'user_level' => $data['user_level'],
            'cuenta_id' => $data['cuenta_id'],
        );

        return (object) $response;

    }

    function save_perfil($data){
         global $conexion, $conf_host_images;

         $response = array();
         $response['message']="Su información se ha actualizado con éxito.";

         $uid= (int)$data['ID'];
         if($uid>0)
         {
            $perfilmetas = $this->get_perfil_metas($uid);
            $compare= $perfilmetas['first_name']." ".$perfilmetas['last_name'];

             $query= "UPDATE users SET user_nicename='".$data['user_nicename']. "', user_email='".$data['user_email']."' WHERE ID=".$uid;
             $conexion->consulta($query);

             if(strlen($data['user_pass'])>0 && $data['user_pass']!=='********')
             {
                $hash = password_hash($data['user_pass'], PASSWORD_BCRYPT);
                $query= "UPDATE users SET user_pass='".$hash. "' WHERE ID=".$uid;
                $conexion->consulta($query);
             }

             foreach ($data as $key => $value) {
                 # code...

                if($key!=="user_pass" && $key!=="ID" && $key!=="user_nicename" && $key!=="user_nicename" && $key!=="action" && $key!=="image" && $key!=="image_thumb" && $key!=="file" && $key!=="user_email"){

                    $query="SELECT * FROM usermeta WHERE users_ID=".$uid. " AND meta_key='".$key."'";
                    $metaExists = $conexion->consulta($query); 

                    if(count($metaExists)>0)
                    {
                        $query= "UPDATE usermeta SET meta_value='".$value."' WHERE users_ID=".$uid. " AND meta_key='".$key."'";
                    }
                    else{
                        $query= "INSERT INTO usermeta(meta_value,users_ID, meta_key ) VALUES('".$value."', ".$uid. ", '".$key."')";
                    }
                    $conexion->consulta($query);
                }

                
                if($key==="image"){
                    if(strpos($value,"base64")>0){
                        $retval = $this->generateImageUsuario($uid, $value);

                        if(!$retval){
                            $response['error']=true;
                            $response['message']="No pudo generarse la imagen.";
                        }
                        else{
                            $response['imagen']=$conf_host_images.$retval;
                        }
                    }
                    else{
                        if($compare !== $data['first_name']." ".$data['last_name']){
                            $imagenNueva = $this->generarAvatar($uid, $data['first_name']." ".$data['last_name'], 'image', true);
                            $response['imagen']= $conf_host_images.$imagenNueva;

                            $folderPath = '../uploads/';
                            unlink($folderPath.$perfilmetas['imagename']);
                            $response['delete_image']= $folderPath.$perfilmetas['imagename'];
                        }
                    }
                }
             }
         }
         
         return (object) $response;
    }

    function random_color_part() {
        return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
    }

    function random_color() {
        return $this->random_color_part() . $this->random_color_part() . $this->random_color_part();
    }

    function generarAvatar($id, $name, $typeImage, $force=null) {

        global $conexion;

        $retval = false;

        $nameparts = explode(" ",$name);
        $string = substr($nameparts[0], 0, 1); 
        $string .= "+".substr($nameparts[1], 0, 1); 

        $imageFilePath="";
        $query="SELECT * FROM usermeta WHERE users_ID=".$id. " AND meta_key='".$typeImage."'";
        $metaExists = $conexion->consulta($query); 

        
        $generateAvatar = false;
        $update = "update";

        if(count($metaExists)>0)
        {
            if(strlen($metaExists[0]['meta_value'])<=0)
            {
                $generateAvatar=true;
            }
            else{

                if(strpos($metaExists[0]['meta_value'], "_Avatar")>0){
                    //Quiere decir que es imagen avatar
                    //Validar cambio en nombres
                    //$perfilmetas = $this->get_perfil_metas($id);
                    //$compare= $perfilmetas['first_name']." ".$perfilmetas['last_name'];
                    //echo $compare."!==".$name;
                    if($force==true){
                        //"Si debe regenerarla ".$update;
                        $generateAvatar=true;
                    }
                    else{
                        $update= "none";
                    }
                }
                else{
                     $update= "none";
                }
            }
        }
        else{
            $generateAvatar=true;
            $update = "insert";
        }


        if($update=="none"){
            return $retval;
        }
        else{
            

            $folderPath = '../uploads/';

            $file_name = $this->random_str('md5').'_Avatar.png';

            $imageFilePath = $folderPath . $file_name;


            $bgcolor = $this->random_color();
            // set url


            $ch = curl_init ("https://ui-avatars.com/api/?background=".$bgcolor."&color=fff&name=".$string."&size=128");
            curl_setopt($ch, CURLOPT_HEADER, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
            $raw=curl_exec($ch);
            curl_close ($ch);
            if(file_exists($imageFilePath)){
                unlink($imageFilePath);
            }
            $fp = fopen($imageFilePath,'x');
            if ($fp===false){

                //No existe uploads talvez se este mandado llamar esta funcion desde la carpeta safeti
                $folderPath = '../../uploads/';
                $imageFilePath = $folderPath . $file_name;

                $fp = fopen($imageFilePath,'x');
                if ($fp===false){
                    //echo "no pudo abrir el archivo problema de ruta 02";
                    return false;
                } 
            }
            fwrite($fp, $raw);
            fclose($fp);
           

            if($update=="insert"){
                 $query= "INSERT INTO usermeta(meta_value,users_ID, meta_key ) VALUES('".$file_name."', ".$id. ", '".$typeImage."')";
            }
            else{
                $query= "UPDATE usermeta SET meta_value='".$file_name."' WHERE users_ID=".$id. " AND meta_key='".$typeImage."'";
            }

            $conexion->consulta($query); 

            $retval = $file_name;
        }
        

       
        
        return $retval;
    }

    function generateImageUsuario($id, $img) {

        global $conexion;

        $retval =false;

        $folderPath = '../uploads/';

        $image_parts = explode(";base64,", $img);

        
        $image_base64 = base64_decode($image_parts[1]);

        $file_name = $this->random_str('md5').'.png';

        $file = $folderPath . $file_name;

        if( file_put_contents($file, $image_base64) ) {

            
            $query="SELECT * FROM usermeta WHERE users_ID=".$id. " AND meta_key='image'";
            $metaExists = $conexion->consulta($query); 

            if(count($metaExists)>0)
            {
                $query= "UPDATE usermeta SET meta_value='".$file_name."' WHERE users_ID=".$id. " AND meta_key='image'";
            }
            else{
                $query= "INSERT INTO usermeta(meta_value,users_ID, meta_key ) VALUES('".$file_name."', ".$id. ", 'image')";
            }

            $conexion->consulta($query);
            $retval = $file_name;

        }
        return  $retval;
    }


    function random_str ($type = 'alphanum', $length = 8) {

        switch($type) {
            case 'basic'    : return mt_rand();
                break;
            case 'alpha'    :
            case 'alphanum' :
            case 'num'      :
            case 'nozero'   :
                    $seedings             = array();
                    $seedings['alpha']    = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    $seedings['alphanum'] = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    $seedings['num']      = '0123456789';
                    $seedings['nozero']   = '123456789';
                    
                    $pool = $seedings[$type];
                    
                    $str = '';
                    for ($i=0; $i < $length; $i++)
                    {
                        $str .= substr($pool, mt_rand(0, strlen($pool) -1), 1);
                    }
                    return $str;
                break;
            case 'unique'   :
            case 'md5'      :
                        return md5(uniqid(mt_rand()));
                break;
        }

    }

    function save_Meta($data){
        global $conexion;

        $response = array();

        $query="SELECT * FROM usermeta WHERE users_ID=".$data['users_ID']. " AND meta_key='".$data['meta_key']."'";
        $metaExists = $conexion->consulta($query); 

        if(count($metaExists)>0)
            $query = "UPDATE usermeta SET meta_value='".$data['meta_value']."' WHERE users_ID=".$data['users_ID']. " AND meta_key='".$data['meta_key']."'";
        else
            $query = "INSERT INTO usermeta SET (meta_value, users_ID, meta_key) VALUES('".$data['meta_value']."',".$data['users_ID']. ", '".$data['meta_key']."')";

        $conexion->consulta($query);

        $response['query'] = $query;
        return $response;
    }

}

?>
