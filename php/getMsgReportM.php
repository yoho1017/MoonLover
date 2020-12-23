<?php 

    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    $id = $_POST['id'];
    $tmID = $_POST['tmID'];
    $msgType = substr($tmID, 0, 1 ); // 篩出留言種類: M or F

    if($msgType == 'M'){ // 留言
        $sql="SELECT mr.*, m.USERNAME, tm.STATUS FROM `msg_report` mr JOIN `member` m ON mr.REPORT_PERSON = m.ID JOIN `temple_msg` tm ON tm.ID = mr.MSG_ID WHERE mr.ID = $id";
        // SELECT mr.*, m.USERNAME , tm.STATUS FROM `msg_report` mr JOIN `member` m ON mr.REPORT_PERSON = m.ID JOIN `temple_msg` tm ON tm.ID = mr.MSG_ID WHERE mr.ID = 3
    }else if($msgType == 'F'){ // 回應
        $sql="SELECT mr.*, m.USERNAME, tm.STATUS FROM `msg_report` mr JOIN `member` m ON mr.REPORT_PERSON = m.ID JOIN `temple_msg_in_msg` tm ON tm.ID = mr.MSG_ID WHERE mr.ID = $id";
        // SELECT mr.*, m.USERNAME, tm.STATUS FROM `msg_report` mr JOIN `member` m ON mr.REPORT_PERSON = m.ID JOIN `temple_msg_in_msg` tm ON tm.ID = mr.MSG_ID WHERE mr.ID = 8
    }

    


    // echo $sql;
    // 執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $id);
    $statement->execute();
    $data = $statement->fetch();

    print_r(json_encode($data));

?>