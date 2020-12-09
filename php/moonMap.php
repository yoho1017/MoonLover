<?php

        $tid = $_POST['tid'];

        // echo $tid;   

        
        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        $sql = "SELECT * FROM temple WHERE ID = ?";

        //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement ->bindValue(1, $tid);
        $statement->execute();
        $data = $statement->fetchAll();
        
        print_r(json_encode($data));

?>