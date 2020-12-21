<?php
    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    include("./Lib/MemberClass.php");
    $Member = new MemberClass();
    $myId = $Member->getMemberID();

    $tId = $_POST['tId'];
    

    //建立SQL

    $sql = "SELECT m.NICKNAME as nName , m.IMAGE as myImg, tm.ID, tm.tMEMBER_ID, tm.tTEMPLE_ID, tm.MSG, tm.MSG_DATE, tm.IMAGE as tmIMG FROM `member` m JOIN `temple_msg` tm ON m.ID = tm.tMEMBER_ID WHERE tTEMPLE_ID=$tId and tm.STATUS = 1 ORDER BY tm.ID DESC";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->execute();
    $data = $statement->fetchAll();
    print_r(json_encode($data));

?>