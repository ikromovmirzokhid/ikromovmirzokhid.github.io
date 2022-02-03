<?php session_start();
$_SESSION['name'] = 'Mohamed';
?>

<html>
	<head></head>
	<body><?php echo $_SESSION['name']?> </body>
</html>




