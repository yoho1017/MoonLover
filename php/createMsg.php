<?php 

include("./Lib/MemberClass.php");

$Member = new MemberClass();

$id = $Member->getMemberID();

$pid = $_POST["pid"];
$msg = $_POST["msg"];
$targetid = $_POST["targetid"];

include("./Lib/UtilClass.php");
$Util = new UtilClass();

// 寫入新留言到MYSQL
$sql = "INSERT INTO personal_msg (pRELATIONSHIP_ID, MSG_SEND_CONTENT, MSG_TIME, READING) VALUES (?, ?, NOW(), 1)";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $pid);
$statement->bindValue(2, $msg);
$statement->execute();

// 更新資訊
$sql = "SELECT * FROM personal_msg where pRELATIONSHIP_ID = ?";

//執行
$statement = $Util->getPDO()->prepare($sql);

//給值
$statement->bindValue(1, $pid);
$statement->execute();
$data = $statement->fetchAll();    

print_r(json_encode($data));

// 設定已讀
//建立SQL
$sql = "UPDATE personal_msg SET READING = 1 WHERE pRELATIONSHIP_ID = ?";

    //執行
$statement = $Util->getPDO()->prepare($sql);
$statement->bindValue(1, $pid);
$statement->execute();    

//寫入到配對者資料庫
$sql = "INSERT INTO personal_msg (pRELATIONSHIP_ID, MSG_RECEIVE_CONTENT, MSG_TIME) 
VALUES ((SELECT ID FROM relationship where MYMEMBER_ID = ? and TARGET_ID = ?), ?, NOW())";

    //執行
$statement = $Util->getPDO()->prepare($sql);
$statement->bindValue(1, $targetid);
$statement->bindValue(2, $id);
$statement->bindValue(3, $msg);
$statement->execute();    


?>