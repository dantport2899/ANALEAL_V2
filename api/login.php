<?php

error_reporting(-1);
ini_set('display_errors', 1);

ini_set("allow_url_fopen", true);

header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

header("Access-Control-Allow-Methods: PUT, GET, POST"); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$data = json_decode(file_get_contents('php://input'), TRUE);

require_once("include/config.php");
include_once(realpath(dirname(__FILE__)).'/clases/class.users.php');

$conexion = new DB_sql();
$conexion->conectar("", "", "", "");

$seguridad = new seguridad();
$usuarios = new Usuarios();



/**
 * 
*/

class Access
{
    
    function login ( $username, $password ) {

        global  $conexion, $seguridad;      

        $response = array();

        if (empty($username)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nombre de usuario vacío.';
        } else if (empty($password)) {
            $response['code'] = 2;
            $response['error'] = true;
            $response['message'] = 'Contraseña vacía.';
        } else {

            $user_login = 'name_user';

            if (filter_var($username, FILTER_VALIDATE_EMAIL)) {
                $user_login = 'email';
            }   

            $user = $conexion->consulta("SELECT * FROM `users` WHERE ".$user_login." = '".$username."' AND estatus <90");

            if (empty($user)) {

                
                $response['code'] = 1;
                $response['error'] = true;
                $response['status'] = false;
                $response['message'] = 'El usuario no existe.';
                $response['consulta']= "SELECT * FROM `usuarios` WHERE ".$user_login." = '".$username."' AND estatus <90";
            }
            else
            {

                $data = (object) $user[0];

                if((int)$data->estatus<90){
                    //password no encriptado
                    if($password==$data->password){
                        $response['user'] = $this->prepare_response_for_collection($data);
                        $seguridad->setidusuario($data->id);
                        $seguridad->settypeusuario($data->perfiles_usuario_id);
                        $token = $this->getToken(10);
                        $seguridad->setToken($token);
                    }
                    else{
                        $response['code'] = 2;
                        $response['error'] = true;
                        $response['status'] = false;
                        $response['status'] =$password."==".$data->password;
                        $response['message'] = 'La contraseña es incorrecta.';  
                    }
                }
                else{
                    if( password_verify($password, $data->user_pass) ) {
                
                        $response['user'] = $this->prepare_response_for_collection($data);
                        $seguridad->setidusuario($data->id);
                        $seguridad->settypeusuario($data->perfiles_usuario_id);
                        $token = $this->getToken(10);
                        $seguridad->setToken($token);

                    }
                    else
                    {   
                        $response['code'] = 2;
                        $response['error'] = true;
                        $response['status'] = false;
                        $response['message'] = 'La contraseña es incorrecta.';  
                    }
                }
                
            }
        }

        $conexion = NULL;
        echo json_encode($response);
        
    }

    function get_userInfo($username){

        global  $conexion, $seguridad;      

        $response = array();

        if (empty($username)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'Nombre de usuario vacío.';
        }  
        else {

            $user_login = 'user_login';

            if (filter_var($username, FILTER_VALIDATE_EMAIL)) {
                $user_login = 'user_email';
            }   

            $user = $conexion->consulta("SELECT ID,  user_login, user_nicename, user_email, display_name FROM `usuarios` WHERE ".$user_login." = '".$username."' AND user_status = 0");

            if (empty($user)) {
                
                $response['code'] = 1;
                $response['error'] = true;
                $response['status'] = false;
                $response['message'] = 'El usuario no existe.';

                $conexion=NULL;
                return $response;
            }
            else
            {
                $data = (object) $user[0];

                $usermeta = $conexion->consulta("SELECT * FROM `usermeta` WHERE usuarios_ID = ".$data->ID);
                $data->user = (object)[];
                foreach ($usermeta as $key => $value) {
                    //print_r($value);
                    if ($value['meta_key'] == 'first_name') {
                        $data->user->first_name = $value['meta_value'];
                    }

                    if ($value['meta_key'] == 'last_name') {
                        $data->user->last_name = $value['meta_value'];
                    }

                    if ($value['meta_key'] == 'phone') {
                        $data->user->phone = $value['meta_value'];
                    }

                    if ($value['meta_key'] == 'user_level') {
                        $data->user->user_level = (int) $value['meta_value'];
                        $data->user->user_type = $this->get_type_perfil($value['meta_value']);
                    }

                    if ($value['meta_key'] == 'cuenta_id') {
                        $data->user->cuenta_id = (int) $value['meta_value'];
                    }
                }

                $conexion=NULL;
                return $data;
            }
        }

    }


