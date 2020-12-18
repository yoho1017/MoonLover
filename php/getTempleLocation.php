<?php
    include("./Lib/UtilClass.php");
	$Util = new UtilClass();	

    //建立SQL
    $sql = "SELECT t.NAME AS tName, l.*, t.ID AS tID FROM temple_location l left join temple t on t.ID = l.lTEMPLE_ID";

    //執行
    $statement = $Util->getPDO()->prepare($sql);
    $statement->execute();
    $data = $statement->fetchAll();
    
    print_r(json_encode($data));

?>