<?php 

    include("./Lib/MemberClass.php");
    $Member = new MemberClass();
    $id = $Member->getMemberID();

    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    //建立SQL
    $sql = "UPDATE member_match_condition set AGE_RANGE = ?, AREA_CONDITION = ?, JOB_CONDITION = ?, EDUCATION_CONDITION = ? where mmcMEMBER_ID = $id";
    
    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $_POST["ageRange"]);
    $statement->bindValue(2, $_POST["city"]);
    $statement->bindValue(3, $_POST["job"]);
    $statement->bindValue(4, $_POST["education"]);
    $statement->execute();

    // 更新資訊
    $sql = "SELECT * FROM member_match_condition where mmcMEMBER_ID = $id";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->execute();
    $data = $statement->fetchAll();    

    print_r(json_encode($data));
    


?>