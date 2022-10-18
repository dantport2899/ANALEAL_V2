<?php

date_default_timezone_set("America/Mexico_City");
setlocale(LC_TIME, 'es_ES');

/* local */
$conf_db        = "tienda_ropa";
$conf_ip_db     = "localhost";
$conf_usr_db    = "root";
$conf_psw_db    = "";


define('DATABASE_NAME', $conf_db);
define('DATABASE_USER', $conf_usr_db);
define('DATABASE_PASS', $conf_psw_db);
define('DATABASE_HOST', $conf_ip_db);

$conf_dir_images = "polizario";
$conf_host_images = "http://localhost:8888/polizario/uploads/";
$conf_host_actual = "http://localhost:8888/polizario/";


include_once(realpath(dirname(__FILE__)).'/class.DBPDO.php');
include_once(realpath(dirname(__FILE__)).'/clases-master/password-compat/lib/password.php');
include_once(realpath(dirname(__FILE__)).'/class.seguridad.php');
include_once(realpath(dirname(__FILE__)).'/version.php');



?>
