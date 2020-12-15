<?php 

$table = $_POST['table'];
$id = intval($_POST['id']);
$columnName = $_POST['CNANE'];
$status = intval($_POST['status']);

// echo $table;
// echo '<br>';
// echo $id;
// echo '<br>';
// echo $columnName;
// echo '<br>';
// echo $status;
// echo '<br>';

include("./Lib/UtilClass.php");
$Util = new UtilClass();	

//建立SQL
$sql = "UPDATE $table SET $columnName = ? WHERE `ID` = ?";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $status);
$statement->bindValue(2, $id);
$statement->execute();


?>