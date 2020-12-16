<?php
    include("./Lib/UtilClass.php");
	$Util = new UtilClass();	

    //建立SQL
    $sql = "SELECT * FROM moonlover.merchandise;";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->execute();
    $data = $statement->fetchAll();

    //執行
    $statement = $Util->getPDO()->prepare($sql);
    $statement->execute();
    $data = $statement->fetchAll();
    
    print_r(json_encode($data));

?>