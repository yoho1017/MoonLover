<?php 

$tmId = $_POST['tmId'];
$status = $_POST['status'];

include("./Lib/UtilClass.php");
$Util = new UtilClass();	

//建立SQL
$sql = "UPDATE `temple_msg` SET `STATUS` = ? WHERE `temple_msg`.`ID` = ?";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $status);
$statement->bindValue(2, $tmId);
$statement->execute();


?>