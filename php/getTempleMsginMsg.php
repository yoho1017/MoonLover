<?php
    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    include("./Lib/MemberClass.php");
    $Member = new MemberClass();
    $myId = $Member->getMemberID();

    $tmid = $_POST['tmid'];
    

    //建立SQL
    // SELECT * FROM `temple_msg_in_msg` WHERE iMSG_ID = 'M0000002'

    $sql = "SELECT * FROM `temple_msg_in_msg` WHERE iMSG_ID = ?";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $tmid);
    $statement->execute();
    $data = $statement->fetchAll();
    print_r(json_encode($data));

?>