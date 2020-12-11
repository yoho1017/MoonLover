<?php 

include("./Lib/MemberClass.php");

$Member = new MemberClass();

$id = $Member->getMemberID();

$mascot = $_POST["mascot"];

include("./Lib/UtilClass.php");
$Util = new UtilClass();

//建立SQL
$sql = "UPDATE member SET MASCOT = ? where ID = ?";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $mascot);
$statement->bindValue(2, $id);
$statement->execute();


?>