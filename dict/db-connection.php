<?php

try{

	///opt/lampp/var/mysql/mysql.sock
	//$db = new PDO("mysql:dbname=entries;host=localhost", "root", "password");

	$db = new PDO("mysql:dbname=dictionary;host=localhost", "BigWords", "Rconfusing");

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $ex)
{
	echo ("error " . $ex -> getMessage());
}
?>