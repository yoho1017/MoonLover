<?php 

include("./Lib/MemberClass.php");

$Member = new MemberClass();

$mid = $Member->getMemberID();

$relation = $_POST['id'];

// echo $relation;

include("./Lib/UtilClass.php");
$Util = new UtilClass();

$sql = "UPDATE `moonlover`.`relationship` SET `rSTATUS` = 0 WHERE (`ID` = ?)";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $relation);
$statement->execute();

$sql = "UPDATE `moonlover`.`relationship` SET `rSTATUS` = 0 WHERE (`ID` = ?)";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $relation);
$statement->execute();

$sql = "SELECT TARGET_ID FROM relationship where ID = ?";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $relation);
$statement->execute();
$Target = $statement->fetchColumn();   

$sql = "UPDATE `moonlover`.`relationship` SET `rSTATUS` = 0 WHERE MYMEMBER_ID = ? and TARGET_ID = ?";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $Target);
$statement->bindValue(2, $mid);
$statement->execute();



?>