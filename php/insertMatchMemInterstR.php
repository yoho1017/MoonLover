<?php
        include("./Lib/MemberClass.php");
        $Member = new MemberClass();
        $id = $Member->getMemberID();

        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        // 取得MMC_ID
        $sql = "SELECT ID FROM `member_match_condition` where mmcMEMBER_ID = $id";

        $statement = $Util->getPDO()->prepare($sql);
        $statement->execute();
        $MMC_ID = $statement->fetchColumn();

        // print_r(json_encode($data));

        // 接收資料
        $sport = $_POST["sport"];
        $book = $_POST["book"];
        $movie = $_POST["movie"];
        $travel = $_POST["travel"];
        $codeing = $_POST["codeing"];
        $boardgame = $_POST["boardgame"];
        
        // // 興趣勾選結果到陣列(true=勾選)
        $myinterest = array($sport,$book,$movie,$travel,$codeing,$boardgame);

        // 字串轉數值
        $myinterestInt = [];
        foreach ($myinterest as $value) {
            if ($value == 'false') {
                $myinterestInt[] = 0;
            }else{
                $myinterestInt[] = 1;
            }
        };  
        // print_r($myinterestInt);
        // echo (count($myinterestInt));

        for($i = 1; $i <= count($myinterestInt); $i++){
            $sql = "INSERT INTO `my_interest_condition` (mmcINTEREST_ID, mINTEREST_STATUS, MMC_ID) VALUES (?, ?, ?)";

            $statement = $Util->getPDO()->prepare($sql);

            $statement->bindValue(1, $i);
            $statement->bindValue(2, $myinterestInt[$i-1]);
            $statement->bindValue(3, $MMC_ID);
            $statement->execute();
            $data = $statement->fetchAll();
        }

        $sql = "SELECT * FROM `my_interest_condition`";

        $statement = $Util->getPDO()->prepare($sql);
        $statement->execute();
        $MMC_ID = $statement->fetchAll();

?>