    function get_type_perfil ( $id ) {

        global  $conexion;
        $tipo = $conexion->consulta("SELECT * FROM `usuarios_perfiles` WHERE id = ".$id);
        $tipo_str = $tipo[0]['type_name'];

        $conexion=NULL;
        return $tipo_str;
    
    }

    function Encrypt ($string) {
        
        $long = strlen($string);
        
        $str = '';
        
        for($x = 0; $x < $long; $x++) {
            $str .= ($x % 2) != 0 ? md5($string[$x]) : $x;
        }

        return md5($str);
    
    }

    function getToken ($length) {
        
        $token = "";
        $codeAlphabet  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet .= "abcdefghijklmnopqrstuvwxyz";
        $codeAlphabet .= "0123456789";
        $max = strlen($codeAlphabet); // edited

        for ($i=0; $i < $length; $i++) {
            $token .= $codeAlphabet[rand(0, $max-1)];
        }

        return $token;

    }

    function prepare_response_for_collection( $data ) {
        global $usuarios;

        $perfil = $usuarios->get_perfil($data->ID);


        $data = array(
            'id' => (int) $data->ID,
            'status' => (int) $data->user_status,
            'registered' => $data->user_registered,
            'name' => $data->display_name,
            'nicename' => $data->user_nicename,
            'logged' => true,
            'image' => $perfil->image,
            'first_name' => $perfil->nombre,
            'last_name' => $perfil->apellidos,
            'phone' => $perfil->phone,
            'user_level' => $perfil->user_level,
            'cuenta_id' => $perfil->cuenta_id,
            'user_type' => $this->get_type_perfil($perfil->user_level)

        );

        return (object) $data;
    
    }

