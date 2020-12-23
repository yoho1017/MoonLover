<?php 

include("./Lib/MemberClass.php");
$Member = new MemberClass();
$id = $Member->getMemberID();

include("./Lib/UtilClass.php");
$Util = new UtilClass();

$sql="SELECT mr.*, m.USERNAME FROM `msg_report` mr JOIN `member` m ON mr.REPORT_PERSON = m.ID";

// 執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->execute();
$data = $statement->fetchAll();

print_r(json_encode($data));
// print_r($data);

?>