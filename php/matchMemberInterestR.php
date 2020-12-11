<?php
        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        $sql = "SELECT b.name FROM my_interest a join interest b on a.mINTEREST_ID = B.ID where a.mMEMBER_ID = ? and a.mINTEREST_STATUS = 1";

        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $_POST["mId"]);
        $statement->execute();
        $data = $statement->fetchAll();
    
        print_r(json_encode($data));
?>