    function sendmail_restaurarcontraseña($data){

        

        global  $conexion, $conf_dir_images, $conf_host_actual;

        include_once("include/PHPMailer/class.phpmailer.php");
        include_once("include/PHPMailer/class.smtp.php");

        $https= $conf_host_actual ."/reasignacionpwd";
        //"//app/reasignacionpwd";//"http://192.168.213.187/app-qr-force/reasignacionpwd";//
        $response = array();
        $html = '';

        $token = $this->getToken(15);

        $conexion->consulta("UPDATE usuarios SET user_activation_key='". $token. "' WHERE ID=".$data->ID);

        $cuenta = $conexion->consulta("SELECT * FROM `cuenta` WHERE ID = ".$data->user->cuenta_id)[0];


        
        $html .= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
        $html .= '<html>';
        $html .= '<head>';
        $html .= '<meta name="viewport" content="width=device-width" />';
        $html .= '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';
        $html .= '<title>Regeneración de contraseña</title>';
        $html .= '<style>*{margin:0;padding:0}*{font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif}img{max-width: 100%}.collapse{margin:0;padding:0}body{-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;width: 100%!important;height: 100%}a{color: #2BA6CB}.btn{text-decoration:none;color: #FFF;background-color: #666;padding:10px 16px;font-weight:bold;margin-right:10px;text-align:center;cursor:pointer;display: inline-block}p.callout{padding:15px;background-color:#ECF8FF;margin-bottom: 15px}.callout a{font-weight:bold;color: #2BA6CB}table.social{background-color: #ebebeb}.social .soc-btn{padding: 3px 7px;font-size:12px;margin-bottom:10px;text-decoration:none;color: #FFF;font-weight:bold;display:block;text-align:center}a.fb{background-color: #3B5998!important}a.tw{background-color: #1daced!important}a.gp{background-color: #DB4A39!important}a.ms{background-color: #000!important}.sidebar .soc-btn{display:block;width:100%}table.head-wrap{width: 100%}.header.container table td.logo{padding: 15px}.header.container table td.label{padding: 15px;padding-left:0px}table.body-wrap{width: 100%}table.footer-wrap{width: 100%;clear:both!important}.footer-wrap .container td.contentp{border-top: 1px solid rgb(215,215,215);padding-top:15px}.footer-wrap .container td.content p{font-size:10px;font-weight: bold}h1,h2,h3,h4,h5,h6{font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;line-height: 1.1;margin-bottom:15px;color:#FFF;}h1 small, h2 small, h3 small, h4 small, h5 small, h6 small{font-size: 60%;color: #6f6f6f;line-height: 0;text-transform: none}h1{font-weight:200;font-size: 44px}h2{font-weight:200;font-size: 37px}h3{font-weight:500;font-size: 27px}h4{font-weight:500;font-size: 23px}h5{font-weight:900;font-size: 17px}h6{font-weight:900;font-size: 14px;text-transform: uppercase;color:#444}.collapse{margin:0!important}p, ul{margin-bottom: 10px;font-weight: normal;font-size:14px;line-height:1.6}p.lead{color: #FFF;font-size:17px; margin: 0; padding: 0;}.mb-2,p.mb-2{margin-bottom: 1em!important;}.mb-3{margin-bottom: 2em!important;}.mt-2{margin-top: 2em!important;}p.last{margin-bottom:0px}ul li{margin-left:5px;list-style-position: inside}ul.sidebar{background:#ebebeb;display:block;list-style-type: none}ul.sidebar li{display: block;margin:0}ul.sidebar li a{text-decoration:none;color: #666;padding:10px 16px;margin-right:10px;cursor:pointer;border-bottom: 1px solid #777777;border-top: 1px solid #FFFFFF;display:block;margin:0}ul.sidebar li a.last{border-bottom-width:0px}ul.sidebar li a h1,ul.sidebar li a h2,ul.sidebar li a h3,ul.sidebar li a h4,ul.sidebar li a h5,ul.sidebar li a h6,ul.sidebar li a p{margin-bottom:0!important}.container{display:block!important;max-width:600px!important;margin:0 auto!important;clear:both!important}.content{padding:15px;max-width:600px;margin:0 auto;display:block}.content table{width: 100%}.column{width: 300px;float:left}.column tr td{padding: 15px}.column-wrap{padding:0!important;margin:0 auto;max-width:600px!important}.column table{width:100%}.social .column{width: 280px;min-width: 279px;float:left}.clear{display: block;clear: both}@media only screen and (max-width: 600px){a[class="btn"]{display:block!important;margin-bottom:10px!important;background-image:none!important;margin-right:0!important}div[class="column"]{width: auto!important;float:none!important}table.social div[class="column"]{width:auto!important}}</style>';
        $html .= '</head>';
        $html .= '<body bgcolor="#666666" topmargin="0" leftmargin="0" marginheight="0" marginwidth="0">';
        $html .= '      <table class="head-wrap" bgcolor="#666666">';
        $html .= '            <tr>';
        $html .= '            <td></td>';
        $html .= '            <td class="header container" align="">';
        $html .= '                  <div class="content mt-2">';
        $html .= '                        <table bgcolor="#666666">';
        $html .= '                              <tr>';
        $html .= '                                    <td>';

        if(strlen($cuenta['cuenta_logo'])<=0)
        $html .= '                                          <img src="https://taro.qrforce.mx/assets/images/logo_qrforce.png" width="200" />';
        else
        $html .= '                                          <img src="'.$cuenta['cuenta_logo'].'" width="200" />';   
         
        $html .= '                                    </td>';
        $html .= '                                    <td align="right">';
        $html .= '                                          <h6 class="collapse"></h6>';
        $html .= '                                    </td>';
        $html .= '                              </tr>';
        $html .= '                        </table>';
        $html .= '                  </div>';
        $html .= '            </td>';
        $html .= '            <td></td>';
        $html .= '            </tr>';
        $html .= '      </table>';
        $html .= '      <table class="body-wrap" bgcolor="#666666">';
        $html .= '            <tr>';
        $html .= '                  <td></td>';
        $html .= '                  <td class="container" align="" bgcolor="#666666">';
        $html .= '                        <div class="content">';
        $html .= '                              <table>';
        $html .= '                                    <tr>';
        $html .= '                                          <td>';
        $html .= '                                                <h3>Regeneración de contraseña</h3>';
        $html .= '                                                <p class="lead mb-2">Hola '.$data->display_name.'.</p><p>Haz solicitado la regeneración de tu contraseña por medio del portal de QRForce.</p>';
        $html .= '                                                 <p class="lead">Si no lo hiciste ignora este correo.</p>';
        $html .= '                                           </td>';
        $html .= '                                     </tr>';
        $html .= '                               </table>';
        $html .= '                        </div>';
        $html .= '                         <div class="content">';
        $html .= '                               <table bgcolor="">';
        $html .= '                                     <tr>';
        $html .= '                                           <td>';
        $html .= '                                                 <p class="callout">Para regenerar tu contraseña da click <a href="'.$https.'?r='.urlencode($token).'">aquí</a></p>';
        $html .= '                                           </td>';
        $html .= '                                     </tr>';
        $html .= '                               </table>';
        $html .= '                         </div>';
        $html .= '                         <div class="content">';
        $html .= '                               <table bgcolor="">';
        $html .= '                                     <tr>';
        $html .= '                                           <td>';
        $html .= '                                                 <table bgcolor="" class="social" width="100%">';
        $html .= '                                                       <tr>';
        $html .= '                                                             <td>';
        $html .= '                                                                   <div class="column">';
        $html .= '                                                                  </div>';
        $html .= '                                                                   <div class="column">';
        $html .= '                                                                   </div>';
        $html .= '                                                                  <div class="clear"></div>';
        $html .= '                                                            </td>';
        $html .= '                                                      </tr>';
        $html .= '                                                </table>';
        $html .= '                                          </td>';
        $html .= '                                    </tr>';
        $html .= '                              </table>';
        $html .= '                        </div>';
        $html .= '                  </td>';
        $html .= '                  <td></td>';
        $html .= '            </tr>';
        $html .= '      </table>';
        $html .= '</body>';
        $html .= '</html>';

            $mail = new PHPMailer(); // objeto en phpmailer

            try {

                //Server settings
                $mail->CharSet = "UTF-8";
                $mail->Encoding = "quoted-printable";


                if(strpos($conf_host_actual,'service88.mx') >=0)
                    $mail->setFrom('alertas@service88.mx', 'Service88 Alertas');//'noreply@qrforce.mx', 'QRForce');
                else
                    $mail->setFrom('noreply@qrforce.mx', 'QRForce');

                $mail->AddAddress($data->user_email, $data->display_name); //Destinatario
                
                $mail->isHTML(true);      

                $mail->Subject = "Regeneración de Contraseña";
                $mail->msgHTML($html);
                $mail->AltBody = "Reporte generado automáticamente por qrforce.mx";
                
                if ($mail->Send()) {
                    $response['message'] = '<br />Te hemos enviado un correo electrónico para la regeneración de tu contraseña.';
                }
                else
                {
                    $response['error'] = true;
                    $response['message'] = '<br />Ocurrió un error al enviar la solicitud, cuenta de correo no registrada.';
                }

            } catch (Exception $e) {
                $response['error'] = true;
                $response['message'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }

        $conexion = NULL;
        return $response;
    }


    function get_userInfoBytoken($token){

        global $conexion, $seguridad;      

        $response = array();

        if (empty($token)) {
            $response['code'] = 1;
            $response['error'] = true;
            $response['message'] = 'No se ingreso el token adecuadamamente intente de nuevo.';
        }  
        else {

            $user_login = 'user_activation_key';

 

            $user = $conexion->consulta("SELECT ID,  user_login, user_nicename, user_email, display_name FROM `usuarios` WHERE ".$user_login." = '".$token."' AND user_status = 0");

            if (empty($user)) {
                
                $response['code'] = 1;
                $response['error'] = true;
                $response['status'] = false;
                $response['message'] = 'EL token no existe o a caducado el tiempo de espera para regenerar la nueva contraseña.';

            }
            else
            {
                $data = (object) $user[0];

                

                return $data;
            }
        }
        $conexion = NULL;
        return $response;

    }

    function change_password($data, $userdata){

        global  $conexion, $seguridad;      

        $response = array();
        $password = '';
        
        if ( empty($data['newpwd']) ) {
            $response['error'] = true;
            $response['input'] = 'password';
            $response['message'] = 'La contraseña esta vacía.';
        }
        else if ( $data->newpwd != '*****') {
            
            //$hash = password_hash($data['newpwd'], PASSWORD_BCRYPT);
            $password = " password = '".$data['newpwd']."'";
            $query="UPDATE `usuarios` SET  ".$password." WHERE ID = ".$data['id'];
            //$response['query'] = $query;
            $conexion->consulta($query);
            $response['message'] = 'La contraseña se ha actualizado.';
        }
        
        //
        $conexion = NULL;
        return $response;
    }

}

$response = array();

if (isset($data['username']) && !empty($data['username']) && isset($data['password']) && !empty($data['password'])) {
    
    $username = $data['username'];
    $password = $data['password'];

    $access = new Access();
    $access->login($username, $password);

}
else if (isset($data['username']) && !empty($data['username']) && isset($data['action']) && !empty($data['action']) && $data['action']=="restaurarpwd") {
    
    $access = new Access();
    $response = $access->get_userInfo($data['username']);

    if(isset($response->error) && $response->error==true){
        echo json_encode($response);
    }
    else{
        //print_r($response);
        $response = $access->sendmail_restaurarcontraseña($response);
         echo json_encode($response);
    }

   

}
else if ($data['action']=="change-password") {
    
    $access = new Access();
    $response = $access->change_password($data, $response);
    /*$response = $access->get_userInfoBytoken($data['token']);
    if(!isset($response->error) && $response->ID>0){
        //print_r($response);
        $response = $access->change_password($data, $response);
    }*/

    echo json_encode($response);

}
else
{

    $response['error'] = true;
    $response['message'] = 'Error!';

    echo json_encode($response);
}

?>
