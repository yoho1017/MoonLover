<?php 

    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    $id = $_POST['id'];

    $sql="SELECT mr.*, m.USERNAME, tm.STATUS FROM `msg_report` mr JOIN `member` m ON mr.REPORT_PERSON = m.ID JOIN `temple_msg` tm ON tm.ID = mr.MSG_ID WHERE mr.ID = $id";
    // SELECT mr.*, m.USERNAME , tm.STATUS FROM `msg_report` mr JOIN `member` m ON mr.REPORT_PERSON = m.ID JOIN `temple_msg` tm ON tm.ID = mr.MSG_ID WHERE mr.ID = 3


    // echo $sql;
    // 執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    // $statement->bindValue(1, $id);
    $statement->execute();
    $data = $statement->fetch();

    print_r(json_encode($data));

?>