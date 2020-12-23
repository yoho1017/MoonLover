<?php
    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    include("./Lib/MemberClass.php");
    $Member = new MemberClass();
    $myId = $Member->getMemberID(); // 拿ID


    //建立SQL
    // $sql = "SELECT ID, USERNAME, EMAIL, MEMBER_TYPE FROM member";
    $sql = "SELECT `NICKNAME`, `IMAGE` FROM member where ID = $myId";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->execute();
    $data = $statement->fetch();    
    print_r(json_encode($data));

?>