<?php
    include("./Lib/UtilClass.php");
	$Util = new UtilClass();	

    //建立SQL
    $sql = "SELECT * FROM member WHERE USERNAME = ?";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $_GET["username"]);
    $statement->execute();
    $data = $statement->fetchAll();

    $memberUSER = "";
    foreach($data as $index => $row){
        $memberUSER = $row["USERNAME"];
    }

    //判斷是否有會員資料?
    if($memberUSER == $_GET["username"]){

        //回傳資料     
        echo $memberUSER; 
    }
?>