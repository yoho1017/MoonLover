<?php

        include("./Lib/MemberClass.php");

        $Member = new MemberClass();

        $id = $Member->getMemberID();

        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

            //建立SQL
        $sql = "SELECT * FROM member WHERE ID = ?";

            //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $id);
        $statement->execute();
        $data = $statement->fetchAll();
    

        print_r(json_encode($data));
    

?>