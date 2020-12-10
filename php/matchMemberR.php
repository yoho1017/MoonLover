<?php

        include("./Lib/MemberClass.php");
        $Member = new MemberClass();
        $myId = $Member->getMemberID();

        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        $intCondToSql = "(".$_POST["intCondToSql"].")";
        // $intCondToSql = $_POST["intCondToSql"];

        //建立SQL        
        $sql = "SELECT m.*, myInt.* FROM `member` m JOIN `my_interest` myInt on m.ID = myInt.mMEMBER_ID WHERE m.ID != $myId and m.PAIR_PRIV = 1 and m.SO = ? and m.SEX = ? and m.AGE_RANGE = ? and m.AREA = ? and m.JOB = ? and m.EDUCATION = ? and $intCondToSql GROUP BY m.ID ORDER BY RAND() LIMIT 1";
        
        // $sql = "SELECT m.*, myInt.* FROM `member` m JOIN `my_interest` myInt on m.ID = myInt.mMEMBER_ID WHERE m.ID != $myId and m.PAIR_PRIV = 1 and m.SO = ? and m.SEX = ? and m.AGE_RANGE = ? and m.AREA = ? and m.JOB = ? and m.EDUCATION = ? and $intCondToSql";
        // $sql = "SELECT m.*, myInt.* FROM `member` m JOIN `my_interest` myInt on m.ID = myInt.mMEMBER_ID WHERE m.ID != $myId and m.PAIR_PRIV = `1` and m.SO = ? and m.SEX = ? and m.AGE_RANGE = ? and m.AREA = ? and m.JOB = ? and m.EDUCATION = ? and ?";
        // echo $sql;
        // //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $_POST["sex"]);
        $statement->bindValue(2, $_POST["seo"]);
        $statement->bindValue(3, $_POST["ageRange"]);
        $statement->bindValue(4, $_POST["city"]);
        $statement->bindValue(5, $_POST["job"]);
        $statement->bindValue(6, $_POST["education"]);
        // $statement->bindValue(7, $intCondToSql);
        
        $statement->execute();
        $data = $statement->fetchAll();
    

        print_r(json_encode($data));
    

?>