<?php 

include("./Lib/MemberClass.php");

$Member = new MemberClass();

include("./Lib/UtilClass.php");
$Util = new UtilClass();

$id = $Member->getMemberID();

$iMSG_ID = $_POST["tmid"];
$msg = $_POST["msg"];

$sql = "SELECT * FROM `temple_msg_in_msg` ORDER BY `ID` DESC LIMIT 1";
//執行
$statement = $Util->getPDO()->prepare($sql);
$statement->execute();
$data = $statement->fetchColumn(); // M0000002

$msgID = substr($data, 1, 7 ); // 0000002
$msgID+= 1; // 留言ID遞增1 = 3
settype($msgID,"string"); // 轉型成字串

$idLen = 7 - strlen($msgID); // len = 6

// 組合0000..開頭
for($i=0;$i<$idLen;$i++){
    $msgID = '0'.$msgID;
}
// 組合M開頭
$msgID = 'F'.$msgID; // M000003

// echo $msgID;
// echo '<br>';
// echo $iMSG_ID;
// echo '<br>';
// echo $msg;

// 寫入新留言到MYSQL
$sql = "INSERT INTO `moonlover`.`temple_msg_in_msg` (`ID`,`iMSG_ID`, `tmMEMBER_ID`, `IN_MSG`, `MSG_DATE`, `STATUS`) VALUES (?, ?, ?, ?, NOW(), 1);";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $msgID);
$statement->bindValue(2, $iMSG_ID);
$statement->bindValue(3, $id);
$statement->bindValue(4, $msg);
$statement->execute();

// 取得最後一個留言ID
$sql = "SELECT ID, MSG_DATE  FROM temple_msg_in_msg where tmMEMBER_ID = ? order by ID desc LIMIT 1";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $id);
$statement->execute();
$data = $statement->fetchAll();    

print_r(json_encode($data));

?>