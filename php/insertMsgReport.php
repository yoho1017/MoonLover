<?php 

include("./Lib/MemberClass.php");
$Member = new MemberClass();
$id = $Member->getMemberID();

include("./Lib/UtilClass.php");
$Util = new UtilClass();



$rtmid = $_POST['rtmid']; // 貼文id
$rtmsg = $_POST['rtmsg'];//貼文內容
$msg = $_POST['msg'];    //檢舉理由


echo $rtmid;
echo $rtmsg;
echo $msg;
echo $id;

$sql="INSERT INTO `moonlover`.`msg_report` (MSG_ID,MSG_REPORT_TIME,MSG_CONTENT,REPORT_REASON,REPORT_PERSON)VALUES(?,NOW(),?,?,?);";
// $sql = "INSERT INTO `temple_msg` (ID, tMEMBER_ID, tTEMPLE_ID, IMAGE, MSG, MSG_DATE, STATUS) VALUES (?, ?, ?, ?, ?, NOW(), 1);";

// 執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $rtmid);
$statement->bindValue(2, $rtmsg);
$statement->bindValue(3, $msg);
$statement->bindValue(4, $id);

$statement->execute();
$data = $statement->fetchAll();

$statement->errorInfo();

?>