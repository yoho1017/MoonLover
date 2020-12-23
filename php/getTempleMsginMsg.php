<?php
    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    include("./Lib/MemberClass.php");
    $Member = new MemberClass();
    $myId = $Member->getMemberID();

    $tmid = $_POST['tmid'];
    

    //建立SQL
    // SELECT * FROM `temple_msg_in_msg` WHERE iMSG_ID = 'M0000002'

    $sql = "SELECT im.ID as ID ,im.iMSG_ID as fmid, im.IN_MSG as text , im.MSG_DATE as date , m.NICKNAME as NICKNAME ,m.IMAGE as img FROM `temple_msg_in_msg` as im
    join member as m
    on m.ID = im.tmMEMBER_ID WHERE im.iMSG_ID = ? and im.status = 1 order by im.ID desc";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $tmid);
    $statement->execute();
    $data = $statement->fetchAll();

    print_r(json_encode($data));

?>