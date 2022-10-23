<?php
error_reporting(-1);
ini_set('display_errors', 1);

ini_set("allow_url_fopen", true);

header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

header("Access-Control-Allow-Methods: PUT, GET, POST, FILES"); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = json_decode(file_get_contents('php://input'));

$response = array();

require_once("include/config.php");
$conexion = new DB_sql();
$conexion->conectar("", "", "", "");

define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');
$ds = DIRECTORY_SEPARATOR;

include_once(realpath(dirname(__FILE__)).'/clases/class.accessuser.php');
include_once(realpath(dirname(__FILE__)).'/clases/class.users.php');
include_once(realpath(dirname(__FILE__)).'/clases/class.newuser.php');
include_once(realpath(dirname(__FILE__)).'/clases/class.getusers.php');
include_once(realpath(dirname(__FILE__)).'/clases/class.prendas.php');
include_once(realpath(dirname(__FILE__)).'/clases/class.descuentos.php');
include_once(realpath(dirname(__FILE__)).'/clases/class.ordenes.php');

$usuariosClass = new Usuarios();
$accessUserClass = new AccessUser();
$newUser = new NewUser();
$getUser = new GetUsers();
$prendas = new Prendas();
$ordenes = new Ordenes();

if(empty($data)){
    if(empty($_GET)){
        if(empty($_POST)){
            if(empty($_PUT)){
                if(empty($_REQUEST))
                {
                    $response['error']   = true;
                    $response['message'] = 'Error no existe información en el Request!';
                }
                else{
                    $data = $_REQUEST;
                }
            }
            else{
                $data = $_PUT;
            }
        }
        else{
            $data = $_POST;
        }
    }
    else{
        $data = $_GET;
    }
}


$data=(object)$data;
$response = [];

switch ($data->action) {
    case 'login':
        $response = $accessUserClass -> login($data->data->usuario,$data->data->password);
        break;

    case 'newuser':
        $response = $newUser -> newUser($data);
        break;

    case 'modifyuser':
        $response = $getUser -> modifyUser($data);
        break;
    
    case 'deleteuser':
        $response = $getUser -> deleteUser($data);
        break;
    
    case 'newprenda':
        $response = $prendas -> newPrenda($data);
        break;
    
    case 'gettotalprendas':
        $response = $prendas -> totalPrendas($data);
        break;
    
    case 'getprendas':
        $response = $prendas -> getPrendas($data);
        break;

    case 'modifyprenda':
        $response = $prendas -> modifyPrenda($data);
        break;
    
    case 'deleteprenda':
        $response = $prendas -> deletePrenda($data);
        break;

    case 'newdescuento':
        $response = $descuentos -> newDescuento($data);
        break;

    case 'gettotaldescuentos':
        $response = $descuentos -> totalDescuentos($data);
        break;

    case 'getdescuentos':
        $response = $descuentos -> getDescuentos($data);
        break;

    case 'modifydescuento':
        $response = $descuentos -> modifyDescuento($data);
        break;

    case 'deletedescuento':
        $response = $descuentos -> deleteDescuento($data);
        break;
    
    case 'neworden':
        $response = $ordenes -> newDescuento($data);
        break;

    case 'gettotalordenes':
        $response = $ordenes -> totalDescuentos($data);
        break;

    case 'getordenes':
        $response = $ordenes -> getDescuentos($data);
        break;

    case 'modifyorden':
        $response = $ordenes -> modifyDescuento($data);
        break;

    case 'deleteorden':
        $response = $ordenes -> deleteDescuento($data);
        break;

    default:
        # code...
        break;
}


echo json_encode($response);



?>
