<?php 
        include("./Lib/MemberClass.php");
        $Member = new MemberClass();
        $id = $Member->getMemberID();

        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        $sql = "SELECT i.name FROM `my_interest_condition` mic JOIN `interest` i on mic.mmcINTEREST_ID = i.ID WHERE mic.MMC_ID = ? and mic.mINTEREST_STATUS = 1";
        // $sql = "SELECT i.name FROM `my_interest_condition` mic JOIN `interest` i on mic.mmcINTEREST_ID = i.ID WHERE mic.MMC_ID =17 AND mic.mINTEREST_STATUS = 1";

        //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $_POST["qmmcMEMBER_ID"]);
        $statement->execute();
        $data = $statement->fetchAll();
        
        print_r(json_encode($data));

?>