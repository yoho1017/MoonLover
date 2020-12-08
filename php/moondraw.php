<?php


        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        //建立SQL

        //籤詩randon
        // $sql = "SELECT * FROM Draw ORDER BY RAND() LIMIT 1";


        //籤詩一條一條測試
        $sql = "SELECT * FROM Draw where id = 2";


            //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->execute();
        $data = $statement->fetchAll();
    

        print_r(json_encode($data));
    

?>