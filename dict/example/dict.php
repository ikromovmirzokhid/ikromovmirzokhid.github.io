
<?php
    header('Content-Type: application/json');
    include "db-connection.php";
    $word = $_POST['word'];
    $bResult = TRUE;
    $query = "SELECT wordtype,definition FROM entries WHERE word = :word";
    $arrParams = array(':word' => $word);
    $stmt = executeQuery($query,$arrParams);
    if($stmt == NULL)
    {
       $bResult = FALSE; 
    } 
    //$definitionData = array();
    $defData = array();
    $defData = $stmt->fetchAll();
    echo json_encode($defData);
    /*
    foreach ($stmt as $definitionData) {
        $defData
        echo json_encode($definitionData);
        //$defData("definition" => $definitionData["definition"]);
        //No duplicate names to work with. Only first user name.
        break;
    }
     * */
     
    //echo json_encode(array("message" => $word));
    //echo json_encode($stmt);
    //print $word;
?>
    