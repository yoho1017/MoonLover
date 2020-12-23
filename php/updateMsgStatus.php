<?php 

$tmId = $_POST['tmId'];
$status = $_POST['status'];

$msgType = substr($tmId, 0, 1 ); // 篩出留言種類: M or F

include("./Lib/UtilClass.php");
$Util = new UtilClass();	

// //建立SQL
if($msgType == 'M'){ // 留言
    $sql="UPDATE `temple_msg` SET `STATUS` = ? WHERE `temple_msg`.`ID` = ?";
}else if($msgType == 'F'){ // 回應
    $sql="UPDATE `temple_msg_in_msg` SET `STATUS` = ? WHERE `temple_msg_in_msg`.`ID` = ?";
}

// //執行
$statement = $Util->getPDO()->prepare($sql);

// //給值
$statement->bindValue(1, $status);
$statement->bindValue(2, $tmId);
$statement->execute();


?>