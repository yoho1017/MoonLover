<?php 
        include("./Lib/MemberClass.php");
        $Member = new MemberClass();
        $id = $Member->getMemberID();

        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        $sql = "SELECT * FROM member_match_condition WHERE mmcMEMBER_ID = $id";

        //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->execute();
        $data = $statement->fetchAll();
        
        print_r(json_encode($data));

?>