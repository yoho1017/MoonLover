<?php 

include("./Lib/MemberClass.php");
$Member = new MemberClass();
$id = $Member->getMemberID();

include("./Lib/UtilClass.php");
$Util = new UtilClass();

$sql = "SELECT * FROM `temple_msg` ORDER BY `ID` DESC LIMIT 1";
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
$msgID = 'M'.$msgID; // M000003

$templeId = $_POST['tId']; // 廟宇id
$msg = $_POST['msg'];      // 訊息內容

// 組合上傳圖片的資料夾路徑
$ServerRoot = $_SERVER["DOCUMENT_ROOT"];
$phpPath = $_SERVER['PHP_SELF'];
$fullPath = $ServerRoot.str_replace('/php/insertTempleMsg.php','',$phpPath)."/images/upload/";


// 先判斷圖片是否上傳成功
if($_POST['upload'] == 'yes'){

    if(!empty($_FILES["uploadImg1"]["tmp_name"])){
        if($_FILES["uploadImg1"]["error"] > 0){
            echo "上傳失敗: 錯誤代碼".$_FILES["uploadImg1"]["error"];
        }else{
            //Server上的暫存檔路徑含檔名
            $filePath_Temp = $_FILES["uploadImg1"]["tmp_name"];
            //欲放置的檔案路徑
            $filePath = $fullPath.$_FILES["uploadImg1"]["name"];
            copy($filePath_Temp, $filePath);

            $filename1 = $_FILES["uploadImg1"]["name"];
            $image = $filename1;
        }
    }
    if(!empty($_FILES["uploadImg2"]["tmp_name"])){
        if($_FILES["uploadImg2"]["error"] > 0){
            echo "上傳失敗: 錯誤代碼".$_FILES["uploadImg2"]["error"];
        }else{
            //Server上的暫存檔路徑含檔名
            $filePath_Temp = $_FILES["uploadImg2"]["tmp_name"];
            //欲放置的檔案路徑
            $filePath = $fullPath.$_FILES["uploadImg2"]["name"];
            copy($filePath_Temp, $filePath);

            $filename2 = $_FILES["uploadImg2"]["name"];
            $image = $image."|".$filename2;
        }
    }
    if(!empty($_FILES["uploadImg3"]["tmp_name"])){
        if($_FILES["uploadImg3"]["error"] > 0){
            echo "上傳失敗: 錯誤代碼".$_FILES["uploadImg3"]["error"];
        }else{
            //Server上的暫存檔路徑含檔名
            $filePath_Temp = $_FILES["uploadImg3"]["tmp_name"];
            //欲放置的檔案路徑
            $filePath = $fullPath.$_FILES["uploadImg3"]["name"];
            copy($filePath_Temp, $filePath);

            $filename3 = $_FILES["uploadImg3"]["name"];

            $image = $image."|".$filename3;
        }
    }

}else if($_POST['upload'] == 'no'){
    $image = ''; //沒有上傳圖片
}
// echo $image;

$sql = "INSERT INTO `temple_msg` (ID, tMEMBER_ID, tTEMPLE_ID, IMAGE, MSG, MSG_DATE, STATUS) VALUES (?, ?, ?, ?, ?, NOW(), 1);";
// 執行
$statement = $Util->getPDO()->prepare($sql);

// //給值
$statement->bindValue(1, $msgID);
$statement->bindValue(2, $id);
$statement->bindValue(3, $templeId);
$statement->bindValue(4, $image);
$statement->bindValue(5, $msg);

$statement->execute();
$data = $statement->fetchAll();

// // 更新資訊
$sql = "SELECT * FROM `temple_msg` ORDER BY `ID` DESC LIMIT 1";
$statement = $Util->getPDO()->prepare($sql);
$statement->execute();

//給值
$statement->execute();
$data = $statement->fetchAll();    

print_r(json_encode($data));

?>