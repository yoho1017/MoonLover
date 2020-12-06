<?php


    include("./Lib/MemberClass.php");

    $Member = new MemberClass();

    $id = $Member->getMemberID();


    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    //建立SQL 搜尋配對對象
    $sql = "SELECT r.ID, member.ID as memberID , member.NICKNAME, member.IMAGE, MSG.NEWMSG, newmsg.count as NOTREAD FROM relationship as r
    join member as member
    on r.TARGET_ID = member.ID
    LEFT JOIN
    (SELECT MAX(CASE WHEN MSG_RECEIVE_CONTENT IS NOT NULL THEN ID END) AS NEWMSG,
      pRELATIONSHIP_ID
    FROM personal_msg
    GROUP BY pRELATIONSHIP_ID) as last
    on
    r.ID = last.pRELATIONSHIP_ID
    LEFT JOIN
    (SELECT ID, MSG_RECEIVE_CONTENT as NEWMSG FROM personal_msg where MSG_RECEIVE_CONTENT is not null) as MSG
    on
    MSG.ID = last.NEWMSG
    LEFT join (SELECT pRELATIONSHIP_ID ,COUNT(*) as count FROM moonlover.personal_msg where READING = 0 GROUP BY pRELATIONSHIP_ID) as newmsg
    on r.ID = newmsg.pRELATIONSHIP_ID
    WHERE MYMEMBER_ID = ?";

    //執行
    $statement = $Util->getPDO()->prepare($sql);
    $statement->bindValue(1, $id);
    $statement->execute();
    $data = $statement->fetchAll();


    print_r(json_encode($data));
        

?>