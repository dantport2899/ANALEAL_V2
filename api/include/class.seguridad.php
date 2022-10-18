<?php

class seguridad
{	
	function __construct(){}
	//function _constructor(){}
	
	function seguridad()
	{
		session_start();
	}

	function session_start()
	{
		//session_start();
	}

	
	function logout()
	{
		session_unset();
        session_regenerate_id();
        session_destroy();
	}
			

	function setusuario($usuario)
	{
		$_SESSION['uidDMtzT'] = $usuario;
	}

	function getusuario()
	{
		$usuario = $_SESSION['uidDMtzT'];
		return $usuario;
	}

	function setidusuario($idusuario)
	{
		$_SESSION['uidDMtzT'] = $idusuario;	
	}

	function getidusuario()
	{
		$usuario = $_SESSION['uidDMtzT'];
		return $usuario;
	}
	
	function settypeusuario($typeusuario)
	{
		$_SESSION['typeDMtzT'] = $typeusuario;
	}

	function gettypeusuario()
	{
		$typeusuario = $_SESSION['typeDMtzT'];
		return $typeusuario;
	}

	function setToken($token)
	{
		$_SESSION['token'] = $token;
	}

	function getToken()
	{
		$token = $_SESSION['token'];
		return $token;
	}

	function logeado()
	{
		if (!isset($_SESSION['uidDMtzT'])){
			echo "<script language='javascript'>parent.location = 'index.php';</script>";
		}			

	}

}

?>