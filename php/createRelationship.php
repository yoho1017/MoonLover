<?php 
        include("./Lib/MemberClass.php");
        $Member = new MemberClass();
        $id = $Member->getMemberID();

        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        $mId = $_POST["mId"];

        $sql = "SELECT * FROM `relationship` WHERE MYMEMBER_ID = $id and TARGET_ID = ?";

        //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $mId);
        $statement->execute();
        $data = $statement->fetchAll();

        // 判斷是否存在配對關係
        if(count($data) == 0){ 
            $sql = "INSERT INTO `relationship` (MYMEMBER_ID, TARGET_ID, rSTATUS) VALUES ($id, $mId, 1)";

            $statement = $Util->getPDO()->prepare($sql);
            $statement->execute();
            $data = $statement->fetchAll();

            $sql = "INSERT INTO `relationship` (MYMEMBER_ID, TARGET_ID, rSTATUS) VALUES ($mId, $id, 1)";

            $statement = $Util->getPDO()->prepare($sql);
            $statement->execute();
            $data = $statement->fetchAll();

            echo 'success';

        }else{
            echo 'exist';
        }
        // print_r(json_encode($data));
        
?>