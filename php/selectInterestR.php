<?php

        include("./Lib/MemberClass.php");

        $Member = new MemberClass();

        $id = $Member->getMemberID();


        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

            //建立SQL
        $sql = "SELECT b.name FROM my_interest a join interest b on a.mINTEREST_ID = B.ID
        where
        a.mMEMBER_ID = ? and a.mINTEREST_STATUS = 1";

            //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $id);
        $statement->execute();
        $data = $statement->fetchAll();
    

        print_r(json_encode($data));
    

?>