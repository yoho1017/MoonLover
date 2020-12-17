<?php

        $tid = $_POST['tid'];

        // echo $tid;   

        
        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        // $sql = "SELECT * FROM temple WHERE ID = ?";
        $sql = "SELECT t.*, l.IMAGE,l.NAME as LOC_NAME,l.GUIDE,l.OPEN_TIME,l.ADDRESS as LOC_ADDRESS ,l.LOCATION_LINK FROM temple t left join temple_location l on l.lTEMPLE_ID  where t.ID= ? and l.lTEMPLE_ID = ?";
        // $sql = "SELECT t.*, l.IMAGE,l.NAME as LOC_NAME,l.GUIDE,l.OPEN_TIME,l.ADDRESS as LOC_ADDRESS FROM temple t left join temple_location l on l.lTEMPLE_ID";
        // $sql="SELECT * FROM temple WHERE ID =6";
        
       
        //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement ->bindValue(1, $tid);
        $statement ->bindValue(2, $tid);
        $statement->execute();
        $data = $statement->fetchAll();
        
        print_r(json_encode($data));

?>