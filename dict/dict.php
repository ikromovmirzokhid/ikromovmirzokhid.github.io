<?php
header('Content-Type: application/json');
include "db-connection.php";
$word = $_POST['word'];
$bResult = TRUE;
$query = "SELECT wordtype,definition FROM entries WHERE word = :word";
$arrParams = array(':word' => $word);

$stmt = $db ->prepare($query);
$stmt ->execute($arrParams);

	//$db.executeQuery($query,$arrParams);
if($stmt == NULL)
{
	$bResult = FALSE;
}
//$definitionData = array();
$defData = array();
$defData = $stmt->fetchAll();
echo json_encode($defData);

?>
    