<?php 

    include("./Lib/MemberClass.php");

    $Member = new MemberClass();
    
    $id = $Member->getMemberID();

    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    //建立SQL
    $sql = "SELECT IMAGE FROM member WHERE ID = ?";

    //執行
    $statement = $Util->getPDO()->prepare($sql);
    
    //給值
    $statement->bindValue(1, $id);
    $statement->execute();
    
    $data = $statement->fetchAll();

    $img = "";
    // 確認是否有存在資料
    foreach($data as $index => $row){
        $img = $row["IMAGE"];
    }

    if ($img != null) {
        echo './images/member/profile/' .$img;
    }else{
        echo '';
    }


?>