<?php

include("./Lib/MemberClass.php");

$Member = new MemberClass();

$id = $Member->getMemberID();

include("./Lib/UtilClass.php");
$Util = new UtilClass();	



//建立SQL
$sql = "SELECT MEMBER_TYPE FROM member WHERE ID = ?";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $id);
$statement->execute();
$data = $statement->fetchAll();

$memberID = "";
foreach($data as $index => $row){
    $memberID = $row["MEMBER_TYPE"];
}

echo $memberID;

?>