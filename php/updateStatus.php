<?php 

$table = $_POST['table'];
$id = intval($_POST['id']);
$status = intval($_POST['status']);

// echo $table;
// echo '<br>';
// echo $id;
// echo '<br>';
// echo $status;
// echo '<br>';

include("./Lib/UtilClass.php");
$Util = new UtilClass();	

//建立SQL
$sql = "UPDATE $table SET `STATUS` = ? WHERE `ID` = ?";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $status);
$statement->bindValue(2, $id);
$statement->execute();


?>